import React, {useState} from 'react';
import trashCan from '../../assets/trash-can-solid.svg';
import {autoArray} from '../context/carDataBase';
import {motoArray} from '../context/motoDataBase';

function Main() {
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (e) => {
		setTipo(e.target.value);
	};
	const [severidad, setSeveridad] = useState('Moderado');
	const handleSeveridad = (e) => {
		setSeveridad(e.target.value);
	};
	const [grupo, setGrupo] = useState('');
	const handleGrupo = (e) => {
		setGrupo(e.target.value);
		setSeccion('');
		setDescripcion('');
	};
	const [seccion, setSeccion] = useState('');
	const handleSeccion = (e) => {
		setSeccion(e.target.value);
		setDescripcion('');
	};
	const [descripcion, setDescripcion] = useState('');
	const handleDescripcion = (e) => {
		setDescripcion(e.target.value);
	};
	const [unlistedDef, setUnlistedDef] = useState('');
	const [lista, setLista] = useState([]);
	console.log(tipo);
	let tipoArray = tipo === 'Auto' ? autoArray : motoArray;
	let section = grupo !== '' ? tipoArray.seccion[grupo] : []; //esta variable almacena el array de seccion a mapear
	let description =
		seccion !== '' && grupo !== ''
			? tipoArray.descripciones[grupo][seccion] || []
			: []; //esta varibale almacena el array de descripción a mapear
	let severityColour; //esta varaible me da el color de la severidad

	let armarLista = () => {
		let sevOrder = 2; //variable creada para poder ordenar por severidad

		switch (severidad) {
			case 'Leve':
				sevOrder = 3;
				break;
			case 'Grave':
				sevOrder = 1;
				break;
			default:
				sevOrder = 2; //este es el caso de moderado, que de paso esta seteado al comienzo
		}

		let itemLista = {
			grupo: grupo,
			seccion: seccion,
			desc: seccion === 'otro' ? unlistedDef : descripcion,
			sev: severidad,
			Ord: sevOrder,
		};

		if (
			severidad !== '' &&
			grupo !== '' &&
			seccion !== '' &&
			(unlistedDef !== '' || descripcion !== '')
		) {
			setLista(lista.concat(itemLista));
			setSeveridad('Moderado');
			setGrupo('');
			setSeccion('');
			setDescripcion('');
			setUnlistedDef('');
		} else {
			alert('Todos los campos deben estar completos');
		}

		return;
	};

	//funcion que borra un item de la lista
	function eraseDefect(index) {
		const nuevaLista = lista.filter((algo, i) => {
			//"algo" es para decirle al filter que tome lasprops y despues "i" que es el índice
			return index !== i ? true : false;
		});
		setLista(nuevaLista);
	}

	function defectList(props, i) {
		//no estoy usando seccion porque de momento no lo quiero en el render, pero lo dejo por si algún día pinta que aparezca
		const {grupo, seccion, desc, sev} = props;

		switch (
			sev //cambia entre las clases de los posibles colores según la severidad
		) {
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

		return (
			<tr className={`itemLista ${severityColour}`} key={i}>
				<td className={`grupo-col ${severityColour}`}>{grupo}</td>
				{/* <td className={`${severityColour}`}>{seccion}</td> */}
				<td className={`${severityColour}`}>{desc}</td>
				<td className={`severidad-col ${severityColour}`}>{sev}</td>
				<td className="erase-btn-ctn">
					<button className="erase-btn" onClick={() => eraseDefect(i)}>
						<img src={trashCan} alt="Trash-can" />
					</button>
				</td>
			</tr>
		);
	}

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
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
						{tipoArray.grupo.map((item, i) => (
							<label className="btn-inside" htmlFor={item.value} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="group"
									id={item.value}
									value={item.value}
									checked={grupo === item.value}
									onChange={handleGrupo}
								/>
								{item.label}
							</label>
						))}
					</div>
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{section.map((item, i) => (
							<label className="btn-inside" htmlFor={item.value} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="section"
									id={item.value}
									value={item.value}
									checked={seccion === item.value}
									onChange={handleSeccion}
								/>
								{item.label}
							</label>
						))}
						{grupo.length > 0 && ( //esta primera línea hace que se renderice solo si encuentra algo en el array de grupo
							<label className="btn-inside" htmlFor="otro">
								<input
									type="radio"
									name="section"
									id="otro"
									value="otro"
									checked={seccion === 'otro'}
									className="btn-inside rad-c"
									onChange={handleSeccion}
								/>
								<b>Otros</b>
							</label>
						)}
					</div>
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{description.map((item, i) => (
							<label className="btn-inside" htmlFor={item.value} key={i}>
								<input
									type="radio"
									className="btn-inside rad-c"
									name="description"
									id={item.value}
									value={item.value}
									checked={descripcion === item.value}
									onChange={handleDescripcion}
								/>
								{item.label}
							</label>
						))}
					</div>
				</div>
				<h3 className="unlisted-defect"> Defecto no listado</h3>
				<div className="unlisted-ctn">
					<label htmlFor="unlisted-defect" className="unlisted-defect">
						Seleccióne grupo al que pertenece la falla, luego el seleccione el
						botón de "Otros", finalmente escriba el defecto:
					</label>
					<textarea
						name="unlisted-defect"
						id="unlisted-defect"
						className="unlisted-defect"
						value={unlistedDef}
						cols="50"
						rows="3"
						onChange={(e) => setUnlistedDef(e.target.value)}></textarea>
				</div>
			</form>
			<div className="div-btn">
				<button className="send-btn" onClick={armarLista}>
					Agregar a la lista
				</button>
			</div>
			<h2>Listado de defectos</h2>
			<table className="lista-final">
				<thead>
					<tr className="lista-headers">
						<th className="grupo-col">Grupo</th>
						{/* <th>Sección</th> */}
						<th>Descripción</th>
						<th className="severidad-col">Severidad</th>
						<th className="quitar-col">Quitar</th>
					</tr>
				</thead>
				<tbody>
					{lista
						.sort(function (a, b) {
							if (a.Ord !== b.Ord) return a.Ord - b.Ord;
							if (a.grupo !== b.grupo) return a.grupo > b.grupo ? 1 : -1;
							if (a.seccion !== b.seccion)
								return a.seccion > b.seccion ? 1 : -1;
							return a.desc > b.desc ? 1 : -1;
						}) //uso operadores ternarios para devolver números y no comprar longitudes de strings
						.map(defectList)}
				</tbody>
			</table>
		</main>
	);
}

export default Main;
