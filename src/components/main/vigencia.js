/*
 * =============================================================================
 *  vigencia.js — Vigencia automática de la RTO particular
 * =============================================================================
 *
 *  Lo que dice la ley para la RTO particular, según la antigüedad del
 *  vehículo "en la calle" (desde que se patentó):
 *
 *    - Hasta 3 años: en general no la realiza (aunque algunos, como las
 *      camionetas de trabajo, la hacen desde el primer año). La app avisa y
 *      la vigencia se elige a mano.
 *    - Más de 3 y hasta 7 años: 2 años de vigencia.
 *    - Más de 7 años: 1 año de vigencia.
 *
 *  La fecha de patentamiento sale de la patente (ver dataArrays/patentes.js).
 *  Como la tabla da fechas aproximadas, la patente se ubica en un rango
 *  ("entre enero de 2011 y enero de 2012"). Si todo el rango cae del mismo
 *  lado de los límites, la vigencia se calcula. Si no (o si la patente no
 *  está en la tabla), no se puede calcular y hay que elegirla a mano.
 *
 *  Pendiente: en una segunda revisión, la vigencia se cuenta desde la fecha
 *  de la primera. Falta un .txt de segunda revisión para saber de dónde sale
 *  esa fecha.
 * =============================================================================
 */
import { fechaDePatentamiento } from '../dataArrays/patentes';

/** Límites de antigüedad, en años. */
export const HASTA_SIN_RTO = 3;
export const HASTA_DOS_AÑOS = 7;

const MESES = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];

/** "ene. 2022" */
const mesYAño = (fecha) => `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;

/** Años (con decimales) entre dos fechas. */
const añosEntre = (desde, hasta) => (hasta - desde) / (365.25 * 24 * 60 * 60 * 1000);

/**
 * @typedef {object} ResultadoVigencia
 * @property {'automatica'|'menosDeTres'|'sinDatos'|'plataforma'} estado
 *   - automatica: se pudo calcular (ver `vigencia`).
 *   - menosDeTres: tiene hasta 3 años en la calle; se elige a mano.
 *   - sinDatos: no se puede calcular; se elige a mano.
 *   - plataforma: vehículo de plataforma; se elige a mano (ver vigenciaPlataforma).
 * @property {'2a'|'1a'|'3m'|'2m'|null} vigencia El value de la vigencia (radioBtnDB.js),
 *   o null si no se pudo calcular.
 * @property {string} explicacion El texto que se muestra debajo de la vigencia.
 */

/**
 * Calcula la vigencia de la RTO particular a partir de la patente.
 *
 * @param {string} patente La patente del .txt.
 * @param {Date} fechaRevision La fecha de la revisión (ver fechaDeInicio).
 * @returns {ResultadoVigencia}
 */
export function calcularVigenciaParticular(patente, fechaRevision) {
	const rango = fechaDePatentamiento(patente, fechaRevision);
	if (!rango) {
		return {
			estado: 'sinDatos',
			vigencia: null,
			explicacion:
				`No se puede calcular la vigencia automáticamente: la patente ${patente || '(vacía)'} ` +
				'no está en la tabla de patentes. Elegila a mano.',
		};
	}

	// Antigüedad mínima y máxima posible, según el rango de la patente.
	const minima = añosEntre(rango.hasta, fechaRevision);
	const maxima = añosEntre(rango.desde, fechaRevision);
	const cuando = `patentada entre ${mesYAño(rango.desde)} y ${mesYAño(rango.hasta)}`;

	if (maxima <= HASTA_SIN_RTO) {
		return {
			estado: 'menosDeTres',
			vigencia: null,
			explicacion:
				`Este vehículo tiene menos de ${HASTA_SIN_RTO} años en la calle (patente ${patente}, ${cuando}). ` +
				'Elegí la vigencia a mano.',
		};
	}
	if (minima > HASTA_SIN_RTO && maxima <= HASTA_DOS_AÑOS) {
		return {
			estado: 'automatica',
			vigencia: '2a',
			explicacion: `Patente ${patente} (${cuando}): entre ${HASTA_SIN_RTO} y ${HASTA_DOS_AÑOS} años de antigüedad → 2 años.`,
		};
	}
	if (minima > HASTA_DOS_AÑOS) {
		return {
			estado: 'automatica',
			vigencia: '1a',
			explicacion: `Patente ${patente} (${cuando}): más de ${HASTA_DOS_AÑOS} años de antigüedad → 1 año.`,
		};
	}

	// El rango cruza uno de los límites: no se puede saber de qué lado está.
	const limite = minima <= HASTA_SIN_RTO ? HASTA_SIN_RTO : HASTA_DOS_AÑOS;
	return {
		estado: 'sinDatos',
		vigencia: null,
		explicacion:
			`No se puede calcular la vigencia automáticamente: con la patente ${patente} (${cuando}) ` +
			`no se sabe si tiene más o menos de ${limite} años. Elegila a mano.`,
	};
}

/** Transporte de pasajeros: hasta esta antigüedad (en años), 3 meses; después, 2. */
export const HASTA_TRES_MESES = 10;

/**
 * Calcula la vigencia de la RTO de transporte de pasajeros a partir de la
 * patente: hasta 10 años de antigüedad, 3 meses; más de 10 años, 2 meses.
 *
 * Igual que en la particular, si la patente no está en la tabla o su rango
 * de fechas cruza los 10 años, no se puede calcular y se elige a mano.
 *
 * @param {string} patente La patente del .txt.
 * @param {Date} fechaRevision La fecha desde la que se cuenta la vigencia.
 * @returns {ResultadoVigencia} Con vigencia '3m', '2m' o null.
 */
export function calcularVigenciaTransporte(patente, fechaRevision) {
	const rango = fechaDePatentamiento(patente, fechaRevision);
	if (!rango) {
		return {
			estado: 'sinDatos',
			vigencia: null,
			explicacion:
				`No se puede calcular la vigencia automáticamente: la patente ${patente || '(vacía)'} ` +
				'no está en la tabla de patentes. Elegila a mano.',
		};
	}

	const minima = añosEntre(rango.hasta, fechaRevision);
	const maxima = añosEntre(rango.desde, fechaRevision);
	const cuando = `patentada entre ${mesYAño(rango.desde)} y ${mesYAño(rango.hasta)}`;

	if (maxima <= HASTA_TRES_MESES) {
		return {
			estado: 'automatica',
			vigencia: '3m',
			explicacion: `Patente ${patente} (${cuando}): hasta ${HASTA_TRES_MESES} años de antigüedad → 3 meses.`,
		};
	}
	if (minima > HASTA_TRES_MESES) {
		return {
			estado: 'automatica',
			vigencia: '2m',
			explicacion: `Patente ${patente} (${cuando}): más de ${HASTA_TRES_MESES} años de antigüedad → 2 meses.`,
		};
	}
	return {
		estado: 'sinDatos',
		vigencia: null,
		explicacion:
			`No se puede calcular la vigencia automáticamente: con la patente ${patente} (${cuando}) ` +
			`no se sabe si tiene más o menos de ${HASTA_TRES_MESES} años. Elegila a mano.`,
	};
}

/**
 * RTO particular de un vehículo de plataforma (Uber, Cabify, Maxim): 1 año
 * si es 0 km; 6 meses si no es 0 km (en su primera revisión como
 * plataforma). Desde el .txt no se puede saber si es 0 km, así que siempre
 * se elige a mano.
 *
 * @returns {ResultadoVigencia}
 */
export function vigenciaPlataforma() {
	return {
		estado: 'plataforma',
		vigencia: null,
		explicacion:
			'Plataforma (Uber, Cabify, Maxim): 1 año si el vehículo es 0 km; 6 meses si no es 0 km. ' +
			'Elegí la vigencia a mano.',
	};
}
