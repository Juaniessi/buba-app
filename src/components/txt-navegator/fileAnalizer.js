/*
 * =============================================================================
 *  fileAnalizer.js — Lector del archivo .txt que devuelve la línea de RTO
 * =============================================================================
 *
 *  Los equipos de la línea de revisión generan un .txt con una línea por
 *  medición, del estilo "código=valor". Por ejemplo:
 *
 *      [HEADER]
 *      ; Datos Vehículo
 *      10100=KMX-653        ← patente
 *      10200=TOYOTA         ← marca
 *      50040=57,2763942345  ← rendimiento del freno del eje delantero
 *
 *  Este archivo convierte ese texto en un objeto de JavaScript agrupado por
 *  equipo / sección, fácil de usar desde React:
 *
 *      datos.header.patente                → "KMX-653"
 *      datos.frenosEje_1.rendimientoDelEje → 57.28
 *
 *  Puntos de entrada:
 *    - leerArchivoTxt(archivo): la usa la app; recibe el archivo elegido.
 *    - procesarTextoTxt(texto): la usan los tests; recibe el texto ya leído.
 *
 *  El proceso tiene cuatro pasos, cada uno en su propia función más abajo:
 *    1. separarCodigosYValores: limpia el texto y arma la lista código → valor.
 *    2. agruparPorSeccion:      reparte los códigos en secciones (header,
 *                               frenos, luxómetro...) con nombres legibles.
 *    3. redondearOvalidades y año de fabricación: ajustes de números.
 *    4. convertirFechas:        pasa las fechas de texto a objetos Date.
 *
 *  Qué código corresponde a qué nombre está en constantCollections.js
 *  (por ejemplo, headerMap dice que "10100" es "patente").
 * =============================================================================
 */
import {
	categories,
	headerMap,
	alineacionMap,
	suspencionEjeDelanteroMap,
	suspencionEjeTraseroMap,
	opacimetroMap,
	analizadorDeGasesMap,
	frenosEje_1Map,
	frenosEje_2Map,
	frenosEje_3Map,
	frenosEje_4Map,
	frenosEje_5Map,
	frenosEje_6Map,
	frenoDeManoEje_1Map,
	frenoDeManoEje_2Map,
	frenoDeManoEje_3Map,
	frenoDeManoEje_4Map,
	frenoDeManoEje_5Map,
	frenoDeManoEje_6Map,
	sonometroMap,
	luxometroMap,
	inspeccionVisualMap,
	inspeccionDHMap,
	frenosMap,
	valoresCalibradosMap,
	lineaDePruebaMap,
	estadisticaDePuestosMap,
	fotovalidacionMap,
	profundidaDeNeumaticosMap,
	pruebasMap,
	frenosTotalMap,
	banocoDeRodaduraMap,
	ingenieriaMap,
} from './constantCollections.js';
import {
	EMPTY,
	EMPTY_SPACE,
	NEW_LINE,
	SEMICOLON,
	HEADER,
	ALINEACION,
	SUSPENSION_EJE_DELANTERO,
	SUSPENSION_EJE_TRASERO,
	OPACIMETRO,
	ANALIZADOR_DE_GASES,
	FRENOS_EJE_1,
	FRENOS_EJE_2,
	FRENOS_EJE_3,
	FRENOS_EJE_4,
	FRENOS_EJE_5,
	FRENOS_EJE_6,
	FRENO_DE_MANO_EJE_1,
	FRENO_DE_MANO_EJE_2,
	FRENO_DE_MANO_EJE_3,
	FRENO_DE_MANO_EJE_4,
	FRENO_DE_MANO_EJE_5,
	FRENO_DE_MANO_EJE_6,
	SONOMETRO,
	LUXOMETRO,
	INSPECCION_VISUAL,
	INSPECCION_DH,
	FRENOS,
	VALORES_CALIBRADOS,
	LINEA_DE_PRUEBA,
	ESTADISTICA_DE_PUESTOS,
	FOTOVALIDACION,
	PROFUNDIDAD_DE_NEUMATICOS,
	PRUEBAS,
	FRENOS_TOTAL,
	BANCO_DE_RODADURA,
	INGENIERIA,
} from './constantVariables.js';

// =============================================================================
//  Conversiones de valores
// =============================================================================
//  En el .txt todo es texto y los decimales vienen con coma ("57,27").
//  Estas funciones lo pasan a número. Si el valor no es un número (por
//  ejemplo, viene vacío), devuelven '' (EMPTY) para que en el informe quede
//  el casillero en blanco en lugar de "NaN".

/**
 * Deja el valor tal cual viene en el .txt (para patentes, marcas, fechas...).
 *
 * @param {string} valor
 * @returns {string}
 */
function comoTexto(valor) {
	return valor;
}

/**
 * Pasa un texto con coma decimal a número, sin redondear.
 *
 * @param {string} valor Por ejemplo "0,04277875".
 * @returns {number|''} Por ejemplo 0.04277875, o '' si no es un número.
 */
function textoANumero(valor) {
	const numero = parseFloat(String(valor ?? '').replace(',', '.'));
	return isNaN(numero) ? EMPTY : numero;
}

/**
 * Devuelve una función que pasa un texto a número redondeado.
 *
 * Se usa así en la tabla de secciones: `comoNumero(2)` significa "convertir
 * a número con 2 decimales".
 *
 * @param {number} decimales Cantidad de decimales a dejar.
 * @returns {(valor: string) => number|''}
 */
function comoNumero(decimales) {
	return function (valor) {
		const numero = textoANumero(valor);
		return numero === EMPTY ? EMPTY : Number(numero.toFixed(decimales));
	};
}

// =============================================================================
//  Tabla de secciones
// =============================================================================

/**
 * Cómo se lee cada sección del .txt.
 *
 *   - seccion:   nombre de la propiedad en el objeto final (datos.header, ...).
 *   - nombres:   tabla código → nombre legible (de constantCollections.js).
 *   - convertir: qué hacer con el valor (dejarlo como texto o pasarlo a número).
 *
 * El orden de esta lista es el orden de las propiedades en el objeto final.
 *
 * Antes había una función casi idéntica por cada fila de esta tabla
 * (mapHeader, mapFrenosEje_1, ..., mapIngenieria: unas 30). Ahora todas las
 * filas las procesa la misma función, agruparPorSeccion.
 */
const SECCIONES = [
	{ seccion: HEADER, nombres: headerMap, convertir: comoTexto },
	{ seccion: ALINEACION, nombres: alineacionMap, convertir: comoNumero(2) },
	{ seccion: SUSPENSION_EJE_DELANTERO, nombres: suspencionEjeDelanteroMap, convertir: comoNumero(1) },
	{ seccion: SUSPENSION_EJE_TRASERO, nombres: suspencionEjeTraseroMap, convertir: comoNumero(1) },
	{ seccion: OPACIMETRO, nombres: opacimetroMap, convertir: comoNumero(2) },
	{ seccion: ANALIZADOR_DE_GASES, nombres: analizadorDeGasesMap, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_1, nombres: frenosEje_1Map, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_2, nombres: frenosEje_2Map, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_3, nombres: frenosEje_3Map, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_4, nombres: frenosEje_4Map, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_5, nombres: frenosEje_5Map, convertir: comoNumero(2) },
	{ seccion: FRENOS_EJE_6, nombres: frenosEje_6Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_1, nombres: frenoDeManoEje_1Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_2, nombres: frenoDeManoEje_2Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_3, nombres: frenoDeManoEje_3Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_4, nombres: frenoDeManoEje_4Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_5, nombres: frenoDeManoEje_5Map, convertir: comoNumero(2) },
	{ seccion: FRENO_DE_MANO_EJE_6, nombres: frenoDeManoEje_6Map, convertir: comoNumero(2) },
	{ seccion: SONOMETRO, nombres: sonometroMap, convertir: comoNumero(2) },
	{ seccion: LUXOMETRO, nombres: luxometroMap, convertir: comoNumero(2) },
	{ seccion: INSPECCION_VISUAL, nombres: inspeccionVisualMap, convertir: comoTexto },
	{ seccion: INSPECCION_DH, nombres: inspeccionDHMap, convertir: comoTexto },
	{ seccion: FRENOS, nombres: frenosMap, convertir: comoTexto },
	{ seccion: VALORES_CALIBRADOS, nombres: valoresCalibradosMap, convertir: textoANumero },
	{ seccion: LINEA_DE_PRUEBA, nombres: lineaDePruebaMap, convertir: comoTexto },
	{ seccion: ESTADISTICA_DE_PUESTOS, nombres: estadisticaDePuestosMap, convertir: comoTexto },
	{ seccion: FOTOVALIDACION, nombres: fotovalidacionMap, convertir: comoTexto },
	{ seccion: PROFUNDIDAD_DE_NEUMATICOS, nombres: profundidaDeNeumaticosMap, convertir: comoTexto },
	{ seccion: PRUEBAS, nombres: pruebasMap, convertir: comoTexto },
	{ seccion: FRENOS_TOTAL, nombres: frenosTotalMap, convertir: comoTexto },
	{ seccion: BANCO_DE_RODADURA, nombres: banocoDeRodaduraMap, convertir: comoTexto },
	{ seccion: INGENIERIA, nombres: ingenieriaMap, convertir: comoTexto },
];

/** Secciones de frenos que traen ovalidad (ver redondearOvalidades). */
const SECCIONES_CON_OVALIDAD = [
	FRENOS_EJE_1,
	FRENOS_EJE_2,
	FRENOS_EJE_3,
	FRENOS_EJE_4,
	FRENOS_EJE_5,
	FRENOS_EJE_6,
	FRENO_DE_MANO_EJE_1,
	FRENO_DE_MANO_EJE_2,
	FRENO_DE_MANO_EJE_3,
	FRENO_DE_MANO_EJE_4,
	FRENO_DE_MANO_EJE_5,
	FRENO_DE_MANO_EJE_6,
];

/** Cantidad máxima de puestos de la línea que trae el .txt (ver convertirFechas). */
const CANTIDAD_DE_PUESTOS = 10;

/**
 * Una fecha de un año anterior a este es la fecha "vacía" que pone la línea
 * en un puesto por el que el vehículo no pasó ("1/1/0001"). Ver textoAFecha.
 */
const AÑO_MINIMO = 1990;

// =============================================================================
//  Puntos de entrada
// =============================================================================

/**
 * Lee un archivo .txt de la línea de RTO y devuelve sus datos como objeto.
 *
 * Es una función `async`: quien la llama tiene que usar `await` (o `.then`)
 * para recibir el resultado. Así el resto de la app espera exactamente lo que
 * tarda en leerse el archivo, ni más ni menos.
 *
 * @param {File} archivo El archivo elegido en el `<input type="file">`.
 * @returns {Promise<object>} Los datos del .txt agrupados por sección
 *   (header, alineacion, frenosEje_1, luxometro, etc.).
 */
export async function leerArchivoTxt(archivo) {
	const texto = await leerComoTexto(archivo);
	return procesarTextoTxt(texto);
}

/**
 * Convierte el contenido de un .txt de la línea de RTO en un objeto.
 *
 * Es la parte de `leerArchivoTxt` que no depende del navegador: recibe el
 * texto ya leído. Está separada para poder probarla con tests automáticos
 * (ver tests/fileAnalizer.test.js).
 *
 * No guarda nada entre una llamada y otra: cada archivo se procesa de cero.
 *
 * @param {string} texto El contenido completo del .txt.
 * @returns {object} Los datos agrupados por sección.
 */
export function procesarTextoTxt(texto) {
	const valoresPorCodigo = separarCodigosYValores(texto);
	const datos = agruparPorSeccion(valoresPorCodigo);

	redondearOvalidades(datos);
	datos.header.añoDeFabricacion = textoANumero(datos.header.añoDeFabricacion);
	convertirFechas(datos);
	separarCopiaDeLaPatente(datos);

	return datos;
}

/**
 * Para pasar un vehículo por segunda vez (después de un Condicional), se
 * copiaba su .txt y se le cambiaba la patente agregándole "_2" (por ejemplo,
 * "OMC542_2"). En el informe tiene que salir la patente real ("OMC542"), así
 * que el "_2" (o "_3", etc.) se saca de `header.patente`.
 *
 * La patente tal cual vino queda en `header.patenteDelArchivo`: es la que se
 * copia al portapapeles al imprimir, para nombrar el PDF sin pisar el de la
 * primera revisión.
 *
 * Modifica `datos` directamente (no devuelve nada).
 *
 * @param {object} datos Resultado de los pasos anteriores.
 */
function separarCopiaDeLaPatente(datos) {
	const delArchivo = datos.header.patente ?? '';
	datos.header.patenteDelArchivo = delArchivo;
	datos.header.patente = delArchivo.replace(/_\d+$/, '');
}

// =============================================================================
//  Paso 0: leer el archivo
// =============================================================================

/**
 * Lee un archivo y devuelve su contenido como texto.
 *
 * El navegador lee los archivos de forma asíncrona (no al instante), así que
 * envolvemos el `FileReader` en una Promesa para poder usarlo con `await`.
 *
 * @param {File} archivo El archivo a leer.
 * @returns {Promise<string>} El contenido. Si falla la lectura, la promesa se
 *   rechaza (y `leerArchivoTxt` también, para que Main.jsx muestre un aviso).
 */
function leerComoTexto(archivo) {
	return new Promise(function (resolve, reject) {
		const lector = new FileReader();
		lector.onload = () => resolve(lector.result);
		lector.onerror = () => reject(lector.error);
		lector.readAsText(archivo);
	});
}

// =============================================================================
//  Paso 1: limpiar el texto y separar código=valor
// =============================================================================

/**
 * Limpia el texto del .txt y arma una lista código → valor.
 *
 * Qué hace, en orden:
 *   1. Borra los títulos de sección ("[HEADER]", "Datos Vehículo", etc.,
 *      listados en `categories` de constantCollections.js).
 *   2. Separa el texto en líneas.
 *   3. A cada línea le saca los espacios y los punto y coma (los comentarios
 *      del .txt empiezan con ";").
 *   4. Descarta las líneas vacías.
 *   5. Separa cada línea en código y valor por el "=".
 *
 * Ejemplo: "10100=KMX-653\r\n10200=TOYOTA" → Map { "10100" → "KMX-653",
 * "10200" → "TOYOTA" }
 *
 * Detalles a tener en cuenta (así funcionaba el código original y los tests
 * dependen de eso):
 *   - Las líneas se separan por "\r\n" (fin de línea de Windows), que es como
 *     vienen los archivos de la línea.
 *   - Se borran TODOS los espacios, también los de adentro de los valores:
 *     "8/7/2022 12:30:16" queda "8/7/202212:30:16" (ver textoAFecha).
 *   - Si una línea queda sin "=" (por ejemplo, un comentario), igual entra a la
 *     lista, con valor undefined. No molesta: no coincide con ningún código.
 *
 * @param {string} texto El contenido completo del .txt.
 * @returns {Map<string, string>} Código → valor, en el orden del archivo.
 */
function separarCodigosYValores(texto) {
	let limpio = texto ?? '';

	// 1. Títulos de sección. `replace` con texto borra solo la primera
	//    aparición de cada uno, que es lo que hace falta: aparecen una vez.
	for (const titulo of categories) {
		limpio = limpio.replace(titulo + NEW_LINE, '');
	}

	const valoresPorCodigo = new Map();

	for (const lineaOriginal of limpio.split(NEW_LINE)) {
		const linea = lineaOriginal
			.replaceAll(EMPTY_SPACE, '')
			.replaceAll(SEMICOLON, '')
			.trim();

		if (!linea) continue; // línea vacía

		const [codigo, valor] = linea.split('=');
		valoresPorCodigo.set(codigo, valor);
	}

	return valoresPorCodigo;
}

// =============================================================================
//  Paso 2: repartir los códigos en secciones
// =============================================================================

/**
 * Reparte los valores del .txt en secciones con nombres legibles, según la
 * tabla SECCIONES.
 *
 * Ejemplo: el código "10100" está en headerMap con el nombre "patente", así
 * que "10100" → "KMX-653" termina en datos.header.patente = "KMX-653".
 *
 * Las secciones que no tienen ningún dato en el .txt quedan como objeto
 * vacío ({}), para que el resto de la app pueda preguntar por ellas sin error.
 *
 * @param {Map<string, string>} valoresPorCodigo Resultado del paso 1.
 * @returns {object} Un objeto con una propiedad por sección.
 */
function agruparPorSeccion(valoresPorCodigo) {
	const datos = {};

	for (const { seccion, nombres, convertir } of SECCIONES) {
		const valores = {};

		for (const [codigo, valor] of valoresPorCodigo) {
			if (nombres.has(codigo)) {
				valores[nombres.get(codigo)] = convertir(valor);
			}
		}

		datos[seccion] = valores;
	}

	return datos;
}

// =============================================================================
//  Paso 3: ajustes de números
// =============================================================================

/**
 * Normaliza la ovalidad (izquierda y derecha) de cada eje de freno y de freno
 * de mano, redondeándola a 2 decimales.
 *
 * En la práctica los valores ya vienen redondeados del paso 2, así que lo que
 * cambia es:
 *   - Si el .txt trae el código pero sin valor (''), queda en 0.
 *   - Si el .txt no trae el código, queda en '' (casillero en blanco).
 *
 * Se mantiene así porque así funcionaba el código original.
 *
 * Modifica `datos` directamente (no devuelve nada).
 *
 * @param {object} datos Resultado del paso 2.
 */
function redondearOvalidades(datos) {
	const redondear = (valor) => {
		const numero = Number((valor * 1).toFixed(2));
		return isNaN(numero) ? EMPTY : numero;
	};

	for (const seccion of SECCIONES_CON_OVALIDAD) {
		datos[seccion].ovalidadLadoDerecho = redondear(datos[seccion].ovalidadLadoDerecho);
		datos[seccion].ovalidadLadoIzquierdo = redondear(datos[seccion].ovalidadLadoIzquierdo);
	}
}

// =============================================================================
//  Paso 4: fechas
// =============================================================================

/**
 * Convierte en objetos Date las fechas de entrada y salida de cada puesto de
 * la línea (estadísticaDePuestos.fechaDeIngresoAlPuesto1 ... Puesto10, y lo
 * mismo con fechaDeSalidaDelPuesto).
 *
 * Reglas (las mismas que tenía el código original):
 *   - Puesto 1: se convierte siempre (si no vino, queda undefined).
 *   - Puesto 2: si no vino, se usa la fecha del puesto 1. Pasa con las motos,
 *     que tienen un solo puesto; Report.jsx usa la del puesto 2 (o la del 3)
 *     para calcular el vencimiento.
 *   - Puestos 3 a 10: se convierten solo si vinieron en el .txt.
 *
 * Modifica `datos` directamente (no devuelve nada).
 *
 * @param {object} datos Resultado de los pasos anteriores.
 */
function convertirFechas(datos) {
	const puestos = datos.estadísticaDePuestos;
	// Copia con las fechas todavía en texto, para poder usar las del puesto 1
	// en el puesto 2 aunque el puesto 1 ya se haya convertido.
	const textos = { ...puestos };

	for (let n = 1; n <= CANTIDAD_DE_PUESTOS; n++) {
		for (const campo of ['fechaDeIngresoAlPuesto', 'fechaDeSalidaDelPuesto']) {
			let texto = textos[campo + n];

			if (n === 2 && texto === undefined) {
				texto = textos[campo + 1];
			}

			if (n <= 2 || texto !== undefined) {
				puestos[campo + n] = textoAFecha(texto);
			}
		}
	}
}

/**
 * Convierte una fecha del .txt en un objeto Date.
 *
 * En el .txt las fechas vienen como "8/7/2022 12:30:16" (día/mes/año
 * hora:minutos:segundos), pero al limpiar el texto se borran los espacios, así
 * que llegan pegadas: "8/7/202212:30:16". Como el año siempre tiene 4 cifras,
 * se puede separar la fecha de la hora sin ambigüedad.
 *
 * Día, mes y hora pueden venir con 1 o 2 cifras ("8/7/2022" o "08/07/2022").
 *
 * La fecha se interpreta en el horario de la PC (el de Argentina).
 *
 * Un puesto por el que el vehículo no pasó puede venir con la fecha "vacía"
 * de la línea: "1/1/0001 00:00:00" (pasó con el colectivo AE991VN, que no
 * pasó por el puesto 1). Eso no es una fecha: se trata como si no hubiera
 * venido (undefined). Antes, JavaScript la leía como 1/1/1901 y la app creía
 * que era una segunda revisión con la primera en 1901.
 *
 * @param {string|undefined} texto Por ejemplo "13/9/202212:53:35".
 * @returns {Date|undefined} La fecha, o undefined si no vino ninguna (o vino
 *   la fecha vacía de la línea). Si el texto no tiene el formato esperado
 *   devuelve una fecha inválida (Invalid Date), como hacía el código original.
 */
export function textoAFecha(texto) {
	if (texto === undefined) return undefined;

	//                    día         mes         año     hora        min     seg
	const partes = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(\d{1,2}):(\d{2}):(\d{2})$/.exec(texto);
	if (!partes) return new Date(NaN);

	const [, dia, mes, año, hora, minutos, segundos] = partes.map(Number);
	// Fecha vacía de la línea ("1/1/0001"): el vehículo no pasó por ese puesto.
	if (año < AÑO_MINIMO) return undefined;
	// En JavaScript los meses van de 0 (enero) a 11 (diciembre).
	return new Date(año, mes - 1, dia, hora, minutos, segundos);
}
