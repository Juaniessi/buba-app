import React from 'react';

function WeightSum(props) {
	const {tipo, txtRender} = props;
	return (
		<main >
			{tipo === 'Moto' &&
			window.fileAsObject !== undefined &&
			txtRender !== '' ? (
				<div className="weightsTable">
					<div>
						Peso eje delantero:{' '}
						{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo}
					</div>
					<div>
						Peso eje trasero:{' '}
						{window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo}
					</div>
					<div>
						Peso total:{' '}
						{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo +
							window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo}
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
						Peso eje delantero:{' '}
						{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo +
							window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho}
					</div>
					<div>
						Peso eje trasero:{' '}
						{window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo +
							window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho}
					</div>
					<div>
						Peso total:{' '}
						{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo +
							window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo +
							window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho +
							window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho}
					</div>
				</div>
			) : (
				''
			)}
		</main>
	);
}

export default WeightSum;
