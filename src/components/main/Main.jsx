import React, {useState} from 'react';
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
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (e) => {
		setTipo(e.target.value);
	};
	const [severidad, setSeveridad] = useState('Moderado');
	const handleSeveridad = (e) => {
		setSeveridad(e.target.value);
	};
	const [grupo, setGrupo] = useState(group[0]);
	const [seccion, setSeccion] = useState(sectionSusp[0]);
	const [descripcion, setDescripcion] = useState(descAlin[0]);
	const [lista, setLista] = useState([]);

	let section; //esta variable almacena el array de seccion a mapear
	let description; //esta varibale almacena el array de descripción a mapear
	let severityColour;

	switch (severidad) {
		case 'Leve':
			severityColour = 'yellow';
			break;
		case 'Moderado':
			severityColour = 'orange';
			break;
		case 'Grave':
			severityColour = 'black';
			break;
		default:
			severityColour = '';
	}

	let armarLista = () => {
		let itemLista = {
			grupo: grupo,
			seccion: seccion,
			desc: descripcion,
			sev: severidad,
		};
		setLista(lista.concat(itemLista));
		setSeveridad('Moderado');
		setGrupo(group[0]);
		setSeccion(sectionSusp[0]);
		setDescripcion(descAlin[0]);
		return;
	};

	function defectList(props, i) {
		const {grupo, seccion, desc, sev} = props;
		return (
			<tr className={`itemLista ${severityColour()}`} key={i}>
				<td>{grupo}</td>
				{/* <td>{seccion}</td> */}
				<td>{desc}</td>
				<td>{sev}</td>
			</tr>
		);
	}

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

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="type"
						id="Auto"
						value="Auto"
						checked={tipo === 'Auto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Auto">
						Auto
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="type"
						id="Moto"
						value="Moto"
						checked={tipo === 'Moto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Moto">
						Moto
					</label>
				</div>
				<h2>Severidad</h2>
				<div className="btn-package severity-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Leve"
						value="Leve"
						checked={severidad === 'Leve'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Leve">
						Leve
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Moderado"
						value="Moderado"
						checked={severidad === 'Moderado'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Moderado">
						Moderado
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Grave"
						value="Grave"
						checked={severidad === 'Grave'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Grave">
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
			</form>
			<div className="div-btn">
				<button className="send-btn" onClick={armarLista}>
					Agregar a la lista
				</button>
			</div>
			<div>Lista mágica</div>
			<table className="lista-final">
				<thead>
					<tr className="lista-headers">
						<th>Grupo</th>
						{/* <th>Sección</th> */}
						<th>Descripción</th>
						<th>Severidad</th>
						<th>Eliminar</th>
					</tr>
				</thead>
				<tbody>{lista.map(defectList)}</tbody>
			</table>
		</main>
	);
}

export default Main;
