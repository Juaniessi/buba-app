import React, {useEffect} from 'react';
/*
This module will from now on also show the date needed for:
"Transporte de pasajeros" 
*/
function WeightSum(props) {
	const {tipo, txtRender} = props;

	/* we are not coping the wheigth to the clipboard any more.
	function copyToClipboard(text) {
		if (txtRender !== null) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					console.log(`Copied text to clipboard: ${text}`);
				})
				.catch((error) => {
					console.error(`Could not copy text: ${error}`);
				});
		}
	}
	*/

	let frontLW =
		txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeDelantero.pesoLadoIzquierdo))
			: 0;

	let frontRW =
		txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeDelantero.pesoLadoDerecho))
			: 0;

	let rearLW =
		txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeTrasero.pesoLadoIzquierdo))
			: 0;

	let rearRW =
		txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeTrasero.pesoLadoDerecho))
			: 0;

	let totalW = frontLW + frontRW + rearLW + rearRW;
	let frontW = frontLW + frontRW;
	let rearW = rearLW + rearRW;

	/* we are not coping the wheigth to the clipboard any more.
	useEffect(() => {
		copyToClipboard(totalW);
	}, [txtRender]); */

	/* old implementation
	<div>
						Combustible:{' '}
						{tipo === 'Moto'
							? 'Nafta'
							: txtRender.header.subModelo === 'GNC'
							? 'GNC'
							: txtRender.opacimetro.resultadoMedicionOpacidad === -1
							? 'Nafta'
							: 'Diesel'}
					</div> */

	return (
		<main>
			{txtRender !== null ? (
				<div className="weightsTable">
					<table>
						<tr>
							<td className="report-table odd">Alineción</td>
							<td className="report-table odd">
								{txtRender.alineacion.resultadoAlineacionEje1}
							</td>
						</tr>
						<tr>
							<td className="report-table even">Gases</td>
							<td className="report-table even">
								{txtRender.opacimetro.resultadoMedicionOpacidad === -1 ? (
									<div>
										{
											txtRender.analizadorDeGases
												.resultadoMonoxidoDeCarbonoEnAltaRPM
										}
									</div>
								) : (
									<div>{txtRender.opacimetro.resultadoMedicionOpacidad}</div>
								)}
							</td>
						</tr>
						<tr>
							<td className="report-table odd">Susp DIzq</td>
							<td className="report-table odd">
								{txtRender.suspensionEjeDelantero.rendimientoDelanteroIzquierdo}
							</td>
						</tr>
						<tr>
							<td className="report-table even">Susp DDer</td>
							<td className="report-table even">
								{txtRender.suspensionEjeDelantero.rendimientoDelanteroDerecho}
							</td>
						</tr>
						<tr>
							<td className="report-table odd">Susp TIzq</td>
							<td className="report-table odd">
								{txtRender.suspensionEjeTrasero.rendimientoTraseroIzquierdo}
							</td>
						</tr>
						<tr>
							<td className="report-table even">Susp TDer</td>
							<td className="report-table even">
								{txtRender.suspensionEjeTrasero.rendimientoTraseroDerecho}
							</td>
						</tr>
						<tr>
							<td className="report-table odd">Efic Del</td>
							<td className="report-table odd">
								{txtRender.frenosEje_1.rendimientoDelEje}
							</td>
						</tr>
						<tr>
							<td className="report-table even">Efic Tra</td>
							<td className="report-table even">
								{txtRender.frenosEje_2.rendimientoDelEje}
							</td>
						</tr>
						<tr>
							<td className="report-table odd">Deseq Del</td>
							<td className="report-table odd">
								{txtRender.frenosEje_1.diferenciaFzaFrenadoLadoALado}
							</td>
						</tr>
						<tr>
							<td className="report-table even">Deseq TRA</td>
							<td className="report-table even">
								{txtRender.frenosEje_2.diferenciaFzaFrenadoLadoALado}
							</td>
						</tr>
						<tr>
							<td className="report-table odd">Peso total</td>
							<td className="report-table odd">{totalW}</td>
						</tr>
						<tr>
							<td className="report-table even">Peso eje delantero</td>
							<td className="report-table even">{frontW}</td>
						</tr>
						<tr>
							<td className="report-table odd">Peso eje trasero</td>
							<td className="report-table odd">{rearW}</td>
						</tr>
						<tr>
							<td className="report-table even">Combustible</td>
							<td className="report-table even">
								{txtRender.header.combustible}
							</td>
						</tr>
					</table>
				</div>
			) : (
				''
			)}
		</main>
	);
}

export default WeightSum;
