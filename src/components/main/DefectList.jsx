import React from 'react';
import {autoArray} from '../dataArrays/carDataBase';
import {motoArray} from '../dataArrays/motoDataBase';
import trashCan from '../../assets/trash-can-solid.svg';
import {radioGeneratorArray} from '../dataArrays/radioBtnDB';

/*setSeveridad is passed from "Main" to "Report", ignore the warning */
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

	/**
	 * @param tipoArray swithces between the array of CAR and Moto.
	 * @param section stores the array to be maped in the "section" submenu.
	 * @param description stores the array to be maped in the "description" submenu.
	 */
	let tipoArray = tipo !== 'Moto' ? autoArray : motoArray;
	let section = grupo.value !== '' ? tipoArray.seccion[grupo.value] : [];
	let description =
		seccion.value !== '' && grupo.value !== '' && seccion.value !== 'misc'
			? tipoArray.descripciones[grupo.value][seccion.value] || []
			: [];

	/**
	 * added severeFlag and moderate flag in order to rerender the Date currently not working.
	 * @param {*} e the event is the
	 * @returns creates and sets the object "itemLista" in the array "lista" via setLista()
	 * taking in cosideration some conditions and then refreshing the radio buttons.
	 * *Also preventDefault() is used to prevent the submit button to erase everything
	 * as it is inside a <Form>
	 */

	let addToList = (e) => {
		e.preventDefault();

		let itemLista = {
			grupo: grupo.label,
			seccion: seccion.label,
			desc: descripcion.value === 'otro' ? unlistedDef : descripcion.label,
			sev: seccion.label === 'Varios' ? '' : severidad.value,
			Ord: seccion.label === 'Varios' ? 0 : severidad.order,
		};

		if (
			severidad.value !== '' &&
			grupo.value !== '' &&
			seccion.value !== '' &&
			descripcion.value !== ''
		) {
			setLista(lista.concat(itemLista));

			setGrupo({value: '', label: ''});
			setSeccion({value: '', label: ''});
			setDescripcion({value: '', label: ''});
			setUnlistedDef('');
		} else {
			alert('Todos los campos deben estar completos');
		}

		return;
	};

	/**
	 * Erases items from the defect list. Creates nuevaLista and then filters it
	 * recibing the "props" (we don´t use them, just need the param to be there
	 * so ".filter" understands that "i" is the index),
	 * and the index "i" in the array.
	 * @param {*} index the list without the item choosen by index.
	 */

	function eraseDefect(index) {
		const nuevaLista = lista.filter((props, i) => {
			return index !== i ? true : false;
		});
		setLista(nuevaLista);
	}

	/**
	 * Selects between the diferent styles to be added to each item and then creats the list.
	 * *"seccion" is not being used because ther is no need to display it right now.
	 * @param severityColour stores the clase to be added to the defect list item.
	 * @param i the index value of the array.
	 * @param props the values of the state variables to create the list.
	 * @returns the HTML code with clases to be inserted.
	 */
	function defectList(props, i) {
		/* no estoy usando seccion porque de momento no lo quiero en el render, 
		pero lo dejo por si algún día pinta que aparezca */
		const {grupo, seccion, desc, sev} = props;
		let severityColour;
		switch (sev) {
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
				severityColour = 'varios';
		}

		return (
			<tr className={`item-lista`} key={i}>
				<td className={`grupo-col ${severityColour}`}>{grupo}</td>
				<td className={`seccion-col ${severityColour}`}>{seccion}</td>
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
			<table className="lista-final print">
				<thead>
					<tr className="lista-headers">
						<th className="grupo-col">Grupo</th>
						<th className="seccion-col">Sección</th>
						<th className="descripcion-col">Descripción</th>
						<th className="severidad-col">Severidad</th>
						<th className="phantom-col"></th>
						<th className="quitar-col">Quitar</th>
					</tr>
				</thead>
				<tbody>
					{lista
						.sort(function (a, b) {
							if (a.Ord !== b.Ord) return b.Ord - a.Ord;
							if (a.grupo !== b.grupo) return a.grupo > b.grupo ? 1 : -1;
							if (a.seccion !== b.seccion)
								return a.seccion > b.seccion ? 1 : -1;
							return a.desc > b.desc ? 1 : -1;
						}) //tertiary operators used to compare numbers instead of string lenght
						.map(defectList)}
				</tbody>
			</table>
			<form className="form-radio-ext" id="no-print3">
				<h2>Severidad</h2>
				<div className="btn-package severity-c">
					{radioGeneratorArray.severity.map((item, i) => (
						<label
							className={`btn-inside ${item.class}`}
							htmlFor={item.value}
							key={item.value}>
							<input
								type="radio"
								className="rad-c"
								name="severity"
								id={item.value}
								value={item.value}
								checked={severidad.value === item.value} //determines visual efect of checked
								onChange={() => handleSeveridad(item)}
							/>
							{item.label}
						</label>
					))}
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
								<label
									className={
										grupo.value === item.value ? 'radio-checked ' : 'focus'
									}
									htmlFor={item.value}
									key={item.value}>
									<input
										type="radio"
										className="rad-c"
										name="group"
										id={item.value}
										value={item.value}
										checked={grupo.value === item.value}
										onChange={() => handleGrupo(item)}
									/>
									{item.label}
								</label>
							))}
						<label
							className={grupo.value === 'note' ? 'radio-checked' : 'focus'}
							htmlFor="note">
							<input
								type="radio"
								name="group"
								id="note"
								value="note"
								checked={grupo.value === 'note'}
								className="rad-c"
								onChange={() => {
									handleGrupo({value: 'note', label: 'Notas adcionales'});
									handleSeccion({value: 'misc', label: 'Varios'});
									handleDescripcion({value: 'otro', label: 'Otro'});
								}}
							/>
							<b>*Notas adicionales</b>
						</label>
					</div>
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{grupo.value !== 'note' ? (
							section
								.sort(function (a, b) {
									if (a.label !== b.label);
									return a.label > b.label ? 1 : -1;
								})
								.map((item, i) => (
									<label
										className={
											seccion.value === item.value ? 'radio-checked' : 'focus'
										}
										htmlFor={item.value}
										key={item.value}>
										<input
											type="radio"
											className="rad-c"
											name="section"
											id={item.value}
											value={item.value}
											checked={seccion.value === item.value}
											onChange={() => handleSeccion(item)}
										/>
										{item.label}
									</label>
								))
						) : (
							<label
								className={seccion.value === 'misc' ? 'radio-checked' : 'focus'}
								htmlFor="misc">
								<input
									type="radio"
									name="section"
									id="misc"
									value="misc"
									checked={seccion.value === 'misc'}
									className="rad-c"
									onChange={() =>
										handleSeccion({value: 'misc', label: 'Varios'})
									}
								/>
								<b>Varios</b>
							</label>
						)}
					</div>
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{seccion.value !== 'misc' &&
							description
								.sort(function (a, b) {
									if (a.label !== b.label);
									return a.label > b.label ? 1 : -1;
								})
								.map((item, i) => (
									<label
										className={
											descripcion.value === item.value
												? 'radio-checked'
												: 'focus'
										}
										htmlFor={item.value}
										key={item.value}>
										<input
											type="radio"
											className="rad-c"
											name="description"
											id={item.value}
											value={item.value}
											checked={descripcion.value === item.value}
											onChange={() => handleDescripcion(item)}
										/>
										{item.label}
									</label>
								))}
						{seccion.value.length > 0 && (
							<label
								className={
									descripcion.value === 'otro' ? 'radio-checked' : 'focus'
								}
								htmlFor="otro">
								<input
									type="radio"
									name="description"
									id="otro"
									value="otro"
									checked={descripcion.value === 'otro'}
									className="rad-c"
									onChange={() =>
										handleDescripcion({value: 'otro', label: 'Otro'})
									}
								/>
								<b>Otros</b>
							</label>
						)}
					</div>
				</div>
				<h2 className="unlisted-defect"> Defecto no listado</h2>
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
					<button className="send-btn" onClick={addToList}>
						Agregar a la lista
					</button>
				</div>
			</form>
		</>
	);
}

export default DefectList;
