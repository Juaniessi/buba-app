import React from 'react';

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

	return (
		<main>
			{tipo === 'Moto' &&
			window.fileAsObject !== undefined &&
			txtRender !== '' ? (
				<div className="weightsTable">
					<div>Combustible: Nafta</div>
					<div>
						Peso total:{' '}
						{Math.round(
							Number(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo
							)
						) +
							Math.round(
								Number(
									window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo
								)
							)}
					</div>
					<div>
						Peso eje delantero:{' '}
						{Math.round(
							Number(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo
							)
						)}
					</div>
					<div>
						Peso eje trasero:{' '}
						{Math.round(
							Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo)
						)}
					</div>
				</div>
			) : (
				''
			)}
			{tipo !== 'Moto' &&
			window.fileAsObject !== undefined &&
			txtRender !== '' ? (
				<div className="weightsTable">
					<div>Combustible: {window.fileAsObject.header.subModelo}</div>
					<div>
						Peso total:{' '}
						{Math.round(
							Number(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo
							)
						) +
							Math.round(
								Number(
									window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo
								)
							) +
							Math.round(
								Number(
									window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho
								)
							) +
							Math.round(
								Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho)
							)}
					</div>
					<div>
						Peso eje delantero:{' '}
						{Math.round(
							Number(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo
							)
						) +
							Math.round(
								Number(
									window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho
								)
							)}
					</div>
					<div>
						Peso eje trasero:{' '}
						{Math.round(
							Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo)
						) +
							Math.round(
								Number(window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho)
							)}
					</div>
				</div>
			) : (
				''
			)}
		</main>
	);
}

export default WeightSum;
