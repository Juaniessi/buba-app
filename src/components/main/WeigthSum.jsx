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

	let antiguedad =
		txtRender != null
			? new Date().getFullYear() - txtRender.header.añoDeFabricacion
			: 0;
	console.log('la antigüedad es' + antiguedad);

	return (
		<main>
			{txtRender !== null ? (
				<div className="weightsTable">
					<table className="subgroup">
						<tr>
							<td className="report-table table-cat">Fecha de fab</td>
							<td
								className={
									antiguedad <= 10
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
							<td className="report-table table-cat">Combustible</td>
							<td className="report-table table-info">
								{txtRender.header.combustible}
							</td>
						</tr>
					</table>

					<table className="subgroup">
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
							<td className="report-table table-info">
								{txtRender.suspensionEjeDelantero.rendimientoDelanteroIzquierdo}
							</td>
							<td className="report-table table-info">
								{txtRender.suspensionEjeDelantero.rendimientoDelanteroDerecho}
							</td>

							<td className="report-table table-info">
								{txtRender.suspensionEjeTrasero.rendimientoTraseroIzquierdo}
							</td>

							<td className="report-table table-info">
								{txtRender.suspensionEjeTrasero.rendimientoTraseroDerecho}
							</td>
						</tr>
					</table>

					<table className="subgroup">
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
							<td className="report-table table-info">
								{txtRender.frenosEje_1.rendimientoDelEje}
							</td>
							<td className="report-table table-info">
								{txtRender.frenosEje_2.rendimientoDelEje}
							</td>
							<td className="report-table table-info">
								{txtRender.frenosEje_1.diferenciaFzaFrenadoLadoALado}
							</td>
							<td className="report-table table-info">
								{txtRender.frenosEje_2.diferenciaFzaFrenadoLadoALado}
							</td>
						</tr>
					</table>

					<table className="subgroup">
						<tr>
							<td className="report-table table-cat" rowSpan={2}>
								Peso (kg)
							</td>
							<td className="report-table table-name">Total</td>
							<td className="report-table table-name">Eje del</td>
							<td className="report-table table-name">Eje tra</td>
						</tr>
						<tr>
							<td className="report-table table-info">{totalW}</td>
							<td className="report-table table-info">{frontW}</td>
							<td className="report-table table-info">{rearW}</td>
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
