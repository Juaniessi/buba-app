let reportArray;

/**
 * Uses the object to create the structure to be read by the maps that fill
 * the HTML structure from "Report"
 * @returns
 */
function autoReportArrayFiller() {
	if (window.fileAsObject !== '') {
		reportArray = {
			headerInfo: [
				{
					ruta: window.fileAsObject.header.patente,
					class: 'plate',
				},
				{
					ruta: window.fileAsObject.header.marcaDelVehiculo,
					class: 'brand',
				},
				{
					ruta: window.fileAsObject.header.modelo,
					class: 'model',
				},
				{
					ruta: window.fileAsObject.header.kilometros,
					class: 'mileage',
				},
			],
			alineation: [
				{
					ruta: window.fileAsObject.alineacion.resultadoAlineacionEje1,
					class: 'front-al',
					classEval: 'front-al-eval',
				},
				{
					ruta: window.fileAsObject.alineacion.resultadoAlineacionEje2,
					class: 'rear-al',
					classEval: 'rear-al-eval',
				},
			],
			weight: [
				{
					ruta: window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo,
					class: 'front-left',
				},
				{
					ruta: window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho,
					class: 'front-right',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo,
					class: 'rear-left',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho,
					class: 'rear-right',
				},
			],
			suspention: [
				{
					ruta: window.fileAsObject.suspensionEjeDelantero
						.rendimientoDelanteroIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.suspensionEjeDelantero
						.rendimientoDelanteroDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero
						.rendimientoTraseroIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero
						.rendimientoTraseroDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			brakePerf: [
				{
					ruta: window.fileAsObject.frenosEje_1.rendimientoDelEje,
					class: 'front',
					classEval: 'front-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.rendimientoDelEje,
					class: 'rear',
					classEval: 'rear-eval',
				},
			],
			handBrakePerf: [
				{
					ruta: window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje,
					class: 'hand',
					classEval: 'hand-eval',
				},
			],
			brakeDif: [
				{
					ruta: window.fileAsObject.frenosEje_1.diferenciaFzaFrenadoLadoALado,
					class: 'front',
					classEval: 'front-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.diferenciaFzaFrenadoLadoALado,
					class: 'rear',
					classEval: 'rear-eval',
				},
				{
					ruta: window.fileAsObject.frenoDeManoEje_2
						.diferenciaFzaFrenadoLadoALado,
					class: 'hand',
					classEval: 'hand-eval',
				},
			],
			brakeStrenghtFront: [
				{
					ruta: window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
			],
			brakeStrenghtRear: [
				{
					ruta: window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
				{
					ruta: window.fileAsObject.frenoDeManoEje_2
						.fuerzaDeFrenadoLadoIzquierdo,
					class: 'hand-left',
					classEval: 'hand-left-eval',
				},
				{
					ruta: window.fileAsObject.frenoDeManoEje_2.fuerzaDeFrenadoLadoDerecho,
					class: 'hand-right',
					classEval: 'hand-right-eval',
				},
			],
			brakeResist: [
				{
					ruta: window.fileAsObject.frenosEje_1
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_1
						.resistenciaALaRodaduraLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2
						.resistenciaALaRodaduraLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			brakeOval: [
				{
					ruta: window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_1.ovalidadLadoDerecho,
					class: 'front-right',
					classEval: 'front-right-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.ovalidadLadoDerecho,
					class: 'rear-right',
					classEval: 'rear-right-eval',
				},
			],
			luxLow: [
				{
					ruta: window.fileAsObject.luxometro.intensidadBajaIzquierda,
					class: 'left-low',
					classEval: 'left-low-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.intensidadBajaDerecha,
					class: 'right-low',
					classEval: 'right-low-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.intensidadAuxiliarIzquierda,
					class: 'left-aux',
					classEval: 'left-aux-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.intensidadAuxiliarDerecha,
					class: 'right-aux',
					classEval: 'right-aux-eval',
				},
			],
			luxHigh: [
				{
					ruta: window.fileAsObject.luxometro.intensidadAltaIzquierda,
					class: 'left-high',
					classEval: 'left-high-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.intensidadAltaDerecha,
					class: 'right-high',
					classEval: 'right-high-eval',
				},
			],
			luxAng: [
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroIzquierdoVertical,
					class: 'left-vert',
					classEval: 'left-vert-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroDerechoVertical,
					class: 'right-vert',
					classEval: 'right-vert-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroIzquierdoHorizontal,
					class: 'left-hor',
					classEval: 'left-hor-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroDerechoHorizontal,
					class: 'right-hor',
					classEval: 'right-hor-eval',
				},
			],
			soundInt: [
				{
					ruta: window.fileAsObject.sonometro.valorDeMedicion,
					class: 'sound-int',
					classEval: 'sound-int-eval',
				},
			],
			carbonMonoxide: [
				{
					ruta: window.fileAsObject.analizadorDeGases
						.resultadoMonoxidoDeCarbonoCOEnAltaRPM,
					class: 'CO',
					classEval: 'CO-eval',
				},
			],
			hydroCarbon: [
				{
					ruta: window.fileAsObject.analizadorDeGases
						.resultadoPartesPorMillonHCEnAltaRPM,
					class: 'HCC',
					classEval: 'HCC-eval',
				},
			],
			nitrogenOxides: [
				{
					ruta: window.fileAsObject.analizadorDeGases
						.resultadoPartesPorMillonNox,
					class: 'Nox',
					classEval: 'Nox-eval',
				},
			],
			opacity: [
				{
					ruta: window.fileAsObject.opacimetro.resultadoMedicionOpacidad,
					class: 'opacity',
					classEval: 'opacity-eval',
				},
			],
		};
	}
	return reportArray;
}

function motoReportArrayFiller() {
	if (window.fileAsObject !== '') {
		reportArray = {
			headerInfo: [
				{
					ruta: window.fileAsObject.header.patente,
					class: 'plate',
				},
				{
					ruta: window.fileAsObject.header.marcaDelVehiculo,
					class: 'brand',
				},
				{
					ruta: window.fileAsObject.header.modelo,
					class: 'model',
				},
				{
					ruta: window.fileAsObject.header.kilometros,
					class: 'mileage',
				},
			],
			weight: [
				{
					ruta: window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo,
					class: 'front-left',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo,
					class: 'rear-left',
				},
			],
			suspention: [
				{
					ruta: window.fileAsObject.suspensionEjeDelantero
						.rendimientoDelanteroIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.suspensionEjeTrasero
						.rendimientoTraseroIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakePerf: [
				{
					ruta: window.fileAsObject.frenosEje_1.rendimientoDelEje,
					class: 'front',
					classEval: 'front-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.rendimientoDelEje,
					class: 'rear',
					classEval: 'rear-eval',
				},
			],
			brakeStrenght: [
				{
					ruta: window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakeResist: [
				{
					ruta: window.fileAsObject.frenosEje_1
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2
						.resistenciaALaRodaduraLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			brakeOval: [
				{
					ruta: window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo,
					class: 'front-left',
					classEval: 'front-left-eval',
				},
				{
					ruta: window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo,
					class: 'rear-left',
					classEval: 'rear-left-eval',
				},
			],
			luxLow: [
				{
					ruta: window.fileAsObject.luxometro.intensidadBajaIzquierda,
					class: 'left-low',
					classEval: 'left-low-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.intensidadAuxiliarIzquierda,
					class: 'left-aux',
					classEval: 'left-aux-eval',
				},
			],
			luxHigh: [
				{
					ruta: window.fileAsObject.luxometro.intensidadAltaIzquierda,
					class: 'left-high',
					classEval: 'left-high-eval',
				},
			],
			luxAng: [
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroIzquierdoVertical,
					class: 'left-vert',
					classEval: 'left-vert-eval',
				},
				{
					ruta: window.fileAsObject.luxometro.alineacionFaroIzquierdoHorizontal,
					class: 'left-hor',
					classEval: 'left-hor-eval',
				},
			],
			soundInt: [
				{
					ruta: window.fileAsObject.sonometro.valorDeMedicion,
					class: 'sound-int',
					classEval: 'sound-int-eval',
				},
			],
			carbonMonoxide: [
				{
					ruta: window.fileAsObject.analizadorDeGases
						.resultadoMonoxidoDeCarbonoCO,
					class: 'CO',
					classEval: 'CO-eval',
				},
			],
			hydroCarbon: [
				{
					ruta: window.fileAsObject.analizadorDeGases
						.resultadoPartesPorMillonHC,
					class: 'HCC',
					classEval: 'HCC-eval',
				},
			],
			nitrogenOxides: [
				{
					ruta: window.fileAsObject.analizadorDeGases
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
