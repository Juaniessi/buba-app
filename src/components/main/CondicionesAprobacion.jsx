/*
 * =============================================================================
 *  CondicionesAprobacion.jsx — Botón "Condiciones de aprobación" y su hoja
 * =============================================================================
 *
 *  Botón verde lima a la derecha del informe (no se imprime). Al tocarlo se
 *  oscurece la pantalla y aparece una hoja con:
 *    1. Cómo se decide el resultado (Apto, Condicional, Rechazado) y qué es
 *       un defecto Leve.
 *    2. Qué valor de cada medición da Leve (L), Condicional (M) o Rechazado
 *       (G), para autos y similares y para motos.
 *    3. Qué cosas se califican en el informe pero no cambian el resultado.
 *
 *  Los números NO están escritos acá: salen de las tablas de evaluaciones.js
 *  (y de FUERZA_MINIMA_KN). Si cambia un límite allá, la hoja se actualiza
 *  sola.
 *
 *  Se cierra con la X, tocando afuera de la hoja o con la tecla Escape. El
 *  botón "Imprimir / PDF" la imprime sola, en una página A4.
 * =============================================================================
 */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LIMITES_MAYOR_O_IGUAL as MAYOR, LIMITES_MENOR_O_IGUAL as MENOR, LIMITES_RANGO as RANGO } from './evaluaciones';
import { FUERZA_MINIMA_KN } from './observacionesAutomaticas';
import printSolid from '../../assets/print-solid.svg';

/** Número como se escribe acá: con coma decimal (0.25 → "0,25"). */
const num = (n) => String(n).replace('.', ',');

/** Columnas L, M y G de una medición donde un valor bajo es malo. */
const menor = (limite) => {
	const [g, m, l] = MENOR[limite];
	return [`≤ ${num(l)}`, `≤ ${num(m)}`, `≤ ${num(g)}`];
};

/** Columnas L, M y G de una medición donde un valor alto es malo. */
const mayor = (limite) => {
	const [g, m, l] = MAYOR[limite];
	return [`≥ ${num(l)}`, `≥ ${num(m)}`, `≥ ${num(g)}`];
};

/** Columnas L, M y G de una medición que tiene que quedar dentro de un rango. */
const rango = (limite) => {
	const [gAbajo, gArriba, mAbajo, mArriba, lAbajo, lArriba] = RANGO[limite];
	return [
		`≤ ${num(lAbajo)} o ≥ ${num(lArriba)}`,
		`≤ ${num(mAbajo)} o ≥ ${num(mArriba)}`,
		`≤ ${num(gAbajo)} o ≥ ${num(gArriba)}`,
	];
};

/**
 * Varias filas de límites que dependen del año (o del motor), en una sola
 * celda, un renglón por año: "hasta 1991: ≥ 900", "1992–94: ≥ 600"…
 *
 * @param {[string, string][]} filas [etiqueta, nombre de la fila en MAYOR]
 * @returns {[string, string, string]} Columnas L, M y G.
 */
const porAño = (filas) => {
	// Cada fila de MAYOR es [grave, moderado, leve]
	const columna = (i) =>
		filas.map(([etiqueta, limite]) => `${etiqueta}: ≥ ${num(MAYOR[limite][i])}`).join('\n');
	return [columna(2), columna(1), columna(0)];
};

/** Mediciones de autos, camionetas, camiones y colectivos. [medición, L, M, G] */
const FILAS_AUTO = [
	['Rendimiento del freno de servicio, por eje (%)', ...menor('brakePerf')],
	['Rendimiento del freno de mano (%)', ...menor('handBrakePerf')],
	['Diferencia de frenado, eje delantero (%)', ...mayor('brakeDifDel')],
	['Diferencia de frenado, eje trasero y freno de mano (%)', ...mayor('brakeDifTra')],
	['Fuerza mínima por eje (suma de las dos ruedas)', '—', `< ${num(FUERZA_MINIMA_KN)} kN`, '—'],
	['Ovalidad o alabeo, por rueda', ...mayor('brakeOval')],
	['Resistencia a la rodadura, por rueda (no aplica a 4x4 ni camión grande)', ...mayor('brakeResist')],
	['Suspensión, por rueda (%) (no aplica a camión grande)', ...rango('susp')],
	['Alineación, por eje (m/km)', ...rango('alin')],
	['Luces baja y alta (vacío o 0 = quemada)', 'Una sola del par quemada', 'Las dos del par quemadas', '—'],
	['Alineación de faros', ...mayor('luxAng')],
	['Opacidad (diésel)', ...mayor('opacity')],
	['CO, según año de fabricación', ...porAño([['hasta 1991', 'CO<=1991'], ['1992–94', 'CO<=1994'], ['desde 1995', 'CO>1994']])],
	['HC (ppm), según año de fabricación', ...porAño([['hasta 1991', 'HC<=1991'], ['1992–94', 'HC<=1994'], ['desde 1995', 'HC>1994']])],
	['Ruido de autos, camionetas y colectivos', ...porAño([['hasta 1997', 'noiseAutoMotoViejo'], ['desde 1998', 'noiseAutoMotoNuevo']])],
	['Ruido de camiones', ...porAño([['hasta 1997', 'noiseCamionViejo'], ['desde 1998', 'noiseCamionNuevo']])],
];

/** Mediciones de motos. [medición, L, M, G] */
const FILAS_MOTO = [
	['Rendimiento de frenado, por eje (%)', ...menor('brakePerf')],
	['Ovalidad o alabeo', ...mayor('brakeOval')],
	['Resistencia a la rodadura', ...mayor('brakeResist')],
	['Suspensión (%)', ...rango('susp')],
	['Luz baja o alta en 0', '—', 'Sí', '—'],
	['Alineación del faro', ...mayor('luxAng')],
	['CO', ...mayor('CO-Moto')],
	['HC (ppm), según motor', ...porAño([['4 tiempos', 'HC-4T'], ['2 tiempos', 'HC-2T']])],
	['Ruido', ...porAño([['hasta 1997', 'noiseAutoMotoViejo'], ['desde 1998', 'noiseAutoMotoNuevo']])],
];

/** Tabla de mediciones con sus columnas Leve, Condicional y Rechazado. */
function TablaDeLimites({ filas }) {
	return (
		<table className="condiciones-tabla">
			<thead>
				<tr className="lista-headers">
					<th>Medición</th>
					<th className="yellow">Leve (L)</th>
					<th className="orange">Condicional (M)</th>
					<th className="black">Rechazado (G)</th>
				</tr>
			</thead>
			<tbody>
				{filas.map(([medicion, l, m, g]) => (
					<tr key={medicion}>
						<td>{medicion}</td>
						<td>{l}</td>
						<td>{m}</td>
						<td>{g}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

/** Margen de la hoja impresa, en mm (tiene que coincidir con @page condiciones). */
const MARGEN_MM = 6;
/** Hoja A4 en píxeles CSS (96 por pulgada), descontando los márgenes. */
const MM_A_PX = 96 / 25.4;
const ANCHO_UTIL_PX = (210 - 2 * MARGEN_MM) * MM_A_PX;
const ALTO_UTIL_PX = (297 - 2 * MARGEN_MM) * MM_A_PX;

/**
 * Botón "Imprimir / PDF" de la hoja: imprime solo esta hoja, en un A4 con
 * márgenes estrechos y escalada (más grande o más chica) para que ocupe el
 * ancho y entre en una sola
 * página (los estilos están en @media print, informeStyle.scss).
 *
 * Mientras se imprime, <body> lleva la clase "imprimiendo-condiciones", que
 * oculta el resto de la app, y el título de la pestaña cambia para que el PDF
 * se guarde como "Condiciones de aprobación.pdf".
 */
function imprimirCondiciones() {
	const hoja = document.querySelector('.condiciones-hoja');
	const escala = Math.min(ANCHO_UTIL_PX / hoja.offsetWidth, ALTO_UTIL_PX / hoja.offsetHeight);
	hoja.style.setProperty('--escala-impresion', escala.toFixed(3));

	const tituloOriginal = document.title;
	document.title = 'Condiciones de aprobación';
	document.body.classList.add('imprimiendo-condiciones');
	window.print(); // en Chrome y Firefox, espera a que se cierre el diálogo
	document.body.classList.remove('imprimiendo-condiciones');
	document.title = tituloOriginal;
}

function CondicionesAprobacion() {
	const [abierta, setAbierta] = useState(false);

	// Escape cierra la hoja.
	useEffect(() => {
		if (!abierta) return undefined;
		const alApretar = (e) => e.key === 'Escape' && setAbierta(false);
		window.addEventListener('keydown', alApretar);
		return () => window.removeEventListener('keydown', alApretar);
	}, [abierta]);

	return (
		<>
			<button
				type="button"
				className="condiciones-btn"
				id="condiciones-btn"
				onClick={() => setAbierta(true)}>
				Condiciones de aprobación
			</button>

			{abierta &&
				// Se dibuja en <body> y no dentro del informe: así no hereda las
				// posiciones fijas de los p, table, etc. de .finalReport.
				createPortal(
				// Fondo oscuro: tocarlo cierra la hoja (tocar la hoja, no).
				<div className="condiciones-fondo" onClick={() => setAbierta(false)}>
					<div
						className="condiciones-hoja"
						role="dialog"
						aria-modal="true"
						aria-labelledby="condiciones-titulo"
						onClick={(e) => e.stopPropagation()}>
						<div className="hoja-encabezado">
							<span id="condiciones-titulo">Condiciones de aprobación</span>
							<span className="condiciones-acciones">
								<button
									type="button"
									className="condiciones-imprimir"
									id="condiciones-imprimir"
									onClick={imprimirCondiciones}>
									<img src={printSolid} alt="" /> Imprimir / PDF
								</button>
								<button
									type="button"
									className="condiciones-cerrar"
									aria-label="Cerrar"
									onClick={() => setAbierta(false)}>
									✕
								</button>
							</span>
						</div>

						<p className="hoja-titulo">Cómo se decide el resultado</p>
						<table className="condiciones-tabla condiciones-resultado">
							<tbody>
								<tr>
									<td className="black">Rechazado</td>
									<td>Hay al menos un defecto <b>Grave</b>.</td>
								</tr>
								<tr>
									<td className="orange">Condicional</td>
									<td>No hay ningún Grave, pero hay al menos un <b>Moderado</b>.</td>
								</tr>
								<tr>
									<td className="Apto">Apto</td>
									<td>Solo hay defectos Leves, o ninguno.</td>
								</tr>
								<tr>
									<td className="yellow">Leve</td>
									<td>
										No cambia el resultado: sale en el informe para que se arregle antes de la
										próxima revisión.
									</td>
								</tr>
							</tbody>
						</table>
						<p className="condiciones-nota">
							Se calcula con la lista de defectos: las observaciones automáticas más las
							cargadas a mano. Vale con el resultado en “Automático”; “Solo informe” se elige
							a mano.
						</p>

						<p className="hoja-titulo">Autos, camionetas, camiones y colectivos</p>
						<TablaDeLimites filas={FILAS_AUTO} />

						<p className="hoja-titulo">Motos</p>
						<TablaDeLimites filas={FILAS_MOTO} />

						<p className="hoja-titulo">Se califican en el informe, pero no cambian el resultado</p>
						<ul className="condiciones-nota">
							<li>Fuerza de frenado de cada rueda.</li>
							<li>Luces auxiliares.</li>
							<li>Intensidad alta de las luces (solo cuenta la luz quemada).</li>
						</ul>
						<p className="condiciones-nota">
							Si alguna de esas tiene que pesar, cargá el defecto a mano con su severidad.
						</p>
					</div>
				</div>,
					document.body
				)}
		</>
	);
}

export default CondicionesAprobacion;
