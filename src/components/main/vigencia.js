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
 * @property {'automatica'|'menosDeTres'|'sinDatos'} estado
 *   - automatica: se pudo calcular (ver `vigencia`).
 *   - menosDeTres: tiene hasta 3 años en la calle; se elige a mano.
 *   - sinDatos: no se puede calcular; se elige a mano.
 * @property {'2a'|'1a'|null} vigencia El value de la vigencia (radioBtnDB.js),
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
