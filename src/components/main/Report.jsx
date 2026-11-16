/*
 * =============================================================================
 *  Report.jsx — El informe que se imprime, y los botones para armarlo
 * =============================================================================
 *
 *  Dibuja, de arriba hacia abajo:
 *    1. Los botones para cargar el .txt, cargar la foto e imprimir.
 *    2. El informe: una imagen de fondo con el dibujo del vehículo
 *       (informe-img/*.svg), y encima, en posiciones fijas definidas en
 *       styles/informeStyle.scss, cada medición con su calificación (A, L, M o
 *       G). Hay una versión para motos y otra para el resto.
 *    3. La lista de defectos y el formulario para agregarlos (DefectList).
 *
 *  No guarda estado propio: todo lo recibe de Main.jsx como props.
 *  Las reglas para calificar cada medición y calcular el vencimiento están en
 *  evaluaciones.js; qué dato del .txt va en cada casillero, en
 *  dataArrays/reportArrays.js.
 * =============================================================================
 */
import React from 'react';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import minibusReport from '../../assets/informe-img/informe-minibus.svg';
import DefectList from './DefectList';
import Referencias from './Referencias';
import printSolid from '../../assets/print-solid.svg';
import fileArrow from '../../assets/file-arrow-up-solid.svg';
import fileImage from '../../assets/file-image-solid.svg';
import MajorMarker from './MajorMarker';
import {
	evaluarMenorOIgual,
	evaluarMayorOIgual,
	evaluarRango,
	evaluarRuido,
	evaluarHC,
	evaluarCO,
	evaluarHCMoto,
	fechaDeInicio,
	calcularVencimiento,
	formatearFecha,
	esFechaValida,
} from './evaluaciones';

/** Imagen de fondo del informe según el tipo de vehículo. */
const IMAGEN_DEL_INFORME = {
	Auto: carReport,
	Camioneta: pickupReport,
	Camion: truckReport,
	Moto: motoReport,
	Minibus: minibusReport,
};

/**
 * Muestra la calificación de una medición: la letra (A, L, M o G) con la
 * clase CSS que la pinta del color de su severidad.
 *
 * @param {{resultado: {clase: string, letra: string}|undefined}} props
 *   El resultado de una de las funciones evaluar... de evaluaciones.js.
 */
function Nota({ resultado }) {
	if (!resultado) return null;
	return <span className={resultado.clase}>{resultado.letra}</span>;
}

function Report(props) {
	const {
		tipo,
		loadFileRef,
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
		filtrarFrasesAutomaticas,
		setFiltrarFrasesAutomaticas,
		handleTxtRender,
		reportArray,
		engineType,
		truckSize,
		transmisionType,
		imgUpload,
		onImageChange,
		loadImgRef,
		dateCalcBtn,
		selectValidity,
		txtRender,
		rtoType,
		inicioVigencia,
		primeraRevision,
	} = props;

	// -------------------------------------------------------------------------
	//  Calificaciones y fechas
	// -------------------------------------------------------------------------
	//  Las reglas (límites de cada medición y cálculo del vencimiento) están en
	//  evaluaciones.js. Acá solo se las usa para dibujar el informe.

	/** Año de fabricación del .txt: define los límites de ruido y de gases. */
	const año = txtRender === null ? '' : txtRender.header.añoDeFabricacion;

	/** Fecha de la revisión (inicio de la vigencia), o '' si no hay .txt. */
	const startDate = fechaDeInicio(txtRender);

	/**
	 * Las fechas de la franja de arriba: INICIO y FIN.
	 *
	 * En una revisión normal, INICIO es el día de la revisión. En una segunda
	 * revisión, en el lugar de INICIO van las dos fechas, una debajo de la
	 * otra: arriba, más chica, la de la primera ("1ª 6/11/2026") y abajo la de
	 * la segunda ("2ª 16/11/2026"). Entran justo en el hueco del dibujo: si se
	 * agrandan, se pisan con el título o con la "/" de FIN.
	 *
	 * El vencimiento (FIN) se cuenta desde inicioVigencia (lo decide Main.jsx:
	 * en una segunda revisión Apto, desde la primera).
	 * @returns {JSX.Element}
	 */
	function dateStamper() {
		// Sin vigencia elegida (no se pudo calcular sola), un Apto no tiene
		// vencimiento todavía: queda en blanco hasta que se elija.
		// Sin fecha de revisión en el .txt, tampoco hay vencimiento.
		const sinVigencia =
			(dateCalcBtn.value === 'Apto' && !selectValidity) || !esFechaValida(inicioVigencia);
		const dueDate = sinVigencia
			? null
			: calcularVencimiento(inicioVigencia, rtoType.value, dateCalcBtn.value, selectValidity?.value);
		return (
			<div className="date">
				{primeraRevision ? (
					<>
						<p className="start-date primera">1ª {formatearFecha(primeraRevision)}</p>
						<p className="start-date segunda">2ª {formatearFecha(startDate)}</p>
					</>
				) : (
					<p className="start-date">{formatearFecha(inicioVigencia)}</p>
				)}
				<p className="end-date">{dueDate ? formatearFecha(dueDate) : ''}</p>
			</div>
		);
	}

	// -------------------------------------------------------------------------
	//  Imprimir
	// -------------------------------------------------------------------------

	/**
	 * Botón "Imprimir informe".
	 *
	 * Si hay un .txt cargado, primero copia la patente al portapapeles: así, al
	 * guardar el PDF, alcanza con Ctrl+V para ponerle la patente como nombre
	 * de archivo. Después abre el diálogo de impresión del navegador.
	 *
	 * Se copia la patente con el "_2" si el .txt lo traía ("OMC542_2"), o
	 * agregándoselo si la app detectó una segunda revisión: así el PDF de la
	 * segunda revisión no pisa al de la primera.
	 *
	 * Si no se puede copiar (por ejemplo, porque el navegador no dio permiso),
	 * igual imprime. Antes, en ese caso, no imprimía; y sin .txt cargado el
	 * botón no hacía nada.
	 */
	function copyThenPrint() {
		if (!txtRender) {
			window.print();
			return;
		}
		const { patente, patenteDelArchivo } = txtRender.header;
		const nombreDelPdf =
			patenteDelArchivo !== patente || !primeraRevision ? patenteDelArchivo : `${patente}_2`;
		navigator.clipboard
			.writeText(nombreDelPdf)
			.catch((error) => {
				console.error(`No se pudo copiar la patente: ${error}`);
			})
			.finally(() => {
				window.print();
			});
	}

	// -------------------------------------------------------------------------
	//  Pantalla
	// -------------------------------------------------------------------------
	//  Los id "no-print..." y la clase "print" deciden qué se ve al imprimir
	//  (ver las reglas @media print en styles/).

	return (
		<>
			{/* --- Botones: cargar .txt, cargar foto, imprimir (no se imprimen) --- */}
			<div className="insert-btn-cont" id="no-print2">
				<div className="btn-txt-render-container">
					<label
						htmlFor="file-input"
						id="file-input-label"
						className="wrap-label">
						Seleccione archivo txt a procesar:
						<img src={fileArrow} alt="upload file" className="upload-btn-img" />
						<input
							className="btn-input"
							ref={loadFileRef}
							type="file"
							id="file-input"
							name="file-input"
							accept="text/plain"
							onChange={handleTxtRender}
						/>
					</label>
				</div>
				<div className="btn-txt-render-container">
					<label htmlFor="image_uploads" className="wrap-label">
						Seleccione la foto del vehículo:
						<img src={fileImage} alt="upload img" className="upload-btn-img" />
						<input
							className="btn-input"
							ref={loadImgRef}
							type="file"
							id="image_uploads"
							name="image_uploads"
							accept=".jpg, .jpeg, .png"
							onChange={onImageChange}
						/>
					</label>
				</div>
				<label className="wrap-label" htmlFor="print-btn">
					{' '}
					Imprimir informe:
					<button
						className="print-btn"
						id="print-btn"
						onClick={() => {
							copyThenPrint();
						}}>
						<img src={printSolid} alt="printer" />
					</button>
				</label>
			</div>
			{/* --- El informe (lo que se imprime) ------------------------------ */}
			<section className="finalReport print">
				<>
					{/* Fondo: dibujo del vehículo con los casilleros vacíos */}
					<img
						className="report-img"
						src={IMAGEN_DEL_INFORME[tipo] ?? carReport}
						alt="Report background mold"
					/>
					<img className="car-photo" src={imgUpload} alt="Foto del vehiculo" />

					{/* Mediciones: sin .txt no se muestra nada. Cada casillero tiene
					    el valor medido (item.ruta) y, al lado, su calificación
					    (<Nota>). Las clases CSS los ubican sobre el dibujo. */}
					{reportArray === '' ? (
						''
					) : tipo !== 'Moto' ? (
						/* --- Versión para autos, camionetas, camiones y colectivos --- */
						<article className="txtRenderAuto">
							<div className="header-info">
								{reportArray.headerInfo.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="alineation">
								{reportArray.alineation.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarRango(item.ruta, 'alin')} />
										</p>
									</div>
								))}
							</div>
							<div className="weight">
								{reportArray.weight.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="suspention">
								{reportArray.suspention.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarRango(item.ruta, 'susp', truckSize.value)} />
										</p>
									</div>
								))}
							</div>
							<div className="brake">
								<div className="performance">
									{reportArray.brakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'brakePerf')} />
											</p>
										</div>
									))}
									{reportArray.handBrakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'handBrakePerf')} />
											</p>
										</div>
									))}
								</div>
								<div className="difference">
									{reportArray.brakeDifDel.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'brakeDifDel')} />
											</p>
										</div>
									))}
									{reportArray.brakeDifTra.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'brakeDifTra')} />
											</p>
										</div>
									))}
								</div>
								<div className="strength">
									{reportArray.brakeStrenghtFront.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'brakeStrenghtFront')} />
											</p>
										</div>
									))}
									{reportArray.brakeStrenghtRear.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'brakeStrenghtRear')} />
											</p>
										</div>
									))}
								</div>
								<div className="resistance-rod">
									{reportArray.brakeResist.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota
													resultado={evaluarMayorOIgual(item.ruta, 'brakeResist', {
														truckSize: truckSize.value,
														transmisionType: transmisionType.value,
													})}
												/>
											</p>
										</div>
									))}
								</div>
								<div className="ovality">
									{reportArray.brakeOval.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'brakeOval')} />
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="lux-meter">
								<div className="intensity">
									{reportArray.luxLow.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxLow')} />
											</p>
										</div>
									))}
									{reportArray.luxHigh.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxHigh')} />
											</p>
										</div>
									))}
								</div>
								<div className="alineationLux">
									{reportArray.luxAng.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxAng')} />
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="decibel-meter">
								{reportArray.soundInt.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarRuido(item.ruta, año, tipo)} />
										</p>
									</div>
								))}
							</div>
							{/* Opacidad -1 = no se midió opacidad (normalmente un motor
							    naftero): en su lugar se muestran los gases CO y HC.
							    Si hay medición de opacidad (diésel), se muestra esa. */}
							{txtRender.opacimetro.resultadoMedicionOpacidad ===
							-1 ? (
								<div className="gases">
									{reportArray.carbonMonoxide.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarCO(item.ruta, año)} />
											</p>
										</div>
									))}
									{reportArray.hydroCarbon.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarHC(item.ruta, año)} />
											</p>
										</div>
									))}
									{/* Los óxidos de nitrógeno (NOx) no se muestran: el dato está en
									    reportArrays.js (nitrogenOxides) por si se quiere volver a mostrar. */}
								</div>
							) : (
								<div className="opacimeter">
									{reportArray.opacity.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'opacity')} />
											</p>
										</div>
									))}
								</div>
							)}
							<div className="date">{dateStamper()}</div>
						</article>
					) : (
						/* --- Versión para motos ----------------------------------- */
						<article className="txtRenderMoto">
							<div className="header-info">
								{reportArray.headerInfo.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="weight">
								{reportArray.weight.map((item, i) => (
									<p className={item.class} key={i}>
										{item.ruta}
									</p>
								))}
							</div>
							<div className="suspention">
								{reportArray.suspention.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarRango(item.ruta, 'susp')} />
										</p>
									</div>
								))}
							</div>
							<div className="brake">
								<div className="performance">
									{reportArray.brakePerf.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'brakePerf')} />
											</p>
										</div>
									))}
								</div>
								<div className="strength">
									{reportArray.brakeStrenght.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMenorOIgual(item.ruta, 'brakeStrenghtMoto')} />
											</p>
										</div>
									))}
								</div>
								<div className="resistance-rod">
									{reportArray.brakeResist.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'brakeResist')} />
											</p>
										</div>
									))}
								</div>
								<div className="ovality">
									{reportArray.brakeOval.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'brakeOval')} />
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="lux-meter">
								<div className="intensity">
									{reportArray.luxLow.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxLow')} />
											</p>
										</div>
									))}
									{reportArray.luxHigh.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxHigh')} />
											</p>
										</div>
									))}
								</div>
								<div className="alineationLux">
									{reportArray.luxAng.map((item, i) => (
										<div key={i}>
											<p className={item.class}>{item.ruta}</p>
											<p className={item.classEval}>
												<Nota resultado={evaluarMayorOIgual(item.ruta, 'luxAng')} />
											</p>
										</div>
									))}
								</div>
							</div>
							<div className="decibel-meter">
								{reportArray.soundInt.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarRuido(item.ruta, año, tipo)} />
										</p>
									</div>
								))}
							</div>
							<div className="gases">
								{reportArray.carbonMonoxide.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarMayorOIgual(item.ruta, 'CO-Moto')} />
										</p>
									</div>
								))}
								{reportArray.hydroCarbon.map((item, i) => (
									<div key={i}>
										<p className={item.class}>{item.ruta}</p>
										<p className={item.classEval}>
											<Nota resultado={evaluarHCMoto(item.ruta, engineType.value)} />
										</p>
									</div>
								))}
								{/* Los óxidos de nitrógeno (NOx) no se muestran: el dato está en
								    reportArrays.js (nitrogenOxides) por si se quiere volver a mostrar. */}
							</div>
							<div className="date">{dateStamper()}</div>
						</article>
					)}
				</>
				<p className={`result-rto ${dateCalcBtn.value}`}>
					Resultado RTO: {dateCalcBtn.label}
				</p>
				{/* Asteriscos sobre la rueda que frena menos, cuando la diferencia
				    entre lados es grande (ver MajorMarker.jsx) */}
				<MajorMarker txtRender={txtRender} tipo={tipo} />
				{/* Lista de defectos y formulario para agregarlos */}
				<DefectList
					tipo={tipo}
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
					// Para el encabezado de la hoja 2 (si las observaciones no entran)
					patente={txtRender ? txtRender.header.patente : ''}
					fecha={formatearFecha(startDate)}
					transportePasajeros={rtoType.value === 'traPas'}
				/>
				{/* Referencias: qué significa cada severidad (ver Referencias.jsx) */}
				<Referencias />
			</section>
			{/* Marca de agua "Transporte de pasajeros" sobre todo el informe */}
			{rtoType.value === 'traPas' ? (
				<div className="marca-de-agua">Transporte de pasajeros</div>
			) : (
				''
			)}
		</>
	);
}
export default Report;
