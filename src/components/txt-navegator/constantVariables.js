/*
 * =============================================================================
 *  constantVariables.js — Nombres y códigos usados al leer el .txt
 * =============================================================================
 *
 *  Este archivo solo define textos fijos (constantes), en tres grupos:
 *
 *    1. Caracteres para limpiar el .txt (NEW_LINE, EMPTY_SPACE, SEMICOLON...).
 *    2. Nombres de las secciones del objeto final: HEADER = 'header',
 *       FRENOS_EJE_1 = 'frenosEje_1', etc.
 *    3. Para cada dato, dos constantes:
 *         - el código del .txt:      N10100 = '10100'
 *         - su nombre legible:       patente = 'patente'
 *       Se emparejan en las tablas de constantCollections.js.
 *
 *  Para que la app lea un dato nuevo del .txt: agregar acá su código (Nxxxxx)
 *  y su nombre, y después sumar el par a la tabla que corresponda en
 *  constantCollections.js.
 * =============================================================================
 */

/**
 * Fin de línea de Windows, como vienen los .txt de la línea de RTO.
 */
export const NEW_LINE = '\r\n';
/**
 * Un espacio.
 */
export const EMPTY_SPACE = ' ';
/**
 * Texto vacío. Se usa como "sin dato" (casillero en blanco en el informe).
 */
export const EMPTY = '';
/**
 * Punto y coma. En el .txt marca los comentarios.
 */
export const SEMICOLON = ';';
/**
 * Nombre de la sección "header" en el objeto que devuelve fileAnalizer.js.
 */
export const HEADER = 'header';
/**
 * Nombre de la sección "alineacion" en el objeto que devuelve fileAnalizer.js.
 */
export const ALINEACION = 'alineacion';
/**
 * Nombre de la sección "suspensionEjeDelantero" en el objeto que devuelve fileAnalizer.js.
 */
export const SUSPENSION_EJE_DELANTERO = 'suspensionEjeDelantero';
/**
 * Nombre de la sección "suspensionEjeTrasero" en el objeto que devuelve fileAnalizer.js.
 */
export const SUSPENSION_EJE_TRASERO = 'suspensionEjeTrasero';
/**
 * Nombre de la sección "opacimetro" en el objeto que devuelve fileAnalizer.js.
 */
export const OPACIMETRO = 'opacimetro';
/**
 * Nombre de la sección "analizadorDeGases" en el objeto que devuelve fileAnalizer.js.
 */
export const ANALIZADOR_DE_GASES = 'analizadorDeGases';
/**
 * Nombre de la sección "frenosEje_1" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_1 = 'frenosEje_1';
/**
 * Nombre de la sección "frenosEje_2" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_2 = 'frenosEje_2';
/**
 * Nombre de la sección "frenosEje_3" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_3 = 'frenosEje_3';
/**
 * Nombre de la sección "frenosEje_4" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_4 = 'frenosEje_4';
/**
 * Nombre de la sección "frenosEje_5" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_5 = 'frenosEje_5';
/**
 * Nombre de la sección "frenosEje_6" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_EJE_6 = 'frenosEje_6';
/**
 * Nombre de la sección "frenoDeManoEje_1" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_1 = 'frenoDeManoEje_1';
/**
 * Nombre de la sección "frenoDeManoEje_2" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_2 = 'frenoDeManoEje_2';
/**
 * Nombre de la sección "frenoDeManoEje_3" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_3 = 'frenoDeManoEje_3';
/**
 * Nombre de la sección "frenoDeManoEje_4" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_4 = 'frenoDeManoEje_4';
/**
 * Nombre de la sección "frenoDeManoEje_5" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_5 = 'frenoDeManoEje_5';
/**
 * Nombre de la sección "frenoDeManoEje_6" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENO_DE_MANO_EJE_6 = 'frenoDeManoEje_6';
/**
 * Nombre de la sección "sonometro" en el objeto que devuelve fileAnalizer.js.
 */
export const SONOMETRO = 'sonometro';
/**
 * Nombre de la sección "luxometro" en el objeto que devuelve fileAnalizer.js.
 */
export const LUXOMETRO = 'luxometro';
/**
 * Nombre de la sección "inspeccionVisual" en el objeto que devuelve fileAnalizer.js.
 */
export const INSPECCION_VISUAL = 'inspeccionVisual';
/**
 * Nombre de la sección "inspeccionDH" en el objeto que devuelve fileAnalizer.js.
 */
export const INSPECCION_DH = 'inspeccionDH';
/**
 * Nombre de la sección "frenos" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS = 'frenos';
/**
 * Nombre de la sección "valoresCalibrados" en el objeto que devuelve fileAnalizer.js.
 */
export const VALORES_CALIBRADOS = 'valoresCalibrados';
/**
 * Nombre de la sección "lineaDePrueba" en el objeto que devuelve fileAnalizer.js.
 */
export const LINEA_DE_PRUEBA = 'lineaDePrueba';
/**
 * Nombre de la sección "estadísticaDePuestos" en el objeto que devuelve fileAnalizer.js.
 */
export const ESTADISTICA_DE_PUESTOS = 'estadísticaDePuestos';
/**
 * Nombre de la sección "fotovalidacion" en el objeto que devuelve fileAnalizer.js.
 */
export const FOTOVALIDACION = 'fotovalidacion';
/**
 * Nombre de la sección "profundidadDeNeumaticos" en el objeto que devuelve fileAnalizer.js.
 */
export const PROFUNDIDAD_DE_NEUMATICOS = 'profundidadDeNeumaticos';
/**
 * Nombre de la sección "pruebas" en el objeto que devuelve fileAnalizer.js.
 */
export const PRUEBAS = 'pruebas';

/**
 * Nombre de la sección "frenosTotal" en el objeto que devuelve fileAnalizer.js.
 */
export const FRENOS_TOTAL = 'frenosTotal';
/**
 * Nombre de la sección "bancoDeRodadura" en el objeto que devuelve fileAnalizer.js.
 */
export const BANCO_DE_RODADURA = 'bancoDeRodadura';
/**
 * Nombre de la sección "ingenieria" en el objeto que devuelve fileAnalizer.js.
 */
export const INGENIERIA = 'ingenieria';

/**
 * Nombre legible del dato "patente" en el objeto que devuelve fileAnalizer.js.
 */
export const patente = 'patente';
/**
 * Nombre legible del dato "numeroDeChasis" en el objeto que devuelve fileAnalizer.js.
 */
export const numeroDeChasis = 'numeroDeChasis';
/**
 * Nombre legible del dato "numeroMotor" en el objeto que devuelve fileAnalizer.js.
 */
export const numeroMotor = 'numeroMotor';
/**
 * Nombre legible del dato "marcaDelVehículo" en el objeto que devuelve fileAnalizer.js.
 */
export const marcaDelVehiculo = 'marcaDelVehiculo';
/**
 * Nombre legible del dato "añoDeFabricación" en el objeto que devuelve fileAnalizer.js.
 */
export const añoDeFabricacion = 'añoDeFabricacion';
/**
 * Nombre legible del dato "subModelo" en el objeto que devuelve fileAnalizer.js.
 */
export const subModelo = 'subModelo';
/**
 * Nombre legible del dato "modelo" en el objeto que devuelve fileAnalizer.js.
 */
export const modelo = 'modelo';
/**
 * Nombre legible del dato "kilómetros" en el objeto que devuelve fileAnalizer.js.
 */
export const kilometros = 'kilometros';
/**
 * Nombre legible del dato "tipoVehiculo" en el objeto que devuelve fileAnalizer.js.
 */
export const tipoVehiculo = 'tipoVehiculo';
/**
 * Nombre legible del dato "combustible" en el objeto que devuelve fileAnalizer.js.
 */
export const combustible = 'combustible';
/**
 * Nombre legible del dato "colorPrimario" en el objeto que devuelve fileAnalizer.js.
 */
export const colorPrimario = 'colorPrimario';
/**
 * Nombre legible del dato "colorSecundario" en el objeto que devuelve fileAnalizer.js.
 */
export const colorSecundario = 'colorSecundario';
/**
 * Nombre legible del dato "clase" en el objeto que devuelve fileAnalizer.js.
 */
export const clase = 'clase';
/**
 * Nombre legible del dato "pasajeros" en el objeto que devuelve fileAnalizer.js.
 */
export const pasajeros = 'pasajeros';
/**
 * Nombre legible del dato "cilindrada" en el objeto que devuelve fileAnalizer.js.
 */
export const cilindrada = 'cilindrada';
/**
 * Nombre legible del dato "servicio" en el objeto que devuelve fileAnalizer.js.
 */
export const servicio = 'servicio';
/**
 * Nombre legible del dato "observaciones" en el objeto que devuelve fileAnalizer.js.
 */
export const observaciones = 'observaciones';
/**
 * Nombre legible del dato "cantidadDeEjes" en el objeto que devuelve fileAnalizer.js.
 */
export const cantidadDeEjes = 'cantidadDeEjes';
/**
 * Nombre legible del dato "apellidoPropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const apellidoPropietario = 'apellidoPropietario';
/**
 * Nombre legible del dato "nombrePropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const nombrePropietario = 'nombrePropietario';
/**
 * Nombre legible del dato "direccionPropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const direccionPropietario = 'direccionPropietario';
/**
 * Nombre legible del dato "documentoDeIdentidadPropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const documentoDeIdentidadPropietario = 'documentoDeIdentidadPropietario';
/**
 * Nombre legible del dato "emailConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const emailConductor = 'emailConductor';
/**
 * Nombre legible del dato "teléfonoConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const telefonoConductor = 'teléfonoConductor';
/**
 * Nombre legible del dato "localidadPropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const localidadPropietario = 'localidadPropietario';
/**
 * Nombre legible del dato "provinciaPropietario" en el objeto que devuelve fileAnalizer.js.
 */
export const provinciaPropietario = 'provinciaPropietario';
/**
 * Nombre legible del dato "nacionalidadConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const nacionalidadConductor = 'nacionalidadConductor';
/**
 * Nombre legible del dato "apellidoConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const apellidoConductor = 'apellidoConductor';
/**
 * Nombre legible del dato "nombreConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const nombreConductor = 'nombreConductor';
/**
 * Nombre legible del dato "direccionConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const direccionConductor = 'direccionConductor';
/**
 * Nombre legible del dato "localidadConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const localidadConductor = 'localidadConductor';
/**
 * Nombre legible del dato "provinciaConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const provinciaConductor = 'provinciaConductor';
/**
 * Nombre legible del dato "documentoDeIdentidadConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const documentoDeIdentidadConductor = 'documentoDeIdentidadConductor';
/**
 * Nombre legible del dato "licenciaDeConducirConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const licenciaDeConducirConductor = 'licenciaDeConducirConductor';
/**
 * Nombre legible del dato "categoriaLicenciaConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const categoriaLicenciaConductor = 'categoriaLicenciaConductor';
/**
 * Nombre legible del dato "vigenciaLicenciaConductor" en el objeto que devuelve fileAnalizer.js.
 */
export const vigenciaLicenciaConductor = 'vigenciaLicenciaConductor';
/**
 * Nombre legible del dato "seguroCompañia" en el objeto que devuelve fileAnalizer.js.
 */
export const seguroCompañia = 'seguroCompañia';
/**
 * Nombre legible del dato "seguroPoliza" en el objeto que devuelve fileAnalizer.js.
 */
export const seguroPoliza = 'seguroPoliza';
/**
 * Nombre legible del dato "seguroVigencia" en el objeto que devuelve fileAnalizer.js.
 */
export const seguroVigencia = 'seguroVigencia';
/**
 * Nombre legible del dato "fotoDocumento_1" en el objeto que devuelve fileAnalizer.js.
 */
export const fotoDocumento_1 = 'fotoDocumento_1';
/**
 * Nombre legible del dato "fotoDocumento_2" en el objeto que devuelve fileAnalizer.js.
 */
export const fotoDocumento_2 = 'fotoDocumento_2';
/**
 * Nombre legible del dato "fotoDocumento_3" en el objeto que devuelve fileAnalizer.js.
 */
export const fotoDocumento_3 = 'fotoDocumento_3';
/**
 * Nombre legible del dato "fotoDocumento_4" en el objeto que devuelve fileAnalizer.js.
 */
export const fotoDocumento_4 = 'fotoDocumento_4';
/**
 * Nombre legible del dato "cantidadDeRuedas" en el objeto que devuelve fileAnalizer.js.
 */
export const cantidadDeRuedas = 'cantidadDeRuedas';
/**
 * Nombre legible del dato "cooperativa" en el objeto que devuelve fileAnalizer.js.
 */
export const cooperativa = 'cooperativa';
/**
 * Nombre legible del dato "ambito_O" en el objeto que devuelve fileAnalizer.js.
 */
export const ambito_O = 'ambito_O';
/**
 * Nombre legible del dato "discoNumero" en el objeto que devuelve fileAnalizer.js.
 */
export const discoNumero = 'discoNumero';
/**
 * Nombre legible del dato "idPruebaRefTramite" en el objeto que devuelve fileAnalizer.js.
 */
export const idPruebaRefTramite = 'idPruebaRefTramite'; 
/**
 * Nombre legible del dato "revision" en el objeto que devuelve fileAnalizer.js.
 */
export const revision = 'revision'; 
/**
 * Nombre legible del dato "numLineaAsignada" en el objeto que devuelve fileAnalizer.js.
 */
export const numLineaAsignada = 'numLineaAsignada'; 
/**
 * Nombre legible del dato "resultadoFinalRevision" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoFinalRevision = 'resultadoFinalRevision'; 

/**
 * Nombre legible del dato "(AAAAMMDDhhmmss" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaHora = 'fechaHora'; 
/**
 * Nombre legible del dato "pruebaDeAlineacion" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeAlineacion = 'pruebaDeAlineacion';
/**
 * Nombre legible del dato "pruebaDeSuspension" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeSuspension = 'pruebaDeSuspension';
/**
 * Nombre legible del dato "pruebaDeFrenos" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeFrenos = 'pruebaDeFrenos';
/**
 * Nombre legible del dato "pruebaDeFrenosDeMano" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeFrenosDeMano = 'pruebaDeFrenosDeMano';
/**
 * Nombre legible del dato "pruebaDeLuces" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeLuces = 'pruebaDeLuces';
/**
 * Nombre legible del dato "pruebaDeGases" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeGases = 'pruebaDeGases';
/**
 * Nombre legible del dato "pruebaDeInspVisual" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeInspVisual = 'pruebaDeInspVisual';
/**
 * Nombre legible del dato "pruebaDeInspFosa" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaDeInspFosa = 'pruebaDeInspFosa';
/**
 * Nombre legible del dato "pruebaSonometro" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaSonometro = 'pruebaSonometro';
/**
 * Nombre legible del dato "pruebaRodadura" en el objeto que devuelve fileAnalizer.js.
 */
export const pruebaRodadura = 'pruebaRodadura';
/**
 * Nombre legible del dato "resultadoAlineacionEje1" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje1 = 'resultadoAlineacionEje1';
/**
 * Nombre legible del dato "resultadoAlineacionEje2" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje2 = 'resultadoAlineacionEje2';
/**
 * Nombre legible del dato "resultadoAlineacionEje3" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje3 = 'resultadoAlineacionEje3';
/**
 * Nombre legible del dato "resultadoAlineacionEje4" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje4 = 'resultadoAlineacionEje4';
/**
 * Nombre legible del dato "resultadoAlineacionEje5" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje5 = 'resultadoAlineacionEje5';
/**
 * Nombre legible del dato "resultadoAlineacionEje6" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoAlineacionEje6 = 'resultadoAlineacionEje6';
/**
 * Nombre legible del dato "rendimientoDelanteroDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const rendimientoDelanteroDerecho = 'rendimientoDelanteroDerecho';
/**
 * Nombre legible del dato "rendimientoDelanteroIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const rendimientoDelanteroIzquierdo = 'rendimientoDelanteroIzquierdo';
/**
 * Nombre legible del dato "rendimientoTraseroDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const rendimientoTraseroDerecho = 'rendimientoTraseroDerecho';
/**
 * Nombre legible del dato "rendimientoTraseroIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const rendimientoTraseroIzquierdo = 'rendimientoTraseroIzquierdo';
/**
 * Nombre legible del dato "amplitudMaximaLadoDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const amplitudMaximaLadoDerecho = 'amplitudMaximaLadoDerecho';
/**
 * Nombre legible del dato "amplitudMáximoLadoIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const amplitudMaximaLadoIzquierdo = 'amplitudMaximaLadoIzquierdo';
/**
 * Nombre legible del dato "pesoLadoDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const pesoLadoDerecho = 'pesoLadoDerecho';
/**
 * Nombre legible del dato "pesoLadoIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const pesoLadoIzquierdo = 'pesoLadoIzquierdo';
/**
 * Nombre legible del dato "diferenciaRendimientoLadoALado" en el objeto que devuelve fileAnalizer.js.
 */
export const diferenciaRendimientoLadoALado = 'diferenciaRendimientoLadoALado';

/**
 * Nombre legible del dato "resultadoMediciónOpacidad" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoMedicionOpacidad = 'resultadoMedicionOpacidad';

/**
 * Nombre legible del dato "ResultadoMonoxidoDeCarbonoCO" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoMonoxidoDeCarbonoCO = 'resultadoMonoxidoDeCarbonoCO';
/**
 * Nombre legible del dato "ResultadoPartesPorMillónHC" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoPartesPorMillonHC = 'resultadoPartesPorMillonHC';
/**
 * Nombre legible del dato "ResultadoSensorDeOxigenoO2" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoSensorDeOxigenoO2 = 'resultadoSensorDeOxigenoO2';
/**
 * Nombre legible del dato "ResultadoPartesPorMillónNox" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoPartesPorMillonNox = 'resultadoPartesPorMillonNox';
/**
 * Nombre legible del dato "ResultadoDioxidoDeCarbonoCO1" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoDioxidoDeCarbonoCO1 = 'resultadoDioxidoDeCarbonoCO1';
/**
 * Nombre legible del dato "Lambda" en el objeto que devuelve fileAnalizer.js.
 */
export const lambda = 'lambda';

/**
 * Nombre legible del dato "resultadoMonoxidoDeCarbonoEnAltaRPM" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoMonoxidoDeCarbonoEnAltaRPM =
  'resultadoMonoxidoDeCarbonoEnAltaRPM';
/**
 * Nombre legible del dato "resultadoHidroCarburosHCAltaRPM" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoHidroCarburosHCAltaRPM =
  'resultadoHidroCarburosHCAltaRPM';
/**
 * Nombre legible del dato "resultadoOxigenoO2EnAltaRPM" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoOxigenoO2EnAltaRPM = 'resultadoOxigenoO2EnAltaRPM';
/**
 * Nombre legible del dato "resultadoOxidoNitrosoNoxEnAltaRPM" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoOxidoNitrosoNoxEnAltaRPM =
  'resultadoOxidoNitrosoNoxEnAltaRPM';
/**
 * Nombre legible del dato "resultadoDioxidoDeCarbonoEnAltaRPM" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoDioxidoDeCarbonoEnAltaRPM =
  'resultadoDioxidoDeCarbonoEnAltaRPM';
/**
 * Nombre legible del dato "resultadoObservaciones" en el objeto que devuelve fileAnalizer.js.
 */
export const resultadoObservaciones = 'resultadoObservaciones';

/**
 * Nombre legible del dato "fuerzaDeFrenadoLadoDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const fuerzaDeFrenadoLadoDerecho = 'fuerzaDeFrenadoLadoDerecho';
/**
 * Nombre legible del dato "fuerzaDeFrenadoLadoIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const fuerzaDeFrenadoLadoIzquierdo = 'fuerzaDeFrenadoLadoIzquierdo';
/**
 * Nombre legible del dato "diferenciaFzaFrenadoLadoALado" en el objeto que devuelve fileAnalizer.js.
 */
export const diferenciaFzaFrenadoLadoALado = 'diferenciaFzaFrenadoLadoALado';
/**
 * Nombre legible del dato "rendimientoDelEje" en el objeto que devuelve fileAnalizer.js.
 */
export const rendimientoDelEje = 'rendimientoDelEje';
/**
 * Nombre legible del dato "ovalidadLadoDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const ovalidadLadoDerecho = 'ovalidadLadoDerecho';
/**
 * Nombre legible del dato "ovalidadLadoIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const ovalidadLadoIzquierdo = 'ovalidadLadoIzquierdo';
/**
 * Nombre legible del dato "resistenciaALaRodaduraLadoDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const resistenciaALaRodaduraLadoDerecho =
  'resistenciaALaRodaduraLadoDerecho';
/**
 * Nombre legible del dato "resistenciaALaRodaduraLadoIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const resistenciaALaRodaduraLadoIzquierdo =
  'resistenciaALaRodaduraLadoIzquierdo';
/**
 * Nombre legible del dato "valorDeMedicion" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeMedicion = 'valorDeMedicion';
/**
 * Nombre legible del dato "alineacionFaroDerechoHorizontal" en el objeto que devuelve fileAnalizer.js.
 */
export const alineacionFaroDerechoHorizontal =
  'alineacionFaroDerechoHorizontal';
/**
 * Nombre legible del dato "alineacionFaroIzquierdoHorizontal" en el objeto que devuelve fileAnalizer.js.
 */
export const alineacionFaroIzquierdoHorizontal =
  'alineacionFaroIzquierdoHorizontal';
/**
 * Nombre legible del dato "intensidadAltaDerecha" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadAltaDerecha = 'intensidadAltaDerecha';
/**
 * Nombre legible del dato "intensidadAltaIzquierda" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadAltaIzquierda = 'intensidadAltaIzquierda';
/**
 * Nombre legible del dato "intensidadBajaDerecha" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadBajaDerecha = 'intensidadBajaDerecha';
/**
 * Nombre legible del dato "intensidadBajaIzquierda" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadBajaIzquierda = 'intensidadBajaIzquierda';
/**
 * Nombre legible del dato "intensidadAuxiliarDerecha" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadAuxiliarDerecha = 'intensidadAuxiliarDerecha';
/**
 * Nombre legible del dato "intensidadAuxiliarIzquierda" en el objeto que devuelve fileAnalizer.js.
 */
export const intensidadAuxiliarIzquierda = 'intensidadAuxiliarIzquierda';
/**
 * Nombre legible del dato "alineacionFaroDerechoVertical" en el objeto que devuelve fileAnalizer.js.
 */
export const alineacionFaroDerechoVertical = 'alineacionFaroDerechoVertical';
/**
 * Nombre legible del dato "alineacionFaroIzquierdoVertical" en el objeto que devuelve fileAnalizer.js.
 */
export const alineacionFaroIzquierdoVertical =
  'alineacionFaroIzquierdoVertical';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje1" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje1 =
  'motivoDeCorteDePruebaDeFrenoEje1';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje2" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje2 =
  'motivoDeCorteDePruebaDeFrenoEje2';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje3" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje3 =
  'motivoDeCorteDePruebaDeFrenoEje3';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje4" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje4 =
  'motivoDeCorteDePruebaDeFrenoEje4';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje5" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje5 =
  'motivoDeCorteDePruebaDeFrenoEje5';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFrenoEje6" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFrenoEje6 =
  'motivoDeCorteDePruebaDeFrenoEje6';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje1" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje1 =
  'motivoDeCorteDePruebaDeFManoEje1';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje2" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje2 =
  'motivoDeCorteDePruebaDeFManoEje2';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje3" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje3 =
  'motivoDeCorteDePruebaDeFManoEje3';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje4" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje4 =
  'motivoDeCorteDePruebaDeFManoEje4';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje5" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje5 =
  'motivoDeCorteDePruebaDeFManoEje5';
/**
 * Nombre legible del dato "motivoDeCorteDePruebaDeFManoEje6" en el objeto que devuelve fileAnalizer.js.
 */
export const motivoDeCorteDePruebaDeFManoEje6 =
  'motivoDeCorteDePruebaDeFManoEje6';
/**
 * Nombre legible del dato "valorDeCeroDeBFDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeBFDerecho = 'valorDeCeroDeBFDerecho';
/**
 * Nombre legible del dato "valorDeCeroDeBFIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeBFIzquierdo = 'valorDeCeroDeBFIzquierdo';
/**
 * Nombre legible del dato "valorDeCeroBalanzaDerecha" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroBalanzaDerecha = 'valorDeCeroBalanzaDerecha';
/**
 * Nombre legible del dato "valorDeCeroDeBalanzaIzquierda" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeBalanzaIzquierda = 'valorDeCeroDeBalanzaIzquierda';
/**
 * Nombre legible del dato "valorDeGananciaBFIzquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaBFIzquierdo = 'valorDeGananciaBFIzquierdo';
/**
 * Nombre legible del dato "valorDeGananciaDeBFDerecho" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaDeBFDerecho = 'valorDeGananciaDeBFDerecho';
/**
 * Nombre legible del dato "valorDeGananciaDeBalanzaIzquierda" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaDeBalanzaIzquierda =
  'valorDeGananciaDeBalanzaIzquierda';
/**
 * Nombre legible del dato "valorDeGananciaDeBalanzaDerecha" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaDeBalanzaDerecha =
  'valorDeGananciaDeBalanzaDerecha';
/**
 * Nombre legible del dato "valorDeGananciaAlineador" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaAlineador =
  'valorDeGananciaAlineador';
/**
 * Nombre legible del dato "valorDeCeroDeAlineador" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeAlineador =
  'valorDeCeroDeAlineador';
/**
 * Nombre legible del dato "largoCamaraOpacimetro" en el objeto que devuelve fileAnalizer.js.
 */
export const largoCamaraOpacimetro =
  'largoCamaraOpacimetro';
/**
 * Nombre legible del dato "constanteResbalamiento" en el objeto que devuelve fileAnalizer.js.
 */
export const constanteResbalamiento =
  'constanteResbalamiento';
/**
 * Nombre legible del dato "valorDeCeroDeBS_Derecho" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeBS_Derecho =
  'valorDeCeroDeBS_Derecho';
/**
 * Nombre legible del dato "valorDeCeroDeBS_Izquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeCeroDeBS_Izquierdo =
  'valorDeCeroDeBS_Izquierdo';
/**
 * Nombre legible del dato "valorDeGananciaDeBS_Derecho" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaDeBS_Derecho =
  'valorDeGananciaDeBS_Derecho';
/**
 * Nombre legible del dato "valorDeGananciaDeBS_Izquierdo" en el objeto que devuelve fileAnalizer.js.
 */
export const valorDeGananciaDeBS_Izquierdo =
  'valorDeGananciaDeBS_Izquierdo';
/**
 * Nombre legible del dato "numeroDeLinea" en el objeto que devuelve fileAnalizer.js.
 */
export const numeroDeLinea = 'numeroDeLinea';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto1" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto1 = 'fechaDeIngresoAlPuesto1';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto1" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto1 = 'fechaDeSalidaDelPuesto1';
/**
 * Nombre legible del dato "operadorPuesto1" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto1 = 'operadorPuesto1';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto2" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto2 = 'fechaDeIngresoAlPuesto2';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto2" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto2 = 'fechaDeSalidaDelPuesto2';
/**
 * Nombre legible del dato "operadorPuesto2" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto2 = 'operadorPuesto2';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto3" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto3 = 'fechaDeIngresoAlPuesto3';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto3" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto3 = 'fechaDeSalidaDelPuesto3';
/**
 * Nombre legible del dato "operadorPuesto3" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto3 = 'operadorPuesto3';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto4" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto4 = 'fechaDeIngresoAlPuesto4';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto4" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto4 = 'fechaDeSalidaDelPuesto4';
/**
 * Nombre legible del dato "operadorPuesto4" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto4 = 'operadorPuesto4';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto5" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto5 = 'fechaDeIngresoAlPuesto5';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto5" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto5 = 'fechaDeSalidaDelPuesto5';
/**
 * Nombre legible del dato "operadorPuesto5" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto5 = 'operadorPuesto5';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto6" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto6 = 'fechaDeIngresoAlPuesto6';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto6" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto6 = 'fechaDeSalidaDelPuesto6';
/**
 * Nombre legible del dato "operadorPuesto6" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto6 = 'operadorPuesto6';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto7" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto7 = 'fechaDeIngresoAlPuesto7';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto7" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto7 = 'fechaDeSalidaDelPuesto7';
/**
 * Nombre legible del dato "operadorPuesto7" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto7 = 'operadorPuesto7';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto8" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto8 = 'fechaDeIngresoAlPuesto8';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto8" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto8 = 'fechaDeSalidaDelPuesto8';
/**
 * Nombre legible del dato "operadorPuesto8" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto8 = 'operadorPuesto8';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto9" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto9 = 'fechaDeIngresoAlPuesto9';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto9" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto9 = 'fechaDeSalidaDelPuesto9';
/**
 * Nombre legible del dato "operadorPuesto9" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto9 = 'operadorPuesto9';
/**
 * Nombre legible del dato "fechaDeIngresoAlPuesto10" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeIngresoAlPuesto10 = 'fechaDeIngresoAlPuesto10';
/**
 * Nombre legible del dato "fechaDeSalidaDelPuesto10" en el objeto que devuelve fileAnalizer.js.
 */
export const fechaDeSalidaDelPuesto10 = 'fechaDeSalidaDelPuesto10';
/**
 * Nombre legible del dato "operadorPuesto10" en el objeto que devuelve fileAnalizer.js.
 */
export const operadorPuesto10 = 'operadorPuesto10';
/**
 * Nombre legible del dato "nroDeLineaPto1" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto1 = 'nroDeLineaPto1';
/**
 * Nombre legible del dato "nroDeLineaPto2" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto2 = 'nroDeLineaPto2';
/**
 * Nombre legible del dato "nroDeLineaPto3" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto3 = 'nroDeLineaPto3';
/**
 * Nombre legible del dato "nroDeLineaPto4" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto4 = 'nroDeLineaPto4';
/**
 * Nombre legible del dato "nroDeLineaPto5" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto5 = 'nroDeLineaPto5';
/**
 * Nombre legible del dato "nroDeLineaPto6" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto6 = 'nroDeLineaPto6';
/**
 * Nombre legible del dato "nroDeLineaPto7" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto7 = 'nroDeLineaPto7';
/**
 * Nombre legible del dato "nroDeLineaPto8" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto8 = 'nroDeLineaPto8';
/**
 * Nombre legible del dato "nroDeLineaPto9" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto9 = 'nroDeLineaPto9';
/**
 * Nombre legible del dato "nroDeLineaPto10" en el objeto que devuelve fileAnalizer.js.
 */
export const nroDeLineaPto10 = 'nroDeLineaPto10';
/**
 * Nombre legible del dato "fotovalidacion_1" en el objeto que devuelve fileAnalizer.js.
 */
export const fotovalidacion_1 = 'fotovalidacion_1';
/**
 * Nombre legible del dato "fotovalidacion_2" en el objeto que devuelve fileAnalizer.js.
 */
export const fotovalidacion_2 = 'fotovalidacion_2';
/**
 * Nombre legible del dato "fotovalidacion_3" en el objeto que devuelve fileAnalizer.js.
 */
export const fotovalidacion_3 = 'fotovalidacion_3';
/**
 * Nombre legible del dato "fotovalidacion_4" en el objeto que devuelve fileAnalizer.js.
 */
export const fotovalidacion_4 = 'fotovalidacion_4';

/**
 * Nombre legible del dato "profundidaDeNeumaticos" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidaDeNeumaticos = 'profundidaDeNeumaticos';
/**
 * Nombre legible del dato "profundidadNeumaticoDelanteroIzq" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumaticoDelanteroIzq = 'profundidadNeumaticoDelanteroIzq';
/**
 * Nombre legible del dato "profundidadNeumaticoDelanteroDer" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumaticoDelanteroDer = 'profundidadNeumaticoDelanteroDer';
/**
 * Nombre legible del dato "profundidadNeumatico2_Eje_Izq_Izq" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico2_Eje_Izq_Izq = 'profundidadNeumatico2_Eje_Izq_Izq';
/**
 * Nombre legible del dato "profundidadNeumatico2_Eje_Izq_Der" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico2_Eje_Izq_Der = 'profundidadNeumatico2_Eje_Izq_Der';
/**
 * Nombre legible del dato "profundidadNeumatico2_Eje_Der_Izq" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico2_Eje_Der_Izq = 'profundidadNeumatico2_Eje_Der_Izq';
/**
 * Nombre legible del dato "profundidadNeumatico2_Eje_Der_Der" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico2_Eje_Der_Der = 'profundidadNeumatico2_Eje_Der_Der';
/**
 * Nombre legible del dato "profundidadNeumatico3_Eje_Izq_Izq" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico3_Eje_Izq_Izq = 'profundidadNeumatico3_Eje_Izq_Izq';
/**
 * Nombre legible del dato "profundidadNeumatico3_Eje_Izq_Der" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico3_Eje_Izq_Der = 'profundidadNeumatico3_Eje_Izq_Der';
/**
 * Nombre legible del dato "profundidadNeumatico3_Eje_Der_Izq" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico3_Eje_Der_Izq = 'profundidadNeumatico3_Eje_Der_Izq';
/**
 * Nombre legible del dato "profundidadNeumatico3_Eje_Der_Der" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumatico3_Eje_Der_Der = 'profundidadNeumatico3_Eje_Der_Der';
/**
 * Nombre legible del dato "nomProvN610010" en el objeto que devuelve fileAnalizer.js.
 */
export const nomProvN610010 = 'nomProvN610010';
/**
 * Nombre legible del dato "nomProvN610011" en el objeto que devuelve fileAnalizer.js.
 */
export const nomProvN610011 = 'nomProvN610011';
/**
 * Nombre legible del dato "profundidadNeumaticoDeEmergencia" en el objeto que devuelve fileAnalizer.js.
 */
export const profundidadNeumaticoDeEmergencia = 'profundidadNeumaticoDeEmergencia';
/**
 * Nombre legible del dato "eficaciaTotalDelVehiculo" en el objeto que devuelve fileAnalizer.js.
 */
export const eficaciaTotalDelVehiculo = 'eficaciaTotalDelVehiculo';

/**
 * Nombre legible del dato "desviacionReferencia_1" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_1 = 'desviacionReferencia_1';
/**
 * Nombre legible del dato "desviacionReferencia_2" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_2 = 'desviacionReferencia_2';
/**
 * Nombre legible del dato "desviacionReferencia_3" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_3 = 'desviacionReferencia_3';
/**
 * Nombre legible del dato "desviacionReferencia_4" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_4 = 'desviacionReferencia_4';
/**
 * Nombre legible del dato "desviacionReferencia_5" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_5 = 'desviacionReferencia_5';
/**
 * Nombre legible del dato "desviacionReferencia_6" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_6 = 'desviacionReferencia_6';
/**
 * Nombre legible del dato "desviacionReferencia_7" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_7 = 'desviacionReferencia_7';
/**
 * Nombre legible del dato "desviacionReferencia_8" en el objeto que devuelve fileAnalizer.js.
 */
export const desviacionReferencia_8 = 'desviacionReferencia_8';
/**
 * Nombre legible del dato "velocidadMedida_1" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_1 = 'velocidadMedida_1';
/**
 * Nombre legible del dato "velocidadMedida_2" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_2 = 'velocidadMedida_2';
/**
 * Nombre legible del dato "velocidadMedida_3" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_3 = 'velocidadMedida_3';
/**
 * Nombre legible del dato "velocidadMedida_4" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_4 = 'velocidadMedida_4';
/**
 * Nombre legible del dato "velocidadMedida_5" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_5 = 'velocidadMedida_5';
/**
 * Nombre legible del dato "velocidadMedida_6" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_6 = 'velocidadMedida_6';
/**
 * Nombre legible del dato "velocidadMedida_7" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_7 = 'velocidadMedida_7';
/**
 * Nombre legible del dato "velocidadMedida_8" en el objeto que devuelve fileAnalizer.js.
 */
export const velocidadMedida_8 = 'velocidadMedida_8';
/**
 * Nombre legible del dato "distanciaRecorrida" en el objeto que devuelve fileAnalizer.js.
 */
export const distanciaRecorrida = 'distanciaRecorrida';
/**
 * Nombre legible del dato "duracionDeEnsayo" en el objeto que devuelve fileAnalizer.js.
 */
export const duracionDeEnsayo = 'duracionDeEnsayo';


/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10100 = '10100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10102 = '10102';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10104 = '10104';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10200 = '10200';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10201 = '10201';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10202 = '10202';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10203 = '10203';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10204 = '10204';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10208 = '10208';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10209 = '10209';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10210 = '10210';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10211 = '10211';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10212 = '10212';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10213 = '10213';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10214 = '10214';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10215 = '10215';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10216 = '10216';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10217 = '10217';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10300 = '10300';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10301 = '10301';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10302 = '10302';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10303 = '10303';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10304 = '10304';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10305 = '10305';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10306 = '10306';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10307 = '10307';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10308 = '10308';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10309 = '10309';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10310 = '10310';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10311 = '10311';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10312 = '10312';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10313 = '10313';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10314 = '10314';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10315 = '10315';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10316 = '10316';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10317 = '10317';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10318 = '10318';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10319 = '10319';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10320 = '10320';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10321 = '10321';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10322 = '10322';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10323 = '10323';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10324 = '10324';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10325 = '10325';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10326 = '10326';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10327 = '10327';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N10328 = '10328';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N16004 = '16004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N16003 = '16003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N16002 = '16002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N16001 = '16001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N16000 = '16000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15000 = '15000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15001 = '15001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15002 = '15002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15003 = '15003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15004 = '15004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15005 = '15005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15006 = '15006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15007 = '15007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N15008 = '15008';
/**
 * Código numérico tal como aparece en el .txt.
*/
export const N15009 = '15009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30100 = '30100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30101 = '30101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30102 = '30102';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30103 = '30103';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30104 = '30104';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N30105 = '30105';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31000 = '31000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31001 = '31001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31010 = '31010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31011 = '31011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31020 = '31020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31021 = '31021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31022 = '31022';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31100 = '31100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31101 = '31101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31110 = '31110';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31111 = '31111';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31120 = '31120';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31121 = '31121';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N31122 = '31122';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N38500 = '38500';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N38501 = 'N38501'; 
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39000 = '39000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39001 = '39001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39002 = '39002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39003 = '39003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39004 = '39004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39005 = '39005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39007 = '39007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39008 = '39008';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39009 = '39009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39010 = '39010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39011 = '39011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N39006 = '39006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50000 = '50000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50001 = '50001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50010 = '50010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50020 = '50020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50021 = '50021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50030 = '50030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50031 = '50031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50040 = '50040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50100 = '50100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50101 = '50101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51000 = '51000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51001 = '51001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51010 = '51010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51020 = '51020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51021 = '51021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51030 = '51030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51031 = '51031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51040 = '51040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51100 = '51100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51101 = '51101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52000 = '52000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52001 = '52001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52010 = '52010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52020 = '52020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52021 = '52021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52030 = '52030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52031 = '52031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52040 = '52040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52100 = '52100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52101 = '52101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53000 = '53000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53001 = '53001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53010 = '53010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53020 = '53020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53021 = '53021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53030 = '53030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53031 = '53031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53040 = '53040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53100 = '53100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53101 = '53101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54000 = '54000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54001 = '54001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54010 = '54010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54020 = '54020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54021 = '54021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54030 = '54030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54031 = '54031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54040 = '54040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54100 = '54100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54101 = '54101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55000 = '55000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55001 = '55001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55010 = '55010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55020 = '55020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55021 = '55021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55030 = '55030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55031 = '55031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55040 = '55040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55100 = '55100';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55101 = '55101';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50250 = '50250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50251 = '50251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50260 = '50260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50240 = '50240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50270 = '50270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50271 = '50271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50280 = '50280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N50281 = '50281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51250 = '51250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51251 = '51251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51260 = '51260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51240 = '51240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51270 = '51270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51271 = '51271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51280 = '51280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N51281 = '51281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52250 = '52250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52251 = '52251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52260 = '52260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52240 = '52240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52270 = '52270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52271 = '52271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52280 = '52280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N52281 = '52281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53250 = '53250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53251 = '53251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53260 = '53260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53240 = '53240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53270 = '53270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53271 = '53271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53280 = '53280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N53281 = '53281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54250 = '54250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54251 = '54251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54260 = '54260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54240 = '54240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54270 = '54270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54271 = '54271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54280 = '54280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N54281 = '54281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55250 = '55250';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55251 = '55251';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55260 = '55260';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55240 = '55240';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55270 = '55270';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55271 = '55271';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55280 = '55280';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N55281 = '55281';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N60000 = '60000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70000 = '70000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70001 = '70001';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70002 = '70002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70003 = '70003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70004 = '70004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70005 = '70005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70006 = '70006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70007 = '70007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70008 = '70008';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70009 = '70009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70010 = '70010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70011 = '70011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70012 = '70012';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70013 = '70013';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70014 = '70014';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70015 = '70015';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70016 = '70016';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N70017 = '70017';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100001 = '100001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100002 = '100002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100003 = '100003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100004 = '100004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100005 = '100005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100006 = '100006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100007 = '100007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100008 = '100008';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100009 = '100009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100010 = '100010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100011 = '100011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100012 = '100012';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100013 = '100013';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100014 = '100014';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100015 = '100015';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100016 = '100016';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100017 = '100017';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100018 = '100018';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100019 = '100019';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100020 = '100020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100021 = '100021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100022 = '100022';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100023 = '100023';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100024 = '100024';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100025 = '100025';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100026 = '100026';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100027 = '100027';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100028 = '100028';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80000 = '80000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80001 = '80001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80002 = '80002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80003 = '80003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80004 = '80004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80005 = '80005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80006 = '80006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80007 = '80007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80008 = '80008';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80009 = '80009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80010 = '80010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80011 = '80011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80012 = '80012';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80013 = '80013';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80014 = '80014';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80015 = '80015';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80016 = '80016';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80017 = '80017';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80018 = '80018';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80019 = '80019';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80020 = '80020';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80021 = '80021';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80022 = '80022';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80023 = '80023';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80024 = '80024';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80025 = '80025';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80026 = '80026';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80027 = '80027';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80028 = '80028';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80029 = '80029';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80030 = '80030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80031 = '80031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80032 = '80032';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80033 = '80033';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80034 = '80034';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80035 = '80035';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80036 = '80036';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80037 = '80037';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80038 = '80038';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80039 = '80039';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N80040 = '80040';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100030 = '100030';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100031 = '100031';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100032 = '100032';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N100033 = '100033';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61000 = '61000';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61001 = '61001';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61002 = '61002';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61003 = '61003';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61004 = '61004';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61005 = '61005';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61006 = '61006';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61007 = '61007';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61008 = '61008';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N61009 = '61009';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N610010 = '610010';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N610011 = '610011';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N610012 = '610012';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N56000 = '56000';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N95000 = '95000';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90000 = '90000';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90001 = '90001';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90002 = '90002';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90003 = '90003';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90004 = '90004';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90005 = '90005';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90006 = '90006';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90007 = '90007';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90101 = '90101';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90102 = '90102';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90103 = '90103';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90104 = '90104';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90105 = '90105';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90106 = '90106';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90107 = '90107';
/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90108 = '90108';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90200 = '90200';

/**
 * Código numérico tal como aparece en el .txt.
 */
export const N90201 = '90201';
