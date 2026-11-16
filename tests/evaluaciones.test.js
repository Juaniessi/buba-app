/*
 * =============================================================================
 *  Tests de las reglas del informe (src/components/main/evaluaciones.js)
 * =============================================================================
 *
 *  Cada regla se prueba con valores de ejemplo y, sobre todo, con los valores
 *  justo EN el límite, que es donde suelen aparecer los errores (¿un 40 en
 *  frenos es Moderado o Leve?).
 *
 *  Para leerlos: en cada tabla, cada fila es [valor medido, letra esperada].
 * =============================================================================
 */
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { procesarTextoTxt } from '../src/components/txt-navegator/fileAnalizer.js';
import {
	CALIFICACION,
	evaluarMenorOIgual,
	evaluarMayorOIgual,
	evaluarRango,
	evaluarRuido,
	evaluarHC,
	evaluarCO,
	evaluarHCMoto,
	añoValido,
	fechaDeInicio,
	fechaDePrimeraRevision,
	esFechaValida,
	calcularVencimiento,
	formatearFecha,
} from '../src/components/main/evaluaciones.js';

/** Devuelve solo la letra (A, L, M, G) de una calificación. */
const letra = (resultado) => resultado?.letra;

describe('calificaciones', () => {
	test('cada letra tiene su clase CSS', () => {
		expect(CALIFICACION.GRAVE).toEqual({ clase: 'severe', letra: 'G' });
		expect(CALIFICACION.MODERADO).toEqual({ clase: 'moderate', letra: 'M' });
		expect(CALIFICACION.LEVE).toEqual({ clase: 'minor', letra: 'L' });
		expect(CALIFICACION.APTO).toEqual({ clase: '', letra: 'A' });
	});
});

describe('evaluarMenorOIgual (un valor bajo es malo)', () => {
	// Rendimiento de frenos: límites [5, 40, 44]
	test.each([
		[0, 'G'],
		[5, 'G'], // justo en el límite grave
		[5.01, 'M'],
		[40, 'M'], // justo en el límite moderado
		[40.01, 'L'],
		[44, 'L'], // justo en el límite leve
		[44.01, 'A'],
		[80, 'A'],
	])('rendimiento de frenos %s → %s', (valor, esperado) => {
		expect(letra(evaluarMenorOIgual(valor, 'brakePerf'))).toBe(esperado);
	});

	test.each([
		['handBrakePerf', 3, 14.4, 16],
		['brakeStrenghtFront', 0.15, 0.3, 0.42],
		['brakeStrenghtRear', 0.05, 0.3, 0.42],
		['brakeStrenghtMoto', 0.05, 0.15, 0.26],
	])('%s: límites %s / %s / %s', (limite, grave, moderado, leve) => {
		expect(letra(evaluarMenorOIgual(grave, limite))).toBe('G');
		expect(letra(evaluarMenorOIgual(moderado, limite))).toBe('M');
		expect(letra(evaluarMenorOIgual(leve, limite))).toBe('L');
		expect(letra(evaluarMenorOIgual(leve + 0.01, limite))).toBe('A');
	});
});

describe('evaluarMayorOIgual (un valor alto es malo)', () => {
	// Opacidad: límites [5, 0.25, 0.2]
	test.each([
		[0, 'A'],
		[0.19, 'A'],
		[0.2, 'L'], // justo en el límite leve
		[0.25, 'M'], // justo en el límite moderado
		[4.99, 'M'],
		[5, 'G'], // justo en el límite grave
	])('opacidad %s → %s', (valor, esperado) => {
		expect(letra(evaluarMayorOIgual(valor, 'opacity'))).toBe(esperado);
	});

	test.each([
		['brakeDifDel', 90, 15.1, 10], // leve = desde el asterisco
		['brakeDifTra', 95, 15.1, 12], // leve = desde el asterisco
		['brakeResist', 4, 1, 0.85],
		['brakeOval', 90, 50, 35],
		['luxLow', 200, 60, 40],
		['luxHigh', 200, 150, 85],
		['luxAng', 15, 7, 3],
		['CO-Moto', 8, 4.5, 3.5],
	])('%s: límites %s / %s / %s', (limite, grave, moderado, leve) => {
		expect(letra(evaluarMayorOIgual(grave, limite))).toBe('G');
		expect(letra(evaluarMayorOIgual(moderado, limite))).toBe('M');
		expect(letra(evaluarMayorOIgual(leve, limite))).toBe('L');
		expect(letra(evaluarMayorOIgual(leve - 0.01, limite))).toBe('A');
	});

	test('un 4x4 siempre es apto (resistencia a la rodadura)', () => {
		expect(letra(evaluarMayorOIgual(10, 'brakeResist', { transmisionType: '4x4' }))).toBe('A');
		expect(letra(evaluarMayorOIgual(10, 'brakeResist', { transmisionType: '4x2' }))).toBe('G');
	});

	test('un camión grande siempre es apto (resistencia a la rodadura)', () => {
		expect(letra(evaluarMayorOIgual(10, 'brakeResist', { truckSize: 'bigTruck' }))).toBe('A');
		expect(letra(evaluarMayorOIgual(10, 'brakeResist', { truckSize: 'smallTruck' }))).toBe('G');
	});
});

describe('evaluarRango (tiene que quedar dentro de un rango)', () => {
	// Suspensión: [-1, 102, 39.9, 100, 45, 99.5]
	test.each([
		[-1, 'G'],
		[0, 'M'],
		[39.9, 'M'],
		[40, 'L'],
		[45, 'L'],
		[45.1, 'A'],
		[70, 'A'],
		[99.4, 'A'],
		[99.5, 'L'],
		[100, 'M'],
		[102, 'G'],
	])('suspensión %s → %s', (valor, esperado) => {
		expect(letra(evaluarRango(valor, 'susp'))).toBe(esperado);
	});

	// Alineación: [-256, 256, -5, 5, -4, 4]
	test.each([
		[0, 'A'],
		[3.9, 'A'],
		[-3.9, 'A'],
		[4, 'L'],
		[-4, 'L'],
		[5, 'M'],
		[-5, 'M'],
		[256, 'G'],
		[-256, 'G'],
	])('alineación %s → %s', (valor, esperado) => {
		expect(letra(evaluarRango(valor, 'alin'))).toBe(esperado);
	});

	test('en un camión grande la suspensión siempre es apta', () => {
		expect(letra(evaluarRango(0, 'susp', 'bigTruck'))).toBe('A');
		expect(letra(evaluarRango(0, 'susp', 'smallTruck'))).toBe('M');
	});
});

describe('año de fabricación', () => {
	test.each([
		[1974, 1974],
		[2012, 2012],
		['', 2000], // sin año en el .txt
		[1919, 2000], // fuera de rango: error de carga
		[2201, 2000],
	])('añoValido(%s) → %s', (año, esperado) => {
		expect(añoValido(año)).toBe(esperado);
	});
});

describe('evaluarRuido', () => {
	test.each([
		// tipo,      año,  valor, esperado
		['Auto', 1997, 85.1, 'M'], // hasta 1997: límite moderado 85.1
		['Auto', 1998, 85.1, 'M'],
		['Auto', 1997, 80.1, 'L'],
		['Auto', 1998, 80.1, 'M'], // desde 1998: límite moderado 80.1
		['Moto', 2010, 76.9, 'A'],
		['Minibus', 2010, 77, 'L'],
		['Camioneta', 2010, 100, 'G'],
		['Camion', 1997, 95.1, 'M'], // camión viejo: moderado 95.1
		['Camion', 1998, 87.1, 'M'], // camión nuevo: moderado 87.1
		['Camion', 1998, 83.9, 'A'],
		['Camion', '', 84, 'L'], // sin año → se toma 2000 (nuevo)
	])('%s %s con %s dB → %s', (tipo, año, valor, esperado) => {
		expect(letra(evaluarRuido(valor, año, tipo))).toBe(esperado);
	});

	test('un tipo desconocido no se califica', () => {
		expect(evaluarRuido(90, 2010, 'Tractor')).toBeUndefined();
	});
});

describe('gases de autos', () => {
	test.each([
		// año,  HC,  esperado
		[1991, 900, 'M'], // hasta 1991: moderado desde 900
		[1991, 600, 'L'],
		[1992, 600, 'M'], // 1992–1994: moderado desde 600
		[1994, 400, 'L'],
		[1995, 400, 'M'], // desde 1995: moderado desde 400
		[1995, 250, 'L'],
		[1995, 249, 'A'],
		[2012, 2500, 'G'],
		['', 400, 'M'], // sin año → 2000
	])('HC: año %s, %s ppm → %s', (año, valor, esperado) => {
		expect(letra(evaluarHC(valor, año))).toBe(esperado);
	});

	test.each([
		[1991, 4.5, 'M'],
		[1991, 2, 'L'],
		[1993, 3, 'M'],
		[1993, 1.5, 'L'],
		[1995, 2.5, 'M'],
		[1995, 1, 'L'],
		[1995, 0.99, 'A'],
		[1980, 15, 'G'],
	])('CO: año %s, %s → %s', (año, valor, esperado) => {
		expect(letra(evaluarCO(valor, año))).toBe(esperado);
	});
});

describe('gases de motos', () => {
	test.each([
		['4T', 1499, 'A'],
		['4T', 1500, 'L'],
		['4T', 3000, 'M'],
		['4T', 4000, 'G'],
		['2T', 4499, 'A'],
		['2T', 4500, 'L'],
		['2T', 9000, 'M'],
		['2T', 12000, 'G'],
	])('HC motor %s, %s ppm → %s', (motor, valor, esperado) => {
		expect(letra(evaluarHCMoto(valor, motor))).toBe(esperado);
	});
});

describe('fechaDeInicio', () => {
	const salida2 = new Date(2022, 6, 8, 12, 33);
	const salida3 = new Date(2022, 6, 8, 12, 41);

	test('sin .txt devuelve vacío', () => {
		expect(fechaDeInicio(null)).toBe('');
	});

	test('usa la salida del puesto 3 si existe', () => {
		const datos = { estadísticaDePuestos: { fechaDeSalidaDelPuesto2: salida2, fechaDeSalidaDelPuesto3: salida3 } };
		expect(fechaDeInicio(datos)).toBe(salida3);
	});

	test('si no hay puesto 3, usa el puesto 2', () => {
		const datos = { estadísticaDePuestos: { fechaDeSalidaDelPuesto2: salida2 } };
		expect(fechaDeInicio(datos)).toBe(salida2);
	});
});

describe('fechas que faltan', () => {
	test('formatearFecha sin fecha válida devuelve vacío (no rompe el informe)', () => {
		expect(formatearFecha(undefined)).toBe('');
		expect(formatearFecha('')).toBe('');
		expect(formatearFecha(new Date(NaN))).toBe('');
		expect(esFechaValida(new Date(2026, 10, 16))).toBe(true);
	});
});

describe('fechaDePrimeraRevision', () => {
	const leer = (nombre) =>
		procesarTextoTxt(readFileSync(new URL(`./fixtures/${nombre}`, import.meta.url), 'utf8'));

	test('sin .txt, null', () => {
		expect(fechaDePrimeraRevision(null)).toBeNull();
	});

	test('primera revisión (todos los puestos el mismo día): null', () => {
		expect(fechaDePrimeraRevision(leer('OMC542.txt'))).toBeNull();
		expect(fechaDePrimeraRevision(leer('KMX-653.txt'))).toBeNull();
		expect(fechaDePrimeraRevision(leer('VCW-112.txt'))).toBeNull();
	});

	test('segunda revisión: el puesto que no se repitió conserva la fecha de la primera', () => {
		// OMC542_2: puesto 1 del 6/11/2026; puestos 2 y 3 del 16/11/2026.
		const datos = leer('OMC542_2.txt');
		expect(formatearFecha(fechaDeInicio(datos))).toBe('16/11/2026');
		expect(formatearFecha(fechaDePrimeraRevision(datos))).toBe('6/11/2026');
	});

	test('fechas inválidas o que faltan no cuentan', () => {
		const datos = {
			estadísticaDePuestos: {
				fechaDeIngresoAlPuesto1: new Date(NaN),
				fechaDeSalidaDelPuesto1: undefined,
				fechaDeSalidaDelPuesto2: new Date(2026, 10, 16, 11, 12),
			},
		};
		expect(fechaDePrimeraRevision(datos)).toBeNull();
	});
});

describe('calcularVencimiento', () => {
	// Revisión del 8/7/2022 a las 12:41.
	const inicio = new Date(2022, 6, 8, 12, 41);
	const vence = (rtoType, resultado, vigencia) =>
		formatearFecha(calcularVencimiento(inicio, rtoType, resultado, vigencia));

	test.each([
		// RTO particular
		['particular', 'Apto', '2a', '8/7/2024'],
		['particular', 'Apto', '1a', '8/7/2023'],
		['particular', 'Apto', '6m', '8/1/2023'],
		['particular', 'Condicional', '1a', '6/9/2022'], // 60 días
		['particular', 'Rechazado', '1a', '8/7/2022'], // el mismo día
		['particular', 'SoloInforme', '1a', '8/7/2022'],
		// Transporte de pasajeros
		['traPas', 'Apto', '1a', '8/7/2023'],
		['traPas', 'Apto', '6m', '8/1/2023'],
		['traPas', 'Apto', '3m', '8/10/2022'],
		['traPas', 'Apto', '2m', '8/9/2022'],
		['traPas', 'Condicional', '3m', '23/7/2022'], // 15 días
		['traPas', 'Rechazado', '3m', '20/7/2022'], // 12 días
		['traPas', 'SoloInforme', '3m', '8/7/2022'],
	])('%s, %s, vigencia %s → vence %s', (rtoType, resultado, vigencia, esperado) => {
		expect(vence(rtoType, resultado, vigencia)).toBe(esperado);
	});

	test('no modifica la fecha de inicio', () => {
		const copia = new Date(inicio.getTime());
		calcularVencimiento(inicio, 'particular', 'Apto', '2a');
		expect(inicio).toEqual(copia);
	});

	test('una revisión del 31/12 a la noche vence un año después, no dos', () => {
		// A las 22:00 de Argentina ya es 1/1 en hora UTC. Antes el cálculo
		// usaba el año UTC y el vencimiento salía para el 31/12 de dos años
		// después.
		const fin = new Date(2022, 11, 31, 22, 0);
		expect(formatearFecha(calcularVencimiento(fin, 'particular', 'Apto', '1a'))).toBe('31/12/2023');
		expect(formatearFecha(calcularVencimiento(fin, 'particular', 'Apto', '2a'))).toBe('31/12/2024');
	});
});

describe('formatearFecha', () => {
	test('día/mes/año sin ceros adelante', () => {
		expect(formatearFecha(new Date(2022, 6, 8))).toBe('8/7/2022');
		expect(formatearFecha(new Date(2023, 11, 31))).toBe('31/12/2023');
	});
});
