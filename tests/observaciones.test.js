/*
 * =============================================================================
 *  Tests de las filas de la lista de defectos
 *  (src/components/main/observaciones.js)
 * =============================================================================
 */
import { describe, expect, test } from 'vitest';
import {
	cambiarSeveridad,
	nuevaObservacion,
	resultadoSegunDefectos,
} from '../src/components/main/observaciones.js';

const base = { grupo: 'Frenos', seccion: 'Rendimiento de frenado', desc: 'Bajo rendimiento.' };

describe('nuevaObservacion', () => {
	test('una observación cargada a mano lleva su severidad y su orden', () => {
		expect(nuevaObservacion({ ...base, severidad: 'Moderado' })).toEqual({
			...base,
			sev: 'Moderado',
			Ord: 2,
			automatica: false,
		});
	});

	test('el orden va de 1 (Leve) a 3 (Grave)', () => {
		expect(nuevaObservacion({ ...base, severidad: 'Leve' }).Ord).toBe(1);
		expect(nuevaObservacion({ ...base, severidad: 'Grave' }).Ord).toBe(3);
	});

	test('las notas no llevan severidad y van al final (orden 0)', () => {
		const nota = nuevaObservacion({ ...base, severidad: 'Grave', esNota: true });
		expect(nota.sev).toBe('');
		expect(nota.Ord).toBe(0);
	});

	test('se puede marcar como automática', () => {
		expect(nuevaObservacion({ ...base, severidad: 'Leve', automatica: true }).automatica).toBe(true);
	});

	test('una severidad desconocida es un error', () => {
		expect(() => nuevaObservacion({ ...base, severidad: 'Gravísimo' })).toThrow();
	});
});

describe('cambiarSeveridad', () => {
	const leve = nuevaObservacion({ ...base, severidad: 'Leve' });
	const otra = nuevaObservacion({ ...base, desc: 'Otra.', severidad: 'Leve' });
	const lista = [leve, otra];

	test('cambia la severidad y el orden solo de esa observación', () => {
		const nueva = cambiarSeveridad(lista, leve, 'Grave');
		expect(nueva[0]).toMatchObject({ desc: 'Bajo rendimiento.', sev: 'Grave', Ord: 3 });
		expect(nueva[1]).toBe(otra); // la otra queda igual
	});

	test('no modifica la lista original', () => {
		cambiarSeveridad(lista, leve, 'Grave');
		expect(lista[0].sev).toBe('Leve');
	});

	test('conserva si es automática', () => {
		const auto = nuevaObservacion({ ...base, severidad: 'Leve', automatica: true });
		expect(cambiarSeveridad([auto], auto, 'Moderado')[0].automatica).toBe(true);
	});
});

describe('resultadoSegunDefectos', () => {
	const conSeveridad = (severidad, esNota = false) => nuevaObservacion({ ...base, severidad, esNota });

	test('sin defectos o solo leves → Apto', () => {
		expect(resultadoSegunDefectos([])).toBe('Apto');
		expect(resultadoSegunDefectos([conSeveridad('Leve')])).toBe('Apto');
	});

	test('al menos un Moderado → Condicional', () => {
		expect(resultadoSegunDefectos([conSeveridad('Leve'), conSeveridad('Moderado')])).toBe('Condicional');
	});

	test('al menos un Grave → Rechazado, aunque haya moderados', () => {
		expect(resultadoSegunDefectos([conSeveridad('Moderado'), conSeveridad('Grave')])).toBe('Rechazado');
	});

	test('las notas no cuentan', () => {
		expect(resultadoSegunDefectos([conSeveridad('Grave', true)])).toBe('Apto');
	});
});
