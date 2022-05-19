import React from 'react';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import DefectList from './DefectList';

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


	const minorOrEqArray = new Map([
		['susp', [10, 40, 60]],
		['brakePerf', [10, 40, 50]],
		['handBrakePerf', [1, 14.4, 17]],
		['brakeStrenght', [0.1, 0.3, 0.99]],
	]);

	function minorOrEqual(txtProp, paramSelector) {
		let params = minorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp <= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (txtProp <= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (txtProp <= params[2]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	/**  selecs between the posible vehicles to evaluate
	 * @param {*} tipo taken from the variable of state
	 * @param {*} imgSelector variable to store the img to display
	 * @returns the img to display
	 */
	let imgSelector; // this varaible sets te img to show

	function reportImgselector(tipo) {
		if (tipo === 'Auto') {
			imgSelector = carReport;
		} else if (tipo === 'Camioneta') {
			imgSelector = pickupReport;
		} else if (tipo === 'Camion') {
			imgSelector = truckReport;
		} else if (tipo === 'Moto') {
			imgSelector = motoReport;
		} else {
			imgSelector = carReport;
		}
		return imgSelector;
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

	function suspEvaluator(suspRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (suspRend <= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (suspRend <= 40) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (suspRend <= 60) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakePerfEvaluator(brakeRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeRend <= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeRend <= 40) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeRend <= 50) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function handBrakePerfEvaluator(brakeRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeRend <= 1) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeRend <= 14.4) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeRend <= 17) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeDifferenceEvaluator(brakeDif) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeDif >= 50) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeDif >= 15) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeDif >= 12) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeStrenghtEvaluator(brakeStrenght) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeStrenght <= 0.1) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeStrenght <= 0.3) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeStrenght <= 0.99) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeResistEvaluator(brakeResist) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeResist >= 2) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeResist >= 1) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeResist >= 0.5) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeOvalEvaluator(brakeOval) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeOval >= 80) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeOval >= 30) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeOval >= 16) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxLowIntEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt >= 200) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt >= 27) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt >= 26) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxHighIntEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt >= 200) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt >= 150) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt >= 65) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxAngleEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt >= 15) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt >= 7) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt >= 5) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function opacitiEvaluator(opaciti) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (opaciti >= 2) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (opaciti >= 0.25) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (opaciti >= 0.2) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}
	/**
	 *Function to be called to rectify a bad year input
	 * @returns {*} the case number to be applied to the noiseEvaluator evaluators
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
	/**  function to evaluate if HC ppm are ok, the same function is used for most evaluations.
	 * @param {*} db prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @param {*} tipo uses the state variable to understand wich vehicle is being evaluated.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function noiseEvaluator(db, caseNumber, tipo) {
		let severityEvaluation = '';
		let severityLetter = '';

		if (tipo === 'Auto' || tipo === 'Camioneta' || tipo === 'Moto') {
			switch (caseNumber) {
				case 1:
					if (db >= 120) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db >= 88.1) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db >= 80) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
				case 2:
					if (db >= 120) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db >= 83.1) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db >= 80) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
			}
		} else if (tipo === 'Camion') {
			switch (caseNumber) {
				case 1:
					if (db >= 110) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db >= 95.1) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db >= 85) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
				case 2:
					if (db > 110) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db > 87) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db > 84) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
			}
		}
	}

	/**
	 *Function to be called to rectify a bad year input
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

	/**  function to evaluate if HC ppm are ok, the same function is used for most evaluations
	 * @param {*} ppm prop from object: fileAsObject
	 * @param {*} caseNumber value extracted from yearRectificatorGas
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */

	function HCEvaluator(ppm, caseNumber) {
		let severityEvaluation = '';
		let severityLetter = '';
		switch (caseNumber) {
			case 1:
				if (ppm >= 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm >= 900) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm >= 600) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 2:
				if (ppm >= 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm >= 600) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm >= 400) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 3:
				if (ppm >= 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm >= 400) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm >= 300) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
		}
	}

	function COEvaluator(CO, caseNumber) {
		let severityEvaluation = '';
		let severityLetter = '';

		switch (caseNumber) {
			case 1:
				if (CO >= 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO >= 4.5) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO >= 3.5) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 2:
				if (CO >= 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO >= 3) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO >= 2) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 3:
				if (CO >= 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO >= 2.5) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO >= 2) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
		}
	}

	/**  function addDays, takes the date from the txt and adds 60 straight days
	 * @param {*} startDate from object: fileAsObject, starts undefined so must check to that
	 * @param {*} date start of validity
	 * @param {*} validity number of days of validity
	 * @param {*} dueDate self explanatory
	 * @returns the date of expiration
	 */

	let startDate =
		window.fileAsObject === undefined
			? ''
			: window.fileAsObject.estadísticaDePuestos.fechaDeSalidaDelPuesto2;

	function addDays(date, validity) {
		const result = new Date(date);
		result.setDate(result.getDate() + validity);
		return result;
	}

	function dueDateCalculator() {
		let dueDate = new Date(startDate.getTime());

		if (severeFlag.current > 0) {
			dueDate = addDays(startDate, 0);
		} else if (moderateFlag.current > 0) {
			dueDate = addDays(startDate, 60);
		} else {
			dueDate = new Date(dueDate.setFullYear(startDate.getUTCFullYear() + 1))  ; 
		}
		return dueDate;
	}

	return (
		<>
			<div className="btn-input-txt">
				<label htmlFor="file-input" id="file-input-label">
					Seleccione archivo a procesar
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
										{brakePerfEvaluator(
											window.fileAsObject.frenosEje_1.rendimientoDelEje
										)}
									</p>
									<p className="rear">
										{window.fileAsObject.frenosEje_2.rendimientoDelEje}
									</p>
									<p className="rear-eval">
										{brakePerfEvaluator(
											window.fileAsObject.frenosEje_2.rendimientoDelEje
										)}
									</p>
									<p className="hand">
										{window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje}
									</p>
									<p className="hand-eval">
										{handBrakePerfEvaluator(
											window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje
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
										{brakeDifferenceEvaluator(
											window.fileAsObject.frenosEje_1
												.diferenciaFzaFrenadoLadoALado
										)}
									</p>
									<p className="rear">
										{
											window.fileAsObject.frenosEje_2
												.diferenciaFzaFrenadoLadoALado
										}
									</p>
									<p className="rear-eval">
										{brakeDifferenceEvaluator(
											window.fileAsObject.frenosEje_2
												.diferenciaFzaFrenadoLadoALado
										)}
									</p>
									<p className="hand">
										{
											window.fileAsObject.frenoDeManoEje_2
												.diferenciaFzaFrenadoLadoALado
										}
									</p>
									<p className="hand-eval">
										{brakeDifferenceEvaluator(
											window.fileAsObject.frenoDeManoEje_2
												.diferenciaFzaFrenadoLadoALado
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
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenosEje_1
												.fuerzaDeFrenadoLadoIzquierdo
										)}
									</p>
									<p className="front-right">
										{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho}
									</p>
									<p className="front-right-eval">
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho
										)}
									</p>
									<p className="rear-left">
										{
											window.fileAsObject.frenosEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										}
									</p>
									<p className="rear-left-eval">
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenosEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										)}
									</p>
									<p className="rear-right">
										{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho}
									</p>
									<p className="rear-right-eval">
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho
										)}
									</p>
									<p className="hand-left">
										{
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										}
									</p>
									<p className="hand-left-eval">
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo
										)}
									</p>
									<p className="hand-right">
										{
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoDerecho
										}
									</p>
									<p className="hand-right-eval">
										{brakeStrenghtEvaluator(
											window.fileAsObject.frenoDeManoEje_2
												.fuerzaDeFrenadoLadoIzquierdo
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
										{brakeResistEvaluator(
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoIzquierdo
										)}
									</p>
									<p className="front-right">
										{
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoDerecho
										}
									</p>
									<p className="front-right-eval">
										{brakeResistEvaluator(
											window.fileAsObject.frenosEje_1
												.resistenciaALaRodaduraLadoDerecho
										)}
									</p>
									<p className="rear-left">
										{
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoIzquierdo
										}
									</p>
									<p className="rear-left-eval">
										{brakeResistEvaluator(
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoIzquierdo
										)}
									</p>
									<p className="rear-right">
										{
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoDerecho
										}
									</p>
									<p className="rear-right-eval">
										{brakeResistEvaluator(
											window.fileAsObject.frenosEje_2
												.resistenciaALaRodaduraLadoDerecho
										)}
									</p>
								</div>
								<div className="ovality">
									<p className="front-left">
										{window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo}
									</p>
									<p className="front-left-eval">
										{brakeOvalEvaluator(
											window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo
										)}
									</p>
									<p className="front-right">
										{window.fileAsObject.frenosEje_1.ovalidadLadoDerecho}
									</p>
									<p className="front-right-eval">
										{brakeOvalEvaluator(
											window.fileAsObject.frenosEje_1.ovalidadLadoDerecho
										)}
									</p>
									<p className="rear-left">
										{window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo}
									</p>
									<p className="rear-left-eval">
										{brakeOvalEvaluator(
											window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo
										)}
									</p>
									<p className="rear-right">
										{window.fileAsObject.frenosEje_2.ovalidadLadoDerecho}
									</p>
									<p className="rear-right-eval">
										{brakeOvalEvaluator(
											window.fileAsObject.frenosEje_2.ovalidadLadoDerecho
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
										{LuxLowIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaIzquierda
										)}
									</p>
									<p className="right-low">
										{window.fileAsObject.luxometro.intensidadBajaDerecha}
									</p>
									<p className="right-low-eval">
										{LuxLowIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaDerecha
										)}
									</p>
									<p className="left-high">
										{window.fileAsObject.luxometro.intensidadAltaIzquierda}
									</p>
									<p className="left-high-eval">
										{LuxHighIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaIzquierda
										)}
									</p>
									<p className="right-high">
										{window.fileAsObject.luxometro.intensidadAltaDerecha}
									</p>
									<p className="right-high-eval">
										{LuxHighIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaIzquierda
										)}
									</p>
									<p className="left-aux">
										{window.fileAsObject.luxometro.intensidadAuxiliarIzquierda}
									</p>
									<p className="left-aux-eval">
										{LuxLowIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaIzquierda
										)}
									</p>
									<p className="right-aux">
										{window.fileAsObject.luxometro.intensidadAuxiliarDerecha}
									</p>
									<p className="right-aux-eval">
										{LuxLowIntEvaluator(
											window.fileAsObject.luxometro.intensidadBajaDerecha
										)}
									</p>
								</div>
								<div className="alineationLux">
									<p className="left-hor">
										{
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoHorizontal
										}
									</p>
									<p className="left-hor-eval">
										{LuxAngleEvaluator(
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoHorizontal
										)}
									</p>
									<p className="right-hor">
										{
											window.fileAsObject.luxometro
												.alineacionFaroDerechoHorizontal
										}
									</p>
									<p className="right-hor-eval">
										{LuxAngleEvaluator(
											window.fileAsObject.luxometro
												.alineacionFaroDerechoHorizontal
										)}
									</p>
									<p className="left-vert">
										{
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoVertical
										}
									</p>
									<p className="left-vert-eval">
										{LuxAngleEvaluator(
											window.fileAsObject.luxometro
												.alineacionFaroIzquierdoVertical
										)}
									</p>
									<p className="right-vert">
										{
											window.fileAsObject.luxometro
												.alineacionFaroDerechoVertical
										}
									</p>
									<p className="right-vert-eval">
										{LuxAngleEvaluator(
											window.fileAsObject.luxometro
												.alineacionFaroDerechoVertical
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
											{opacitiEvaluator(
												window.fileAsObject.opacimetro.resultadoMedicionOpacidad
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