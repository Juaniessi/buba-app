/*
 * =============================================================================
 *  observacionesAutomaticas.js — Observaciones que la app agrega sola
 * =============================================================================
 *
 *  Al cargar un .txt, la app revisa cada medición con las mismas reglas que
 *  usa el informe (evaluaciones.js). Si una medición sale Leve, Moderada o
 *  Grave, agrega la observación correspondiente a la lista de defectos, con
 *  esa severidad. Las frases salen de las listas de defectos
 *  (dataArrays/carDataBase.js y motoDataBase.js), así que son las mismas que
 *  se pueden elegir a mano.
 *
 *  Todas quedan marcadas con `automatica: true`. El botón "Regenerar
 *  observaciones automáticas" borra solo esas y las vuelve a calcular; las
 *  que cargó la persona no se tocan.
 *
 *  Reglas especiales (acordadas con el área técnica):
 *    - Diferencia de frenado: además de la severidad, se indica qué rueda
 *      frena menos (la de menor fuerza de frenado).
 *    - Fuerza mínima (solo autos, camionetas, camiones y colectivos): si la
 *      suma de las dos ruedas de un eje no llega a 1 kN, se agrega la frase
 *      del reglamento como Moderado. Puede no aplicar a vehículos chicos
 *      homologados: en ese caso, se borra a mano.
 *    - Suspensión (autos): si fallan las dos ruedas de un eje, va una sola
 *      frase "Ambos amortiguadores…" con la severidad más alta de las dos.
 *    - Luces baja y alta (autos): se evalúan de a pares. Una intensidad vacía
 *      o 0 significa luz quemada. Si se quemó una sola y la otra funciona,
 *      va como Leve; si están quemadas las dos, una sola frase "Ninguna luz…"
 *      como Moderado (Condicional). En las motos, una baja o alta en 0 sigue
 *      siendo Moderado (tienen una sola).
 *      Los valores altos de intensidad no generan observación automática, y
 *      las luces auxiliares quedan manuales (muchos vehículos no tienen, y
 *      también darían 0).
 *    - Las mediciones que no vienen en el .txt (casillero vacío) no generan
 *      observación.
 * =============================================================================
 */
import { autoArray } from '../dataArrays/carDataBase';
import { motoArray } from '../dataArrays/motoDataBase';
import {
	evaluarCO,
	evaluarHC,
	evaluarHCMoto,
	evaluarMayorOIgual,
	evaluarMenorOIgual,
	evaluarRango,
	evaluarRuido,
	luzQuemada,
} from './evaluaciones';
import { nuevaObservacion } from './observaciones';

/** Fuerza mínima por eje (suma de las dos ruedas), en kN. */
export const FUERZA_MINIMA_KN = 1;

/**
 * Todas las frases que la app puede agregar sola, por tipo de lista
 * (grupo → sección → descripciones). Las usa:
 *   - el filtro "Filtrar frases automáticas" del panel de selección de
 *     defectos (DefectList.jsx), para no ofrecerlas a mano;
 *   - las reglas de este archivo, como control: si una regla usa una frase
 *     que no está acá, da error (y los tests lo detectan).
 *
 * Si se agrega una regla nueva, sumar su frase acá.
 */
export const FRASES_AUTOMATICAS = {
	auto: {
		direccion: { alineacion: ['trenDelDesalin', 'trenTraDesalin'] },
		suspension: {
			amortiguadores: [
				'ambosEjeDel', 'ambosEjeTra',
				'bajoRendAmortDelIzq', 'bajoRendAmortDelDer', 'bajoRendAmortTraIzq', 'bajoRendAmortTraDer',
			],
		},
		freno: {
			rendDeFrenado: ['bajRendDel', 'bajRendTra', 'bajRendFrm'],
			difDeFrenado: ['difFreDelRi', 'difFreDelRd', 'difFreTraRi', 'difFreTraRd', 'difFreFdmRi', 'difFreFdmRd'],
			fuerzaFren: ['freDelFueMin', 'freTraFueMin', 'freManFueMin'],
			ovalAlab: ['ovalAlabDelIzq', 'ovalAlabDelDer', 'ovalAlabTraIzq', 'ovalAlabTraDer'],
			resistRod: ['resistRodDelIzq', 'resistRodDelDer', 'resistRodTraIzq', 'resistRodTraDer'],
		},
		luces: {
			luzBaja: ['luzBajIzq', 'luzBajDer', 'ningunaBaja'],
			luzAlta: ['luzAltDelIzq', 'luzAltDelDer', 'ningunaAlta'],
			alinFaros: ['faroIzqVert', 'faroDerVert', 'faroIzqHor', 'faroDerHor'],
		},
		emisiones: {
			gases: ['altoNivO2', 'altoNivHco', 'altoNivOpa'],
			ruido: ['altoNivConSon'],
		},
	},
	moto: {
		suspension: { amortiguadores: ['bajoRendAmortDel', 'bajoRendAmortTra'] },
		frenos: {
			rendDeFrenado: ['bajoRendFrenadoDel', 'bajoRendFrenadoTra'],
			resistRod: ['resistRodDel', 'resistRodTra'],
			ovalAlab: ['ovalAlabDel', 'ovalAlabTra'],
		},
		luces: {
			luzBaja: ['luzBaj'],
			luzAlta: ['luzAltDel'],
			alinFaros: ['faroVert', 'faroHor'],
		},
		emisiones: {
			gases: ['gasCO', 'gasHC'],
			ruido: ['ruidoAlto'],
		},
	},
};

/**
 * ¿Esta frase la agrega la app sola?
 *
 * @param {string} tipo Tipo de vehículo ('Moto' usa la lista de motos).
 * @param {string} grupo value del grupo.
 * @param {string} seccion value de la sección.
 * @param {string} descripcion value de la descripción.
 * @returns {boolean}
 */
export function esFraseAutomatica(tipo, grupo, seccion, descripcion) {
	const frases = FRASES_AUTOMATICAS[tipo === 'Moto' ? 'moto' : 'auto'];
	return (frases[grupo]?.[seccion] ?? []).includes(descripcion);
}

/** Letra de la calificación → severidad de la observación. */
const SEVERIDAD_DE_LETRA = { L: 'Leve', M: 'Moderado', G: 'Grave' };

/** Para quedarse con la severidad más alta: G > M > L. */
const PESO_DE_LETRA = { A: 0, L: 1, M: 2, G: 3 };

/** true si el .txt trae un número para esa medición (no vacío). */
const medido = (valor) => typeof valor === 'number' && !isNaN(valor);

/**
 * Arma una observación automática con una frase de la lista de defectos.
 *
 * @param {object} base autoArray o motoArray.
 * @param {string} grupo value del grupo (por ejemplo 'freno').
 * @param {string} seccion value de la sección (por ejemplo 'difDeFrenado').
 * @param {string} descripcion value de la descripción (por ejemplo 'difFreDelRd').
 * @param {string} severidad 'Leve', 'Moderado' o 'Grave'.
 * @returns {object} La observación (ver observaciones.js).
 */
function observacion(base, grupo, seccion, descripcion, severidad) {
	const g = base.grupo.find((x) => x.value === grupo);
	const s = (base.seccion[grupo] || []).find((x) => x.value === seccion);
	const d = ((base.descripciones[grupo] || {})[seccion] || []).find((x) => x.value === descripcion);
	if (!g || !s || !d) {
		throw new Error(`No existe la frase ${grupo} > ${seccion} > ${descripcion}`);
	}
	if (!esFraseAutomatica(base === motoArray ? 'Moto' : 'Auto', grupo, seccion, descripcion)) {
		throw new Error(`Falta ${grupo} > ${seccion} > ${descripcion} en FRASES_AUTOMATICAS`);
	}
	return nuevaObservacion({
		grupo: g.label,
		seccion: s.label,
		desc: d.label,
		severidad,
		automatica: true,
	});
}

/**
 * Crea una lista de reglas para una base de defectos. Cada regla recibe una
 * calificación (de evaluaciones.js) y, si no es Apto, devuelve la observación.
 */
function crearReglas(base) {
	return {
		/** Observación si la calificación es L, M o G; null si es Apto. */
		siFalla(calificacion, grupo, seccion, descripcion) {
			if (!calificacion || calificacion.letra === 'A') return null;
			return observacion(base, grupo, seccion, descripcion, SEVERIDAD_DE_LETRA[calificacion.letra]);
		},
		/** Observación con una severidad fija. */
		siempre(grupo, seccion, descripcion, severidad) {
			return observacion(base, grupo, seccion, descripcion, severidad);
		},
	};
}

/**
 * Genera las observaciones automáticas a partir de los datos del .txt.
 *
 * @param {object|null} datos Los datos del .txt (ver fileAnalizer.js).
 * @param {object} opciones Lo elegido en el formulario (Main.jsx).
 * @param {string} opciones.tipo 'Auto', 'Camioneta', 'Camion', 'Minibus' o 'Moto'.
 * @param {string} [opciones.truckSize] 'smallTruck' o 'bigTruck'.
 * @param {string} [opciones.transmisionType] '4x2' o '4x4'.
 * @param {string} [opciones.engineType] '4T' o '2T' (motos).
 * @returns {object[]} Las observaciones, todas con `automatica: true`.
 */
export function generarObservacionesAutomaticas(datos, opciones) {
	if (!datos) return [];
	const lista = opciones.tipo === 'Moto' ? reglasMoto(datos, opciones) : reglasAuto(datos, opciones);
	return lista.filter(Boolean);
}

// =============================================================================
//  Autos, camionetas, camiones y colectivos
// =============================================================================

function reglasAuto(datos, { tipo, truckSize, transmisionType }) {
	const { siFalla, siempre } = crearReglas(autoArray);
	const año = datos.header.añoDeFabricacion;
	const del = datos.frenosEje_1;
	const tra = datos.frenosEje_2;
	const mano = datos.frenoDeManoEje_2;
	const lux = datos.luxometro;
	const obs = [];

	// Evalúa solo si hay dato: así un casillero vacío no genera nada.
	const si = (valor, evaluar) => (medido(valor) ? evaluar(valor) : null);

	// --- Alineación ---------------------------------------------------------
	obs.push(siFalla(si(datos.alineacion.resultadoAlineacionEje1, (v) => evaluarRango(v, 'alin')), 'direccion', 'alineacion', 'trenDelDesalin'));
	obs.push(siFalla(si(datos.alineacion.resultadoAlineacionEje2, (v) => evaluarRango(v, 'alin')), 'direccion', 'alineacion', 'trenTraDesalin'));

	// --- Suspensión: si fallan las dos ruedas de un eje, una sola frase ------
	const suspension = (izq, der, ambas, frasIzq, frasDer) => {
		const evIzq = si(izq, (v) => evaluarRango(v, 'susp', truckSize));
		const evDer = si(der, (v) => evaluarRango(v, 'susp', truckSize));
		const fallaIzq = evIzq && evIzq.letra !== 'A';
		const fallaDer = evDer && evDer.letra !== 'A';
		if (fallaIzq && fallaDer) {
			const peor = PESO_DE_LETRA[evIzq.letra] >= PESO_DE_LETRA[evDer.letra] ? evIzq : evDer;
			return [siFalla(peor, 'suspension', 'amortiguadores', ambas)];
		}
		return [
			siFalla(evIzq, 'suspension', 'amortiguadores', frasIzq),
			siFalla(evDer, 'suspension', 'amortiguadores', frasDer),
		];
	};
	const sDel = datos.suspensionEjeDelantero;
	const sTra = datos.suspensionEjeTrasero;
	obs.push(...suspension(sDel.rendimientoDelanteroIzquierdo, sDel.rendimientoDelanteroDerecho, 'ambosEjeDel', 'bajoRendAmortDelIzq', 'bajoRendAmortDelDer'));
	obs.push(...suspension(sTra.rendimientoTraseroIzquierdo, sTra.rendimientoTraseroDerecho, 'ambosEjeTra', 'bajoRendAmortTraIzq', 'bajoRendAmortTraDer'));

	// --- Rendimiento de frenado ---------------------------------------------
	obs.push(siFalla(si(del.rendimientoDelEje, (v) => evaluarMenorOIgual(v, 'brakePerf')), 'freno', 'rendDeFrenado', 'bajRendDel'));
	obs.push(siFalla(si(tra.rendimientoDelEje, (v) => evaluarMenorOIgual(v, 'brakePerf')), 'freno', 'rendDeFrenado', 'bajRendTra'));
	obs.push(siFalla(si(mano.rendimientoDelEje, (v) => evaluarMenorOIgual(v, 'handBrakePerf')), 'freno', 'rendDeFrenado', 'bajRendFrm'));

	// --- Diferencia de frenado: qué rueda frena menos -----------------------
	const diferencia = (eje, limite, frasIzq, frasDer) => {
		const izq = eje.fuerzaDeFrenadoLadoIzquierdo;
		const der = eje.fuerzaDeFrenadoLadoDerecho;
		if (!medido(izq) || !medido(der) || izq === der) return null;
		const calificacion = si(eje.diferenciaFzaFrenadoLadoALado, (v) => evaluarMayorOIgual(v, limite));
		return siFalla(calificacion, 'freno', 'difDeFrenado', izq < der ? frasIzq : frasDer);
	};
	obs.push(diferencia(del, 'brakeDifDel', 'difFreDelRi', 'difFreDelRd'));
	obs.push(diferencia(tra, 'brakeDifTra', 'difFreTraRi', 'difFreTraRd'));
	obs.push(diferencia(mano, 'brakeDifTra', 'difFreFdmRi', 'difFreFdmRd'));

	// --- Fuerza mínima por eje (suma de las dos ruedas < 1 kN) --------------
	const fuerzaMinima = (eje, frase) => {
		const izq = eje.fuerzaDeFrenadoLadoIzquierdo;
		const der = eje.fuerzaDeFrenadoLadoDerecho;
		if (!medido(izq) || !medido(der)) return null;
		return izq + der < FUERZA_MINIMA_KN ? siempre('freno', 'fuerzaFren', frase, 'Moderado') : null;
	};
	obs.push(fuerzaMinima(del, 'freDelFueMin'));
	obs.push(fuerzaMinima(tra, 'freTraFueMin'));
	obs.push(fuerzaMinima(mano, 'freManFueMin'));

	// --- Ovalidad y resistencia a la rodadura, por rueda --------------------
	// Las 4 ruedas en orden: delantera izq, delantera der, trasera izq, trasera der.
	const porRueda = (limite, seccion, frases, excepciones) =>
		[
			[del, 'Izquierdo'],
			[del, 'Derecho'],
			[tra, 'Izquierdo'],
			[tra, 'Derecho'],
		].map(([eje, lado], i) =>
			siFalla(
				si(valorDe(eje, limite, lado), (v) => evaluarMayorOIgual(v, limite, excepciones)),
				'freno',
				seccion,
				frases[i]
			)
		);
	obs.push(...porRueda('brakeOval', 'ovalAlab', ['ovalAlabDelIzq', 'ovalAlabDelDer', 'ovalAlabTraIzq', 'ovalAlabTraDer']));
	obs.push(...porRueda('brakeResist', 'resistRod', ['resistRodDelIzq', 'resistRodDelDer', 'resistRodTraIzq', 'resistRodTraDer'], { truckSize, transmisionType }));

	// --- Luces baja y alta quemadas (vacío o 0), de a pares ------------------
	//  Una sola quemada: Leve. Las dos: Moderado, con la frase "Ninguna…".
	//  Misma regla que pinta el informe (evaluarParDeLuces).
	const quemadas = (izq, der, seccion, frasIzq, frasDer, ninguna) => {
		const quemadaIzq = luzQuemada(izq);
		const quemadaDer = luzQuemada(der);
		if (quemadaIzq && quemadaDer) return [siempre('luces', seccion, ninguna, 'Moderado')];
		return [
			quemadaIzq ? siempre('luces', seccion, frasIzq, 'Leve') : null,
			quemadaDer ? siempre('luces', seccion, frasDer, 'Leve') : null,
		];
	};
	obs.push(...quemadas(lux.intensidadBajaIzquierda, lux.intensidadBajaDerecha, 'luzBaja', 'luzBajIzq', 'luzBajDer', 'ningunaBaja'));
	obs.push(...quemadas(lux.intensidadAltaIzquierda, lux.intensidadAltaDerecha, 'luzAlta', 'luzAltDelIzq', 'luzAltDelDer', 'ningunaAlta'));

	// --- Alineación de faros -------------------------------------------------
	obs.push(siFalla(si(lux.alineacionFaroIzquierdoVertical, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroIzqVert'));
	obs.push(siFalla(si(lux.alineacionFaroDerechoVertical, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroDerVert'));
	obs.push(siFalla(si(lux.alineacionFaroIzquierdoHorizontal, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroIzqHor'));
	obs.push(siFalla(si(lux.alineacionFaroDerechoHorizontal, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroDerHor'));

	// --- Gases: naftero (CO y HC) o diésel (opacidad) -----------------------
	const gases = datos.analizadorDeGases;
	if (datos.opacimetro.resultadoMedicionOpacidad === -1) {
		obs.push(siFalla(si(gases.resultadoMonoxidoDeCarbonoEnAltaRPM, (v) => evaluarCO(v, año)), 'emisiones', 'gases', 'altoNivO2'));
		obs.push(siFalla(si(gases.resultadoHidroCarburosHCAltaRPM, (v) => evaluarHC(v, año)), 'emisiones', 'gases', 'altoNivHco'));
	} else {
		obs.push(siFalla(si(datos.opacimetro.resultadoMedicionOpacidad, (v) => evaluarMayorOIgual(v, 'opacity')), 'emisiones', 'gases', 'altoNivOpa'));
	}

	// --- Ruido ----------------------------------------------------------------
	obs.push(siFalla(si(datos.sonometro.valorDeMedicion, (v) => evaluarRuido(v, año, tipo)), 'emisiones', 'ruido', 'altoNivConSon'));

	return obs;
}

/**
 * Lee la ovalidad o la resistencia a la rodadura de una rueda.
 *
 * @param {object} eje Datos de frenado del eje.
 * @param {'brakeOval'|'brakeResist'} limite Qué medición.
 * @param {'Izquierdo'|'Derecho'} lado
 */
function valorDe(eje, limite, lado) {
	return limite === 'brakeOval' ? eje['ovalidadLado' + lado] : eje['resistenciaALaRodaduraLado' + lado];
}

// =============================================================================
//  Motos (un solo lado por eje: se usan los valores del lado izquierdo)
// =============================================================================

function reglasMoto(datos, { tipo, engineType }) {
	const { siFalla, siempre } = crearReglas(motoArray);
	const año = datos.header.añoDeFabricacion;
	const del = datos.frenosEje_1;
	const tra = datos.frenosEje_2;
	const lux = datos.luxometro;
	const si = (valor, evaluar) => (medido(valor) ? evaluar(valor) : null);

	return [
		// Suspensión
		siFalla(si(datos.suspensionEjeDelantero.rendimientoDelanteroIzquierdo, (v) => evaluarRango(v, 'susp')), 'suspension', 'amortiguadores', 'bajoRendAmortDel'),
		siFalla(si(datos.suspensionEjeTrasero.rendimientoTraseroIzquierdo, (v) => evaluarRango(v, 'susp')), 'suspension', 'amortiguadores', 'bajoRendAmortTra'),
		// Rendimiento de frenado
		siFalla(si(del.rendimientoDelEje, (v) => evaluarMenorOIgual(v, 'brakePerf')), 'frenos', 'rendDeFrenado', 'bajoRendFrenadoDel'),
		siFalla(si(tra.rendimientoDelEje, (v) => evaluarMenorOIgual(v, 'brakePerf')), 'frenos', 'rendDeFrenado', 'bajoRendFrenadoTra'),
		// Resistencia a la rodadura y ovalidad
		siFalla(si(del.resistenciaALaRodaduraLadoIzquierdo, (v) => evaluarMayorOIgual(v, 'brakeResist')), 'frenos', 'resistRod', 'resistRodDel'),
		siFalla(si(tra.resistenciaALaRodaduraLadoIzquierdo, (v) => evaluarMayorOIgual(v, 'brakeResist')), 'frenos', 'resistRod', 'resistRodTra'),
		siFalla(si(del.ovalidadLadoIzquierdo, (v) => evaluarMayorOIgual(v, 'brakeOval')), 'frenos', 'ovalAlab', 'ovalAlabDel'),
		siFalla(si(tra.ovalidadLadoIzquierdo, (v) => evaluarMayorOIgual(v, 'brakeOval')), 'frenos', 'ovalAlab', 'ovalAlabTra'),
		// Luces baja y alta quemadas (intensidad 0): Moderado
		lux.intensidadBajaIzquierda === 0 ? siempre('luces', 'luzBaja', 'luzBaj', 'Moderado') : null,
		lux.intensidadAltaIzquierda === 0 ? siempre('luces', 'luzAlta', 'luzAltDel', 'Moderado') : null,
		// Alineación del faro
		siFalla(si(lux.alineacionFaroIzquierdoVertical, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroVert'),
		siFalla(si(lux.alineacionFaroIzquierdoHorizontal, (v) => evaluarMayorOIgual(v, 'luxAng')), 'luces', 'alinFaros', 'faroHor'),
		// Gases y ruido
		siFalla(si(datos.analizadorDeGases.resultadoMonoxidoDeCarbonoEnAltaRPM, (v) => evaluarMayorOIgual(v, 'CO-Moto')), 'emisiones', 'gases', 'gasCO'),
		siFalla(si(datos.analizadorDeGases.resultadoHidroCarburosHCAltaRPM, (v) => evaluarHCMoto(v, engineType)), 'emisiones', 'gases', 'gasHC'),
		siFalla(si(datos.sonometro.valorDeMedicion, (v) => evaluarRuido(v, año, tipo)), 'emisiones', 'ruido', 'ruidoAlto'),
	];
}
