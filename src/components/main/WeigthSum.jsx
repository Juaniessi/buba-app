import React, {useEffect} from 'react';

function WeightSum(props) {
	const {tipo, txtRender} = props;

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

	let frontLW =
		window.fileAsObject !== undefined && txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeDelantero.pesoLadoIzquierdo))
			: 0;

	let frontRW =
		window.fileAsObject !== undefined && txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeDelantero.pesoLadoDerecho))
			: 0;

	let rearLW =
		window.fileAsObject !== undefined && txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeTrasero.pesoLadoIzquierdo))
			: 0;

	let rearRW =
		window.fileAsObject !== undefined && txtRender !== null
			? Math.round(Number(txtRender.suspensionEjeTrasero.pesoLadoDerecho))
			: 0;

	let totalW = frontLW + frontRW + rearLW + rearRW;
	let frontW = frontLW + frontRW;
	let rearW = rearLW + rearRW;

	useEffect(() => {
		copyToClipboard(totalW);
	}, [txtRender]);

	return (
		<main>
			{window.fileAsObject !== undefined && txtRender !== null ? (
				<div className="weightsTable">
					<div>
						Combustible:{' '}
						{tipo === 'Moto'
							? 'Nafta'
							: txtRender.header.subModelo === 'GAS'
							? 'GAS'
							: txtRender.opacimetro.resultadoMedicionOpacidad === -1
							? 'Nafta o Gas'
							: 'Diesel'}
					</div>
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
