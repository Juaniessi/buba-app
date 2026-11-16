/*
 * =============================================================================
 *  WeigthSum.jsx — Resumen rápido del .txt (no se imprime)
 * =============================================================================
 *
 *  Muestra arriba de todo, apenas se carga un .txt, unas tablitas con los
 *  datos que el operador mira primero: año de fabricación, alineación, gases,
 *  combustible, suspensión, frenos y peso por eje.
 *
 *  Está dentro del formulario con id "no-print", así que no sale en el
 *  informe impreso. Sin .txt cargado no muestra nada.
 * =============================================================================
 */
import React from 'react';

/** A partir de cuántos años de antigüedad el año de fabricación se pinta en rojo. */
const AÑOS_HASTA_ANTIGUO = 10;

/**
 * Pasa un peso del .txt a kilos enteros.
 *
 * @param {number|''} peso
 * @returns {number}
 */
function kilos(peso) {
	return Math.round(Number(peso));
}

/**
 * @param {{tipo: string, txtRender: object|null}} props
 *   txtRender son los datos del .txt (ver fileAnalizer.js), o null.
 */
function WeightSum({ txtRender }) {
	if (txtRender === null) return <main>{''}</main>;

	const delantero = txtRender.suspensionEjeDelantero;
	const trasero = txtRender.suspensionEjeTrasero;

	// Peso por eje y total, sumando lo que pesó cada rueda en la balanza.
	const pesoDelantero = kilos(delantero.pesoLadoIzquierdo) + kilos(delantero.pesoLadoDerecho);
	const pesoTrasero = kilos(trasero.pesoLadoIzquierdo) + kilos(trasero.pesoLadoDerecho);
	const pesoTotal = pesoDelantero + pesoTrasero;

	const antiguedad = new Date().getFullYear() - txtRender.header.añoDeFabricacion;

	return (
		<main>
			<div className="weightsTable">
				{/* Año, alineación, gases y combustible */}
				<table className="subgroup">
					<tbody>
						<tr>
							<td className="report-table table-cat">Año de fab</td>
							{/* En rojo ("peligro") si tiene más de 10 años */}
							<td
								className={
									antiguedad <= AÑOS_HASTA_ANTIGUO
										? 'report-table table-info'
										: 'report-table peligro'
								}>
								{txtRender.header.añoDeFabricacion}
							</td>
						</tr>
						<tr>
							<td className="report-table table-cat">Alineción (m/km)</td>
							<td className="report-table table-info">
								{txtRender.alineacion.resultadoAlineacionEje1}
							</td>
						</tr>
						<tr>
							<td className="report-table table-cat">Gases (%)</td>
							<td className="report-table table-info">
								{/* Opacidad -1 = no se midió (motor naftero): se muestra el CO */}
								{txtRender.opacimetro.resultadoMedicionOpacidad === -1 ? (
									<div>{txtRender.analizadorDeGases.resultadoMonoxidoDeCarbonoEnAltaRPM}</div>
								) : (
									<div>{txtRender.opacimetro.resultadoMedicionOpacidad}</div>
								)}
							</td>
						</tr>
						<tr>
							<td className="report-table table-cat">Combustible</td>
							<td className="report-table table-info">{txtRender.header.combustible}</td>
						</tr>
					</tbody>
				</table>

				{/* Rendimiento de la suspensión de cada rueda */}
				<table className="subgroup">
					<tbody>
						<tr>
							<td className="report-table table-cat" rowSpan={2}>
								Suspensión (%)
							</td>
							<td className="report-table table-name">D Izq</td>
							<td className="report-table table-name">D Der</td>
							<td className="report-table table-name">T Izq</td>
							<td className="report-table table-name">T Der</td>
						</tr>
						<tr>
							<td className="report-table table-info">{delantero.rendimientoDelanteroIzquierdo}</td>
							<td className="report-table table-info">{delantero.rendimientoDelanteroDerecho}</td>
							<td className="report-table table-info">{trasero.rendimientoTraseroIzquierdo}</td>
							<td className="report-table table-info">{trasero.rendimientoTraseroDerecho}</td>
						</tr>
					</tbody>
				</table>

				{/* Rendimiento de frenos por eje y diferencia entre lados */}
				<table className="subgroup">
					<tbody>
						<tr>
							<td className="report-table table-cat" rowSpan={2}>
								Frenos (%)
							</td>
							<td className="report-table table-name">Ren Del</td>
							<td className="report-table table-name">Ren Tra</td>
							<td className="report-table table-name">Dif Del</td>
							<td className="report-table table-name">Dif Tra</td>
						</tr>
						<tr>
							<td className="report-table table-info">{txtRender.frenosEje_1.rendimientoDelEje}</td>
							<td className="report-table table-info">{txtRender.frenosEje_2.rendimientoDelEje}</td>
							<td className="report-table table-info">
								{txtRender.frenosEje_1.diferenciaFzaFrenadoLadoALado}
							</td>
							<td className="report-table table-info">
								{txtRender.frenosEje_2.diferenciaFzaFrenadoLadoALado}
							</td>
						</tr>
					</tbody>
				</table>

				{/* Peso total y por eje */}
				<table className="subgroup">
					<tbody>
						<tr>
							<td className="report-table table-cat" rowSpan={2}>
								Peso (kg)
							</td>
							<td className="report-table table-name">Total</td>
							<td className="report-table table-name">Eje del</td>
							<td className="report-table table-name">Eje tra</td>
						</tr>
						<tr>
							<td className="report-table table-info">{pesoTotal}</td>
							<td className="report-table table-info">{pesoDelantero}</td>
							<td className="report-table table-info">{pesoTrasero}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</main>
	);
}

export default WeightSum;
