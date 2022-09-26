import React, {useState, useRef} from 'react';
import Report from './Report';
import {procesTxt} from '../txt-navegator/fileAnalizer.js';
import {radioGeneratorArray} from '../dataArrays/radioBtnDB';
import {
	autoReportArrayFiller,
	motoReportArrayFiller,
} from '../dataArrays/reportArrays';
import resetBtnImg from '../../assets/arrow-rotate-left-solid.svg';

function Main() {
	const resetBtn = () => {
		setSeveridad({value: 'Moderado', label: 'Moderado', order: 2});
		setTipo('Auto');
		setGrupo({value: '', label: ''});
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
		setLista([]);
		setTxtRender('');
		setImgUpload('');
		setReportArray('');
		setEngineType({value: '4T', label: '4 Tiempos'});
		setDateCalcBtn({value: 'Apto', label: 'Apto'});
		loadFileRef.current.value = null;
		loadImgRef.current.value = [];
	};
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (item) => {
		if (item.value === 'Moto') {
			setLista([]);
			setReportArray('');
		}
		setTipo(item.value);
		setEngineType({value: '4T', label: '4 Tiempos'});
	};

	const [severidad, setSeveridad] = useState({
		value: 'Moderado',
		label: 'Moderado',
		order: 2,
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

	const [txtRender, setTxtRender] = useState('');
	/**  handles all the process that must ocurr when the txt is read.
	 * @param {*} e the txt file.
	 * @function reportArrayFiller called to fill the object in order to read ir latter.
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
	 * created to manage truck sizes.
	 * to use porpperly, add truckSize.value to evaluation functions.
	 */
	const [truckSize, setTruckSize] = useState({
		value: 'smallTruck',
		label: 'Camión pequeño',
	});

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
	 * rerenders so yo can actually chose the same file twice when you
	 * forgot to change the type.
	 */

	const loadFileRef = useRef(null);
	const loadImgRef = useRef([]);

	return (
		<main>
			<form className="form-radio" id="no-print">
				<label
					id="reset-btn"
					className="wrap-label reset-btn"
					htmlFor="reset-btn"
					onClick={resetBtn}>
					Reiniciar todos los campos:
					<img className="reset-img" src={resetBtnImg} alt="reset" />
				</label>
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
					{radioGeneratorArray.type.map((item, i) => (
						<label
							className={`btn-inside ${
								tipo === item.value ? 'radio-checked' : ''
							}`}
							htmlFor={item.value}
							key={i}>
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
					<div className="engine-type">
						{tipo === 'Moto'
							? radioGeneratorArray.engineType.map((item, i) => (
									<label className="btn-inside" htmlFor={item.value} key={i}>
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
							  ))
							: ''}
					</div>
					<div className="engine-type">
						{tipo === 'Camion'
							? radioGeneratorArray.truckSize.map((item, i) => (
									<label className="btn-inside" htmlFor={item.value} key={i}>
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
							key={i}>
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
					))}
				</div>
				<h3>Carga de archivos e impresión</h3>
			</form>
			<section className="finalReport">
				<Report
					tipo={tipo}
					loadFileRef={loadFileRef}
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
					txtRender={txtRender}
					handleTxtRender={handleTxtRender}
					reportArray={reportArray}
					engineType={engineType}
					truckSize={truckSize}
					imgUpload={imgUpload}
					onImageChange={onImageChange}
					loadImgRef={loadImgRef}
					dateCalcBtn={dateCalcBtn}
				/>
			</section>
		</main>
	);
}

export default Main;
