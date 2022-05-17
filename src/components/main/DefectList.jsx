import React from 'react';
import {autoArray} from '../context/carDataBase';
import {motoArray} from '../context/motoDataBase';
import trashCan from '../../assets/trash-can-solid.svg';

function DefectList(props) {
	const {
		tipo,
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
	} = props;
	

	let tipoArray = tipo !== 'Moto' ? autoArray : motoArray; //esta variable cambia entre los arrays de autos y motos
	let section = grupo.value !== '' ? tipoArray.seccion[grupo.value] : []; //esta variable almacena el array de seccion a mapear
	let description =
		seccion.value !== '' && grupo.value !== ''
			? tipoArray.descripciones[grupo.value][seccion.value] || []
			: []; //esta varibale almacena el array de descripción a mapear
	let severityColour; //esta varaible me da el color de la severidad

	let armarLista = (e) => {
		e.preventDefault(); // va con esto para que el submit no borre todo, porque esta dentro de la etiqueta form
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
			grupo: grupo.label,
			seccion: seccion.label,
			desc: seccion.value === 'otro' ? unlistedDef : descripcion.label,
			sev: severidad,
			Ord: sevOrder,
		};

		if (
			severidad !== '' &&
			grupo.value !== '' &&
			seccion.value !== '' &&
			(unlistedDef !== '' || descripcion.value !== '')
		) {
			setLista(lista.concat(itemLista));
			setSeveridad('Moderado');
			setGrupo({value: '', label: ''});
			setSeccion({value: '', label: ''});
			setDescripcion({value: '', label: ''});
			setUnlistedDef('');
		} else {
			alert('Todos los campos deben estar completos');
		}

		return;
	};

	//funcion que borra un item de la lista
	function eraseDefect(index) {
		const nuevaLista = lista.filter((algo, i) => {
			/* "algo" es para decirle al filter que tome las props
			 y despues "i" que es el índice */
			return index !== i ? true : false;
		});
		setLista(nuevaLista);
	}

	function defectList(props, i) {
		/* no estoy usando seccion porque de momento no lo quiero en el render, 
		pero lo dejo por si algún día pinta que aparezca */
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
			<tr className={`item-lista`} key={i}>
				<td className={`grupo-col ${severityColour}`}>{grupo}</td>
				{/* <td className={`${severityColour}`}>{seccion}</td> */}
				<td className={`descripcion-col ${severityColour}`}>{desc}</td>
				<td className={`severidad-col ${severityColour}`}>{sev}</td>
				<td className="phantom-col"></td>
				<td className="erase-btn-ctn">
					<button className="erase-btn" onClick={() => eraseDefect(i)}>
						<img className="trash-can" src={trashCan} alt="Trash-can" />
					</button>
				</td>
			</tr>
		);
	}

	return (
		<>
			<table className="lista-final">
				<thead>
					<tr className="lista-headers">
						<th className="grupo-col">Grupo</th>
						{/* <th>Sección</th> */}
						<th className="descripcion-col">Descripción</th>
						<th className="severidad-col">Severidad</th>
						<th className="phantom-col"></th>
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
						}) //uso operadores ternarios para devolver números y no comparar longitudes de strings
						.map(defectList)}
				</tbody>
			</table>
			<form className="formRadio-ext">
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
						{tipoArray.grupo
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="group"
										id={item.value}
										value={item.value}
										checked={grupo.value === item.value}
										onChange={() => handleGrupo(item)}
									/>
									{item.label}
								</label>
							))}
					</div>
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{section
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="section"
										id={item.value}
										value={item.value}
										checked={seccion.value === item.value}
										onChange={() => handleSeccion(item)}
									/>
									{item.label}
								</label>
							))}
						{grupo.value.length > 0 && ( //esta primera línea hace que se renderice solo si encuentra algo en el array de grupo
							<label className="btn-inside" htmlFor="otro">
								<input
									type="radio"
									name="section"
									id="otro"
									value="otro"
									checked={seccion.value === 'otro'}
									className="btn-inside rad-c"
									onChange={() => handleSeccion({value: 'otro', label: 'Otro'})}
								/>
								<b>Otros</b>
							</label>
						)}
					</div>
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{description
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="description"
										id={item.value}
										value={item.value}
										checked={descripcion.value === item.value}
										onChange={() => handleDescripcion(item)}
									/>
									{item.label}
								</label>
							))}
					</div>
				</div>
				<h3 className="unlisted-defect"> Defecto no listado</h3>
				<div className="unlisted-ctn">
					<label htmlFor="unlisted-defect" className="unlisted-defect">
						Seleccióne grupo al que pertenece la falla, luego el seleccione la
						opción "Otros" y finalmente escriba el defecto:
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
				<div className="div-btn">
					<button className="send-btn" onClick={armarLista}>
						Agregar a la lista
					</button>
				</div>
			</form>
		</>
	);
}

export default DefectList;
