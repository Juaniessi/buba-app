/*
 * =============================================================================
 *  Tests de la tabla de patentes (dataArrays/patentes.js) y de la vigencia
 *  automática de la RTO particular (main/vigencia.js)
 * =============================================================================
 */
import { describe, expect, test } from 'vitest';
import { fechaDePatentamiento } from '../src/components/dataArrays/patentes.js';
import { calcularVigenciaParticular } from '../src/components/main/vigencia.js';

const fecha = (año, mes, dia = 1) => new Date(año, mes - 1, dia);
const mesAño = (d) => `${d.getMonth() + 1}/${d.getFullYear()}`;
const rango = (patente, hoy = fecha(2026, 11, 16)) => {
	const r = fechaDePatentamiento(patente, hoy);
	return r && `${mesAño(r.desde)} a ${mesAño(r.hasta)} (${r.formato})`;
};

describe('fechaDePatentamiento', () => {
	test('formato Mercosur, con o sin espacios y guiones', () => {
		expect(rango('AG 450 AA')).toBe('1/2024 a 6/2024 (Mercosur)');
		expect(rango('ag-450-zz')).toBe('1/2024 a 6/2024 (Mercosur)');
		expect(rango('AF149AA')).toBe('8/2021 a 1/2022 (Mercosur)'); // justo antes de AF150
		expect(rango('AA000AA')).toBe('4/2016 a 1/2017 (Mercosur)');
	});

	test('más nueva que la última fila: hasta el día de la revisión', () => {
		expect(rango('AH 123 BC', fecha(2026, 11, 16))).toBe('10/2024 a 11/2026 (Mercosur)');
	});

	test('formato anterior (tres letras): por las dos primeras', () => {
		expect(rango('KMX-653')).toBe('1/2011 a 1/2012 (anterior)');
		expect(rango('AAA 111')).toBe('1/1995 a 1/1996 (anterior)');
		expect(rango('PNB 001')).toBe('1/2016 a 4/2016 (anterior)'); // hasta que empezó Mercosur
	});

	test('patentes que no se pueden ubicar', () => {
		expect(fechaDePatentamiento('VCW-112', fecha(2022, 9, 13))).toBeNull(); // "VC" nunca se usó
		expect(fechaDePatentamiento('C123456', fecha(2022, 9, 13))).toBeNull(); // formato viejo provincial
		expect(fechaDePatentamiento('', fecha(2022, 9, 13))).toBeNull();
		expect(fechaDePatentamiento(undefined, fecha(2022, 9, 13))).toBeNull();
	});
});

describe('calcularVigenciaParticular', () => {
	test('más de 7 años → 1 año', () => {
		const r = calcularVigenciaParticular('KMX-653', fecha(2022, 7, 8)); // patentada en 2011
		expect(r.estado).toBe('automatica');
		expect(r.vigencia).toBe('1a');
		expect(r.explicacion).toContain('más de 7 años');
	});

	test('entre 3 y 7 años → 2 años', () => {
		const r = calcularVigenciaParticular('AE 300 AA', fecha(2026, 11, 16)); // 2020
		expect(r).toMatchObject({ estado: 'automatica', vigencia: '2a' });
	});

	test('hasta 3 años → cartel, se elige a mano', () => {
		const r = calcularVigenciaParticular('AH 123 BC', fecha(2026, 11, 16)); // después de oct. 2024
		expect(r).toMatchObject({ estado: 'menosDeTres', vigencia: null });
		expect(r.explicacion).toContain('menos de 3 años en la calle');
	});

	test('patente sin guion (como vienen ahora) → igual se calcula', () => {
		const r = calcularVigenciaParticular('OMC542', fecha(2026, 11, 6)); // 2014
		expect(r).toMatchObject({ estado: 'automatica', vigencia: '1a' });
	});

	test('patente que no está en la tabla → no se puede calcular', () => {
		const r = calcularVigenciaParticular('VCW-112', fecha(2022, 9, 13));
		expect(r).toMatchObject({ estado: 'sinDatos', vigencia: null });
		expect(r.explicacion).toContain('no está en la tabla de patentes');
	});

	test('si el rango de la patente cruza un límite, no se puede calcular', () => {
		// AG 450: entre ene. y jun. 2024. A julio de 2027 tiene entre 3,1 y 3,5 años
		// → 2 años. Pero a marzo de 2027 puede tener 2,8 o 3,2: no se sabe.
		expect(calcularVigenciaParticular('AG 450 AA', fecha(2027, 7, 1)).vigencia).toBe('2a');
		const r = calcularVigenciaParticular('AG 450 AA', fecha(2027, 3, 1));
		expect(r).toMatchObject({ estado: 'sinDatos', vigencia: null });
		expect(r.explicacion).toContain('más o menos de 3 años');
	});
});
