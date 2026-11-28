/*
 * =============================================================================
 *  evaluaciones.js — Reglas del informe: límites de cada medición y vencimiento
 * =============================================================================
 *
 *  Acá están las reglas de negocio de la RTO que usa el informe:
 *
 *    1. Calificación de cada medición contra sus límites: devuelve una letra
 *       y una clase CSS que la pinta del color de la severidad.
 *           A = apto (sin defecto)   clase ''
 *           L = leve                 clase 'minor'
 *           M = moderado             clase 'moderate'
 *           G = grave                clase 'severe'
 *    2. Fecha de inicio y de vencimiento de la revisión.
 *
 *  Son funciones "puras": reciben números y textos, y devuelven un resultado,
 *  sin tocar la pantalla ni React. Por eso se pueden probar una por una (ver
 *  tests/evaluaciones.test.js). Report.jsx las usa para dibujar el informe.
 *
 *  Para cambiar un límite porque cambió la normativa: modificar el número en
 *  la tabla que corresponda (LIMITES_MENOR_O_IGUAL, LIMITES_MAYOR_O_IGUAL o
 *  LIMITES_RANGO) y correr `npm test`. Los tests que fallen muestran qué
 *  informes cambian con el límite nuevo.
 * =============================================================================
 */

// =============================================================================
//  Calificaciones posibles
// =============================================================================

/** @typedef {{ clase: string, letra: string }} Calificacion */

/** @type {Record<string, Calificacion>} */
export const CALIFICACION = {
	GRAVE: { clase: 'severe', letra: 'G' },
	MODERADO: { clase: 'moderate', letra: 'M' },
	LEVE: { clase: 'minor', letra: 'L' },
	APTO: { clase: '', letra: 'A' },
};

// =============================================================================
//  Tablas de límites
// =============================================================================
//  Cada fila es [límite grave, límite moderado, límite leve]. El nombre de la
//  fila es el que usa Report.jsx al llamar a la función correspondiente.

/**
 * Mediciones donde un valor BAJO es malo (por ejemplo, frenos que frenan poco).
 *
 * Valor ≤ grave → G; si no, ≤ moderado → M; si no, ≤ leve → L; si no → A.
 * Ejemplo con brakePerf [5, 40, 44]: 3 → G, 30 → M, 42 → L, 60 → A.
 */
export const LIMITES_MENOR_O_IGUAL = {
	/** Rendimiento del freno de servicio, por eje (%). */
	brakePerf: [5, 40, 44],
	/** Rendimiento del freno de mano (%). */
	handBrakePerf: [3, 14.4, 16],
	/** Fuerza de frenado de cada rueda del eje delantero. */
	brakeStrenghtFront: [0.15, 0.3, 0.42],
	/** Fuerza de frenado de cada rueda del eje trasero. */
	brakeStrenghtRear: [0.05, 0.3, 0.42],
	/** Fuerza de frenado de cada rueda de una moto. */
	brakeStrenghtMoto: [0.05, 0.15, 0.26],
};

/**
 * Mediciones donde un valor ALTO es malo (por ejemplo, demasiado ruido).
 *
 * Valor ≥ grave → G; si no, ≥ moderado → M; si no, ≥ leve → L; si no → A.
 * Ejemplo con opacity [5, 0.25, 0.2]: 6 → G, 0.3 → M, 0.22 → L, 0.1 → A.
 */
export const LIMITES_MAYOR_O_IGUAL = {
	/**
	 * Diferencia de frenado entre ruedas, eje delantero (%).
	 * El leve (10) es también desde dónde se marca con asterisco la rueda que
	 * frena menos (ver MajorMarker.jsx). Antes era 13.
	 */
	brakeDifDel: [90, 15.1, 10],
	/**
	 * Diferencia de frenado entre ruedas, eje trasero y freno de mano (%).
	 * El leve (12) es también desde dónde se marca con asterisco. Antes era 14.
	 */
	brakeDifTra: [95, 15.1, 12],
	/** Resistencia a la rodadura de cada rueda. */
	brakeResist: [4, 1, 0.85],
	/** Ovalidad de los discos o tambores. */
	brakeOval: [90, 50, 35],
	/** Intensidad de luz baja. */
	luxLow: [200, 60, 40],
	/** Intensidad de luz alta. */
	luxHigh: [200, 150, 85],
	/** Desvío en la alineación (ángulo) de los faros. */
	luxAng: [15, 7, 3],
	/** Opacidad de los gases (motores diésel). */
	opacity: [5, 0.25, 0.2],
	/** Hidrocarburos (ppm), vehículos fabricados hasta 1991. */
	'HC<=1991': [2500, 900, 600],
	/** Hidrocarburos (ppm), vehículos fabricados entre 1992 y 1994. */
	'HC<=1994': [2500, 600, 400],
	/** Hidrocarburos (ppm), vehículos fabricados desde 1995. */
	'HC>1994': [2500, 400, 250],
	/** Monóxido de carbono, vehículos fabricados hasta 1991. */
	'CO<=1991': [15, 4.5, 2],
	/** Monóxido de carbono, vehículos fabricados entre 1992 y 1994. */
	'CO<=1994': [15, 3, 1.5],
	/** Monóxido de carbono, vehículos fabricados desde 1995. */
	'CO>1994': [15, 2.5, 1],
	/** Ruido de autos, camionetas, colectivos y motos fabricados hasta 1997. */
	noiseAutoMotoViejo: [100, 85.1, 77],
	/** Ruido de autos, camionetas, colectivos y motos fabricados desde 1998. */
	noiseAutoMotoNuevo: [100, 80.1, 77],
	/** Ruido de camiones fabricados hasta 1997. */
	noiseCamionViejo: [100, 95.1, 85],
	/** Ruido de camiones fabricados desde 1998. */
	noiseCamionNuevo: [100, 87.1, 84],
	/** Hidrocarburos (ppm) de motos con motor de 4 tiempos. */
	'HC-4T': [4000, 3000, 1500],
	/** Hidrocarburos (ppm) de motos con motor de 2 tiempos. */
	'HC-2T': [12000, 9000, 4500],
	/** Monóxido de carbono de motos. */
	'CO-Moto': [8, 4.5, 3.5],
};

/**
 * Mediciones donde tanto un valor muy bajo como uno muy alto son malos.
 *
 * Cada fila es [grave abajo, grave arriba, moderado abajo, moderado arriba,
 * leve abajo, leve arriba].
 *
 * Valor ≤ grave abajo o ≥ grave arriba → G; si no, lo mismo con moderado → M;
 * si no, con leve → L; si no → A.
 */
export const LIMITES_RANGO = {
	/** Rendimiento de la suspensión de cada rueda (%). */
	susp: [-1, 102, 39.9, 100, 45, 99.5],
	/** Desvío de la alineación de cada eje (m/km). */
	alin: [-256, 256, -5, 5, -4, 4],
};

// =============================================================================
//  Calificar una medición
// =============================================================================

/**
 * Califica una medición donde un valor bajo es malo (ver LIMITES_MENOR_O_IGUAL).
 *
 * @param {number} valor La medición.
 * @param {keyof LIMITES_MENOR_O_IGUAL} limite Qué fila de límites usar.
 * @returns {Calificacion}
 */
export function evaluarMenorOIgual(valor, limite) {
	const [grave, moderado, leve] = LIMITES_MENOR_O_IGUAL[limite];
	if (valor <= grave) return CALIFICACION.GRAVE;
	if (valor <= moderado) return CALIFICACION.MODERADO;
	if (valor <= leve) return CALIFICACION.LEVE;
	return CALIFICACION.APTO;
}

/**
 * Califica una medición donde un valor alto es malo (ver
 * LIMITES_MAYOR_O_IGUAL).
 *
 * Excepciones: si el vehículo es 4x4 o un camión grande, el resultado es
 * siempre Apto. Report.jsx solo las pasa para la resistencia a la rodadura,
 * que en esos vehículos no se puede medir bien.
 *
 * @param {number} valor La medición.
 * @param {keyof LIMITES_MAYOR_O_IGUAL} limite Qué fila de límites usar.
 * @param {{truckSize?: string, transmisionType?: string}} [excepciones]
 * @returns {Calificacion}
 */
export function evaluarMayorOIgual(valor, limite, excepciones = {}) {
	if (excepciones.transmisionType === '4x4') return CALIFICACION.APTO;
	if (excepciones.truckSize === 'bigTruck') return CALIFICACION.APTO;

	const [grave, moderado, leve] = LIMITES_MAYOR_O_IGUAL[limite];
	if (valor >= grave) return CALIFICACION.GRAVE;
	if (valor >= moderado) return CALIFICACION.MODERADO;
	if (valor >= leve) return CALIFICACION.LEVE;
	return CALIFICACION.APTO;
}

/**
 * Califica una medición que tiene que quedar dentro de un rango (ver
 * LIMITES_RANGO).
 *
 * Excepción: en un camión grande el resultado es siempre Apto (Report.jsx lo
 * usa para la suspensión).
 *
 * @param {number} valor La medición.
 * @param {keyof LIMITES_RANGO} limite Qué fila de límites usar.
 * @param {string} [truckSize] 'smallTruck' o 'bigTruck'.
 * @returns {Calificacion}
 */
export function evaluarRango(valor, limite, truckSize) {
	if (truckSize === 'bigTruck') return CALIFICACION.APTO;

	const [graveAbajo, graveArriba, modAbajo, modArriba, leveAbajo, leveArriba] =
		LIMITES_RANGO[limite];
	if (valor <= graveAbajo || valor >= graveArriba) return CALIFICACION.GRAVE;
	if (valor <= modAbajo || valor >= modArriba) return CALIFICACION.MODERADO;
	if (valor <= leveAbajo || valor >= leveArriba) return CALIFICACION.LEVE;
	return CALIFICACION.APTO;
}

// =============================================================================
//  Luces baja y alta: se evalúan de a pares (izquierda y derecha)
// =============================================================================

/**
 * ¿La luz está quemada? Lo está si el .txt trae el casillero vacío ('') o una
 * intensidad menor a 1 (en la práctica, 0). Si el código ni siquiera viene en
 * el .txt (undefined), no se midió y no se la considera quemada.
 *
 * @param {number|''|undefined} valor Intensidad de la luz.
 * @returns {boolean}
 */
export function luzQuemada(valor) {
	if (valor === undefined) return false;
	return !(typeof valor === 'number' && valor >= 1);
}

/**
 * Califica un par de luces (las dos bajas o las dos altas):
 *   - Una quemada y la otra funciona → la quemada Leve (amarillo); la otra
 *     se califica normal con sus límites.
 *   - Las dos quemadas → las dos Moderado (naranja, Condicional).
 *   - Ninguna quemada → cada una con sus límites, como siempre.
 *
 * @param {number|''|undefined} izq Intensidad de la luz izquierda.
 * @param {number|''|undefined} der Intensidad de la luz derecha.
 * @param {'luxLow'|'luxHigh'} limite Qué fila de límites usar.
 * @returns {[Calificacion, Calificacion]} [izquierda, derecha]
 */
export function evaluarParDeLuces(izq, der, limite) {
	const quemadaIzq = luzQuemada(izq);
	const quemadaDer = luzQuemada(der);
	if (quemadaIzq && quemadaDer) return [CALIFICACION.MODERADO, CALIFICACION.MODERADO];
	return [
		quemadaIzq ? CALIFICACION.LEVE : evaluarMayorOIgual(izq, limite),
		quemadaDer ? CALIFICACION.LEVE : evaluarMayorOIgual(der, limite),
	];
}

// =============================================================================
//  Ruido y gases: los límites dependen del año de fabricación
// =============================================================================

/**
 * Corrige un año de fabricación que no tiene sentido.
 *
 * Si el .txt no trae el año ('') o trae uno fuera de 1920–2200 (por un error
 * de carga), se toma 2000, que cae en la categoría de límites "nuevos".
 *
 * @param {number|''} año
 * @returns {number}
 */
export function añoValido(año) {
	if (año === '' || año < 1920 || año > 2200) return 2000;
	return año;
}

/**
 * Califica el ruido. El límite depende del tipo de vehículo (camión o el
 * resto) y de si se fabricó hasta 1997 o después.
 *
 * @param {number} valor La medición del sonómetro.
 * @param {number|''} año Año de fabricación (del .txt).
 * @param {string} tipo 'Auto', 'Camioneta', 'Camion', 'Minibus' o 'Moto'.
 * @returns {Calificacion|undefined} undefined si el tipo no es ninguno de
 *   esos (no debería pasar: son las únicas opciones del formulario).
 */
export function evaluarRuido(valor, año, tipo) {
	const viejo = añoValido(año) <= 1997;

	if (['Auto', 'Camioneta', 'Moto', 'Minibus'].includes(tipo)) {
		return evaluarMayorOIgual(valor, viejo ? 'noiseAutoMotoViejo' : 'noiseAutoMotoNuevo');
	}
	if (tipo === 'Camion') {
		return evaluarMayorOIgual(valor, viejo ? 'noiseCamionViejo' : 'noiseCamionNuevo');
	}
	return undefined;
}

/**
 * Elige qué fila de límites de gases corresponde según el año de fabricación:
 * hasta 1991, de 1992 a 1994, o desde 1995.
 *
 * @param {number|''} año Año de fabricación (del .txt).
 * @returns {'<=1991'|'<=1994'|'>1994'}
 */
function categoriaDeGases(año) {
	const valido = añoValido(año);
	if (valido <= 1991) return '<=1991';
	if (valido <= 1994) return '<=1994';
	return '>1994';
}

/**
 * Califica los hidrocarburos (HC) de autos y demás vehículos que no son motos.
 *
 * @param {number} valor HC medido (ppm).
 * @param {number|''} año Año de fabricación.
 * @returns {Calificacion}
 */
export function evaluarHC(valor, año) {
	return evaluarMayorOIgual(valor, 'HC' + categoriaDeGases(año));
}

/**
 * Califica el monóxido de carbono (CO) de autos y demás vehículos que no son
 * motos.
 *
 * @param {number} valor CO medido.
 * @param {number|''} año Año de fabricación.
 * @returns {Calificacion}
 */
export function evaluarCO(valor, año) {
	return evaluarMayorOIgual(valor, 'CO' + categoriaDeGases(año));
}

/**
 * Califica los hidrocarburos (HC) de una moto según su tipo de motor.
 *
 * @param {number} valor HC medido (ppm).
 * @param {'4T'|'2T'} engineType Motor de 4 o 2 tiempos.
 * @returns {Calificacion|undefined}
 */
export function evaluarHCMoto(valor, engineType) {
	if (engineType === '4T') return evaluarMayorOIgual(valor, 'HC-4T');
	if (engineType === '2T') return evaluarMayorOIgual(valor, 'HC-2T');
	return undefined;
}

// =============================================================================
//  Fechas
// =============================================================================

/**
 * Fecha de la revisión, que es el inicio de la vigencia: la salida del puesto
 * 3 de la línea o, si no lo hay, la del puesto 2. En las motos, que tienen un
 * solo puesto, el puesto 2 ya viene copiado del 1 (ver fileAnalizer.js).
 *
 * @param {object|null} datos Los datos del .txt (txtRender).
 * @returns {Date|''} La fecha, o '' si todavía no se cargó un .txt.
 */
export function fechaDeInicio(datos) {
	if (datos === null) return '';
	const puestos = datos.estadísticaDePuestos;
	return puestos.fechaDeSalidaDelPuesto3 === undefined
		? puestos.fechaDeSalidaDelPuesto2
		: puestos.fechaDeSalidaDelPuesto3;
}

/**
 * Si el .txt es de una segunda revisión, devuelve la fecha de la primera.
 *
 * Cuando un vehículo vuelve después de un Condicional, se reutiliza el .txt
 * de la primera revisión (antes se lo copiaba como "PATENTE_2"; ahora el
 * programa de CVA permite buscarlo y sobrescribirlo). Los puestos de la línea
 * que se vuelven a pasar se sobrescriben con la fecha nueva, pero los que no
 * se repiten conservan la fecha de la primera revisión. Por ejemplo, en
 * OMC542_2.txt el puesto 1 dice 6/11/2026 y los puestos 2 y 3, 16/11/2026.
 *
 * Así que si alguna fecha de los puestos es de un día anterior al de la
 * revisión (ver fechaDeInicio), es una segunda revisión, y la primera es la
 * fecha más vieja.
 *
 * Limitación: si en la segunda revisión se vuelven a pasar todos los puestos,
 * no queda ninguna fecha vieja y no hay forma de saberlo desde el .txt.
 *
 * @param {object|null} datos Los datos del .txt (txtRender).
 * @returns {Date|null} La fecha de la primera revisión, o null si no es una
 *   segunda revisión (o si no hay .txt).
 */
export function fechaDePrimeraRevision(datos) {
	const revision = fechaDeInicio(datos);
	if (!esFechaValida(revision)) return null;

	// Resguardo: una segunda revisión llega a los días de un Condicional, así
	// que una fecha de más de un año antes no puede ser la de la primera (sería
	// un dato raro del .txt, como la fecha vacía "1/1/0001"; ver textoAFecha).
	const haceUnAño = new Date(revision.getFullYear() - 1, revision.getMonth(), revision.getDate());
	const fechas = Object.entries(datos.estadísticaDePuestos)
		.filter(([campo]) => /^fechaDe(IngresoAlPuesto|SalidaDelPuesto)\d+$/.test(campo))
		.map(([, fecha]) => fecha)
		.filter(esFechaValida)
		.filter((fecha) => fecha >= haceUnAño);
	const masVieja = fechas.reduce((a, b) => (b < a ? b : a), revision);

	return diaDe(masVieja) < diaDe(revision) ? masVieja : null;
}

/** true si es un Date con una fecha real (no undefined ni Invalid Date). */
export const esFechaValida = (fecha) => fecha instanceof Date && !Number.isNaN(fecha.getTime());

/** La fecha sin la hora (para comparar días). */
const diaDe = (fecha) => new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

/**
 * Calcula la fecha de vencimiento de la revisión.
 *
 * RTO particular:
 *   - Rechazado o Solo informe: vence el mismo día.
 *   - Condicional: 60 días.
 *   - Apto: según la vigencia elegida: 2 años, 1 año o 6 meses.
 *
 * Transporte de pasajeros:
 *   - Solo informe: vence el mismo día.
 *   - Rechazado: 12 días.
 *   - Condicional: 15 días.
 *   - Apto: según la vigencia elegida: 1 año, 6, 3 o 2 meses.
 *
 * Al sumar meses, si el día no existe en el mes de llegada, JavaScript pasa al
 * mes siguiente (por ejemplo, 31/8 + 6 meses = 3/3, porque no hay 31/2). Así
 * funcionaba desde siempre.
 *
 * @param {Date} inicio Fecha de la revisión (ver fechaDeInicio).
 * @param {string} rtoType 'particular' o 'traPas'.
 * @param {string} resultado 'Apto', 'Condicional', 'Rechazado' o 'SoloInforme'.
 * @param {string} vigencia '2a', '1a', '6m', '3m' o '2m'.
 * @returns {Date} El vencimiento (si la combinación no está prevista, el
 *   mismo día de la revisión).
 */
export function calcularVencimiento(inicio, rtoType, resultado, vigencia) {
	// Trabajamos sobre una copia para no modificar la fecha de inicio.
	const vence = new Date(inicio.getTime());
	const sumarDias = (dias) => vence.setDate(inicio.getDate() + dias);
	const sumarMeses = (meses) => vence.setMonth(inicio.getMonth() + meses);
	const sumarAños = (años) => vence.setFullYear(inicio.getFullYear() + años);

	if (rtoType === 'particular') {
		if (resultado === 'Condicional') sumarDias(60);
		if (resultado === 'Apto' && vigencia === '2a') sumarAños(2);
		if (resultado === 'Apto' && vigencia === '1a') sumarAños(1);
		if (resultado === 'Apto' && vigencia === '6m') sumarMeses(6);
	}

	if (rtoType === 'traPas') {
		if (resultado === 'Rechazado') sumarDias(12);
		if (resultado === 'Condicional') sumarDias(15);
		if (resultado === 'Apto' && vigencia === '1a') sumarAños(1);
		if (resultado === 'Apto' && vigencia === '6m') sumarMeses(6);
		if (resultado === 'Apto' && vigencia === '3m') sumarMeses(3);
		if (resultado === 'Apto' && vigencia === '2m') sumarMeses(2);
	}

	return vence;
}

/**
 * Escribe una fecha como en el informe: día/mes/año, sin ceros adelante.
 *
 * Si no hay fecha (por ejemplo, un .txt sin las fechas de los puestos)
 * devuelve '' y el casillero queda en blanco, en lugar de romper el informe.
 *
 * @param {Date|undefined|''} fecha
 * @returns {string} Por ejemplo "8/7/2022", o '' si no hay una fecha válida.
 */
export function formatearFecha(fecha) {
	if (!esFechaValida(fecha)) return '';
	return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
}
