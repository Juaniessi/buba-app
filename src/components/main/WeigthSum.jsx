import React, {useEffect, useState} from 'react';

function WeightSum(props) {
	const {tipo, txtRender} = props;

	function copyToClipboard(text) {
		if (txtRender !== '') {
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
		window.fileAsObject !== undefined && txtRender !== ''
			? Math.round(
					Number(window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo)
			  )
			: 0;

	let frontRW =
		window.fileAsObject !== undefined && txtRender !== ''
			? Math.round(
					Number(window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho)
			  )
			: 0;

	let rearLW =
		window.fileAsObject !== undefined && txtRender !== ''
			? Math.round(
					Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo)
			  )
			: 0;

	let rearRW =
		window.fileAsObject !== undefined && txtRender !== ''
			? Math.round(
					Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho)
			  )
			: 0;

	let totalW = frontLW + frontRW + rearLW + rearRW;
	let frontW = frontLW + frontRW;
	let rearW = rearLW + rearRW;

	useEffect(() => {
		copyToClipboard(totalW);
	}, [txtRender]);

	return (
		<main>
			{window.fileAsObject !== undefined && txtRender !== '' ? (
				<div className="weightsTable">
					<div>
						Combustible:{' '}
						{window.fileAsObject.opacimetro.resultadoMedicionOpacidad === -1
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
