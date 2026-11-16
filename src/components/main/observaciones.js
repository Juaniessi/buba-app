/*
 * =============================================================================
 *  observaciones.js — Cómo se arma y se modifica cada fila de la lista de defectos
 * =============================================================================
 *
 *  Cada observación (fila de la tabla de defectos del informe) es un objeto:
 *
 *    {
 *      grupo:      'Frenos',                 texto del grupo
 *      seccion:    'Diferencia de frenado',  texto de la sección
 *      desc:       'Eje delantero ...',      la descripción que sale impresa
 *      sev:        'Leve' | 'Moderado' | 'Grave' | ''   ('' = nota, sin severidad)
 *      Ord:        1 | 2 | 3 | 0             para ordenar: grave primero, notas al final
 *      automatica: true | false              true si la generó la app a partir del .txt
 *    }
 *
 *  `automatica` sirve para que el botón "Regenerar observaciones automáticas"
 *  borre y vuelva a calcular solo esas, sin tocar las que cargó la persona.
 *
 *  Son funciones "puras" (no tocan React ni la pantalla): reciben datos y
 *  devuelven datos nuevos. Ver tests/observaciones.test.js.
 * =============================================================================
 */
import { radioGeneratorArray } from '../dataArrays/radioBtnDB';

/** Las severidades posibles, con su orden (de dataArrays/radioBtnDB.js). */
export const SEVERIDADES = radioGeneratorArray.severity;

/**
 * Busca una severidad por su nombre.
 *
 * @param {string} valor 'Leve', 'Moderado' o 'Grave'.
 * @returns {{value: string, label: string, order: number, class: string}}
 */
function severidadPorValor(valor) {
	const severidad = SEVERIDADES.find((s) => s.value === valor);
	if (!severidad) throw new Error(`Severidad desconocida: "${valor}"`);
	return severidad;
}

/**
 * Arma una observación nueva.
 *
 * @param {object} datos
 * @param {string} datos.grupo Texto del grupo (por ejemplo 'Frenos').
 * @param {string} datos.seccion Texto de la sección.
 * @param {string} datos.desc La descripción que sale impresa.
 * @param {string} datos.severidad 'Leve', 'Moderado' o 'Grave'. Se ignora en
 *   las notas.
 * @param {boolean} [datos.esNota] true para "Notas adicionales": no llevan
 *   severidad y van al final de la lista.
 * @param {boolean} [datos.automatica] true si la genera la app (por defecto,
 *   false: la cargó una persona).
 * @returns {object} La observación.
 */
export function nuevaObservacion({ grupo, seccion, desc, severidad, esNota = false, automatica = false }) {
	return {
		grupo,
		seccion,
		desc,
		sev: esNota ? '' : severidad,
		Ord: esNota ? 0 : severidadPorValor(severidad).order,
		automatica,
	};
}

/**
 * Cambia la severidad de una observación de la lista.
 *
 * No modifica la lista recibida: devuelve una lista nueva, con la observación
 * reemplazada por una copia que tiene la severidad nueva. Así React se entera
 * del cambio y vuelve a dibujar (y a ordenar) la tabla.
 *
 * La observación se busca por identidad (el mismo objeto), igual que al
 * borrar, porque la tabla se muestra ordenada.
 *
 * @param {object[]} lista La lista de observaciones actual.
 * @param {object} observacion La observación a cambiar.
 * @param {string} severidad La severidad nueva: 'Leve', 'Moderado' o 'Grave'.
 * @returns {object[]} La lista nueva.
 */
export function cambiarSeveridad(lista, observacion, severidad) {
	const { order } = severidadPorValor(severidad);
	return lista.map((item) => (item === observacion ? { ...item, sev: severidad, Ord: order } : item));
}

/**
 * Resultado de la revisión que corresponde según los defectos cargados:
 *   - al menos uno Grave     → 'Rechazado'
 *   - al menos uno Moderado  → 'Condicional'
 *   - si no (solo leves o ninguno) → 'Apto'
 *
 * Lo usa Main.jsx cuando el resultado está en automático. "Solo informe"
 * nunca sale de acá: se elige a mano.
 *
 * @param {object[]} lista Las observaciones que van en el informe.
 * @returns {'Apto'|'Condicional'|'Rechazado'}
 */
export function resultadoSegunDefectos(lista) {
	if (lista.some((item) => item.sev === 'Grave')) return 'Rechazado';
	if (lista.some((item) => item.sev === 'Moderado')) return 'Condicional';
	return 'Apto';
}
