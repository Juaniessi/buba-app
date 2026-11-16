/*
 * =============================================================================
 *  patentes.js — Desde cuándo se entregó cada patente
 * =============================================================================
 *
 *  Sirve para saber, a partir de la patente, cuándo se patentó el vehículo
 *  (aproximadamente), y con eso su antigüedad "en la calle" para calcular la
 *  vigencia de la RTO particular (ver vigencia.js).
 *
 *  Hay dos formatos:
 *
 *    - Mercosur (desde abril de 2016): dos letras, tres números, dos letras.
 *      Ejemplo: AG 450 AA. Avanzan en orden: primero los números de 000 a 999
 *      y después las letras. Cada fila de PATENTES_MERCOSUR dice "a partir de
 *      esta patente, esta fecha".
 *
 *    - Anterior (1995 a 2016): tres letras y tres números. Ejemplo: KMX 653.
 *      Las dos primeras letras alcanzan para ubicar el año. Cada fila de
 *      PATENTES_ANTERIORES dice "a partir de estas dos letras, este mes".
 *
 *  ACTUALIZAR: cuando se conozcan fechas nuevas (por ejemplo, de patentes
 *  reales que pasen por la línea), agregar filas al final de
 *  PATENTES_MERCOSUR, siempre en orden. Una patente más nueva que la última
 *  fila se ubica entre esa fecha y el día de la revisión.
 *
 *  Fuente: tabla publicada en capacitacionesmascheroni.wordpress.com
 *  (noviembre de 2024). Son fechas aproximadas, por mes.
 * =============================================================================
 */

/** Patentes Mercosur: [primeras dos letras + tres números, año, mes (1-12)]. */
export const PATENTES_MERCOSUR = [
	['AA000', 2016, 4],
	['AA900', 2017, 1],
	['AB000', 2017, 2],
	['AC000', 2017, 11],
	['AC200', 2018, 1],
	['AD000', 2018, 7],
	['AD400', 2019, 1],
	['AE000', 2019, 10],
	['AE100', 2020, 1],
	['AE600', 2021, 1],
	['AF000', 2021, 8],
	['AF150', 2022, 1],
	['AF600', 2022, 10],
	['AF800', 2023, 1],
	['AG000', 2023, 5],
	['AG300', 2023, 10],
	['AG450', 2024, 1],
	['AG650', 2024, 6],
	['AG900', 2024, 10],
];

/** Patentes anteriores (tres letras): [primeras dos letras, año, mes (1-12)]. */
export const PATENTES_ANTERIORES = [
	['AA', 1995, 1],
	['AP', 1996, 1],
	['BD', 1997, 1],
	['BU', 1998, 1],
	['CM', 1999, 1],
	['DC', 2000, 1],
	['DO', 2001, 1],
	['DX', 2002, 1],
	['ED', 2003, 1],
	['EI', 2004, 1],
	['ET', 2005, 1],
	['FI', 2006, 1],
	['GB', 2007, 1],
	['GV', 2008, 1],
	['HT', 2009, 1],
	['IM', 2010, 1],
	['JN', 2011, 1],
	['KU', 2012, 1],
	['MB', 2013, 1],
	['NM', 2014, 1],
	['ON', 2015, 1],
	['PM', 2016, 1],
];

/**
 * Hasta qué letras llegó el formato anterior. Después de "PM" (enero de 2016)
 * se siguió hasta abril de 2016, cuando empezó el formato Mercosur.
 */
const ULTIMO_PREFIJO_ANTERIOR = 'PZ';

/** Cuándo empezó el formato Mercosur (fin del formato anterior). */
const INICIO_MERCOSUR = new Date(2016, 3, 1);

/**
 * Busca en una tabla ordenada entre qué fechas se entregó una patente.
 *
 * @param {Array} tabla Filas [clave, año, mes], en orden.
 * @param {string} clave La clave de la patente, comparable con las de la tabla.
 * @param {Date} hastaUltima Fecha tope para patentes posteriores a la última fila.
 * @returns {{desde: Date, hasta: Date}|null} null si es anterior a la primera fila.
 */
function buscarEnTabla(tabla, clave, hastaUltima) {
	let fila = -1;
	for (let i = 0; i < tabla.length; i++) {
		if (tabla[i][0] <= clave) fila = i;
	}
	if (fila < 0) return null;
	const [, año, mes] = tabla[fila];
	const siguiente = tabla[fila + 1];
	return {
		desde: new Date(año, mes - 1, 1),
		hasta: siguiente ? new Date(siguiente[1], siguiente[2] - 1, 1) : hastaUltima,
	};
}

/**
 * Calcula entre qué fechas se patentó un vehículo, según su patente.
 *
 * @param {string} patente La patente, con o sin espacios ni guiones
 *   ("AG 450 AA", "AG-450-AA", "KMX-653").
 * @param {Date} hoy Fecha de referencia para las patentes más nuevas que la
 *   última fila de la tabla (normalmente, el día de la revisión).
 * @returns {{desde: Date, hasta: Date, formato: string}|null}
 *   Las fechas entre las que se entregó la patente, o null si el formato no
 *   se reconoce o la patente no corresponde a la tabla (por ejemplo, letras
 *   que nunca se usaron).
 */
export function fechaDePatentamiento(patente, hoy) {
	const limpia = String(patente ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');

	// Mercosur: AA000AA
	let m = /^([A-Z]{2})(\d{3})([A-Z]{2})$/.exec(limpia);
	if (m) {
		const rango = buscarEnTabla(PATENTES_MERCOSUR, m[1] + m[2], hoy);
		return rango && { ...rango, formato: 'Mercosur' };
	}

	// Anterior: AAA000
	m = /^([A-Z]{2})[A-Z](\d{3})$/.exec(limpia);
	if (m) {
		if (m[1] > ULTIMO_PREFIJO_ANTERIOR) return null; // letras que nunca se usaron
		const rango = buscarEnTabla(PATENTES_ANTERIORES, m[1], INICIO_MERCOSUR);
		return rango && { ...rango, formato: 'anterior' };
	}

	return null;
}
