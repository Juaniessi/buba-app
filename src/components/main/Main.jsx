import React from 'react';
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
	const [tipo, setTipo] = useState('Auto');
	const [grupo, setGrupo] = useState(group[0]); //seteo group[0] para arrancar con la primera del array
	const [seccion, setSeccion] = useState(sectionSusp[0]); // idem seteo
	const [descripcion, setDescripcion] = useState(descAlin[0]);
	const [severidad, setSeveridad] = useState('Moderado');
	const [lista, setlista] = useState([]);

	let section; //esta variable almacena el array de seccion a mapear
	let description; //esta varibale almacena el array de descripción a mapear

	let listaCompleta = [];

	let armarLista = () => listaCompleta.concat(lista);

	switch (grupo) {
		// el primer case no es necesario
		/* case 'Suspención':
			section = sectionSusp;
			break; */
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
		<div>
			<form>
				<div class="form-check">
					<input
						type="radio"
						class="form-check-input"
						name="tipo"
						id="auto"
						value="auto"
						onClick={(e) => setTipo(e.target.value)}
					/>
					<label class="form-check-label" for="auto">
						Auto
					</label>
					<input
						type="radio"
						class="form-check-input"
						name="tipo"
						id="moto"
						value="moto"
						onClick={(e) => setTipo(e.target.value)}
					/>
					<label for="moto">Moto</label>
				</div>
				<div class="severity-class">
					<input
						type="radio"
						class="severity-class"
						name="severity"
						id="leve"
						value="leve"
						onClick={(e) => setSeveridad(e.target.value)}
					/>
					<label class="severity-class" for="leve">
						Leve
					</label>
					<input
						type="radio"
						class="severity-class"
						name="severity"
						id="moderado"
						value="moderado"
						onClick={(e) => setSeveridad(e.target.value)}
					/>
					<label class="severity-class" for="moderado">
						Moderado
					</label>
					<input
						type="radio"
						class="severity-class"
						name="severity"
						id="grave"
						value="grave"
						onClick={(e) => setSeveridad(e.target.value)}
					/>
					<label class="severity-class" for="grave">
						Grave
					</label>
				</div>
				<div class="drop-downs">
					<label for="group">Grupo</label>
					<select
						name="group"
						id="group"
						onChange={(e) => setGrupo(e.target.value)}>
						{group.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
					<label for="section">Sección</label>
					<select
						name="section"
						id="section"
						onChange={(e) => setSeccion(e.target.value)}>
						{section.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
					<label for="description">Descripción</label>
					<select
						name="description"
						id="description"
						onChange={(e) => setDescripcion(e.target.value)}>
						{description.map((item, i) => (
							<option key={i} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
				<div>valor de tipo:"{tipo}"</div>
				<div>valor de severidad:"{severidad}"</div>
				<div>valor de grupo: "{grupo}"</div>
				<div>valor de seccion: "{seccion}"</div>
				<div>valor de descripcion: "{descripcion}"</div>
				<div></div>
			</form>
			<div>
				<button
					onClick={() =>
						setlista(armarLista, [grupo + '/' + seccion + '/' + descripcion])
					}>
					Enviar
				</button>
			</div>
			<div>Lista mágica</div>
			<div>{listaCompleta}</div>
		</div>
	);
}

export default Main;
