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
import { procesarTextoTxt } from '../src/components/txt-navegator/fileAnalizer.js';

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

	test('resultado completo de KMX-653 (snapshot)', () => {
		expect(procesarTextoTxt(KMX)).toMatchSnapshot();
	});

	test('resultado completo de VCW-112 (snapshot)', () => {
		expect(procesarTextoTxt(VCW)).toMatchSnapshot();
	});
});
