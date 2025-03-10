import React, {useState, useRef} from 'react';
import Report from './Report';
import {procesTxt} from '../txt-navegator/fileAnalizer.js';
import {radioGeneratorArray} from '../dataArrays/radioBtnDB';
import {
	autoReportArrayFiller,
	motoReportArrayFiller,
} from '../dataArrays/reportArrays';
import resetBtnImg from '../../assets/arrow-rotate-left-solid.svg';
import WeightSum from './WeigthSum';

function Main() {
	const resetBtn = () => {
		setSeveridad({value: 'Leve', label: 'Leve', order: 1});
		setTipo('Auto');
		setGrupo({value: '', label: ''});
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
		setLista([]);
		setTxtRender(null);
		setImgUpload('');
		setReportArray('');
		setEngineType({value: '4T', label: '4 Tiempos'});
		setTruckSize({value: 'smallTruck', label: 'Camión pequeño'});
		setTransmisionType({value: '4x2', label: 'Normal'});
		setRtoType({value: 'normal', label: 'Normal'});
		setDateCalcBtn({value: 'Apto', label: 'Apto'});
		setSelectValidity({value: '1a', label: '1 año'});
		loadFileRef.current.value = null;
		loadImgRef.current.value = [];
	};
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (item) => {
		if (tipo === 'Moto' || item.value === 'Moto') {
			setLista([]);
			setReportArray('');
		}
		setTipo(item.value);
		setEngineType({value: '4T', label: '4 Tiempos'});
		setTruckSize({value: 'smallTruck', label: 'Camión pequeño'});
		setTransmisionType({value: '4x2', label: 'Normal'});
	};

	const [severidad, setSeveridad] = useState({
		value: 'Leve',
		label: 'Leve',
		order: 1,
	});
	const handleSeveridad = (item) => {
		setSeveridad(item);
	};
	const [grupo, setGrupo] = useState({value: '', label: ''});
	const handleGrupo = (item) => {
		setGrupo(item);
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
	};
	const [seccion, setSeccion] = useState({value: '', label: ''});
	const handleSeccion = (item) => {
		setSeccion(item);
		setDescripcion({value: '', label: ''});
	};
	const [descripcion, setDescripcion] = useState({value: '', label: ''});
	const handleDescripcion = (item) => {
		setDescripcion(item);
	};
	const [unlistedDef, setUnlistedDef] = useState('');
	const [lista, setLista] = useState([]);

	const [txtRender, setTxtRender] = useState(null);
	/**  handles all the process that must ocurr when the txt is read.
	 * @param {*} e the txt file.
	 * @function reportArrayFiller called to fill the object in order to read it latter.
	 */
	const handleTxtRender = (e) => {
		setLista([]);
		procesTxt(e);

		setTimeout(function () {
			setTxtRender(window.fileAsObject);
		}, 60);

		setTimeout(function () {
			if (tipo === 'Moto') {
				setReportArray(motoReportArrayFiller());
			} else {
				setReportArray(autoReportArrayFiller());
			}
		}, 70);
	};

	/*
	 *reportArray stores the object that needs to be read in order to create the Report
	 */
	const [reportArray, setReportArray] = useState('');

	/**
	 * created to manage multi motor types in MOTO.
	 */
	const [engineType, setEngineType] = useState({
		value: '4T',
		label: '4 Tiempos',
	});
	/**
	 * manages truck sizes.
	 * to use porpperly, add truckSize.value to evaluation functions and send it as param when nedded.
	 */
	const [truckSize, setTruckSize] = useState({
		value: 'smallTruck',
		label: 'Camión pequeño',
	});
	/**
	 * manages transmision type.
	 * to use porpperly, add transmisionType.value to evaluation functions and send it as param when nedded.
	 */

	const [transmisionType, setTransmisionType] = useState({
		value: '4x2',
		label: 'Normal',
	});

	/**
	 * manages RTO type.
	 */

	const [rtoType, setRtoType] = useState({
		value: 'normal',
		label: 'Normal',
	});

	/**
	 * Switches between the most used value for the Validity period
	 */

	const handleSetRtoType = (item) => {
		if (rtoType.value === 'normal') {
			setSelectValidity({value: '3m', label: '3 Meses'});
			setRtoType(item);
		}

		if (rtoType.value === 'traPas') {
			setSelectValidity({value: '1a', label: '1 Año'});
			setRtoType(item);
		}
	};

	/**
	 * manages dueDate for the report.
	 */

	const [selectValidity, setSelectValidity] = useState({
		value: '1a',
		label: '1 año',
	});

	const handleDueDateExtend = (item) => {
		setSelectValidity(item);
	};

	const [imgUpload, setImgUpload] = useState(null);

	/**
	 * this function takes the img and creates an URL you can use as a src=""
	 * @param {*} event the uploadesd image.
	 */
	const onImageChange = (event) => {
		URL.revokeObjectURL(imgUpload);
		if (event.target.files && event.target.files[0]) {
			setImgUpload(URL.createObjectURL(event.target.files[0]));
		}
	};

	/**
	 * created to handle the button while an automated function for dates
	 * is in progress.
	 */
	const [dateCalcBtn, setDateCalcBtn] = useState({
		value: 'Apto',
		label: 'Apto',
	});
	const handleDateCalcBtn = (item) => {
		setDateCalcBtn(item);
	};

	/**
	 * loadFileRef and loadImgRef are used to clear the file between
	 * rerenders so you can actually chose the same file twice when you
	 * forgot to change the type.
	 */

	const loadFileRef = useRef(null);
	const loadImgRef = useRef([]);

	return (
		<main>
			<form className="form-radio" id="no-print">
				<WeightSum tipo={tipo} txtRender={txtRender} />
				<div
					id="reset-btn"
					className="wrap-label reset-btn"
					htmlFor="reset-btn"
					onClick={resetBtn}>
					Reiniciar todos los campos:
					<img className="reset-img" src={resetBtnImg} alt="reset" />
				</div>
				<h2>Tipo de vehículo</h2>
				<div className="btn-package">
					{radioGeneratorArray.type.map((item, i) => (
						<label
							className={`btn-inside ${
								tipo === item.value ? 'radio-checked' : ''
							}`}
							htmlFor={item.value}
							key={item.value}>
							<input
								type="radio"
								className="rad-c"
								name="tipo"
								id={item.value}
								value={item.value}
								checked={tipo === item.value} //determina que visualmente se vea checked
								onChange={() => handleTipo(item)}
							/>
							{item.label}
						</label>
					))}
					<div className="engine-and-size-ctn">
						{tipo === 'Moto' ||
						tipo === 'Auto' ||
						tipo === 'Camioneta' ||
						tipo === 'Minibus' ||
						tipo === 'Camion'
							? radioGeneratorArray.rtoType.map((item, i) => (
									<div className="engine-and-size" key={item.value}>
										<label
											className="btn-inside transp-color"
											htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="rtoType"
												id={item.value}
												value={item.value}
												checked={rtoType.value === item.value}
												onChange={() => handleSetRtoType(item)}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
					</div>
					<div className="engine-and-size-ctn">
						{tipo === 'Moto'
							? radioGeneratorArray.engineType.map((item, i) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="engineType"
												id={item.value}
												value={item.value}
												checked={engineType.value === item.value}
												onChange={() => setEngineType(item)}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
						{tipo === 'Camion'|| tipo === 'Minibus'
							? radioGeneratorArray.truckSize.map((item, i) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="truckSize"
												id={item.value}
												value={item.value}
												checked={truckSize.value === item.value}
												onChange={() => setTruckSize(item)}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
						{tipo === 'Auto' || tipo === 'Camioneta' 
							? radioGeneratorArray.transmisionType.map((item, i) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="transmisionType"
												id={item.value}
												value={item.value}
												checked={transmisionType.value === item.value}
												onChange={() => setTransmisionType(item)}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
					</div>
				</div>
				<h3>Calcular fecha</h3>
				<div className="btn-package">
					{radioGeneratorArray.dateCalc.map((item, i) => (
						<label
							className={`btn-inside ${item.value}`}
							htmlFor={item.value}
							key={item.value}>
							<input
								type="radio"
								className={`rad-c`}
								name="dateCalcBtn"
								id={item.value}
								value={item.value}
								checked={dateCalcBtn.value === item.value} //determina que visualmente se vea checked
								onChange={() => handleDateCalcBtn(item)}
							/>
							{item.label}
						</label>
					))}{' '}
					<span>Vigencia:</span>
					{rtoType.value === 'normal' // cambio etre los botones posibles, para evitar problemas en la lógica
						? radioGeneratorArray.selectValidity.map((item, i) => (
								<label
									className={
										dateCalcBtn.value !== 'Apto'
											? 'btn-inside tooltip'
											: selectValidity.value === item.value
											? 'radio-checked btn-inside tooltip'
											: 'focus btn-inside tooltip'
									}
									htmlFor={item.value}
									key={item.value}>
									<span className="tooltiptext">{item.tooltip}</span>

									<input
										type="radio"
										className={`rad-c`}
										disabled={dateCalcBtn.value !== 'Apto'}
										name="dueDateSelector"
										id={item.value}
										value={item.value}
										checked={selectValidity.value === item.value} //determina que visualmente se vea checked
										onChange={() => handleDueDateExtend(item)}
									/>
									{item.label}
								</label>
						  ))
						: radioGeneratorArray.selectValidityTra.map((item, i) => (
								<label
									className={
										dateCalcBtn.value !== 'Apto'
											? 'btn-inside tooltip'
											: selectValidity.value === item.value
											? 'radio-checked btn-inside tooltip'
											: 'focus btn-inside tooltip'
									}
									htmlFor={item.value}
									key={item.value}>
									<span className="tooltiptext">{item.tooltip}</span>

									<input
										type="radio"
										className={`rad-c`}
										disabled={dateCalcBtn.value !== 'Apto'}
										name="dueDateSelector"
										id={item.value}
										value={item.value}
										checked={selectValidity.value === item.value} //determina que visualmente se vea checked
										onChange={() => handleDueDateExtend(item)}
									/>
									{item.label}
								</label>
						  ))
							}
				</div>
				<h3>Carga de archivos e impresión</h3>
			</form>
			<section className="finalReport">
				<Report
					tipo={tipo}
					loadFileRef={loadFileRef}
					severidad={severidad}
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
					txtRender={txtRender}
					handleTxtRender={handleTxtRender}
					reportArray={reportArray}
					engineType={engineType}
					truckSize={truckSize}
					transmisionType={transmisionType}
					imgUpload={imgUpload}
					onImageChange={onImageChange}
					loadImgRef={loadImgRef}
					dateCalcBtn={dateCalcBtn}
					selectValidity={selectValidity}
					rtoType={rtoType}
				/>
			</section>
		</main>
	);
}

export default Main;
