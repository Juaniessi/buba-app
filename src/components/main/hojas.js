/*
 * =============================================================================
 *  hojas.js — Reparto de las observaciones en hojas
 * =============================================================================
 *
 *  La tabla de observaciones de la hoja 1 tiene un lugar fijo en el dibujo
 *  del informe: entre el dibujo del vehículo y la tabla de referencias. Si
 *  hay más observaciones de las que entran, las que sobran pasan a una hoja 2
 *  (y, si hiciera falta, a una 3, etc.).
 *
 *  Como una descripción larga ocupa dos renglones, no alcanza con contar
 *  filas: DefectList.jsx mide la altura real de cada fila en pantalla y esta
 *  función decide cuántas van en cada hoja. Las medidas son en píxeles CSS,
 *  que son los mismos en pantalla y al imprimir.
 * =============================================================================
 */

/**
 * Espacio para la tabla en la hoja 1, en píxeles (encabezado incluido): desde
 * donde empieza la tabla (.lista-final, top: 670px) hasta el cartel
 * "Hoja 1 de N" (.hoja-numero, top: 908px), con un pequeño margen. Si se
 * mueven esos elementos en los estilos, hay que actualizar este número.
 */
export const ESPACIO_HOJA_1 = 235;

/**
 * Espacio para la tabla en las hojas siguientes, en píxeles (encabezado
 * incluido): desde la tabla (.hoja-extra .lista-final, top: 70px) hasta las
 * referencias del pie (.hoja-extra .references, top: 905px), con margen.
 */
export const ESPACIO_OTRAS_HOJAS = 825;

/**
 * Reparte las filas de la tabla en hojas.
 *
 * Las filas van en orden: llena la hoja 1 y sigue en la 2, y así. Una fila
 * nunca se corta entre dos hojas. Si una hoja todavía no tiene ninguna fila,
 * la primera que le toca entra aunque no quepa (para no dejar hojas vacías).
 *
 * @param {number[]} alturas La altura de cada fila, en orden.
 * @param {object} medidas
 * @param {number} medidas.encabezado La altura del encabezado de la tabla
 *   (Grupo, Sección...), que se repite en cada hoja.
 * @param {number} [medidas.espacioPrimera] El espacio de la hoja 1.
 * @param {number} [medidas.espacioOtras] El espacio de las hojas siguientes.
 * @returns {number[]} Cuántas filas van en cada hoja. Siempre hay al menos
 *   una hoja (con 0 filas, si no hay observaciones).
 */
export function repartirEnHojas(
	alturas,
	{ encabezado, espacioPrimera = ESPACIO_HOJA_1, espacioOtras = ESPACIO_OTRAS_HOJAS }
) {
	const hojas = [];
	let filas = 0; // filas en la hoja que se está llenando
	let usado = encabezado; // espacio usado en esa hoja
	let espacio = espacioPrimera;

	for (const altura of alturas) {
		if (filas > 0 && usado + altura > espacio) {
			// No entra: se cierra esta hoja y se empieza otra.
			hojas.push(filas);
			filas = 0;
			usado = encabezado;
			espacio = espacioOtras;
		}
		filas++;
		usado += altura;
	}
	hojas.push(filas);
	return hojas;
}

/**
 * Corta la lista (ya ordenada) en hojas según cuántas filas van en cada una.
 *
 * Si la lista tiene más filas que las repartidas (por ejemplo, justo después
 * de agregar una observación, antes de volver a medir), las que sobran van a
 * la última hoja. Si tiene menos, las últimas hojas quedan vacías y se
 * descartan (siempre queda la hoja 1).
 *
 * @template T
 * @param {T[]} lista
 * @param {number[]} filasPorHoja El resultado de repartirEnHojas.
 * @returns {T[][]} Las filas de cada hoja.
 */
export function cortarEnHojas(lista, filasPorHoja) {
	const hojas = [];
	let desde = 0;
	filasPorHoja.forEach((cantidad, i) => {
		const ultima = i === filasPorHoja.length - 1;
		const hasta = ultima ? lista.length : desde + cantidad;
		hojas.push(lista.slice(desde, hasta));
		desde = hasta;
	});
	while (hojas.length > 1 && hojas[hojas.length - 1].length === 0) hojas.pop();
	return hojas;
}
