/*
 * =============================================================================
 *  Tests del lector de .txt (src/components/txt-navegator/fileAnalizer.js)
 * =============================================================================
 *
 *  Se corren con `npm test`. Usan los dos archivos de ejemplo de
 *  tests/fixtures/ (salidas reales de la línea de RTO).
 *
 *  Hay dos tipos de chequeo:
 *    - Valores puntuales (patente, marca, año, etc.) que se pueden comprobar
 *      a ojo abriendo el .txt.
 *    - Un "snapshot": la primera vez que se corre, Vitest guarda el resultado
 *      completo en tests/__snapshots__/. Las siguientes veces compara contra
 *      eso y avisa si cambió aunque sea un número. Sirve para reescribir el
 *      código por dentro con la seguridad de que el resultado sigue igual.
 *
 *  Si alguna vez un cambio en el resultado es intencional (por ejemplo, se
 *  corrige un dato mal leído), se actualizan los snapshots con:
 *      npx vitest run -u
 *  y se revisa en el diff que el cambio sea el esperado.
 * =============================================================================
 */
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
	procesarTextoTxt,
	textoAFecha,
} from '../src/components/txt-navegator/fileAnalizer.js';

/** Lee uno de los .txt de ejemplo de tests/fixtures/ como texto. */
function leerEjemplo(nombre) {
	return readFileSync(new URL(`./fixtures/${nombre}`, import.meta.url), 'utf8');
}

const KMX = leerEjemplo('KMX-653.txt'); // Toyota SW4 2012, diésel
const VCW = leerEjemplo('VCW-112.txt'); // Chevrolet C10 1974

describe('procesarTextoTxt', () => {
	test('lee los datos del vehículo (KMX-653)', () => {
		const datos = procesarTextoTxt(KMX);

		expect(datos.header.patente).toBe('KMX-653');
		expect(datos.header.marcaDelVehiculo).toBe('TOYOTA');
		expect(datos.header.modelo).toBe('SW4');
		expect(Number(datos.header.añoDeFabricacion)).toBe(2012);
	});

	test('convierte las mediciones a números (KMX-653)', () => {
		const datos = procesarTextoTxt(KMX);

		// En el .txt figura "50040=57,2763942345199": coma decimal.
		expect(datos.frenosEje_1.rendimientoDelEje).toBeCloseTo(57.28, 2);
		// Opacidad medida (diésel): "38500=0,01".
		expect(datos.opacimetro.resultadoMedicionOpacidad).not.toBe(-1);
	});

	test('lee los datos del vehículo (VCW-112)', () => {
		const datos = procesarTextoTxt(VCW);

		expect(datos.header.patente).toBe('VCW-112');
		expect(datos.header.marcaDelVehiculo).toBe('CHEVROLET');
		expect(Number(datos.header.añoDeFabricacion)).toBe(1974);
	});

	test('procesar un archivo no deja restos del anterior', () => {
		// El lector guarda datos intermedios en variables del módulo; este test
		// confirma que leer otro archivo en el medio no cambia el resultado.
		const primeraVez = procesarTextoTxt(KMX);
		procesarTextoTxt(VCW);
		const segundaVez = procesarTextoTxt(KMX);

		expect(segundaVez).toEqual(primeraVez);
	});

	test('lee el número de línea (código 80000)', () => {
		// Antes no se leía: en la lista de códigos estaba escrito como número
		// (80000) y en el .txt viene como texto ("80000"), así que no coincidía.
		expect(procesarTextoTxt(KMX).lineaDePrueba.numeroDeLinea).toBe('4');
	});

	test('un código sin nombre en las tablas se ignora', () => {
		// Antes, los códigos 70010 a 70017 del luxómetro terminaban guardados
		// en una propiedad llamada literalmente "undefined".
		const datos = procesarTextoTxt('70000=12,5\r\n70010=99\r\n');
		// 70000 es la alineación horizontal del faro derecho.
		expect(datos.luxometro).toEqual({ alineacionFaroDerechoHorizontal: 12.5 });
		expect(datos.luxometro).not.toHaveProperty('undefined');
	});

	test('las motos (un solo puesto) usan la fecha del puesto 1 como puesto 2', () => {
		const datos = procesarTextoTxt(
			'80001=8/7/2022 12:30:16\r\n80002=8/7/2022 12:33:03\r\n'
		);
		const puestos = datos.estadísticaDePuestos;
		expect(puestos.fechaDeIngresoAlPuesto2).toEqual(puestos.fechaDeIngresoAlPuesto1);
		expect(puestos.fechaDeSalidaDelPuesto2).toEqual(puestos.fechaDeSalidaDelPuesto1);
		expect(puestos.fechaDeSalidaDelPuesto2).toEqual(new Date(2022, 6, 8, 12, 33, 3));
	});

	test('resultado completo de KMX-653 (snapshot)', () => {
		expect(procesarTextoTxt(KMX)).toMatchSnapshot();
	});

	test('resultado completo de VCW-112 (snapshot)', () => {
		expect(procesarTextoTxt(VCW)).toMatchSnapshot();
	});
});

describe('textoAFecha', () => {
	// Las fechas llegan sin el espacio entre fecha y hora (se borra al limpiar
	// el texto): "8/7/2022 12:30:16" → "8/7/202212:30:16".
	test.each([
		['8/7/202212:30:16', new Date(2022, 6, 8, 12, 30, 16)], // d/m + hh
		['13/9/202212:53:35', new Date(2022, 8, 13, 12, 53, 35)], // dd/m + hh
		['13/09/20229:05:01', new Date(2022, 8, 13, 9, 5, 1)], // dd/mm + h
		['08/07/202212:30:16', new Date(2022, 6, 8, 12, 30, 16)], // dd/mm + hh
		// Estos dos los leía mal el código anterior:
		['8/7/20229:05:01', new Date(2022, 6, 8, 9, 5, 1)], // d/m + h: daba error
		['12/7/20229:05:01', new Date(2022, 6, 12, 9, 5, 1)], // dd/m + h: daba año 202
	])('"%s"', (texto, esperada) => {
		expect(textoAFecha(texto)).toEqual(esperada);
	});

	test('sin fecha devuelve undefined', () => {
		expect(textoAFecha(undefined)).toBeUndefined();
	});

	test('un texto que no es fecha devuelve una fecha inválida', () => {
		expect(isNaN(textoAFecha('cualquiercosa'))).toBe(true);
	});
});
