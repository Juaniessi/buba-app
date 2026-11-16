/*
 * =============================================================================
 *  Referencias.jsx — Tabla de referencias de severidades (pie del informe)
 * =============================================================================
 *
 *  Explica qué significa cada severidad (Leve, Moderado, Grave). Va al pie de
 *  la hoja 1 (Report.jsx) y se repite al pie de cada hoja extra de
 *  observaciones (DefectList.jsx). La posición la da la clase "references"
 *  en styles/informeStyle.scss.
 * =============================================================================
 */
import React from 'react';

function Referencias() {
	return (
		<table className="references print">
			<thead>
				<tr className="reference-headers"></tr>
			</thead>
			<tbody>
				<tr>
					<td className="def-name minor">Leve</td>
					<td className="def-col">
						Son defectos que no exigen una nueva inspección, pero que
						deberán subsanarse antes de la siguiente revisión.
					</td>
				</tr>
				<tr>
					<td className="def-name orange">Moderado</td>
					<td className="def-col">
						Exigen una nueva inspección sin cargo dentro de los sesenta (60)
						días corridos a partir de la verificación. Pasando el tiempo
						estipulado de “circulación originaria”, repetirá el pago
						original.
						<br />
						<b>
							(*) Si el vencimiento coincide con domingo o feriado, el mismo
							se traslada al día habil inmediato anterior.
						</b>
					</td>
				</tr>
				<tr>
					<td className="def-name black">
						<b>Grave</b>
					</td>
					<td className="def-col">
						Exigen una nueva inspección atento a la gravedad que registra la
						unidad. Repetirá el pago original. Esta calificación no permite
						la circulación del vehículo. Una vez reparada la unidad se
						someterá a la segunda inspección.
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr></tr>
			</tfoot>
		</table>
	);
}

export default Referencias;
