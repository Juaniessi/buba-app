import React from 'react';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import minibusReport from '../../assets/informe-img/informe-minibus.svg';
import DefectList from './DefectList';
import fileArrow from '../../assets/file-arrow-up-solid.svg';
import fileImage from '../../assets/file-image-solid.svg';

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
		handleTxtRender,
		reportArray,
		engineType,
		imgUpload,
		onImageChange,
		loadImgRef,
		severityOrder,
		dateCalcBtn,
	} = props;

	let imgSelector; // this varaible sets te img to show
	/**  selecs between the posible vehicles to evaluate.
	 * @param {*} tipo taken from the variable of state.
	 * @param {*} imgSelector variable to store the img to display.
	 * @returns the img to display.
	 */
	function reportImgSelector(tipo) {
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

	/**
	 * @constant minorOrEqArray is a MAP containing the key and values to generate the evaluation.
	 */
	const minorOrEqArray = new Map([
		['brakePerf', [10, 40, 48]],
		['handBrakePerf', [3, 14.4, 17]],
		['brakeStrenght', [0.1, 0.3, 0.5]],
	]);

	/**
	 * @constant majorOrEqArray is a MAP containing the key and values to generate the evaluation.
	 */
	const majorOrEqArray = new Map([
		['brakeDif', [70, 15.1, 12]],
		['brakeResist', [2, 1, 0.7]],
		['brakeOval', [80, 50, 40]],
		['luxLow', [200, 27, 26]],
		['luxHigh', [200, 150, 65]],
		['luxAng', [15, 7, 5]],
		['opacity', [2, 0.25, 0.2]],
		['HC<=1991', [2500, 900, 700]],
		['HC<=1994', [2500, 600, 500]],
		['HC>1994', [2500, 400, 300]],
		['CO<=1991', [7, 4.5, 2.5]],
		['CO<=1994', [5, 3, 2]],
		['CO>1994', [5, 2.5, 2]],
		['noiseAutoMotoViejo', [100, 88.1, 80]],
		['noiseAutoMotoNuevo', [100, 83.1, 80]],
		['noiseCamionViejo', [100, 95.1, 85]],
		['noiseCamionNuevo', [100, 87, 84]],
		['HC-4T', [4000, 3000, 1500]],
		['HC-2T', [12000, 9000, 4500]],
		['CO-Moto', [8, 4.5, 3.5]],
	]);

	/**
	 * @constant minorAndMajorOrEqArray is a MAP containing the key and values to generate the evaluation.
	 */
	const minorAndMajorOrEqArray = new Map([
		['susp', [10, 98.5, 39.9, 101, 45, 102]],
		['alin', [-26, 26, -5, 5, -4, 4]],
	]);

	/**  function to evaluate txt properties when the comparisson is <=. It also handles the severity flags.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} paramSelector value extracted from minorOrEqArray via get() method from maps.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
	function minorOrEqual(txtProp, paramSelector) {
		let params = minorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp <= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			++severeFlag.current;
		} else if (txtProp <= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			++moderateFlag.current;
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
	 * @param {*} paramSelector value extracted from majorOrEqArray via get() method from maps.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
	function majorOrEqual(txtProp, paramSelector) {
		let params = majorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp >= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			++severeFlag.current;
		} else if (txtProp >= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			++moderateFlag.current;
		} else if (txtProp >= params[2]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	/**  function to evaluate txt properties when the comparisson is <= and >=. It also handles the severity flags.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} paramSelector value extracted from majorOrEqArray via get() method from maps.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */

	function minorAndMajorOrEqual(txtProp, paramSelector) {
		let params = minorAndMajorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp <= params[0] || txtProp >= params[1]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
			++severeFlag.current;
		} else if (txtProp <= params[2] || txtProp >= params[3]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
			++moderateFlag.current;
		} else if (txtProp <= params[4] || txtProp >= params[5]) {
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
	 * Cannot use standar implementation of minorOrEqual or majorOrEqual,
	 * bacause you need two more parameters to compare.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @param {*} tipo uses the state variable to understand wich vehicle is being evaluated.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
	function noiseEvaluator(txtProp, caseNumber, tipo) {
		if (tipo === 'Auto' || tipo === 'Camioneta' || tipo === 'Moto') {
			switch (caseNumber) {
				case 1:
					return majorOrEqual(txtProp, 'noiseAutoMotoViejo');
				case 2:
					return majorOrEqual(txtProp, 'noiseAutoMotoNuevo');
				default:
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
	 * @returns {*} the case number to be applied to the HC or CO evaluators.
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

	/**  function to evaluate if the HC ppm on CARS are ok, simliar function is used for CO.
	 * Cannot use standar implementation of minorOrEqual or majorOrEqual,
	 * bacause you need another more parameter to compare.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
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

	/**  function to evaluate if the CO emisions are OK, for bouth CAR and MOTO.
	 * Cannot use standar implementation of minorOrEqual or majorOrEqual,
	 * bacause you need another more parameter to compare.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
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

	/**  function to evaluate if the HC ppm on motos are ok.
	 * Cannot use standar implementation of minorOrEqual or majorOrEqual,
	 * bacause you need another more parameter to compare.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
	function HCEvaluatorMoto(txtProp, engineType) {
		switch (engineType) {
			case '4T':
				return majorOrEqual(txtProp, 'HC-4T');
			case '2T':
				return majorOrEqual(txtProp, 'HC-2T');
			default:
		}
	}

	/**
	 * @param {*} startDate given the case that "fechaDeSalidaDelPuesto2" does not exist,
	 * like in the txt of Motocicles, fechaDeSalidaDelPuesto2 = fechaDeSalidaDelPuesto1
	 * and fechaDeIngresoAlPuesto2 = fechaDeIngresoAlPuesto1,
	 * this is all solved in the "fileAnalizer.js".
	 */
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

		if (dateCalcBtn.value === 'Rechazado') {
			dueDate = addDays(startDate, 0);
		} else if (dateCalcBtn.value === 'Condicional') {
			dueDate = addDays(startDate, 60);
		} else if (dateCalcBtn.value === 'Apto') {
			dueDate = new Date(dueDate.setFullYear(startDate.getUTCFullYear() + 1));
		}
		return dueDate;
	}
	/**
	 * calulates the "due date" and arranges bouth dates in a legible way.
	 * @returns the HTML code with the date embeded and the clases to position it.
	 */
	function dateStamper() {
		const dueDate = dueDateCalculator();
		return (
			<div className="date">
				<p className="start-date">
					{startDate.getDate() +
						'/' +
						startDate.getMonth() +
						'/' +
						startDate.getFullYear()}
				</p>
				<p className="end-date">
					{dueDate.getDate() +
						'/' +
						dueDate.getMonth() +
						'/' +
						dueDate.getFullYear()}
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="btn-txt-render-container">
				<label htmlFor="file-input" id="file-input-label" className="txt-label">
					Seleccione archivo a procesar:
				</label>
				<input
					className="btn-txt-input"
					ref={loadFileRef}
					type="file"
					id="file-input"
					name="file-input"
					accept="text/plain"
					onChange={handleTxtRender}
				/>
			</div>
			<div className="btn-txt-render-container">
				<label htmlFor="image_uploads" className="txt-label">
					Seleccione la foto del vehículo:
				</label>
				<input
					className="btn-img-input"
					ref={loadImgRef}
					type="file"
					id="image_uploads"
					name="image_uploads"
					accept=".jpg, .jpeg, .png"
					onChange={onImageChange}
				/>
			</div>
			<section className="finalReport">
				<>
					<img
						className="report-img"
						src={reportImgSelector(tipo)}
						alt="Report background mold"
					/>
					<img className="car-photo" src={imgUpload} alt="Foto del vehiculo" />
					{reportArray === '' ? (
						''
					) : tipo !== 'Moto' ? (
						<article className="txtRenderAuto">
							<div className="header-info">
								{reportArray.headerInfo.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="alineation">
								{reportArray.alineation.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{minorAndMajorOrEqual(item.ruta, 'alin')}
										</p>
									</div>
								))}
							</div>
							<div className="weight">
								{reportArray.weight.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="suspention">
								{reportArray.suspention.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{minorAndMajorOrEqual(item.ruta, 'susp')}
										</p>
									</div>
								))}
							</div>
							<div className="brake">
								<div className="performance">
									{reportArray.brakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakePerf')}
											</p>
										</div>
									))}
									{reportArray.handBrakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'handBrakePerf')}
											</p>
										</div>
									))}
								</div>
								<div className="difference">
									{reportArray.brakeDif.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeDif')}
											</p>
										</div>
									))}
								</div>
								<div className="strength">
									{reportArray.brakeStrenght.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakeStrenght')}
											</p>
										</div>
									))}
								</div>
								<div className="resistance-rod">
									{reportArray.brakeResist.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeResist')}
											</p>
										</div>
									))}
								</div>
								<div className="ovality">
									{reportArray.brakeOval.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeOval')}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="lux-meter">
								<div className="intensity">
									{reportArray.luxLow.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxLow')}
											</p>
										</div>
									))}
									{reportArray.luxHigh.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxHigh')}
											</p>
										</div>
									))}
								</div>
								<div className="alineationLux">
									{reportArray.luxAng.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxAng')}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="decibel-meter">
								{reportArray.soundInt.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{noiseEvaluator(item.ruta, yearRectificatordb(), tipo)}
										</p>
									</div>
								))}
							</div>
							{window.fileAsObject.opacimetro.resultadoMedicionOpacidad ===
							-1 ? (
								<div className="gases">
									{reportArray.carbonMonoxide.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{COEvaluator(item.ruta, yearRectificatorGas())}
											</p>
										</div>
									))}
									{reportArray.hydroCarbon.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{HCEvaluator(item.ruta, yearRectificatorGas())}
											</p>
										</div>
									))}
									{/* {reportArray.nitrogenOxides.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>{item.ruta}</p>
										</div>
									))} */}
								</div>
							) : (
								<div className="opacimeter">
									{reportArray.opacity.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'opacity')}
											</p>
										</div>
									))}
								</div>
							)}
							<div className="date">
								{/* <p className="start-date">
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
								</p> */}
								{dateStamper()}
							</div>
						</article>
					) : (
						<article className="txtRenderMoto">
							<div className="header-info">
								{reportArray.headerInfo.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="weight">
								{reportArray.weight.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="suspention">
								{reportArray.suspention.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{minorAndMajorOrEqual(item.ruta, 'susp')}
										</p>
									</div>
								))}
							</div>
							<div className="brake">
								<div className="performance">
									{reportArray.brakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakePerf')}
											</p>
										</div>
									))}
								</div>
								<div className="strength">
									{reportArray.brakeStrenght.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakeStrenght')}
											</p>
										</div>
									))}
								</div>
								<div className="resistance-rod">
									{reportArray.brakeResist.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeResist')}
											</p>
										</div>
									))}
								</div>
								<div className="ovality">
									{reportArray.brakeOval.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeOval')}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="lux-meter">
								<div className="intensity">
									{reportArray.luxLow.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxLow')}
											</p>
										</div>
									))}
									{reportArray.luxHigh.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxHigh')}
											</p>
										</div>
									))}
								</div>
								<div className="alineationLux">
									{reportArray.luxAng.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'luxAng')}
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="decibel-meter">
								{reportArray.soundInt.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{noiseEvaluator(item.ruta, yearRectificatordb(), tipo)}
										</p>
									</div>
								))}
							</div>
							<div className="gases">
								{reportArray.carbonMonoxide.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{majorOrEqual(item.ruta, 'CO-Moto')}
										</p>
									</div>
								))}
								{reportArray.hydroCarbon.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											{HCEvaluatorMoto(item.ruta, engineType.value)}
										</p>
									</div>
								))}
								{/* {reportArray.nitrogenOxides.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>{item.ruta}</p>
									</div>
								))} */}
							</div>
							<div className="date">
								{/* <p className="start-date">
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
								</p> */}
								{dateStamper()}
							</div>
						</article>
					)}
				</>
				<p className={`result-rto ${dateCalcBtn.value}`}>Resultado RTO: {dateCalcBtn.label}</p>
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
					severeFlag={severeFlag}
					moderateFlag={moderateFlag}
					severityOrder={severityOrder}
				/>
			</section>
		</>
	);
}
export default Report;
