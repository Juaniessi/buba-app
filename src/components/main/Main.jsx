import React, {useEffect} from 'react';
import {useState} from 'react';

import {
	group,
	sectionSusp,
	sectionBrake,
	sectionEmi,
	sectionElect,
	sectionVis,
	sectionPit,
	descAlin,
	descExtDir,
	descRotulas,
	descFuelles,
	descParrillas,
	descAmortiguadores,
	descCazoletas,
	descSuspCPF,
	descBrakeRen,
	descBrakeDif,
	descBrakeRuedaFren,
	descBrakeOval,
	descBrakeCPF,
	descGas,
	descRuido,
	descLuzDel,
	descLuzTra,
	descBocina,
	descInstrumental,
	descLimpiaPar,
	descKit,
	descPatente,
	descCint,
	descEquip,
	descVidrios,
	descParaGol,
	descEspejos,
	descOpticas,
	descRuedas,
	descAltura,
	descProtPas,
	descAir,
	descCarroceria,
	descFlu,
	descEscape,
	descCha,
} from '../context/carDataBase';

function Main() {
	const [tipo, setTipo] = useState('auto');
	const handleTipo = (e) => {
		setTipo(e.target.value);
	};
	const [severidad, setSeveridad] = useState('moderado');
	const handleSeveridad = (e) => {
		setSeveridad(e.target.value);
	};
	const [grupo, setGrupo] = useState(group[0]);
	const [seccion, setSeccion] = useState(sectionSusp[0]);
	const [descripcion, setDescripcion] = useState(descAlin[0]);
	const [lista, setLista] = useState([]);

	let section; //esta variable almacena el array de seccion a mapear
	let description; //esta varibale almacena el array de descripción a mapear

	let armarLista = () => {
		let itemLista = {
			grupo: grupo,
			seccion: seccion,
			desc: descripcion,
			sev: severidad,
		}; /* 	`${grupo}, ${seccion}, ${descripcion}, ${severidad}` */
		const listaCompleta = listaCompleta.concat(itemLista);
		setLista(listaCompleta);
		setGrupo(group[0]);
		setSeccion(sectionSusp[0]);
		setDescripcion(descAlin[0]);
		return listaCompleta;
	};

	console.log(lista);

	switch (grupo) {
		case 'Frenos':
			section = sectionBrake;
			break;
		case 'Emisiones':
			section = sectionEmi;
			break;
		case 'Sistema Eléctrico':
			section = sectionElect;
			break;
		case 'Inspección Visual':
			section = sectionVis;
			break;
		case 'Inspección de Fosa':
			section = sectionPit;
			break;
		default:
			section = sectionSusp;
	}

	switch (seccion) {
		case 'Extremos de dirección':
			description = descExtDir;
			break;
		case 'Rótulas':
			description = descRotulas;
			break;
		case 'Fuelles':
			description = descFuelles;
			break;
		case 'Parrillas':
			description = descParrillas;
			break;
		case 'Amortiguadores':
			description = descAmortiguadores;
			break;
		case 'Cazoletas':
			description = descCazoletas;
			break;
		case 'Casos poco frecuentes':
			description = descSuspCPF;
			break;
		case 'Rendimiento de frenado':
			description = descBrakeRen;
			break;
		case 'Diferencia de frenado':
			description = descBrakeDif;
			break;
		case 'Rueda frenada':
			description = descBrakeRuedaFren;
			break;
		case 'Ovalidad o Alabeo':
			description = descBrakeOval;
			break;
		case 'Casos poco frecuentes':
			description = descBrakeCPF;
			break;
		case 'Gases':
			description = descGas;
			break;
		case 'Ruido':
			description = descRuido;
			break;
		case 'Luces traseras':
			description = descLuzTra;
			break;
		case 'Luces delanteras':
			description = descLuzDel;
			break;
		case 'Bocina':
			description = descBocina;
			break;
		case 'Instrumental':
			description = descInstrumental;
			break;
		case 'Limpia Parabrisas':
			description = descLimpiaPar;
			break;
		case 'Kit de seguridad':
			description = descKit;
			break;
		case 'Patentes':
			description = descPatente;
			break;
		case 'Cinturones de seguridad':
			description = descCint;
			break;
		case 'Equipamiento':
			description = descEquip;
			break;
		case 'Vidrios':
			description = descVidrios;
			break;
		case 'Paragolpes':
			description = descParaGol;
			break;
		case 'Espejos':
			description = descEspejos;
			break;
		case 'Ópticas':
			description = descOpticas;
			break;
		case 'Ruedas':
			description = descRuedas;
			break;
		case 'Altura':
			description = descAltura;
			break;
		case 'Protección pasiva':
			description = descProtPas;
			break;
		case 'Air bag':
			description = descAir;
			break;
		case 'Carrocería':
			description = descCarroceria;
			break;
		case 'Fluidos':
			description = descFlu;
			break;
		case 'Escape':
			description = descEscape;
			break;
		case 'Chasis':
			description = descCha;
			break;
		default:
			description = descAlin;
	}

	/* listaCompleta.map((fila) => {
		console.log(fila);
	}); */

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="type"
						id="auto"
						value="auto"
						checked={tipo === 'auto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="auto">
						Auto
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="type"
						id="moto"
						value="moto"
						checked={tipo === 'moto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="moto">
						Moto
					</label>
				</div>
				<h2>Severidad</h2>
				<div className="btn-package severity-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="leve"
						value="leve"
						checked={severidad === 'leve'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="leve">
						Leve
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="moderado"
						value="moderado"
						checked={severidad === 'moderado'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="moderado">
						Moderado
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="grave"
						value="grave"
						checked={severidad === 'grave'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="grave">
						Grave
					</label>
				</div>
				<div className="variable-btn">
					<div className="btn-package col-class group-c">
						<h3>Grupo</h3>
						{group.map((item, i) => (
							<label className="btn-inside" htmlFor={item} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="group"
									id={item}
									value={item}
									checked={grupo === item}
									onChange={(e) => setGrupo(e.target.value)}
								/>
								{item}
							</label>
						))}
					</div>
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{section.map((item, i) => (
							<label className="btn-inside" htmlFor={item} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="section"
									id={item}
									value={item}
									checked={seccion === item}
									onChange={(e) => setSeccion(e.target.value)}
								/>
								{item}
							</label>
						))}
					</div>
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{description.map((item, i) => (
							<label className="btn-inside" htmlFor={item} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="description"
									id={item}
									value={item}
									checked={descripcion === item}
									onChange={(e) => setDescripcion(e.target.value)}
								/>
								{item}
							</label>
						))}
					</div>
				</div>

				{/* <label htmlFor="group">Grupo</label>
					<select
						name="group"
						id="group"
						onClick={(e) => setGrupo(e.target.value)}>
						{group.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
					<label htmlFor="section">Sección</label>
					<select
						name="section"
						id="section"
						onClick={(e) => setSeccion(e.target.value)}>
						{section.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
					<label htmlFor="description">Descripción</label>
					<select
						name="description"
						id="description"
						onClick={(e) => setDescripcion(e.target.value)}>
						{description.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select> */}

				{/* <div>valor de tipo:"{tipo}"</div>
				<div>valor de severidad:"{severidad}"</div>
				<div>valor de grupo: "{grupo}"</div>
				<div>valor de seccion: "{seccion}"</div>
				<div>valor de descripcion: "{descripcion}"</div> */}
			</form>
			<div className="div-btn">
				<button className="send-btn" onClick={armarLista}>
					Agregar a la lista
				</button>
			</div>
			<div>Lista mágica</div>
		</main>
	);
}

export default Main;
