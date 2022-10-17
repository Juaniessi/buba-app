import React from 'react';

function WeightSum(props) {
	const {tipo, txtRender} = props;
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
					<div>
						Combustible:{' '}
						{window.fileAsObject.header.subModelo}
					</div>
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
