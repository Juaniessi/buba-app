import React, {useState, useRef} from 'react';
import Report from './Report';
import {procesTxt} from '../txt-navegator/fileAnalizer.js';
import {radioGeneratorArray} from '../dataArrays/radioBtnDB';

function Main() {
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (e) => {
		setSeveridad('Moderado');
		setTipo(e.target.value);
		setGrupo({value: '', label: ''});
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
		setLista([]);
		setTxtRender('');
	};
	const [severidad, setSeveridad] = useState('Moderado');
	const handleSeveridad = (e) => {
		setSeveridad(e.target.value);
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
	const handleTxtRender = (e) => {
		procesTxt(e);
		setTimeout(function () {
			setTxtRender(window.fileAsObject);
		}, 60);
		setTimeout(function () {
			loadFileRef.current.value = null;
			severeFlag.current = 0;
			moderateFlag.current = 0;
		}, 90);
	};

	const loadFileRef = useRef(null);
	const severeFlag = useRef(0);
	const moderateFlag = useRef(0);

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>

				<div className="btn-package type-c">
					{/* 	{radioGeneratorArray.type.map((item, i) => (
				<label className="btn-inside" htmlFor={item.value} key={i}>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id={item.value}
						value={item.value}
						checked={tipo.value === {item}} //determina que visualmente se vea checked
						onChange={()=>handleTipo(item)}
					/>
					{item.label}
				</label>
			))} */}
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Auto"
						value="Auto"
						checked={tipo === 'Auto'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Auto">
						Auto
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Camioneta"
						value="Camioneta"
						checked={tipo === 'Camioneta'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Camioneta">
						Camioneta
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Camion"
						value="Camion"
						checked={tipo === 'Camion'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Camion">
						Camión / Minibus
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Moto"
						value="Moto"
						checked={tipo === 'Moto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Moto">
						Moto
					</label>
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
				/>
			</section>
		</main>
	);
}

export default Main;
