import React from 'react';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import minibusReport from '../../assets/informe-img/informe-minibus.svg';
import DefectList from './DefectList';
import printSolid from '../../assets/print-solid.svg';
import fileArrow from '../../assets/file-arrow-up-solid.svg';
import fileImage from '../../assets/file-image-solid.svg';

function Report(props) {
	const {
		tipo,
		loadFileRef,
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
		truckSize,
		transmisionType,
		imgUpload,
		onImageChange,
		loadImgRef,
		severityOrder,
		dateCalcBtn,
		selectValidity,
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
		['brakePerf', [5, 40, 48]],
		['handBrakePerf', [3, 14.4, 17]],
		['brakeStrenghtFront', [0.15, 0.3, 0.46]],
		['brakeStrenghtRear', [0.05, 0.3, 0.46]],
		['brakeStrenghtMoto', [0.05, 0.15, 0.3]],
	]);

	/**
	 * @constant majorOrEqArray is a MAP containing the key and values to generate the evaluation.
	 */
	const majorOrEqArray = new Map([
		['brakeDifDel', [80, 15.1, 10]],
		['brakeDifTra', [95, 15.1, 12]],
		['brakeResist', [4, 1, 0.7]],
		['brakeOval', [80, 50, 30]],
		['luxLow', [200, 27, 26]],
		['luxHigh', [200, 150, 65]],
		['luxAng', [15, 7, 5]],
		['opacity', [5, 0.25, 0.2]],
		['HC<=1991', [2500, 900, 600]],
		['HC<=1994', [2500, 600, 400]],
		['HC>1994', [2500, 400, 250]],
		['CO<=1991', [15, 4.5, 2]],
		['CO<=1994', [15, 3, 1.5]],
		['CO>1994', [15, 2.5, 1]],
		['noiseAutoMotoViejo', [100, 85.1, 77]],
		['noiseAutoMotoNuevo', [100, 80.1, 77]],
		['noiseCamionViejo', [100, 95.1, 85]],
		['noiseCamionNuevo', [100, 87.1, 84]],
		['HC-4T', [4000, 3000, 1500]],
		['HC-2T', [12000, 9000, 4500]],
		['CO-Moto', [8, 4.5, 3.5]],
	]);

	/**
	 * @constant minorAndMajorOrEqArray is a MAP containing the key and values to generate the evaluation.
	 */
	const minorAndMajorOrEqArray = new Map([
		['susp', [-1, 102, 39.9, 100, 65, 99.5]],
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
	/**  function to evaluate txt properties when the comparisson is >=. It also handles the severity flags.
	 * @param {*} txtProp prop from object: fileAsObject.
	 * @param {*} paramSelector value extracted from majorOrEqArray via get() method from maps.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>.
	 */
	function majorOrEqual(txtProp, paramSelector, truckSize, transmisionType) {
		let params = majorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';
		if (txtProp >= params[0]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (txtProp >= params[1]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (txtProp >= params[2]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		if (transmisionType === '4x4') {
			severityEvaluation = '';
			severityLetter = 'A';
		}

		if (truckSize === 'bigTruck') {
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

	function minorAndMajorOrEqual(txtProp, paramSelector, truckSize) {
		let params = minorAndMajorOrEqArray.get(paramSelector);
		let severityEvaluation = '';
		let severityLetter = '';

		if (txtProp <= params[0] || txtProp >= params[1]) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (txtProp <= params[2] || txtProp >= params[3]) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (txtProp <= params[4] || txtProp >= params[5]) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		if (truckSize === 'bigTruck') {
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
		if (
			tipo === 'Auto' ||
			tipo === 'Camioneta' ||
			tipo === 'Moto' ||
			tipo === 'Minibus'
		) {
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
	 * Calculates the due date for this report.
	 * @returns The calculated due date.
	 */
	function dueDateCalculator() {
		let dueDate = new Date(startDate.getTime());

		if (dateCalcBtn.value === 'Rechazado') {
			dueDate = new Date(startDate.getTime());
		} else if (dateCalcBtn.value === 'Condicional') {
			dueDate = new Date(dueDate.setDate(startDate.getDate() + 60));
		} else if (dateCalcBtn.value === 'Apto' && selectValidity.value === '1a') {
			dueDate = new Date(dueDate.setFullYear(startDate.getUTCFullYear() + 1));
		} else if (dateCalcBtn.value === 'Apto' && selectValidity.value === '2a') {
			dueDate = new Date(dueDate.setFullYear(startDate.getUTCFullYear() + 2));
		} else if (dateCalcBtn.value === 'Apto' && selectValidity.value === '6m') {
			dueDate = new Date(dueDate.setMonth(startDate.getMonth() + 6));
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
						Number(startDate.getMonth() + 1) +
						'/' +
						startDate.getFullYear()}
				</p>
				<p className="end-date">
					{dueDate.getDate() +
						'/' +
						Number(dueDate.getMonth() + 1) +
						'/' +
						dueDate.getFullYear()}
				</p>
			</div>
		);
	}

	const printPage = () => {
		window.print();
		return false;
	};

	return (
		<>
			<div className="insert-btn-cont" id="no-print2">
				<div className="btn-txt-render-container">
					<label
						htmlFor="file-input"
						id="file-input-label"
						className="wrap-label">
						Seleccione archivo txt a procesar:
						<img src={fileArrow} alt="upload file" className="upload-btn-img" />
						<input
							className="btn-input"
							ref={loadFileRef}
							type="file"
							id="file-input"
							name="file-input"
							accept="text/plain"
							onChange={handleTxtRender}
						/>
					</label>
				</div>
				<div className="btn-txt-render-container">
					<label htmlFor="image_uploads" className="wrap-label">
						Seleccione la foto del vehículo:
						<img src={fileImage} alt="upload img" className="upload-btn-img" />
						<input
							className="btn-input"
							ref={loadImgRef}
							type="file"
							id="image_uploads"
							name="image_uploads"
							accept=".jpg, .jpeg, .png"
							onChange={onImageChange}
						/>
					</label>
				</div>
				<label className="wrap-label" htmlFor="print-btn">
					{' '}
					Imprimir informe:
					<button className="print-btn" id="print-btn" onClick={printPage}>
						<img src={printSolid} alt="printer" />
					</button>
				</label>
			</div>
			<section className="finalReport print">
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
											{minorAndMajorOrEqual(item.ruta, 'susp', truckSize.value)}
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
									{reportArray.brakeDifDel.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeDifDel')}
											</p>
										</div>
									))}
									{reportArray.brakeDifTra.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(item.ruta, 'brakeDifTra')}
											</p>
										</div>
									))}
								</div>
								<div className="strength">
									{reportArray.brakeStrenghtFront.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakeStrenghtFront')}
											</p>
										</div>
									))}
									{reportArray.brakeStrenghtRear.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{minorOrEqual(item.ruta, 'brakeStrenghtRear')}
											</p>
										</div>
									))}
								</div>
								<div className="resistance-rod">
									{reportArray.brakeResist.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												{majorOrEqual(
													item.ruta,
													'brakeResist',
													truckSize.value,
													transmisionType.value
												)}
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
							<div className="date">{dateStamper()}</div>
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
												{minorOrEqual(item.ruta, 'brakeStrenghtMoto')}
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
							<div className="date">{dateStamper()}</div>
						</article>
					)}
				</>
				<p className={`result-rto ${dateCalcBtn.value}`}>
					Resultado RTO: {dateCalcBtn.label}
				</p>
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
					severityOrder={severityOrder}
				/>
				<table className="references print">
					<thead>
						<tr className="reference-headers"></tr>
					</thead>
					<tbody>
						<tr>
							<td className="def-name minor">Leve</td>
							<td className="def-col">
								Son defectos que no exigen una nueva inspección, pero que
								deberán subsanarse antes de la siguiente revisión.
							</td>
						</tr>
						<tr>
							<td className="def-name orange">Moderado</td>
							<td className="def-col">
								Exigen una nueva inspección sin cargo dentro de los sesenta (60)
								días corridos a partir de la verificación. Pasando el tiempo
								estipulado de “circulación originaria”, repetirá el pago
								original.
								<br />
								<b>
									(*) Si el vencimiento coincide con domingo o feriado, el mismo
									se traslada al día habil inmediato anterior.
								</b>
							</td>
						</tr>
						<tr>
							<td className="def-name black">
								<b>Grave</b>
							</td>
							<td className="def-col">
								Exigen una nueva inspección atento a la gravedad que registra la
								unidad. Repetirá el pago original. Esta calificación no permite
								la circulación del vehículo. Una vez reparada la unidad se
								someterá a la segunda inspección.
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr></tr>
					</tfoot>
				</table>
			</section>
		</>
	);
}
export default Report;
