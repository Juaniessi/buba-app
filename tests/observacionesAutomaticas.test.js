/*
 * =============================================================================
 *  Tests de las observaciones automáticas
 *  (src/components/main/observacionesAutomaticas.js)
 * =============================================================================
 *
 *  Cada test parte de un .txt de ejemplo, cambia una o dos mediciones para
 *  provocar una falla, y revisa qué observación se agrega (frase y severidad).
 * =============================================================================
 */
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { procesarTextoTxt } from '../src/components/txt-navegator/fileAnalizer.js';
import { generarObservacionesAutomaticas } from '../src/components/main/observacionesAutomaticas.js';

/** Datos de KMX-653 (auto), con algunas mediciones cambiadas. */
function auto(cambios = {}) {
	const datos = procesarTextoTxt(readFileSync(new URL('./fixtures/KMX-653.txt', import.meta.url), 'utf8'));
	// Por defecto, todo apto: anulamos las dos fallas que trae KMX-653
	// (diferencia de frenado trasera y de freno de mano).
	datos.frenosEje_2.diferenciaFzaFrenadoLadoALado = 0;
	datos.frenoDeManoEje_2.diferenciaFzaFrenadoLadoALado = 0;
	for (const [seccion, valores] of Object.entries(cambios)) Object.assign(datos[seccion], valores);
	return datos;
}

const OPCIONES = { tipo: 'Auto', truckSize: 'smallTruck', transmisionType: '4x2', engineType: '4T' };

/** Genera y devuelve solo "severidad: frase" de cada observación. */
function generar(datos, opciones = {}) {
	return generarObservacionesAutomaticas(datos, { ...OPCIONES, ...opciones }).map(
		(o) => `${o.sev}: ${o.desc}`
	);
}

describe('generarObservacionesAutomaticas', () => {
	test('sin .txt no genera nada', () => {
		expect(generarObservacionesAutomaticas(null, OPCIONES)).toEqual([]);
	});

	test('un vehículo todo apto no genera nada', () => {
		expect(generar(auto())).toEqual([]);
	});

	test('todas quedan marcadas como automáticas', () => {
		const obs = generarObservacionesAutomaticas(auto({ alineacion: { resultadoAlineacionEje1: 10 } }), OPCIONES);
		expect(obs).toHaveLength(1);
		expect(obs[0]).toMatchObject({ automatica: true, grupo: 'Dirección', seccion: 'Alineación' });
	});

	test('los .txt de ejemplo, tal cual', () => {
		const leer = (f) => procesarTextoTxt(readFileSync(new URL(`./fixtures/${f}`, import.meta.url), 'utf8'));
		expect(generar(leer('KMX-653.txt'))).toEqual([
			'Moderado: Eje trasero rueda derecha frena menos (pedal).',
			'Moderado: Freno de mano, eje trasero. Rueda derecha frena menos.',
		]);
		expect(generar(leer('VCW-112.txt'), { tipo: 'Camion' })).toEqual([
			'Moderado: Tren delantero desalineado.',
			'Moderado: Supera los límites permitidos de hidrocarburos.',
		]);
	});
});

describe('reglas de autos', () => {
	test('alineación: la severidad sale de la calificación', () => {
		expect(generar(auto({ alineacion: { resultadoAlineacionEje1: 4 } }))).toEqual(['Leve: Tren delantero desalineado.']);
		expect(generar(auto({ alineacion: { resultadoAlineacionEje2: -300 } }))).toEqual(['Grave: Tren trasero desalineado.']);
	});

	test('suspensión: una rueda, o "ambos" con la peor severidad', () => {
		expect(generar(auto({ suspensionEjeDelantero: { rendimientoDelanteroDerecho: 42 } }))).toEqual([
			'Leve: Amortiguador delantero derecho defectuoso (se recomienda cambiar el par).',
		]);
		expect(
			generar(auto({ suspensionEjeTrasero: { rendimientoTraseroIzquierdo: 42, rendimientoTraseroDerecho: 30 } }))
		).toEqual(['Moderado: Ambos amortiguadores traseros defectuosos.']);
	});

	test('suspensión: en camión grande no genera nada', () => {
		const datos = auto({ suspensionEjeDelantero: { rendimientoDelanteroDerecho: 10 } });
		expect(generar(datos, { tipo: 'Camion', truckSize: 'bigTruck' })).toEqual([]);
	});

	test('rendimiento de frenado por eje y de mano', () => {
		expect(generar(auto({ frenosEje_1: { rendimientoDelEje: 42 } }))).toEqual([
			'Leve: Bajo rendimiento de frenado en eje delantero.',
		]);
		expect(generar(auto({ frenoDeManoEje_2: { rendimientoDelEje: 10 } }))).toEqual([
			'Moderado: Bajo rendimiento de freno de mano.',
		]);
	});

	test('diferencia de frenado: indica qué rueda frena menos', () => {
		// Leve desde 10% adelante (donde aparece el asterisco).
		expect(
			generar(auto({ frenosEje_1: { diferenciaFzaFrenadoLadoALado: 10, fuerzaDeFrenadoLadoIzquierdo: 3, fuerzaDeFrenadoLadoDerecho: 3.5 } }))
		).toEqual(['Leve: Eje delantero rueda izquierda frena menos.']);
		expect(
			generar(auto({ frenosEje_1: { diferenciaFzaFrenadoLadoALado: 9, fuerzaDeFrenadoLadoIzquierdo: 3, fuerzaDeFrenadoLadoDerecho: 3.5 } }))
		).toEqual([]);
		// Leve desde 12% atrás.
		expect(
			generar(auto({ frenosEje_2: { diferenciaFzaFrenadoLadoALado: 12, fuerzaDeFrenadoLadoIzquierdo: 3, fuerzaDeFrenadoLadoDerecho: 2.5 } }))
		).toEqual(['Leve: Eje trasero rueda derecha frena menos (pedal).']);
	});

	test('fuerza mínima: suma de las dos ruedas menor a 1 kN, como Moderado', () => {
		expect(
			generar(auto({ frenosEje_2: { fuerzaDeFrenadoLadoIzquierdo: 0.45, fuerzaDeFrenadoLadoDerecho: 0.5 } }))
		).toEqual(['Moderado: Frenos traseros no cumplen con la fuerza mínima requerida (1 kN).']);
		expect(
			generar(auto({ frenosEje_2: { fuerzaDeFrenadoLadoIzquierdo: 0.5, fuerzaDeFrenadoLadoDerecho: 0.5 } }))
		).toEqual([]);
	});

	test('ovalidad y resistencia a la rodadura, por rueda', () => {
		expect(generar(auto({ frenosEje_1: { ovalidadLadoDerecho: 40 } }))).toEqual([
			'Leve: Ovalidad o alabeo en freno delantero derecho.',
		]);
		expect(generar(auto({ frenosEje_2: { resistenciaALaRodaduraLadoIzquierdo: 1.5 } }))).toEqual([
			'Moderado: Resistencia a la rodadura elevada en rueda trasera izquierda.',
		]);
	});

	test('resistencia a la rodadura: en 4x4 no genera nada', () => {
		const datos = auto({ frenosEje_2: { resistenciaALaRodaduraLadoIzquierdo: 1.5 } });
		expect(generar(datos, { transmisionType: '4x4' })).toEqual([]);
	});

	test('una luz quemada (0 o vacía) y la otra funciona: Leve', () => {
		expect(generar(auto({ luxometro: { intensidadBajaIzquierda: 0, intensidadBajaDerecha: 5 } }))).toEqual([
			'Leve: Luz de baja izquierda no enciende, intensidad baja o patrón no reglamentario.',
		]);
		expect(generar(auto({ luxometro: { intensidadAltaIzquierda: 14, intensidadAltaDerecha: '' } }))).toEqual([
			'Leve: Luz de alta derecha no enciende, intensidad baja o patrón no reglamentario.',
		]);
	});

	test('las dos luces del par quemadas: Moderado, una sola frase "Ninguna"', () => {
		expect(generar(auto({ luxometro: { intensidadAltaIzquierda: 0, intensidadAltaDerecha: 0 } }))).toEqual([
			'Moderado: Ninguna luz alta funciona.',
		]);
		expect(generar(auto({ luxometro: { intensidadBajaIzquierda: '', intensidadBajaDerecha: 0 } }))).toEqual([
			'Moderado: Ninguna luz baja funciona.',
		]);
	});

	test('una luz que no viene en el .txt (sin código) no cuenta como quemada', () => {
		expect(generar(auto({ luxometro: { intensidadBajaIzquierda: undefined } }))).toEqual([]);
	});

	test('OZT778: todas las luces en 0 → "Ninguna" baja y alta, Moderado', () => {
		const datos = procesarTextoTxt(readFileSync(new URL('./fixtures/OZT778.txt', import.meta.url), 'utf8'));
		expect(generar(datos)).toEqual(
			expect.arrayContaining(['Moderado: Ninguna luz baja funciona.', 'Moderado: Ninguna luz alta funciona.'])
		);
	});

	test('VFD395: opacidad 11,05 → Grave', () => {
		const datos = procesarTextoTxt(readFileSync(new URL('./fixtures/VFD395.txt', import.meta.url), 'utf8'));
		expect(generar(datos)).toContain('Grave: Alto nivel de opacidad en emisiones.');
	});

	test('luces auxiliares en 0 no generan nada (muchos vehículos no tienen)', () => {
		expect(generar(auto({ luxometro: { intensidadAuxiliarIzquierda: 0, intensidadAuxiliarDerecha: 0 } }))).toEqual([]);
	});

	test('alineación de faros', () => {
		expect(generar(auto({ luxometro: { alineacionFaroDerechoHorizontal: 8 } }))).toEqual([
			'Moderado: Faro derecho desalineado horizontalmente.',
		]);
	});

	test('gases: diésel por opacidad, naftero por CO y HC', () => {
		expect(generar(auto({ opacimetro: { resultadoMedicionOpacidad: 0.3 } }))).toEqual([
			'Moderado: Alto nivel de opacidad en emisiones.',
		]);
		const naftero = auto({
			opacimetro: { resultadoMedicionOpacidad: -1 },
			analizadorDeGases: { resultadoMonoxidoDeCarbonoEnAltaRPM: 3, resultadoHidroCarburosHCAltaRPM: 100 },
		});
		expect(generar(naftero)).toEqual(['Moderado: Supera los límites permitidos de monóxido de carbono.']);
	});

	test('ruido', () => {
		expect(generar(auto({ sonometro: { valorDeMedicion: 82 } }))).toEqual([
			'Moderado: Alto nivel de contaminación sonora.',
		]);
	});

	test('una medición vacía en el .txt no genera nada', () => {
		expect(generar(auto({ frenosEje_1: { rendimientoDelEje: '' } }))).toEqual([]);
	});
});

describe('reglas de motos', () => {
	const moto = (cambios) => auto(cambios);
	const comoMoto = { tipo: 'Moto' };

	test('frases de moto (sin lado)', () => {
		expect(generar(moto({ frenosEje_2: { rendimientoDelEje: 30 } }), comoMoto)).toEqual([
			'Moderado: Bajo rendimiento de frenado en eje trasero.',
		]);
		expect(generar(moto({ luxometro: { intensidadBajaIzquierda: 0 } }), comoMoto)).toEqual([
			'Moderado: Luz baja no enciende.',
		]);
	});

	test('la fuerza mínima de 1 kN no se aplica a motos', () => {
		const datos = moto({ frenosEje_2: { fuerzaDeFrenadoLadoIzquierdo: 0.3, fuerzaDeFrenadoLadoDerecho: 0.3 } });
		expect(generar(datos, comoMoto)).toEqual([]);
	});

	test('HC según el motor', () => {
		const datos = moto({ analizadorDeGases: { resultadoHidroCarburosHCAltaRPM: 3500 } });
		expect(generar(datos, { tipo: 'Moto', engineType: '4T' })).toEqual([
			'Moderado: Emisión de gases supera los límites permitidos de hidrocarburos.',
		]);
		expect(generar(datos, { tipo: 'Moto', engineType: '2T' })).toEqual([]);
	});
});
