/*
 * =============================================================================
 *  MajorMarker.jsx — Asterisco sobre la rueda que frena menos
 * =============================================================================
 *
 *  En el informe se dibuja un "*" sobre la rueda que frena menos de cada eje
 *  (freno delantero, trasero y de mano), pero solo cuando la diferencia de
 *  frenado entre los dos lados es grande:
 *
 *    - Eje delantero: diferencia de 10% o más.
 *    - Eje trasero y freno de mano: diferencia de 12% o más.
 *
 *  No se muestra en motos ni cuando todavía no se cargó un .txt.
 *  La posición de cada asterisco sobre el dibujo está en
 *  styles/majorMarkerStyle.scss.
 * =============================================================================
 */
import React from 'react';
import '../../styles/majorMarkerStyle.scss';

/** Diferencia mínima (%) entre lados para marcar el eje. */
const DIFERENCIA_MINIMA = {
	delantero: 10,
	trasero: 12,
	deMano: 12,
};

/**
 * Decide si se ve el asterisco de una rueda.
 *
 * @param {object|null} txtRender Los datos del .txt, o null.
 * @param {(datos: object) => object} eje Función que, dados los datos del
 *   .txt, devuelve los del eje (por ejemplo `d => d.frenosEje_1`). Es una
 *   función para no intentar leer el eje cuando todavía no hay .txt.
 * @param {number} diferenciaMinima Ver DIFERENCIA_MINIMA.
 * @param {'izquierdo'|'derecho'} lado La rueda del asterisco.
 * @returns {''|'hidden'|'visible'} La clase CSS: '' sin .txt.
 */
function claseAsterisco(txtRender, eje, diferenciaMinima, lado) {
	if (txtRender === null) return '';
	const datos = eje(txtRender);
	if (datos.diferenciaFzaFrenadoLadoALado < diferenciaMinima) return 'hidden';

	const izquierdo = datos.fuerzaDeFrenadoLadoIzquierdo;
	const derecho = datos.fuerzaDeFrenadoLadoDerecho;
	const frenaMenos = lado === 'izquierdo' ? izquierdo < derecho : izquierdo > derecho;
	return frenaMenos ? 'visible' : 'hidden';
}

/** Las 6 ruedas con asterisco posible: [qué eje, diferencia mínima, clases de posición]. */
const RUEDAS = [
	[(d) => d.frenosEje_1, DIFERENCIA_MINIMA.delantero, 'izquierdo', 'front-brake left-brake'],
	[(d) => d.frenosEje_1, DIFERENCIA_MINIMA.delantero, 'derecho', 'front-brake right-brake'],
	[(d) => d.frenosEje_2, DIFERENCIA_MINIMA.trasero, 'izquierdo', 'rear-brake left-brake'],
	[(d) => d.frenosEje_2, DIFERENCIA_MINIMA.trasero, 'derecho', 'rear-brake right-brake'],
	[(d) => d.frenoDeManoEje_2, DIFERENCIA_MINIMA.deMano, 'izquierdo', 'hand-brake left-brake'],
	[(d) => d.frenoDeManoEje_2, DIFERENCIA_MINIMA.deMano, 'derecho', 'hand-brake right-brake'],
];

/**
 * @param {{txtRender: object|null, tipo: string}} props
 */
function MajorMarker({ txtRender, tipo }) {
	const visible = txtRender !== null && tipo !== 'Moto';

	return (
		<main id="no-print4" className={visible ? 'visible' : 'hidden'}>
			{RUEDAS.map(([eje, diferenciaMinima, lado, posicion]) => (
				<div
					key={posicion}
					className={`marker ${claseAsterisco(txtRender, eje, diferenciaMinima, lado)} ${posicion}`}>
					*
				</div>
			))}
		</main>
	);
}

export default MajorMarker;
