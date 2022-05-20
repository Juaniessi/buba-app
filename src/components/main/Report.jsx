import React from 'react';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import minibusReport from '../../assets/informe-img/informe-minibus.svg';
import DefectList from './DefectList';
import {autoReportArray} from "../dataArrays/reportArrays";

function Report(props) {
	const {
		tipo,
		loadFileRef,
		severeFlag,
		moderateFlag,
		severidad,
		setSeveridad,
		handleSeveridad,
		grupo,
		setGrupo,
		handleGrupo,
		seccion,
		setSeccion,
		handleSeccion,
		descripcion,
		setDescripcion,
		handleDescripcion,
		unlistedDef,
		setUnlistedDef,
		lista,
		setLista,
		txtRender,
		handleTxtRender,
	} = props;

	let imgSelector; // this varaible sets te img to show
	/**  selecs between the posible vehicles to evaluate
	 * @param {*} tipo taken from the variable of state
	 * @param {*} imgSelector variable to store the img to display
	 * @returns the img to display
	 */
	function reportImgselector(tipo) {
		if (tipo === 'Auto') {
			imgSelector = carReport;
		} else if (tipo === 'Camioneta') {
			imgSelector = pickupReport;
		} else if (tipo === 'Camion') {
			imgSelector = truckReport;
		} else if (tipo === 'Moto') {
			imgSelector = motoReport;
		} else if (tipo === 'Minibus') {
			imgSelector = minibusReport;
		} else {
			imgSelector = carReport;
		}
		return imgSelector;
	}

	const minorOrEqArray = new Map([
		['susp', [10, 40, 60]],
		['brakePerf', [10, 40, 50]],
		['handBrakePerf', [1, 14.4, 17]],
		['brakeStrenght', [0.1, 0.3, 0.99]],
	]);

	const majorOrEqArray = new Map([
		['brakeDif', [50, 15, 12]],
		['brakeResist', [2, 1, 0.5]],
		['brakeOval', [80, 30, 16]],
		['luxLow', [200, 27, 26]],
		['luxHigh', [200, 150, 65]],
		['luxAng', [15, 7, 5]],
		['opacity', [2, 0.25, 0.2]],
		['HC<=1991', [2500, 900, 600]],
		['HC<=1994', [2500, 600, 400]],
		['HC>1994', [2500, 400, 300]],
		['CO<=1991', [10, 4.5, 3.5]],
		['CO<=1994', [10, 3, 2]],
		['CO>1994', [10, 2.5, 2]],
		['noiseAutoMotoViejo', [100, 88.1, 80]],
		['noiseAutoMotoNuevo', [100, 83.1, 80]],
		['noiseCamionViejo', [100, 95.1, 85]],
		['noiseCamionNuevo', [100, 87, 84]],
	]);
	/**  function to evaluate txt properties when the comparisson is <=. It also handles the severity flags.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} paramSelector value extracted from minorOrEqArray.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function minorOrEqual(txtProp, paramSelector) {
		let params = minorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp <= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			severeFlag.current++;
		} else if (txtProp <= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			moderateFlag.current++;
		} else if (txtProp <= params[2]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}
	/**  function to evaluate txt properties when the comparisson is >=. It also handles the severity flags.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} paramSelector value extracted from majorOrEqArray.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function majorOrEqual(txtProp, paramSelector) {
		let params = majorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp >= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			severeFlag.current++;
		} else if (txtProp >= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			moderateFlag.current++;
		} else if (txtProp >= params[2]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	/**  function to evaluate if alineation is ok, the same function is used for most evaluations
	 * @param {*} alineation prop from object: fileAsObject
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */

	function alineationEvaluator(alineation) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (alineation <= -10 || alineation >= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			severeFlag.current++;
		} else if (alineation <= -5 || alineation >= 5) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			moderateFlag.current++;
		} else if (alineation <= -3 || alineation >= 3) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	/**
	 *Function that rectifies a bad year input and delivers a case scenario.
	 * @returns {*} the case number to be applied to the noiseEvaluator.
	 */
	function yearRectificatordb() {
		let anoFabrication = window.fileAsObject.header.añoDeFabricacion;
		let caseNumber;

		if (
			anoFabrication < 1920 ||
			anoFabrication > 2200 ||
			anoFabrication === ''
		) {
			anoFabrication = 2000;
		}
		if (anoFabrication <= 1997) {
			caseNumber = 1;
		} else {
			caseNumber = 2;
		}
		return caseNumber;
	}
	/**  function to evaluate noise levels.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @param {*} tipo uses the state variable to understand wich vehicle is being evaluated.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function noiseEvaluator(txtProp, caseNumber, tipo) {
		if (tipo === 'Auto' || tipo === 'Camioneta' || tipo === 'Moto') {
			switch (caseNumber) {
				case 1:
					return majorOrEqual(txtProp, 'noiseAutoMotoViejo');
				case 2:
					return majorOrEqual(txtProp, 'noiseAutoMotoNuevo');
			}
		} else if (tipo === 'Camion') {
			switch (caseNumber) {
				case 1:
					return majorOrEqual(txtProp, 'noiseCamionViejo');
				case 2:
					return majorOrEqual(txtProp, 'noiseCamionNuevo');
				default:
			}
		}
	}

	/**
	 *Function that rectifies a bad year input and swithces between case of use.
	 * @returns {*} the case number to be applied to the HC or CO evaluators
	 */
	function yearRectificatorGas() {
		let anoFabrication = window.fileAsObject.header.añoDeFabricacion;
		let caseNumber;

		if (
			anoFabrication < 1920 ||
			anoFabrication > 2200 ||
			anoFabrication === ''
		) {
			anoFabrication = 2000;
		}
		if (anoFabrication <= 1991) {
			caseNumber = 1;
			return caseNumber;
		} else if (anoFabrication <= 1994) {
			caseNumber = 2;
			return caseNumber;
		} else if (anoFabrication > 1994) {
			caseNumber = 3;
			return caseNumber;
		}
	}

	/**  function to evaluate if HC ppm are ok, the same function is used for CO.
	 * @param {*} txtProp prop from object: fileAsObject
	 * @param {*} caseNumber value extracted from yearRectificatorGas
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function HCEvaluator(txtProp, caseNumber) {
		switch (caseNumber) {
			case 1:
				return majorOrEqual(txtProp, 'HC<=1991');
			case 2:
				return majorOrEqual(txtProp, 'HC<=1994');
			case 3:
				return majorOrEqual(txtProp, 'HC>1994');
			default:
		}
	}

	function COEvaluator(txtProp, caseNumber) {
		switch (caseNumber) {
			case 1:
				return majorOrEqual(txtProp, 'CO<=1991');
			case 2:
				return majorOrEqual(txtProp, 'CO<=1994');
			case 3:
				return majorOrEqual(txtProp, 'CO>1994');
			default:
		}
	}

	let startDate =
		window.fileAsObject === undefined
			? ''
			: window.fileAsObject.estadísticaDePuestos.fechaDeSalidaDelPuesto2;

	/**
	 *
	 * @param {*} date Date in wich the vehicle was entered in the system.
	 * @param {*} validationPeriod Number of days to be added to the date. It represents the time in wich this report will cease to be valid.
	 * @returns The date value plus the validation period to form a dueDate.
	 */
	function addDays(date, validationPeriod) {
		const result = new Date(date);
		result.setDate(result.getDate() + validationPeriod);
		return result;
	}

	/**
	 * Calculates the due date for this report.
	 * @returns The calculated due date.
	 */
	function dueDateCalculator() {
		let dueDate = new Date(startDate.getTime());

		if (severeFlag.current > 0) {
			dueDate = addDays(startDate, 0);
		} else if (moderateFlag.current > 0) {
			dueDate = addDays(startDate, 60);
		} else {
			dueDate = new Date(dueDate.setFullYear(startDate.getUTCFullYear() + 1));
		}
		return dueDate;
	}

	return (
		<>
			<div className="btn-input-txt">
				<label htmlFor="file-input" id="file-input-label">
					Seleccione archivo a procesar:
				</label>
				<input
					ref={loadFileRef}
					type="file"
					id="file-input"
					accept="text/plain"
					onChange={handleTxtRender}
				/>
			</div>
			<section className="finalReport">
				<>
					<img
						className="report-img"
						src={reportImgselector(tipo)}
						alt="report-img"
					/>
					{txtRender === '' ? (
						''
					) : (
						<article className="txtRender">
							<div className="header-info">
								<p className="plate">{window.fileAsObject.header.patente}</p>
								<p className="brand">
									{window.fileAsObject.header.marcaDelVehiculo}
								</p>
								<p className="model">{window.fileAsObject.header.modelo}</p>
								<p className="mileage">
									{window.fileAsObject.header.kilometros}
								</p>
							</div>
							<div className="alineation">
								{/* {autoReportArray.alineation.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{alineationEvaluator(item.ruta)}
										</p>
									</div>
								))} */}
								<p className="front-al">
									{window.fileAsObject.alineacion.resultadoAlineacionEje1}
								</p>
								<p className="front-al-eval">
									{alineationEvaluator(
										window.fileAsObject.alineacion.resultadoAlineacionEje1
									)}
								</p>
								<p className="rear-al">
									{window.fileAsObject.alineacion.resultadoAlineacionEje2}
								</p>
								<p className="rear-al-eval">
									{alineationEvaluator(
										window.fileAsObject.alineacion.resultadoAlineacionEje2
									)}
								</p>
							</div>
							<div className="weight">
								{/* {autoReportArray.weight.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))} */}
								<p className="front-left">
									{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo}
								</p>
								<p className="front-right">
									{window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho}
								</p>
								<p className="rear-left">
									{window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo}
								</p>
								<p className="rear-right">
									{window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho}
								</p>
							</div>
							<div className="suspention">
							{/* {autoReportArray.suspention.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{minorOrEqual(item.ruta, "susp")}
										</p>
									</div>
								))} */}
								<p className="front-left">
									{
										window.fileAsObject.suspensionEjeDelantero
											.rendimientoDelanteroIzquierdo
									}
								</p>
								<p className="front-left-eval">
									{minorOrEqual(
										window.fileAsObject.suspensionEjeDelantero
											.rendimientoDelanteroIzquierdo,
										'susp'
									)}
								</p>
								<p className="front-right">
									{
										window.fileAsObject.suspensionEjeDelantero
											.rendimientoDelanteroDerecho
									}
								</p>
								<p className="front-right-eval">
									{minorOrEqual(
										window.fileAsObject.suspensionEjeDelantero
											.rendimientoDelanteroDerechos,
										'susp'
									)}
								</p>
								<p className="rear-left">
									{
										window.fileAsObject.suspensionEjeTrasero
											.rendimientoTraseroIzquierdo
									}
								</p>
								<p className="rear-left-eval">
									{minorOrEqual(
										window.fileAsObject.suspensionEjeTrasero
											.rendimientoTraseroIzquierdo,
										'susp'
									)}
								</p>
								<p className="rear-right">
									{
										window.fileAsObject.suspensionEjeTrasero
											.rendimientoTraseroDerecho
									}
								</p>
								<p className="rear-right-eval">
									{minorOrEqual(
										window.fileAsObject.suspensionEjeTrasero
											.rendimientoTraseroDerecho,
										'susp'
									)}
								</p>
							</div>
							<div className="brake">
								<div className="performance">
									<p className="front">
										{window.fileAsObject.frenosEje_1.rendimientoDelEje}
									</p>
									<p className="front-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_1.rendimientoDelEje,
											'brakePerf'
										)}
									</p>
									<p className="rear">
										{window.fileAsObject.frenosEje_2.rendimientoDelEje}
									</p>
									<p className="rear-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_2.rendimientoDelEje,
											'brakePerf'
										)}
									</p>
									<p className="hand">
										{window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje}
									</p>
									<p className="hand-eval">
										{minorOrEqual(
											window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje,
											'handBrakePerf'
										)}
									</p>
								</div>
								<div className="difference">
									<p className="front">
										{
											window.fileAsObject.frenosEje_1
												.diferenciaFzaFrenadoLadoALado
										}
									</p>
									<p className="front-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_1
												.diferenciaFzaFrenadoLadoALado,
											'brakeDif'
										)}
									</p>
									<p className="rear">
										{
											window.fileAsObject.frenosEje_2
												.diferenciaFzaFrenadoLadoALado
										}
									</p>
									<p className="rear-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_2
												.diferenciaFzaFrenadoLadoALado,
											'brakeDif'
										)}
									</p>
									<p className="hand">
										{
											window.fileAsObject.frenoDeManoEje_2
												.diferenciaFzaFrenadoLadoALado
										}
									</p>
									<p className="hand-eval">
										{majorOrEqual(
											window.fileAsObject.frenoDeManoEje_2
												.diferenciaFzaFrenadoLadoALado,
											'brakeDif'
										)}
									</p>
								</div>
								<div className="strength">
									<p className="front-left">
										{
											window.fileAsObject.frenosEje_1
												.fuerzaDeFrenadoLadoIzquierdo
										}
									</p>
									<p className="front-left-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_1
												.fuerzaDeFrenadoLadoIzquierdo,
											'brakeStrenght'
										)}
									</p>
									<p className="front-right">
										{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho}
									</p>
									<p className="front-right-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_1
												.fuerzaDeFrenadoLadoDerecho,
											'brakeStrenght'
										)}
									</p>
									<p className="rear-left">
										{
											window.fileAsObject.frenosEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										}
									</p>
									<p className="rear-left-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_2
												.fuerzaDeFrenadoLadoIzquierdo,
											'brakeStrenght'
										)}
									</p>
									<p className="rear-right">
										{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho}
									</p>
									<p className="rear-right-eval">
										{minorOrEqual(
											window.fileAsObject.frenosEje_2
												.fuerzaDeFrenadoLadoDerecho,
											'brakeStrenght'
										)}
									</p>
									<p className="hand-left">
										{
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										}
									</p>
									<p className="hand-left-eval">
										{minorOrEqual(
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo,
											'brakeStrenght'
										)}
									</p>
									<p className="hand-right">
										{
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoDerecho
										}
									</p>
									<p className="hand-right-eval">
										{minorOrEqual(
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo,
											'brakeStrenght'
										)}
									</p>
								</div>
								<div className="resistance-rod">
									<p className="front-left">
										{
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoIzquierdo
										}
									</p>
									<p className="front-left-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoIzquierdo,
											'brakeResist'
										)}
									</p>
									<p className="front-right">
										{
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoDerecho
										}
									</p>
									<p className="front-right-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoDerecho,
											'brakeResist'
										)}
									</p>
									<p className="rear-left">
										{
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoIzquierdo
										}
									</p>
									<p className="rear-left-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoIzquierdo,
											'brakeResist'
										)}
									</p>
									<p className="rear-right">
										{
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoDerecho
										}
									</p>
									<p className="rear-right-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoDerecho,
											'brakeResist'
										)}
									</p>
								</div>
								<div className="ovality">
									<p className="front-left">
										{window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo}
									</p>
									<p className="front-left-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo,
											'brakeOval'
										)}
									</p>
									<p className="front-right">
										{window.fileAsObject.frenosEje_1.ovalidadLadoDerecho}
									</p>
									<p className="front-right-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_1.ovalidadLadoDerecho,
											'brakeOval'
										)}
									</p>
									<p className="rear-left">
										{window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo}
									</p>
									<p className="rear-left-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo,
											'brakeOval'
										)}
									</p>
									<p className="rear-right">
										{window.fileAsObject.frenosEje_2.ovalidadLadoDerecho}
									</p>
									<p className="rear-right-eval">
										{majorOrEqual(
											window.fileAsObject.frenosEje_2.ovalidadLadoDerecho,
											'brakeOval'
										)}
									</p>
								</div>
							</div>
							<div className="lux-meter">
								<div className="intensity">
									<p className="left-low">
										{window.fileAsObject.luxometro.intensidadBajaIzquierda}
									</p>
									<p className="left-low-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaIzquierda,
											'luxLow'
										)}
									</p>
									<p className="right-low">
										{window.fileAsObject.luxometro.intensidadBajaDerecha}
									</p>
									<p className="right-low-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaDerecha,
											'luxLow'
										)}
									</p>
									<p className="left-high">
										{window.fileAsObject.luxometro.intensidadAltaIzquierda}
									</p>
									<p className="left-high-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaIzquierda,
											'luxHigh'
										)}
									</p>
									<p className="right-high">
										{window.fileAsObject.luxometro.intensidadAltaDerecha}
									</p>
									<p className="right-high-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaIzquierda,
											'luxHigh'
										)}
									</p>
									<p className="left-aux">
										{window.fileAsObject.luxometro.intensidadAuxiliarIzquierda}
									</p>
									<p className="left-aux-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaIzquierda,
											'luxLow'
										)}
									</p>
									<p className="right-aux">
										{window.fileAsObject.luxometro.intensidadAuxiliarDerecha}
									</p>
									<p className="right-aux-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro.intensidadBajaDerecha,
											'luxLow'
										)}
									</p>
								</div>
								<div className="alineationLux">
									<p className="left-vert">
										{
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoVertical
										}
									</p>
									<p className="left-vert-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoVertical,
											'luxAng'
										)}
									</p>
									<p className="right-vert">
										{
											window.fileAsObject.luxometro
												.alineacionFaroDerechoVertical
										}
									</p>
									<p className="right-vert-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro
												.alineacionFaroDerechoVertical,
											'luxAng'
										)}
									</p>
									<p className="left-hor">
										{
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoHorizontal
										}
									</p>
									<p className="left-hor-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoHorizontal,
											'luxAng'
										)}
									</p>
									<p className="right-hor">
										{
											window.fileAsObject.luxometro
												.alineacionFaroDerechoHorizontal
										}
									</p>
									<p className="right-hor-eval">
										{majorOrEqual(
											window.fileAsObject.luxometro
												.alineacionFaroDerechoHorizontal,
											'luxAng'
										)}
									</p>
								</div>
							</div>
							<div className="decibel-meter">
								<p className="sound-int">
									{window.fileAsObject.sonometro.valorDeMedicion}
								</p>
								<p className="sound-int-eval">
									{noiseEvaluator(
										window.fileAsObject.sonometro.valorDeMedicion,
										yearRectificatordb(),
										tipo
									)}
								</p>
							</div>
							<div className="gases">
								{window.fileAsObject.opacimetro.resultadoMedicionOpacidad ===
								-1 ? (
									<>
										<p className="CO">
											{
												window.fileAsObject.analizadorDeGases
													.resultadoMonoxidoDeCarbonoCO
											}
										</p>
										<p className="CO-eval">
											{COEvaluator(
												window.fileAsObject.analizadorDeGases
													.resultadoMonoxidoDeCarbonoCO,
												yearRectificatorGas()
											)}
										</p>
										<p className="HCC">
											{
												window.fileAsObject.analizadorDeGases
													.resultadoPartesPorMillonHC
											}
										</p>
										<p className="HCC-eval">
											{HCEvaluator(
												window.fileAsObject.analizadorDeGases
													.resultadoPartesPorMillonHC,
												yearRectificatorGas()
											)}
										</p>
										<p className="Nox">
											{
												window.fileAsObject.analizadorDeGases
													.resultadoPartesPorMillonNox
											}
										</p>
										<p className="Nox-eval"></p>
									</>
								) : (
									<p></p>
								)}
							</div>
							<div className="opacimeter">
								{window.fileAsObject.opacimetro.resultadoMedicionOpacidad ===
								-1 ? (
									<>
										<p className="opacity"></p>
										<p className="opacity-eval"></p>
									</>
								) : (
									<>
										<p className="opacity">
											{window.fileAsObject.opacimetro.resultadoMedicionOpacidad}
										</p>
										<p className="opacity-eval">
											{majorOrEqual(
												window.fileAsObject.opacimetro
													.resultadoMedicionOpacidad,
												'opacity'
											)}
										</p>
									</>
								)}
							</div>
							<div className="date">
								<p className="start-date">
									{startDate.getDate() +
										'/' +
										(startDate.getMonth() + 1) +
										'/' +
										startDate.getFullYear()}
								</p>
								<p className="end-date">
									{dueDateCalculator().getDate() +
										'/' +
										(dueDateCalculator().getMonth() + 1) +
										'/' +
										dueDateCalculator().getFullYear()}
								</p>
							</div>
						</article>
					)}
				</>
				<DefectList
					tipo={tipo}
					severidad={severidad}
					setSeveridad={setSeveridad}
					handleSeveridad={handleSeveridad}
					grupo={grupo}
					handleGrupo={handleGrupo}
					setGrupo={setGrupo}
					seccion={seccion}
					handleSeccion={handleSeccion}
					setSeccion={setSeccion}
					descripcion={descripcion}
					handleDescripcion={handleDescripcion}
					setDescripcion={setDescripcion}
					unlistedDef={unlistedDef}
					setUnlistedDef={setUnlistedDef}
					lista={lista}
					setLista={setLista}
				/>
			</section>
		</>
	);
}
export default Report;
