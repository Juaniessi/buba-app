/*
 * =============================================================================
 *  Main.jsx — Formulario principal y "dueño" del estado de la app
 * =============================================================================
 *
 *  Este componente:
 *    1. Guarda todo lo que eligió la persona (tipo de vehículo, resultado,
 *       vigencia, defectos cargados, el .txt leído, la foto...) en un único
 *       objeto de estado.
 *    2. Dibuja la parte de arriba del formulario: tipo de vehículo, tipo de
 *       RTO, motor / tamaño / tracción, resultado y vigencia.
 *    3. Le pasa todo a <Report>, que dibuja el informe, la carga de archivos
 *       y la lista de defectos.
 *
 *  Para entender el estado, empezar por ESTADO_INICIAL (justo abajo): ahí está
 *  cada campo con su valor al abrir la app y una explicación de para qué sirve.
 * =============================================================================
 */
import React, { useState, useRef } from 'react';
import Report from './Report';
import { leerArchivoTxt } from '../txt-navegator/fileAnalizer.js';
import { generarObservacionesAutomaticas } from './observacionesAutomaticas';
import { resultadoSegunDefectos } from './observaciones';
import { calcularVigenciaParticular, calcularVigenciaTransporte, vigenciaPlataforma } from './vigencia';
import { fechaDeInicio, fechaDePrimeraRevision, formatearFecha } from './evaluaciones';

/** Aviso que se muestra antes de regenerar las observaciones automáticas. */
const AVISO_REGENERAR =
	'Se van a regenerar por completo las observaciones automáticas.\n\n' +
	'Las que cargaste a mano no se tocan, pero si cambiaste la severidad de ' +
	'alguna automática, ese cambio se pierde. Por favor, revisá las severidades.\n\n' +
	'¿Continuar?';
import { radioGeneratorArray } from '../dataArrays/radioBtnDB';
import {
	autoReportArrayFiller,
	motoReportArrayFiller,
} from '../dataArrays/reportArrays';
import resetBtnImg from '../../assets/arrow-rotate-left-solid.svg';
import WeightSum from './WeigthSum';

/** Opción "nada elegido" para grupo, sección y descripción del defecto. */
const SIN_ELEGIR = { value: '', label: '' };

/**
 * Valores con los que arranca la app, y a los que vuelve con "Reiniciar todos
 * los campos".
 *
 * Varios campos guardan la opción completa elegida ({ value, label }) y no
 * solo el valor, porque el informe muestra el `label` (por ejemplo,
 * "Resultado RTO: Apto"). Las opciones posibles están en
 * dataArrays/radioBtnDB.js.
 *
 * Para agregar un campo nuevo: sumarlo acá con su valor inicial. Así
 * "Reiniciar" lo limpia solo, sin tener que acordarse de nada más.
 */
const ESTADO_INICIAL = {
	// --- Vehículo -------------------------------------------------------------
	/** Tipo de vehículo: 'Auto', 'Camioneta', 'Camion', 'Minibus' o 'Moto'. */
	tipo: 'Auto',
	/** RTO particular o de transporte de pasajeros (cambia las vigencias posibles). */
	rtoType: { value: 'particular', label: 'Particular' },
	/** Solo motos: motor de 4 o 2 tiempos (cambia el límite de HC). */
	engineType: { value: '4T', label: '4 Tiempos' },
	/**
	 * Solo camiones y minibuses: tamaño. Con 'bigTruck', la suspensión y la
	 * resistencia a la rodadura se muestran siempre como aptas (A).
	 */
	truckSize: { value: 'smallTruck', label: 'Camión pequeño' },
	/**
	 * Solo autos y camionetas: tracción. Con '4x4', la resistencia a la
	 * rodadura se muestra siempre como apta (A).
	 */
	transmisionType: { value: '4x2', label: 'Normal' },

	// --- Resultado y vencimiento ---------------------------------------------
	/**
	 * Si está en true, el resultado se calcula solo según los defectos del
	 * informe: con alguno Grave → Rechazado; con alguno Moderado →
	 * Condicional; si no → Apto (ver resultadoSegunDefectos en
	 * observaciones.js). Pasa a false al elegir un resultado a mano.
	 */
	resultadoAutomatico: true,
	/**
	 * Resultado elegido a mano: Apto, Condicional, Rechazado o Solo informe.
	 * Solo se usa cuando resultadoAutomatico es false.
	 */
	dateCalcBtn: { value: 'Apto', label: 'Apto' },
	/** Vigencia elegida (solo se puede cambiar cuando el resultado es Apto). */
	selectValidity: { value: '1a', label: '1 año' },
	/**
	 * RTO particular: si está en true, la vigencia se calcula sola según la
	 * antigüedad del vehículo, que sale de la patente (ver vigencia.js).
	 * Pasa a false al elegir una vigencia a mano.
	 */
	vigenciaAutomatica: true,
	/**
	 * RTO particular de un vehículo de plataforma (Uber, Cabify, Maxim): la
	 * vigencia es 1 año si es 0 km o 6 meses si no, y se elige a mano.
	 */
	plataforma: false,

	// --- Defecto que se está cargando ----------------------------------------
	//  (se arma eligiendo severidad → grupo → sección → descripción, y se suma
	//  a `lista` con "Agregar a la lista"; ver DefectList.jsx)
	severidad: { value: 'Leve', label: 'Leve', order: 1 },
	grupo: SIN_ELEGIR,
	seccion: SIN_ELEGIR,
	descripcion: SIN_ELEGIR,
	/** Texto libre cuando la descripción elegida es "Otros". */
	unlistedDef: '',
	/**
	 * Defectos del informe: los que cargó la persona y los automáticos (los
	 * genera la app a partir del .txt; ver observacionesAutomaticas.js).
	 */
	lista: [],
	/**
	 * Filtro "Observaciones automáticas": si se destilda, las automáticas no
	 * se muestran ni se imprimen (pero no se borran).
	 */
	mostrarAutomaticas: true,
	/**
	 * Filtro "Filtrar frases automáticas" del panel para agregar defectos: si
	 * está tildado, Grupo / Sección / Descripción no ofrecen las frases que la
	 * app ya agrega sola (así es más fácil encontrar las demás).
	 */
	filtrarFrasesAutomaticas: true,

	// --- Archivos cargados ---------------------------------------------------
	/** Datos del .txt ya procesados (null si todavía no se cargó ninguno). */
	txtRender: null,
	/**
	 * Qué dato del .txt va en cada casillero del informe ('' si no hay .txt).
	 * Lo arman las funciones de dataArrays/reportArrays.js.
	 */
	reportArray: '',
	/** Dirección temporal de la foto del vehículo (null si no se cargó). */
	imgUpload: null,
};

/** Cómo se lee cada vigencia en los avisos. */
const TEXTO_DE_VIGENCIA = {
	'2a': '2 años',
	'1a': '1 año',
	'6m': '6 meses',
	'3m': '3 meses',
	'2m': '2 meses',
};

function Main() {
	/** Todo el estado de la app, en un solo objeto (ver ESTADO_INICIAL). */
	const [estado, setEstado] = useState(ESTADO_INICIAL);

	/**
	 * Cambia uno o varios campos del estado y deja los demás como estaban.
	 *
	 * Ejemplo: actualizar({ tipo: 'Moto', lista: [] })
	 *
	 * Usa la forma `setEstado(anterior => ...)` para que, si se llama varias
	 * veces seguidas (como hace DefectList al agregar un defecto), cada cambio
	 * se sume al anterior en lugar de pisarlo.
	 *
	 * @param {object} cambios Los campos a cambiar, con sus valores nuevos.
	 */
	const actualizar = (cambios) => {
		setEstado((anterior) => ({ ...anterior, ...cambios }));
	};

	// Para no escribir `estado.` en todos lados, sacamos cada campo a su
	// propia variable. Son solo para leer: para cambiarlos, usar actualizar().
	const {
		tipo,
		rtoType,
		engineType,
		truckSize,
		transmisionType,
		dateCalcBtn,
		resultadoAutomatico,
		selectValidity,
		vigenciaAutomatica,
		plataforma,
		severidad,
		grupo,
		seccion,
		descripcion,
		unlistedDef,
		lista,
		mostrarAutomaticas,
		filtrarFrasesAutomaticas,
		txtRender,
		reportArray,
		imgUpload,
	} = estado;

	/** Los defectos que van en el informe (respeta el filtro "Observaciones automáticas"). */
	const listaDelInforme = mostrarAutomaticas ? lista : lista.filter((item) => !item.automatica);

	/**
	 * El resultado que vale: el calculado según los defectos (en automático)
	 * o el elegido a mano. Es el que se muestra marcado y el que sale impreso.
	 */
	const resultado = resultadoAutomatico
		? radioGeneratorArray.dateCalc.find((o) => o.value === resultadoSegunDefectos(listaDelInforme))
		: dateCalcBtn;

	/**
	 * Si el .txt es de una segunda revisión, la fecha de la primera (si no,
	 * null). Ver fechaDePrimeraRevision en evaluaciones.js.
	 */
	const primeraRevision = fechaDePrimeraRevision(txtRender);

	/**
	 * Desde cuándo se cuenta la vigencia (y el vencimiento): en una segunda
	 * revisión con resultado Apto, desde la primera revisión; si no, desde el
	 * día de la revisión. Se decide solo, sin casillas: la segunda revisión se
	 * detecta con las fechas del .txt.
	 */
	const inicioVigencia =
		primeraRevision && resultado.value === 'Apto'
			? primeraRevision
			: fechaDeInicio(txtRender);

	/** Es una RTO particular de plataforma (la casilla solo vale en particular). */
	const esPlataforma = rtoType.value === 'particular' && plataforma;

	/** Las vigencias que se pueden elegir (ver radioBtnDB.js). */
	const opcionesDeVigencia =
		rtoType.value === 'traPas'
			? radioGeneratorArray.selectValidityTra
			: esPlataforma
			? radioGeneratorArray.selectValidityPlataforma
			: radioGeneratorArray.selectValidity;

	/**
	 * Vigencia automática (con un .txt cargado): qué corresponde según la
	 * patente, o por qué no se puede calcular (ver vigencia.js). La antigüedad
	 * se mide al inicio de la vigencia.
	 *   - Particular: 2 años de 3 a 7 años de antigüedad; 1 año, más de 7.
	 *   - Plataforma: no se calcula; 1 año (0 km) o 6 meses, a mano.
	 *   - Transporte de pasajeros: 3 meses hasta 10 años; 2 meses, más de 10.
	 */
	const infoVigencia = !txtRender
		? null
		: rtoType.value === 'traPas'
		? calcularVigenciaTransporte(txtRender.header.patente, inicioVigencia)
		: esPlataforma
		? vigenciaPlataforma()
		: calcularVigenciaParticular(txtRender.header.patente, inicioVigencia);

	/**
	 * La vigencia que vale: la calculada (en automático) o la elegida a mano.
	 * Es null cuando está en automático pero no se pudo calcular, o cuando la
	 * elegida no es una de las opciones de ahora (por ejemplo, después de
	 * cambiar de particular a transporte de pasajeros): no queda ninguna
	 * marcada y el vencimiento sale en blanco hasta que se elija una.
	 */
	const vigenciaElegida =
		infoVigencia && vigenciaAutomatica
			? opcionesDeVigencia.find((o) => o.value === infoVigencia.vigencia) ?? null
			: selectValidity;
	const vigencia = opcionesDeVigencia.find((o) => o.value === vigenciaElegida?.value) ?? null;

	/** Falta elegir la vigencia a mano (en automático no se pudo calcular). */
	const faltaVigencia = resultado.value === 'Apto' && vigencia === null;

	/**
	 * Referencias a los dos `<input type="file">` (el del .txt y el de la
	 * foto), que están dentro de Report. Hacen falta para vaciarlos al
	 * reiniciar: si no, elegir de nuevo el mismo archivo no dispararía el
	 * evento `change`.
	 */
	const loadFileRef = useRef(null);
	const loadImgRef = useRef(null);

	// ---------------------------------------------------------------------------
	//  Acciones
	// ---------------------------------------------------------------------------

	/** Botón "Reiniciar todos los campos": vuelve todo a ESTADO_INICIAL. */
	const resetBtn = () => {
		if (imgUpload) URL.revokeObjectURL(imgUpload); // libera la foto anterior
		setEstado(ESTADO_INICIAL);
		if (loadFileRef.current) loadFileRef.current.value = '';
		if (loadImgRef.current) loadImgRef.current.value = '';
	};

	/**
	 * Cambio de tipo de vehículo.
	 *
	 * - Vuelve motor, tamaño y tracción a sus valores iniciales (cada tipo usa
	 *   uno distinto).
	 * - Si se pasa de moto a otro tipo, o al revés, borra el informe y los
	 *   defectos: la moto tiene otro formato de informe y hay que volver a
	 *   cargar el .txt.
	 *
	 * @param {{value: string, label: string}} item La opción elegida.
	 */
	const handleTipo = (item) => {
		const cambios = {
			tipo: item.value,
			engineType: ESTADO_INICIAL.engineType,
			truckSize: ESTADO_INICIAL.truckSize,
			transmisionType: ESTADO_INICIAL.transmisionType,
		};
		if (tipo === 'Moto' || item.value === 'Moto') {
			cambios.lista = [];
			cambios.reportArray = '';
		}
		actualizar(cambios);
	};

	/**
	 * Cambio entre RTO particular y transporte de pasajeros. Vuelve la vigencia
	 * a automática y, para cuando no se puede calcular, deja elegida la más
	 * usada en cada caso: 3 meses en transporte de pasajeros y 1 año en la
	 * particular.
	 *
	 * @param {{value: string, label: string}} item La opción elegida.
	 */
	const handleSetRtoType = (item) => {
		actualizar({
			rtoType: item,
			vigenciaAutomatica: true,
			selectValidity:
				item.value === 'traPas'
					? radioGeneratorArray.selectValidityTra[0]
					: radioGeneratorArray.selectValidity[1],
		});
	};

	// --- Defecto que se está cargando (los usa DefectList) ----------------------

	const handleSeveridad = (item) => actualizar({ severidad: item });

	/** Al cambiar de grupo se borran la sección y la descripción elegidas. */
	const handleGrupo = (item) =>
		actualizar({ grupo: item, seccion: SIN_ELEGIR, descripcion: SIN_ELEGIR });

	/** Al cambiar de sección se borra la descripción elegida. */
	const handleSeccion = (item) => actualizar({ seccion: item, descripcion: SIN_ELEGIR });

	const handleDescripcion = (item) => actualizar({ descripcion: item });

	// DefectList también cambia estos campos directamente (por ejemplo, para
	// limpiarlos después de "Agregar a la lista").
	const setGrupo = (valor) => actualizar({ grupo: valor });
	const setSeccion = (valor) => actualizar({ seccion: valor });
	const setDescripcion = (valor) => actualizar({ descripcion: valor });
	const setUnlistedDef = (valor) => actualizar({ unlistedDef: valor });
	const setLista = (valor) => actualizar({ lista: valor });
	const setMostrarAutomaticas = (valor) => actualizar({ mostrarAutomaticas: valor });
	const setFiltrarFrasesAutomaticas = (valor) => actualizar({ filtrarFrasesAutomaticas: valor });

	// --- Observaciones automáticas ------------------------------------------------

	/**
	 * Calcula las observaciones automáticas de un .txt con las opciones que
	 * están elegidas ahora (tipo de vehículo, tamaño de camión, tracción, motor).
	 *
	 * @param {object} datos Los datos del .txt.
	 * @returns {object[]}
	 */
	const automaticasDe = (datos) =>
		generarObservacionesAutomaticas(datos, {
			tipo,
			truckSize: truckSize.value,
			transmisionType: transmisionType.value,
			engineType: engineType.value,
		});

	/**
	 * Botón "Regenerar observaciones automáticas": después de confirmar el
	 * aviso, borra las automáticas y las vuelve a calcular. Las que cargó la
	 * persona no se tocan. Sirve para recuperar una borrada por error, o si
	 * se cambió algo que afecta la calificación (camión grande, 4x4, motor).
	 */
	const regenerarAutomaticas = () => {
		if (!txtRender) return;
		if (!window.confirm(AVISO_REGENERAR)) return;
		actualizar({
			lista: lista.filter((item) => !item.automatica).concat(automaticasDe(txtRender)),
		});
	};

	// --- Archivos ----------------------------------------------------------------

	/**
	 * Se ejecuta cuando el usuario elige un .txt en "Seleccione archivo txt".
	 *
	 * Pasos:
	 *   1. Toma el archivo elegido. Si canceló el diálogo, no hace nada.
	 *   2. Espera (`await`) a que se lea y se procese completo.
	 *   3. Recién ahí reemplaza la lista de defectos anterior por las
	 *      observaciones automáticas del archivo nuevo, guarda los datos y
	 *      arma el informe (versión moto o versión auto).
	 *
	 * @param {Event} e El evento `change` del `<input type="file">`.
	 */
	const handleTxtRender = async (e) => {
		const archivo = e.currentTarget.files[0];
		if (!archivo) return;

		let datos;
		try {
			datos = await leerArchivoTxt(archivo);
		} catch (error) {
			console.error('No se pudo leer el archivo .txt', error);
			alert('No se pudo leer el archivo. Probá elegirlo de nuevo.');
			return;
		}

		actualizar({
			lista: automaticasDe(datos),
			txtRender: datos,
			reportArray:
				tipo === 'Moto' ? motoReportArrayFiller(datos) : autoReportArrayFiller(datos),
		});
	};

	/**
	 * Se ejecuta cuando el usuario elige la foto del vehículo. Crea una
	 * dirección temporal (blob:...) para mostrarla en el informe con <img>, y
	 * libera la de la foto anterior.
	 *
	 * @param {Event} event El evento `change` del `<input type="file">`.
	 */
	const onImageChange = (event) => {
		if (imgUpload) URL.revokeObjectURL(imgUpload);
		if (event.target.files && event.target.files[0]) {
			actualizar({ imgUpload: URL.createObjectURL(event.target.files[0]) });
		}
	};

	// ---------------------------------------------------------------------------
	//  Pantalla
	// ---------------------------------------------------------------------------

	return (
		<main>
			<form className="form-radio" id="no-print">
				<WeightSum tipo={tipo} txtRender={txtRender} />
				<div
					id="reset-btn"
					className="wrap-label reset-btn"
					htmlFor="reset-btn"
					onClick={resetBtn}>
					Reiniciar todos los campos:
					<img className="reset-img" src={resetBtnImg} alt="reset" />
				</div>

				{/* --- Tipo de vehículo ---------------------------------------- */}
				<h2>Tipo de vehículo</h2>
				<div className="btn-package">
					{radioGeneratorArray.type.map((item) => (
						<label
							className={`btn-inside ${tipo === item.value ? 'radio-checked' : ''}`}
							htmlFor={item.value}
							key={item.value}>
							<input
								type="radio"
								className="rad-c"
								name="tipo"
								id={item.value}
								value={item.value}
								checked={tipo === item.value} // marca visualmente la opción elegida
								onChange={() => handleTipo(item)}
							/>
							{item.label}
						</label>
					))}

					{/* RTO particular / transporte de pasajeros (todos los tipos) */}
					<div className="engine-and-size-ctn">
						{tipo === 'Moto' ||
						tipo === 'Auto' ||
						tipo === 'Camioneta' ||
						tipo === 'Minibus' ||
						tipo === 'Camion'
							? radioGeneratorArray.rtoType.map((item) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside transp-color" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="rtoType"
												id={item.value}
												value={item.value}
												checked={rtoType.value === item.value}
												onChange={() => handleSetRtoType(item)}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
						{/* Plataforma (solo RTO particular): cambia las vigencias */}
						{rtoType.value === 'particular' && (
							<div className="engine-and-size">
								<label
									className="btn-inside transp-color"
									htmlFor="plataforma"
									title="Uber, Cabify, Maxim: 1 año si es 0 km; 6 meses si no es 0 km.">
									<input
										type="checkbox"
										id="plataforma"
										checked={plataforma}
										onChange={(e) =>
											actualizar({ plataforma: e.target.checked, vigenciaAutomatica: true })
										}
									/>
									Plataforma (Uber, Cabify, Maxim)
								</label>
							</div>
						)}
					</div>

					{/* Opciones que dependen del tipo de vehículo */}
					<div className="engine-and-size-ctn">
						{/* Moto: motor de 4 o 2 tiempos */}
						{tipo === 'Moto'
							? radioGeneratorArray.engineType.map((item) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="engineType"
												id={item.value}
												value={item.value}
												checked={engineType.value === item.value}
												onChange={() => actualizar({ engineType: item })}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
						{/* Camión y minibus: tamaño */}
						{tipo === 'Camion' || tipo === 'Minibus'
							? radioGeneratorArray.truckSize.map((item) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="truckSize"
												id={item.value}
												value={item.value}
												checked={truckSize.value === item.value}
												onChange={() => actualizar({ truckSize: item })}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
						{/* Auto y camioneta: tracción */}
						{tipo === 'Auto' || tipo === 'Camioneta'
							? radioGeneratorArray.transmisionType.map((item) => (
									<div className="engine-and-size" key={item.value}>
										<label className="btn-inside" htmlFor={item.value}>
											<input
												type="radio"
												className="rad-c"
												name="transmisionType"
												id={item.value}
												value={item.value}
												checked={transmisionType.value === item.value}
												onChange={() => actualizar({ transmisionType: item })}
											/>
											{item.label}
										</label>
									</div>
							  ))
							: ''}
					</div>
				</div>

				{/* --- Resultado y vigencia ------------------------------------ */}
				<h3>Calcular fecha</h3>
				<div className="btn-package">
					{radioGeneratorArray.dateCalc.map((item) => (
						<label className={`btn-inside ${item.value}`} htmlFor={item.value} key={item.value}>
							<input
								type="radio"
								className={`rad-c`}
								name="dateCalcBtn"
								id={item.value}
								value={item.value}
								checked={resultado.value === item.value} // marca visualmente la opción elegida
								// Elegir un resultado a mano pasa a modo manual.
								onChange={() => actualizar({ dateCalcBtn: item, resultadoAutomatico: false })}
							/>
							{item.label}
						</label>
					))}
					{/* Automático: el resultado sigue a los defectos. Destildado (o al
					    elegir un resultado a mano) queda fijo en lo que se elija. */}
					<label
						className="btn-inside resultado-auto"
						htmlFor="resultado-automatico"
						title="Con algún defecto Grave: Rechazado. Con alguno Moderado: Condicional. Si no: Apto.">
						<input
							type="checkbox"
							id="resultado-automatico"
							checked={resultadoAutomatico}
							onChange={(e) =>
								actualizar(
									e.target.checked
										? { resultadoAutomatico: true }
										: { resultadoAutomatico: false, dateCalcBtn: resultado }
								)
							}
						/>
						Automático
					</label>{' '}
					<span>Vigencia:</span>
					{/* Las vigencias posibles cambian según el tipo de RTO.
					    Solo se pueden elegir si el resultado es Apto. */}
					{opcionesDeVigencia.map((item) => (
						<label
							className={
								resultado.value !== 'Apto'
									? 'btn-inside tooltip'
									: vigencia?.value === item.value
									? 'radio-checked btn-inside tooltip'
									: faltaVigencia
									? 'focus btn-inside tooltip falta-elegir'
									: 'focus btn-inside tooltip'
							}
							htmlFor={item.value}
							key={item.value}>
							<span className="tooltiptext">{item.tooltip}</span>

							<input
								type="radio"
								className={`rad-c`}
								disabled={resultado.value !== 'Apto'}
								name="dueDateSelector"
								id={item.value}
								value={item.value}
								checked={vigencia?.value === item.value} // marca visualmente la opción elegida
								// Elegir una vigencia a mano pasa a modo manual.
								onChange={() => actualizar({ selectValidity: item, vigenciaAutomatica: false })}
							/>
							{item.label}
						</label>
					))}
					{/* Automática: la vigencia sigue a la patente (no en plataforma,
					    que siempre se elige a mano) */}
					{!esPlataforma && (
						<label className="btn-inside resultado-auto" htmlFor="vigencia-automatica">
							<input
								type="checkbox"
								id="vigencia-automatica"
								checked={vigenciaAutomatica}
								onChange={(e) =>
									actualizar(
										e.target.checked
											? { vigenciaAutomatica: true }
											: { vigenciaAutomatica: false, selectValidity: vigencia ?? selectValidity }
									)
								}
							/>
							Automática
						</label>
					)}
				</div>

				{/* Segunda revisión: desde cuándo se cuenta la vigencia */}
				{primeraRevision && (
					<div id="aviso-segunda" className="aviso-vigencia segunda">
						<b>Segunda revisión</b>: la primera fue el {formatearFecha(primeraRevision)}. En el
						informe salen las dos fechas.
						<div className="aviso-nota">
							{resultado.value === 'Apto'
								? 'Como es Apto, la vigencia se cuenta desde la primera revisión.'
								: 'Como no es Apto, el vencimiento se cuenta desde la revisión de hoy.'}
						</div>
					</div>
				)}
				{/* Por qué la vigencia tiene el valor que tiene (solo si hay que elegirla) */}
				{infoVigencia && resultado.value === 'Apto' && (
					<p
						id="aviso-vigencia"
						className={
							!vigenciaAutomatica
								? 'aviso-vigencia manual'
								: infoVigencia.estado === 'automatica'
								? 'aviso-vigencia info'
								: 'aviso-vigencia alerta'
						}>
						{!vigenciaAutomatica
							? 'Vigencia elegida a mano.' +
							  (infoVigencia.vigencia
									? ` La automática daba ${TEXTO_DE_VIGENCIA[infoVigencia.vigencia]}.`
									: '')
							: infoVigencia.explicacion}
					</p>
				)}
				<h3>Carga de archivos e impresión</h3>
			</form>

			{/* --- Informe, carga de archivos y lista de defectos ----------- */}
			<section className="finalReport">
				<Report
					tipo={tipo}
					loadFileRef={loadFileRef}
					severidad={severidad}
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
					mostrarAutomaticas={mostrarAutomaticas}
					setMostrarAutomaticas={setMostrarAutomaticas}
					regenerarAutomaticas={regenerarAutomaticas}
					hayTxt={txtRender !== null}
					filtrarFrasesAutomaticas={filtrarFrasesAutomaticas}
					setFiltrarFrasesAutomaticas={setFiltrarFrasesAutomaticas}
					txtRender={txtRender}
					handleTxtRender={handleTxtRender}
					reportArray={reportArray}
					engineType={engineType}
					truckSize={truckSize}
					transmisionType={transmisionType}
					imgUpload={imgUpload}
					onImageChange={onImageChange}
					loadImgRef={loadImgRef}
					dateCalcBtn={resultado}
					selectValidity={vigencia}
					rtoType={rtoType}
					inicioVigencia={inicioVigencia}
					primeraRevision={primeraRevision}
				/>
			</section>
		</main>
	);
}

export default Main;
