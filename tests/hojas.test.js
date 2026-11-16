/*
 * =============================================================================
 *  Tests del reparto de las observaciones en hojas (main/hojas.js)
 * =============================================================================
 */
import { describe, expect, test } from 'vitest';
import { cortarEnHojas, repartirEnHojas } from '../src/components/main/hojas.js';

// Medidas chicas para que las cuentas se lean fácil: encabezado de 10 px,
// hoja 1 con lugar para 100 px y las siguientes para 200 px.
const medidas = { encabezado: 10, espacioPrimera: 100, espacioOtras: 200 };

describe('repartirEnHojas', () => {
	test('sin observaciones: una sola hoja, vacía', () => {
		expect(repartirEnHojas([], medidas)).toEqual([0]);
	});

	test('si todo entra, una sola hoja', () => {
		// 10 + 4 × 20 = 90 ≤ 100
		expect(repartirEnHojas([20, 20, 20, 20], medidas)).toEqual([4]);
		// 10 + 3 × 30 = 100: justo, entra
		expect(repartirEnHojas([30, 30, 30], medidas)).toEqual([3]);
	});

	test('lo que no entra pasa a la hoja 2', () => {
		// Hoja 1: 10 + 4 × 20 = 90; la quinta (110) ya no entra.
		expect(repartirEnHojas([20, 20, 20, 20, 20, 20], medidas)).toEqual([4, 2]);
	});

	test('las filas de dos renglones ocupan más', () => {
		// 10 + 40 + 40 = 90; la de 20 ya no entra (110).
		expect(repartirEnHojas([40, 40, 20, 20], medidas)).toEqual([2, 2]);
	});

	test('si no entra en la hoja 2, sigue en la 3', () => {
		// Hoja 1: 4 filas (90). Hoja 2: 10 + 9 × 20 = 190 → 9 filas. Hoja 3: el resto.
		const alturas = Array(15).fill(20);
		expect(repartirEnHojas(alturas, medidas)).toEqual([4, 9, 2]);
	});

	test('una fila que no entra en ninguna hoja va igual (no quedan hojas vacías)', () => {
		expect(repartirEnHojas([150], medidas)).toEqual([1]);
		expect(repartirEnHojas([20, 150], medidas)).toEqual([1, 1]);
	});

	test('sin medidas (en los tests de la app todo mide 0), todo en la hoja 1', () => {
		expect(repartirEnHojas(Array(20).fill(0), { encabezado: 0 })).toEqual([20]);
	});
});

describe('cortarEnHojas', () => {
	const lista = ['a', 'b', 'c', 'd', 'e'];

	test('corta según cuántas filas van en cada hoja', () => {
		expect(cortarEnHojas(lista, [3, 2])).toEqual([['a', 'b', 'c'], ['d', 'e']]);
		expect(cortarEnHojas(lista, [5])).toEqual([lista]);
	});

	test('si hay más filas que las repartidas, las nuevas van a la última hoja', () => {
		expect(cortarEnHojas(lista, [2, 1])).toEqual([['a', 'b'], ['c', 'd', 'e']]);
		expect(cortarEnHojas(lista, [0])).toEqual([lista]);
	});

	test('si hay menos, se descartan las hojas que quedan vacías', () => {
		expect(cortarEnHojas(['a', 'b'], [2, 3])).toEqual([['a', 'b']]);
		expect(cortarEnHojas([], [4, 2])).toEqual([[]]);
	});
});
