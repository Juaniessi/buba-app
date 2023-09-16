import React from 'react';
import '../../styles/majorMarkerStyle.css';

/*Este modulo muesta un asterisco en la menor de las fuerzas de cada eje, siempre y cuando
la diferencia entre dichas fuerzas sea mayor a 15%*/

function MajorMarker(props) {
	const {txtRender} = props;
	return (
		<main id="no-print4" className={txtRender === null ? 'hidden' : 'visible'}>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenosEje_1.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo <
						  txtRender.frenosEje_1.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} front-brake left-brake`}>
				*
			</div>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenosEje_1.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo >
						  txtRender.frenosEje_1.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} front-brake right-brake`}>
				*
			</div>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenosEje_2.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo <
						  txtRender.frenosEje_2.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} rear-brake left-brake`}>
				*
			</div>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenosEje_2.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo >
						  txtRender.frenosEje_2.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} rear-brake right-brake`}>
				*
			</div>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenoDeManoEje_2.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenoDeManoEje_2.fuerzaDeFrenadoLadoIzquierdo <
						  txtRender.frenoDeManoEje_2.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} hand-brake left-brake`}>
				*
			</div>
			<div
				className={`marker ${
					txtRender === null
						? ''
						: txtRender.frenoDeManoEje_2.diferenciaFzaFrenadoLadoALado < 16
						? 'hidden'
						: txtRender.frenoDeManoEje_2.fuerzaDeFrenadoLadoIzquierdo >
						  txtRender.frenoDeManoEje_2.fuerzaDeFrenadoLadoDerecho
						? 'visible'
						: 'hidden'
				} hand-brake right-brake`}>
				*
			</div>
		</main>
	);
}

export default MajorMarker;
