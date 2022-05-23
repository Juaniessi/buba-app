import React, {useState, useRef} from 'react';
import Report from './Report';
import {procesTxt} from '../txt-navegator/fileAnalizer.js';
import {radioGeneratorArray} from '../dataArrays/radioBtnDB';
import {
	autoReportArrayFiller,
	motoReportArrayFiller,
} from '../dataArrays/reportArrays';

function Main() {
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (item) => {
		setSeveridad({value: 'Moderado', label: 'Moderado'});
		setTipo(item.value);
		setGrupo({value: '', label: ''});
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
		setLista([]);
		setTxtRender('');
		setReportArray('');
		setEngineType({value: '4T', label: '4 Tiempos'});
	};
	const [severidad, setSeveridad] = useState({
		value: 'Moderado',
		label: 'Moderado',
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

			loadFileRef.current.value = null;
			severeFlag.current = 0;
			moderateFlag.current = 0;
		}, 90);
	};
	/*autoReportArray stores the object that needs to be read in order to create the Report */
	const [reportArray, setReportArray] = useState('');

	const [engineType, setEngineType] = useState({
		value: '4T',
		label: '4 Tiempos',
	});

	const [imgUpload, setImgUpload] = useState('');

	const loadFileRef = useRef(null);
	const severeFlag = useRef(0);
	const moderateFlag = useRef(0);

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
					{radioGeneratorArray.type.map((item, i) => (
						<label className="btn-inside" htmlFor={item.value} key={i}>
							<input
								type="radio"
								className="btn-inside rad-c"
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
											className="btn-inside rad-c"
											name="engineType"
											id={item.value}
											value={item.value}
											checked={engineType.value === item.value} //determina que visualmente se vea checked
											onChange={() => setEngineType(item)}
										/>
										{item.label}
									</label>
							  ))
							: ''}
					</div>
				</div>
			</form>
			<section className="finalReport">
				<Report
					tipo={tipo}
					loadFileRef={loadFileRef}
					severeFlag={severeFlag}
					moderateFlag={moderateFlag}
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
				/>
			</section>
		</main>
	);
}

export default Main;
