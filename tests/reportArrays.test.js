/*
 * =============================================================================
 *  Tests de qué dato va en cada casillero del informe
 *  (src/components/dataArrays/reportArrays.js)
 * =============================================================================
 *
 *  Toman los .txt de ejemplo, los procesan y guardan como snapshot la
 *  estructura que usa el componente Report para dibujar el informe, tanto en
 *  versión auto como en versión moto. Ver tests/fileAnalizer.test.js para
 *  saber qué es un snapshot y cómo actualizarlo.
 * =============================================================================
 */
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { procesarTextoTxt } from '../src/components/txt-navegator/fileAnalizer.js';
import {
	autoReportArrayFiller,
	motoReportArrayFiller,
} from '../src/components/dataArrays/reportArrays.js';

/** Lee y procesa uno de los .txt de ejemplo de tests/fixtures/. */
function datosDeEjemplo(nombre) {
	const texto = readFileSync(
		new URL(`./fixtures/${nombre}`, import.meta.url),
		'utf8'
	);
	return procesarTextoTxt(texto);
}

describe('autoReportArrayFiller', () => {
	test('sin datos devuelve undefined', () => {
		expect(autoReportArrayFiller(null)).toBeUndefined();
	});

	test('el encabezado muestra patente, marca, modelo y kilómetros', () => {
		const informe = autoReportArrayFiller(datosDeEjemplo('KMX-653.txt'));
		const valores = informe.headerInfo.map((casillero) => casillero.ruta);

		expect(valores).toContain('KMX-653');
		expect(valores).toContain('TOYOTA');
		expect(valores).toContain('SW4');
	});

	test.each(['KMX-653.txt', 'VCW-112.txt'])('informe de auto con %s (snapshot)', (archivo) => {
		expect(autoReportArrayFiller(datosDeEjemplo(archivo))).toMatchSnapshot();
	});
});

describe('motoReportArrayFiller', () => {
	test('sin datos devuelve undefined', () => {
		expect(motoReportArrayFiller(null)).toBeUndefined();
	});

	test.each(['KMX-653.txt', 'VCW-112.txt'])('informe de moto con %s (snapshot)', (archivo) => {
		expect(motoReportArrayFiller(datosDeEjemplo(archivo))).toMatchSnapshot();
	});
});
