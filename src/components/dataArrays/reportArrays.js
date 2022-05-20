let autoReportArray;

function autoReportArrayFiller() {
	autoReportArray = {
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
		],
	};
	return autoReportArray;
}

export {autoReportArrayFiller, autoReportArray};
