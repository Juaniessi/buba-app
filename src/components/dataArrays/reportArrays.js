/*
 * =============================================================================
 *  reportArrays.js — Qué dato del .txt va en cada casillero del informe
 * =============================================================================
 *
 *  El componente Report recorre estas listas para dibujar el informe. Cada
 *  elemento tiene:
 *    - ruta:      el valor medido, sacado del objeto que devuelve
 *                 leerArchivoTxt (por ejemplo datos.luxometro.intensidadBajaIzquierda)
 *    - class:     la clase CSS del casillero donde se muestra el valor
 *    - classEval: la clase CSS del casillero que dice si aprueba o no
 *
 *  Hay dos versiones porque la moto tiene menos ejes y mediciones. Autos,
 *  camionetas, camiones y transporte de pasajeros usan la versión de auto.
 * =============================================================================
 */

/**
 * Arma la estructura del informe para autos, camionetas, camiones y
 * transporte de pasajeros.
 *
 * @param {object} datos Los datos del .txt, tal como los devuelve
 *   `leerArchivoTxt` (ver txt-navegator/fileAnalizer.js).
 * @returns {object|undefined} Un objeto con una lista por sección del informe
 *   (headerInfo, luces, frenos, gases, etc.), o `undefined` si no hay datos.
 */
function autoReportArrayFiller(datos) {
	let reportArray;
	if (datos) {
		reportArray = {
			headerInfo: [
				{
					ruta: datos.header.patente,
					class: 'plate',
				},
				{
					ruta: datos.header.marcaDelVehiculo,
					class: 'brand',
				},
				{
					ruta: datos.header.modelo,
					class: 'model',
				},
				{
					ruta: datos.header.kilometros,
					class: 'mileage',
				},
			],
			alineation: [
				{
					ruta: datos.alineacion.resultadoAlineacionEje1,
					class: 'front-al',
					classEval: 'front-al-eval',
				},
				{
					ruta: datos.alineacion.resultadoAlineacionEje2,
					class: 'rear-al',
					classEval: 'rear-al-eval',
				},
			],
			weight: [
				{
					ruta: datos.suspensionEjeDelantero.pesoLadoIzquierdo,
					class: 'front-left',
				},
				{
					ruta: datos.suspensionEjeDelantero.pesoLadoDerecho,
					class: 'front-right',
				},
				{
					ruta: datos.suspensionEjeTrasero.pesoLadoIzquierdo,
					class: 'rear-left',
				},
				{
					ruta: datos.suspensionEjeTrasero.pesoLadoDerecho,
					class: 'rear-right',
				},
			],
			suspention: [
				{
					ruta: datos.suspensionEjeDelantero
						.rendimientoDelanteroIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.suspensionEjeDelantero
						.rendimientoDelanteroDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: datos.suspensionEjeTrasero
						.rendimientoTraseroIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: datos.suspensionEjeTrasero
						.rendimientoTraseroDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			brakePerf: [
				{
					ruta: datos.frenosEje_1.rendimientoDelEje,
					class: 'front',
					classEval: 'front-eval',
				},
				{
					ruta: datos.frenosEje_2.rendimientoDelEje,
					class: 'rear',
					classEval: 'rear-eval',
				},
			],
			handBrakePerf: [
				{
					ruta: datos.frenoDeManoEje_2.rendimientoDelEje,
					class: 'hand',
					classEval: 'hand-eval',
				},
			],
			brakeDifDel: [
				{
					ruta: datos.frenosEje_1.diferenciaFzaFrenadoLadoALado,
					class: 'front',
					classEval: 'front-eval',
				},
			],
			brakeDifTra: [
				{
					ruta: datos.frenosEje_2.diferenciaFzaFrenadoLadoALado,
					class: 'rear',
					classEval: 'rear-eval',
				},
				{
					ruta: datos.frenoDeManoEje_2
						.diferenciaFzaFrenadoLadoALado,
					class: 'hand',
					classEval: 'hand-eval',
				},
			],
			brakeStrenghtFront: [
				{
					ruta: datos.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_1.fuerzaDeFrenadoLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
			],
			brakeStrenghtRear: [
				{
					ruta: datos.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: datos.frenosEje_2.fuerzaDeFrenadoLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
				{
					ruta: datos.frenoDeManoEje_2
						.fuerzaDeFrenadoLadoIzquierdo,
					class: 'hand-left',
					classEval: 'hand-left-eval',
				},
				{
					ruta: datos.frenoDeManoEje_2.fuerzaDeFrenadoLadoDerecho,
					class: 'hand-right',
					classEval: 'hand-right-eval',
				},
			],
			brakeResist: [
				{
					ruta: datos.frenosEje_1
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_1
						.resistenciaALaRodaduraLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: datos.frenosEje_2
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: datos.frenosEje_2
						.resistenciaALaRodaduraLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			brakeOval: [
				{
					ruta: datos.frenosEje_1.ovalidadLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_1.ovalidadLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: datos.frenosEje_2.ovalidadLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: datos.frenosEje_2.ovalidadLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			luxLow: [
				{
					ruta: datos.luxometro.intensidadBajaIzquierda,
					class: 'left-low',
					classEval: 'left-low-eval',
				},
				{
					ruta: datos.luxometro.intensidadBajaDerecha,
					class: 'right-low',
					classEval: 'right-low-eval',
				},
				{
					ruta: datos.luxometro.intensidadAuxiliarIzquierda,
					class: 'left-aux',
					classEval: 'left-aux-eval',
				},
				{
					ruta: datos.luxometro.intensidadAuxiliarDerecha,
					class: 'right-aux',
					classEval: 'right-aux-eval',
				},
			],
			luxHigh: [
				{
					ruta: datos.luxometro.intensidadAltaIzquierda,
					class: 'left-high',
					classEval: 'left-high-eval',
				},
				{
					ruta: datos.luxometro.intensidadAltaDerecha,
					class: 'right-high',
					classEval: 'right-high-eval',
				},
			],
			luxAng: [
				{
					ruta: datos.luxometro.alineacionFaroIzquierdoVertical,
					class: 'left-vert',
					classEval: 'left-vert-eval',
				},
				{
					ruta: datos.luxometro.alineacionFaroDerechoVertical,
					class: 'right-vert',
					classEval: 'right-vert-eval',
				},
				{
					ruta: datos.luxometro.alineacionFaroIzquierdoHorizontal,
					class: 'left-hor',
					classEval: 'left-hor-eval',
				},
				{
					ruta: datos.luxometro.alineacionFaroDerechoHorizontal,
					class: 'right-hor',
					classEval: 'right-hor-eval',
				},
			],
			soundInt: [
				{
					ruta: datos.sonometro.valorDeMedicion,
					class: 'sound-int',
					classEval: 'sound-int-eval',
				},
			],
			carbonMonoxide: [
				{
					ruta: datos.analizadorDeGases
						.resultadoMonoxidoDeCarbonoEnAltaRPM,
					class: 'CO',
					classEval: 'CO-eval',
				},
			],
			hydroCarbon: [
				{
					ruta: datos.analizadorDeGases
						.resultadoHidroCarburosHCAltaRPM,
					class: 'HCC',
					classEval: 'HCC-eval',
				},
			],
			nitrogenOxides: [
				{
					ruta: datos.analizadorDeGases
						.resultadoPartesPorMillonNox,
					class: 'Nox',
					classEval: 'Nox-eval',
				},
			],
			opacity: [
				{
					ruta: datos.opacimetro.resultadoMedicionOpacidad,
					class: 'opacity',
					classEval: 'opacity-eval',
				},
			],
		};
	}
	return reportArray;
}

/**
 * Arma la estructura del informe para motos: tiene menos ejes y mediciones
 * que la de auto (por ejemplo, no hay freno de mano ni alineación).
 *
 * @param {object} datos Los datos del .txt, tal como los devuelve
 *   `leerArchivoTxt` (ver txt-navegator/fileAnalizer.js).
 * @returns {object|undefined} Igual que autoReportArrayFiller pero con las
 *   secciones de moto, o `undefined` si no hay datos.
 */
function motoReportArrayFiller(datos) {
	let reportArray;
	if (datos) {
		reportArray = {
			headerInfo: [
				{
					ruta: datos.header.patente,
					class: 'plate',
				},
				{
					ruta: datos.header.marcaDelVehiculo,
					class: 'brand',
				},
				{
					ruta: datos.header.modelo,
					class: 'model',
				},
				{
					ruta: datos.header.kilometros,
					class: 'mileage',
				},
			],
			weight: [
				{
					ruta: datos.suspensionEjeDelantero.pesoLadoIzquierdo,
					class: 'front-left',
				},
				{
					ruta: datos.suspensionEjeTrasero.pesoLadoIzquierdo,
					class: 'rear-left',
				},
			],
			suspention: [
				{
					ruta: datos.suspensionEjeDelantero
						.rendimientoDelanteroIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.suspensionEjeTrasero
						.rendimientoTraseroIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakePerf: [
				{
					ruta: datos.frenosEje_1.rendimientoDelEje,
					class: 'front',
					classEval: 'front-eval',
				},
				{
					ruta: datos.frenosEje_2.rendimientoDelEje,
					class: 'rear',
					classEval: 'rear-eval',
				},
			],
			brakeStrenght: [
				{
					ruta: datos.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakeResist: [
				{
					ruta: datos.frenosEje_1
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_2
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakeOval: [
				{
					ruta: datos.frenosEje_1.ovalidadLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: datos.frenosEje_2.ovalidadLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			luxLow: [
				{
					ruta: datos.luxometro.intensidadBajaIzquierda,
					class: 'left-low',
					classEval: 'left-low-eval',
				},
				{
					ruta: datos.luxometro.intensidadAuxiliarIzquierda,
					class: 'left-aux',
					classEval: 'left-aux-eval',
				},
			],
			luxHigh: [
				{
					ruta: datos.luxometro.intensidadAltaIzquierda,
					class: 'left-high',
					classEval: 'left-high-eval',
				},
			],
			luxAng: [
				{
					ruta: datos.luxometro.alineacionFaroIzquierdoVertical,
					class: 'left-vert',
					classEval: 'left-vert-eval',
				},
				{
					ruta: datos.luxometro.alineacionFaroIzquierdoHorizontal,
					class: 'left-hor',
					classEval: 'left-hor-eval',
				},
			],
			soundInt: [
				{
					ruta: datos.sonometro.valorDeMedicion,
					class: 'sound-int',
					classEval: 'sound-int-eval',
				},
			],
			carbonMonoxide: [
				{
					ruta: datos.analizadorDeGases
						.resultadoMonoxidoDeCarbonoEnAltaRPM,
					class: 'CO',
					classEval: 'CO-eval',
				},
			],
			hydroCarbon: [
				{
					ruta: datos.analizadorDeGases
						.resultadoHidroCarburosHCAltaRPM,
					class: 'HCC',
					classEval: 'HCC-eval',
				},
			],
			nitrogenOxides: [
				{
					ruta: datos.analizadorDeGases
						.resultadoPartesPorMillonNox,
					class: 'Nox',
					classEval: 'Nox-eval',
				},
			],
		};
	}
	return reportArray;
}

export {autoReportArrayFiller, motoReportArrayFiller};
