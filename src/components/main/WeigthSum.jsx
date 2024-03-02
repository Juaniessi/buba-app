import React, {useEffect} from 'react';

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
					<div>Combustible: {txtRender.header.combustible}</div>
					<div>Peso total: {totalW}</div>
					<div>Peso eje delantero: {frontW}</div>
					<div>Peso eje trasero: {rearW}</div>
				</div>
			) : (
				''
			)}
		</main>
	);
}

export default WeightSum;
