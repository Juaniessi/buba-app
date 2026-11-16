/*
 * =============================================================================
 *  DefectList.jsx — Lista de defectos del informe y formulario para cargarlos
 * =============================================================================
 *
 *  Dibuja dos cosas:
 *    1. La tabla de defectos que sale en el informe impreso, ordenada de más
 *       grave a más leve. Cada fila tiene, solo en pantalla, un selector
 *       para cambiar la severidad y un botón para quitarla.
 *    2. El formulario (no se imprime) para agregar defectos, en cuatro pasos:
 *         Severidad → Grupo → Sección → Descripción → "Agregar a la lista"
 *       Las opciones de grupo, sección y descripción salen de
 *       dataArrays/carDataBase.js (o motoDataBase.js para motos).
 *       Si el defecto no está en la lista, se elige "Otros" y se escribe a
 *       mano en "Defecto no listado". "*Notas adicionales" sirve para agregar
 *       texto libre sin severidad.
 *
 *  No guarda estado propio: lo que se va eligiendo vive en Main.jsx y llega
 *  por props, junto con las funciones para cambiarlo.
 * =============================================================================
 */
import React from 'react';
import { autoArray } from '../dataArrays/carDataBase';
import { motoArray } from '../dataArrays/motoDataBase';
import trashCan from '../../assets/trash-can-solid.svg';
import { radioGeneratorArray } from '../dataArrays/radioBtnDB';
import copyBtn from '../../assets/copy-regular.svg';
import { SEVERIDADES, cambiarSeveridad, nuevaObservacion } from './observaciones';
import { esFraseAutomatica } from './observacionesAutomaticas';

/** Opción "nada elegido" para grupo, sección y descripción. */
const SIN_ELEGIR = { value: '', label: '' };

/** Color (clase CSS) de cada fila de la tabla según la severidad. */
const COLOR_DE_SEVERIDAD = {
	Leve: 'yellow',
	Moderado: 'orange',
	Grave: 'black',
};

/** Para ordenar opciones alfabéticamente por su texto. */
const porEtiqueta = (a, b) => (a.label > b.label ? 1 : -1);

/**
 * Orden de la tabla de defectos: primero los más graves (Ord más alto), y a
 * igual severidad, alfabético por grupo, sección y descripción.
 */
function ordenDeLaLista(a, b) {
	if (a.Ord !== b.Ord) return b.Ord - a.Ord;
	if (a.grupo !== b.grupo) return a.grupo > b.grupo ? 1 : -1;
	if (a.seccion !== b.seccion) return a.seccion > b.seccion ? 1 : -1;
	return a.desc > b.desc ? 1 : -1;
}

function DefectList(props) {
	const {
		tipo,
		severidad,
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
		mostrarAutomaticas,
		setMostrarAutomaticas,
		regenerarAutomaticas,
		hayTxt,
		filtrarFrasesAutomaticas,
		setFiltrarFrasesAutomaticas,
	} = props;

	// --- Opciones del panel Grupo / Sección / Descripción ---------------------
	const tipoArray = tipo !== 'Moto' ? autoArray : motoArray;

	// Con "Filtrar frases automáticas" tildado, se ocultan solo las
	// descripciones que la app ya agrega sola. Los grupos y las secciones se
	// muestran siempre (aunque se queden sin frases), porque con "Otros" se
	// puede informar cualquier otra cosa (por ejemplo, algo del ruido).

	/** Descripciones de una sección que se ofrecen en el panel. */
	const descripcionesDe = (g, s) => {
		const todas = tipoArray.descripciones[g]?.[s] || [];
		if (!filtrarFrasesAutomaticas) return todas;
		return todas.filter((d) => !esFraseAutomatica(tipo, g, s, d.value));
	};
	/** Grupos que se ofrecen en el panel (todos). */
	const grupos = tipoArray.grupo;
	/** Secciones del grupo elegido (vacío si no hay grupo). */
	const secciones = grupo.value !== '' ? tipoArray.seccion[grupo.value] || [] : [];
	/** Descripciones de la sección elegida ('misc' = notas: no tiene). */
	const descripciones =
		seccion.value !== '' && grupo.value !== '' && seccion.value !== 'misc'
			? descripcionesDe(grupo.value, seccion.value)
			: [];

	/**
	 * Los defectos que se ven (y se imprimen): todos, o solo los manuales si
	 * se destildó el filtro "Observaciones automáticas".
	 */
	const visibles = mostrarAutomaticas ? lista : lista.filter((item) => !item.automatica);

	/**
	 * Botón "Agregar a la lista": suma el defecto elegido a la lista y limpia
	 * grupo, sección, descripción y texto libre para cargar el siguiente.
	 *
	 * Las "Notas adicionales" (sección 'Varios') van sin severidad y quedan al
	 * final de la lista (Ord 0).
	 *
	 * @param {Event} e El clic. Se usa preventDefault() porque el botón está
	 *   dentro de un <form>, y sin eso el navegador recargaría la página.
	 */
	const addToList = (e) => {
		e.preventDefault();

		const completo =
			severidad.value !== '' &&
			grupo.value !== '' &&
			seccion.value !== '' &&
			descripcion.value !== '';
		if (!completo) {
			alert('Todos los campos deben estar completos');
			return;
		}

		const itemLista = nuevaObservacion({
			grupo: grupo.label,
			seccion: seccion.label,
			desc: descripcion.value === 'otro' ? unlistedDef : descripcion.label,
			severidad: severidad.value,
			esNota: seccion.label === 'Varios',
			automatica: false, // la cargó una persona
		});

		setLista(lista.concat(itemLista));
		setGrupo(SIN_ELEGIR);
		setSeccion(SIN_ELEGIR);
		setDescripcion(SIN_ELEGIR);
		setUnlistedDef('');
	};

	/**
	 * Quita un defecto de la lista.
	 *
	 * Se busca por el objeto en sí (no por su posición), porque la tabla
	 * muestra la lista ordenada y la posición en pantalla puede no coincidir
	 * con la posición en `lista`.
	 *
	 * @param {object} defecto El defecto a quitar.
	 */
	function eraseDefect(defecto) {
		setLista(lista.filter((item) => item !== defecto));
	}

	/**
	 * Selector de severidad de una fila: cambia la severidad de ese defecto.
	 * La tabla se reordena sola (de más grave a más leve).
	 *
	 * @param {object} defecto El defecto a cambiar.
	 * @param {string} severidad La severidad elegida.
	 */
	function cambiarSeveridadDe(defecto, severidad) {
		setLista(cambiarSeveridad(lista, defecto, severidad));
	}

	/**
	 * Botón "Copiar descripciones para SIRTO": copia al portapapeles, en una
	 * sola línea, las descripciones de los defectos graves y moderados que se
	 * ven en la tabla, para pegarlas en el sistema SIRTO.
	 */
	function copyListDesc() {
		const texto = visibles
			.filter((item) => item.sev === 'Grave' || item.sev === 'Moderado')
			.map((item) => item.desc)
			.join(' ');
		if (texto !== '') {
			navigator.clipboard?.writeText(texto);
		}
	}

	/**
	 * Una fila de la tabla de defectos.
	 *
	 * @param {object} defecto { grupo, seccion, desc, sev, Ord, automatica }
	 * @param {number} i Posición en la tabla (la usa React como `key`).
	 */
	function filaDeDefecto(defecto, i) {
		const { grupo, seccion, desc, sev, automatica } = defecto;
		const color = COLOR_DE_SEVERIDAD[sev] ?? 'varios'; // 'varios' = notas

		return (
			<tr className={`item-lista`} key={i} data-automatica={automatica ? 'si' : 'no'}>
				<td className={`grupo-col ${color}`}>{grupo}</td>
				<td className={`seccion-col ${color}`}>{seccion}</td>
				<td className={`descripcion-col ${color}`}>{desc}</td>
				<td className={`severidad-col ${color}`}>{sev}</td>
				<td className="phantom-col"></td>
				<td className="erase-btn-ctn">
					{/* Marca de observación automática (no se imprime) */}
					{automatica && (
						<small className="marca-auto" title="Observación automática: se calcula a partir del .txt">
							auto
						</small>
					)}
					{/* Cambiar severidad (no se imprime; las notas no tienen) */}
					{sev !== '' && (
						<select
							className="severidad-select"
							aria-label="Cambiar severidad"
							title="Cambiar severidad"
							value={sev}
							onChange={(e) => cambiarSeveridadDe(defecto, e.target.value)}>
							{SEVERIDADES.map((s) => (
								<option key={s.value} value={s.value}>
									{s.label}
								</option>
							))}
						</select>
					)}
					<button className="erase-btn" onClick={() => eraseDefect(defecto)}>
						<img className="trash-can" src={trashCan} alt="Trash-can" />
					</button>
				</td>
			</tr>
		);
	}

	return (
		<>
			{/* --- Tabla de defectos (se imprime) -------------------------- */}
			<table className="lista-final print">
				<thead>
					<tr className="lista-headers">
						<th className="grupo-col">Grupo</th>
						<th className="seccion-col">Sección</th>
						<th className="descripcion-col">Descripción</th>
						<th className="severidad-col">Severidad</th>
						<th className="phantom-col"></th>
						<th className="quitar-col">Editar</th>
					</tr>
				</thead>
				{/* Se ordena una copia: `sort` modifica el array, y el estado de
				    React no se debe modificar directamente. */}
				<tbody>{[...visibles].sort(ordenDeLaLista).map(filaDeDefecto)}</tbody>
			</table>

			{/* --- Formulario para agregar defectos (no se imprime) -------- */}
			<form className="form-radio-ext" id="no-print3">
				{/* 1. Severidad */}
				<h2>Severidad</h2>
				<div className="btn-package severity-c">
					{radioGeneratorArray.severity.map((item) => (
						<label className={`btn-inside ${item.class}`} htmlFor={item.value} key={item.value}>
							<input
								type="radio"
								className="rad-c"
								name="severity"
								id={item.value}
								value={item.value}
								checked={severidad.value === item.value} // marca visualmente la opción elegida
								onChange={() => handleSeveridad(item)}
							/>
							{item.label}
						</label>
					))}
					{/* Filtro: mostrar (e imprimir) o no las observaciones automáticas */}
					<label className="btn-inside filtro-auto" htmlFor="mostrar-automaticas">
						<input
							type="checkbox"
							id="mostrar-automaticas"
							checked={mostrarAutomaticas}
							onChange={(e) => setMostrarAutomaticas(e.target.checked)}
						/>
						Observaciones automáticas
					</label>
				</div>
				<div className="wrap-label copyDesc-btn" onClick={copyListDesc}>
					Copiar descripciones para SIRTO
					<img className="reset-img" src={copyBtn} alt="copy description" />
				</div>
				{/* Regenerar: borra y vuelve a calcular solo las automáticas
				    (pide confirmación; ver Main.jsx). Sin .txt no hace nada. */}
				<button
					type="button"
					className="regenerar-btn"
					id="regenerar-btn"
					disabled={!hayTxt}
					onClick={regenerarAutomaticas}>
					Regenerar observaciones automáticas
				</button>

				{/* Filtro del panel de abajo: no ofrecer las frases automáticas */}
				<label className="filtro-frases" htmlFor="filtrar-frases-automaticas">
					<input
						type="checkbox"
						id="filtrar-frases-automaticas"
						checked={filtrarFrasesAutomaticas}
						onChange={(e) => setFiltrarFrasesAutomaticas(e.target.checked)}
					/>
					Filtrar frases automáticas
					<small>
						{' '}
						(en Grupo, Sección y Descripción no aparecen las frases que la app ya agrega sola)
					</small>
				</label>

				<div className="variable-btn">
					{/* 2. Grupo (más la opción especial "*Notas adicionales") */}
					<div className="btn-package col-class group-c">
						<h3>Grupo</h3>
						{[...grupos].sort(porEtiqueta).map((item) => (
							<label
								className={grupo.value === item.value ? 'radio-checked ' : 'focus'}
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
						{/* Notas: elige de una vez grupo, sección 'Varios' y
						    descripción 'Otro', y se escribe en "Defecto no listado". */}
						<label className={grupo.value === 'note' ? 'radio-checked' : 'focus'} htmlFor="note">
							<input
								type="radio"
								name="group"
								id="note"
								value="note"
								checked={grupo.value === 'note'}
								className="rad-c"
								onChange={() => {
									handleGrupo({ value: 'note', label: 'Notas adicionales' });
									handleSeccion({ value: 'misc', label: 'Varios' });
									handleDescripcion({ value: 'otro', label: 'Otro' });
								}}
							/>
							<b>*Notas adicionales</b>
						</label>
					</div>

					{/* 3. Sección del grupo elegido */}
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{grupo.value !== 'note' ? (
							[...secciones].sort(porEtiqueta).map((item) => (
								<label
									className={seccion.value === item.value ? 'radio-checked' : 'focus'}
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
							<label className={seccion.value === 'misc' ? 'radio-checked' : 'focus'} htmlFor="misc">
								<input
									type="radio"
									name="section"
									id="misc"
									value="misc"
									checked={seccion.value === 'misc'}
									className="rad-c"
									onChange={() => handleSeccion({ value: 'misc', label: 'Varios' })}
								/>
								<b>Varios</b>
							</label>
						)}
					</div>

					{/* 4. Descripción de la sección elegida, más "Otros" */}
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{seccion.value !== 'misc' &&
							[...descripciones].sort(porEtiqueta).map((item) => (
								<label
									className={descripcion.value === item.value ? 'radio-checked' : 'focus'}
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
							<label className={descripcion.value === 'otro' ? 'radio-checked' : 'focus'} htmlFor="otro">
								<input
									type="radio"
									name="description"
									id="otro"
									value="otro"
									checked={descripcion.value === 'otro'}
									className="rad-c"
									onChange={() => handleDescripcion({ value: 'otro', label: 'Otro' })}
								/>
								<b>Otros</b>
							</label>
						)}
					</div>
				</div>

				{/* Texto libre para "Otros" y para las notas */}
				<h2 className="unlisted-defect"> Defecto no listado</h2>
				<div className="unlisted-ctn">
					<label htmlFor="unlisted-defect" className="unlisted-defect">
						Seleccióne grupo al que pertenece la falla, luego el seleccione la opción "Otros" y
						finalmente escriba el defecto:
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
