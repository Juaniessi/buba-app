import {
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
  patente,
  numeroDeChasis,
  numeroMotor,
  marcaDelVehiculo,
  añoDeFabricacion,
  subModelo,
  modelo,
  kilometros,
  tipoVehiculo,
  combustible,
  cantidadDeEjes,
  apellido,
  nombre,
  direccion,
  documentoDeIdentidad,
  email,
  teléfono,
  localidad,
  provincia,
  idPruebaRefTramite,
  fechaHora,
  pruebaDeAlineacion,
  pruebaDeSuspension,
  pruebaDeFrenos,
  pruebaDeFrenosDeMano,
  pruebaDeLuces,
  pruebaDeGases,
  pruebaDeInspVisual,
  pruebaDeInspFosa,
  pruebaSonometro,
  resultadoAlineacionEje1,
  resultadoAlineacionEje2,
  resultadoAlineacionEje3,
  resultadoAlineacionEje4,
  resultadoAlineacionEje5,
  resultadoAlineacionEje6,
  rendimientoDelanteroDerecho,
  rendimientoDelanteroIzquierdo,
  rendimientoTraseroDerecho,
  rendimientoTraseroIzquierdo,
  amplitudMaximaLadoDerecho,
  amplitudMaximaLadoIzquierdo,
  pesoLadoDerecho,
  pesoLadoIzquierdo,
  diferenciaRendimientoLadoALado,
  resultadoMedicionOpacidad,
  resultadoMonoxidoDeCarbonoCO,
  resultadoPartesPorMillonHC,
  resultadoSensorDeOxigenoO2,
  resultadoPartesPorMillonNox,
  resultadoDioxidoDeCarbonoCO1,
  lambda,
  fuerzaDeFrenadoLadoDerecho,
  fuerzaDeFrenadoLadoIzquierdo,
  diferenciaFzaFrenadoLadoALado,
  rendimientoDelEje,
  ovalidadLadoDerecho,
  ovalidadLadoIzquierdo,
  resistenciaALaRodaduraLadoDerecho,
  resistenciaALaRodaduraLadoIzquierdo,
  valorDeMedicion,
  alineacionFaroDerechoHorizontal,
  alineacionFaroIzquierdoHorizontal,
  intensidadAltaDerecha,
  intensidadAltaIzquierda,
  intensidadBajaDerecha,
  intensidadBajaIzquierda,
  intensidadAuxiliarDerecha,
  intensidadAuxiliarIzquierda,
  alineacionFaroDerechoVertical,
  alineacionFaroIzquierdoVertical,
  motivoDeCorteDePruebaDeFrenoEje1,
  motivoDeCorteDePruebaDeFrenoEje2,
  motivoDeCorteDePruebaDeFrenoEje3,
  motivoDeCorteDePruebaDeFrenoEje4,
  motivoDeCorteDePruebaDeFrenoEje5,
  motivoDeCorteDePruebaDeFrenoEje6,
  motivoDeCorteDePruebaDeFManoEje1,
  motivoDeCorteDePruebaDeFManoEje2,
  motivoDeCorteDePruebaDeFManoEje3,
  motivoDeCorteDePruebaDeFManoEje4,
  motivoDeCorteDePruebaDeFManoEje5,
  motivoDeCorteDePruebaDeFManoEje6,
  valorDeCeroDeBFDerecho,
  valorDeCeroDeBFIzquierdo,
  valorDeCeroBalanzaDerecha,
  valorDeCeroDeBalanzaIzquierda,
  valorDeGananciaBFIzquierdo,
  valorDeGananciaDeBFDerecho,
  valorDeGananciaDeBalanzaIzquierda,
  valorDeGananciaDeBalanzaDerecha,
  numeroDeLinea,
  fechaDeIngresoAlPuesto1,
  fechaDeSalidaDelPuesto1,
  operadorPuesto1,
  fechaDeIngresoAlPuesto2,
  fechaDeSalidaDelPuesto2,
  operadorPuesto2,
  fechaDeIngresoAlPuesto3,
  fechaDeSalidaDelPuesto3,
  operadorPuesto3,
  fechaDeIngresoAlPuesto4,
  fechaDeSalidaDelPuesto4,
  operadorPuesto4,
  fechaDeIngresoAlPuesto5,
  fechaDeSalidaDelPuesto5,
  operadorPuesto5,
  fechaDeIngresoAlPuesto6,
  fechaDeSalidaDelPuesto6,
  operadorPuesto6,
  fechaDeIngresoAlPuesto7,
  fechaDeSalidaDelPuesto7,
  operadorPuesto7,
  fechaDeIngresoAlPuesto8,
  fechaDeSalidaDelPuesto8,
  operadorPuesto8,
  fechaDeIngresoAlPuesto9,
  fechaDeSalidaDelPuesto9,
  operadorPuesto9,
  fechaDeIngresoAlPuesto10,
  fechaDeSalidaDelPuesto10,
  operadorPuesto10,
  nroDeLineaPto1,
  nroDeLineaPto2,
  nroDeLineaPto3,
  nroDeLineaPto4,
  nroDeLineaPto5,
  nroDeLineaPto6,
  nroDeLineaPto7,
  nroDeLineaPto8,
  nroDeLineaPto9,
  nroDeLineaPto10,
  N10100,
  N10102,
  N10104,
  N10200,
  N10201,
  N10202,
  N10203,
  N10204,
  N10208,
  N10209,
  N10210,
  N10300,
  N10301,
  N10302,
  N10303,
  N10304,
  N10305,
  N10306,
  N10307,
  N16001,
  N16000,
  N15000,
  N15001,
  N15002,
  N15003,
  N15004,
  N15005,
  N15006,
  N15007,
  N15008,
  N30100,
  N30101,
  N30102,
  N30103,
  N30104,
  N30105,
  N31000,
  N31001,
  N31010,
  N31011,
  N31020,
  N31021,
  N31022,
  N31100,
  N31101,
  N31110,
  N31111,
  N31120,
  N31121,
  N31122,
  N38500,
  N39000,
  N39001,
  N39002,
  N39003,
  N39004,
  N39005,
  N50000,
  N50001,
  N50010,
  N50020,
  N50021,
  N50030,
  N50031,
  N50040,
  N50100,
  N50101,
  N51000,
  N51001,
  N51010,
  N51020,
  N51021,
  N51030,
  N51031,
  N51040,
  N51100,
  N51101,
  N52000,
  N52001,
  N52010,
  N52020,
  N52021,
  N52030,
  N52031,
  N52040,
  N52100,
  N52101,
  N53000,
  N53001,
  N53010,
  N53020,
  N53021,
  N53030,
  N53031,
  N53040,
  N53100,
  N53101,
  N54000,
  N54001,
  N54010,
  N54020,
  N54021,
  N54030,
  N54031,
  N54040,
  N54100,
  N54101,
  N55000,
  N55001,
  N55010,
  N55020,
  N55021,
  N55030,
  N55031,
  N55040,
  N55100,
  N55101,
  N50250,
  N50251,
  N50260,
  N50240,
  N50270,
  N50271,
  N50280,
  N50281,
  N51250,
  N51251,
  N51260,
  N51240,
  N51270,
  N51271,
  N51280,
  N51281,
  N52250,
  N52251,
  N52260,
  N52240,
  N52270,
  N52271,
  N52280,
  N52281,
  N53250,
  N53251,
  N53260,
  N53240,
  N53270,
  N53271,
  N53280,
  N53281,
  N54250,
  N54251,
  N54260,
  N54240,
  N54270,
  N54271,
  N54280,
  N54281,
  N55250,
  N55251,
  N55260,
  N55240,
  N55270,
  N55271,
  N55280,
  N55281,
  N60000,
  N70000,
  N70001,
  N70002,
  N70003,
  N70004,
  N70005,
  N70006,
  N70007,
  N70008,
  N70009,
  N100001,
  N100002,
  N100003,
  N100004,
  N100005,
  N100006,
  N100007,
  N100008,
  N100009,
  N100010,
  N100011,
  N100012,
  N100013,
  N100014,
  N100015,
  N100016,
  N100017,
  N100018,
  N100019,
  N100020,
  N80000,
  N80001,
  N80002,
  N80003,
  N80004,
  N80005,
  N80006,
  N80007,
  N80008,
  N80009,
  N80010,
  N80011,
  N80012,
  N80013,
  N80014,
  N80015,
  N80016,
  N80017,
  N80018,
  N80019,
  N80020,
  N80021,
  N80022,
  N80023,
  N80024,
  N80025,
  N80026,
  N80027,
  N80028,
  N80029,
  N80030,
  N80031,
  N80032,
  N80033,
  N80034,
  N80035,
  N80036,
  N80037,
  N80038,
  N80039,
  N80040,
  FOTOVALIDACION,
  fotovalidacion,
  N100030,
  nomProvN61000,
  nomProvN61001,
  nomProvN61002,
  nomProvN61003,
  nomProvN61004,
  nomProvN61005,
  nomProvN61006,
  nomProvN61007,
  nomProvN61008,
  nomProvN61009,
  nomProvN610010,
  nomProvN610011,
  nomProvN610012,
  N61000,
  N61001,
  N61002,
  N61003,
  N61004,
  N61005,
  N61006,
  N61007,
  N61008,
  N61009,
  N610010,
  N610011,
  N610012,
  PROFUNDIDAD_DE_NEUMATICOS,
} from "./constantVariables.js";

/**
 * Dirty Categories used to clean the trash data from the read file.
 */
export const categories = [
  "[HEADER]",
  "Datos Vehículo",
  "Datos Propietario",
  "Resultado Luxometro",
  "Resultado Sonometro",
  "Resultado Gases",
  "Resultado Opacimetro",
  "Resultados Alineador al Paso",
  "Resultados Suspensión Eje Delantero",
  "Resultados Suspensión Eje Trasero",
  "Resultado Frenometro Eje Delantero",
  "Resultado Frenometro Eje Trasero",
  "Resultado Freno de Mano Eje Delantero",
  "Resultado Freno de Mano Eje Trasero",
  "Pruebas de Rodadura",
  "Parametros del Equipo ",
  "Datos de Generales del Ensayo",
  "END MET DATA",
  "------------End Of File--------------",
  "999999=Fin de Archivo",
  "[ENDOFFILE]",
  "999999=END OF FILE",
  "[DATAOUT]",
  "Inspección Visual",
  "Inspección Visual Detector de Holguras",
  "Profundida de Neumaticos",
  "Fotovalidación",
];

/**
 * All keys from the header category in the excel file.
 */
export const headerKeys = [
  N10100,
  N10102,
  N10104,
  N10200,
  N10201,
  N10202,
  N10203,
  N10204,
  N10208,
  N10209,
  N10210,
  N10300,
  N10301,
  N10302,
  N10303,
  N10304,
  N10305,
  N10306,
  N10307,
  N16001,
  N16000,
  N15000,
  N15001,
  N15002,
  N15003,
  N15004,
  N15005,
  N15006,
  N15007,
  N15008,
];

/**
 * All keys from the alineacion category in the excel file.
 */
export const alineacionKeys = [N30100, N30101, N30102, N30103, N30104, N30105];
/**
 * All keys from the suspencionEjeDelantero category in the excel file.
 */
export const suspencionEjeDelanteroKeys = [
  N31000,
  N31001,
  N31010,
  N31011,
  N31020,
  N31021,
  N31022,
];
/**
 * All keys from the suspencionEjeTrasero category in the excel file.
 */
export const suspencionEjeTraseroKeys = [
  N31100,
  N31101,
  N31110,
  N31111,
  N31120,
  N31121,
  N31122,
];
/**
 * All keys from the opacimetro category in the excel file.
 */
export const opacimetroKeys = ["38500"];
/**
 * All keys from the analizadorDeGases category in the excel file.
 */
export const analizadorDeGasesKeys = [
  N39000,
  N39001,
  N39002,
  N39003,
  N39004,
  N39005,
];
/**
 * All keys from the frenosEje_1 category in the excel file.
 */
export const frenosEje_1Keys = [
  N50000,
  N50001,
  N50010,
  N50020,
  N50021,
  N50030,
  N50031,
  N50040,
  N50100,
  N50101,
];
/**
 * All keys from the frenosEje_2 category in the excel file.
 */
export const frenosEje_2Keys = [
  N51000,
  N51001,
  N51010,
  N51020,
  N51021,
  N51030,
  N51031,
  N51040,
  N51100,
  N51101,
];
/**
 * All keys from the frenosEje category in the excel file.
 */
export const frenosEje_3Keys = [
  N52000,
  N52001,
  N52010,
  N52020,
  N52021,
  N52030,
  N52031,
  N52040,
  N52100,
  N52101,
];
/**
 * All keys from the frenosEje_4 category in the excel file.
 */
export const frenosEje_4Keys = [
  N53000,
  N53001,
  N53010,
  N53020,
  N53021,
  N53030,
  N53031,
  N53040,
  N53100,
  N53101,
];
/**
 * All keys from the frenosEje_5 category in the excel file.
 */
export const frenosEje_5Keys = [
  N54000,
  N54001,
  N54010,
  N54020,
  N54021,
  N54030,
  N54031,
  N54040,
  N54100,
  N54101,
];
/**
 * All keys from the frenosEje_6 category in the excel file.
 */
export const frenosEje_6Keys = [
  N55000,
  N55001,
  N55010,
  N55020,
  N55021,
  N55030,
  N55031,
  N55040,
  N55100,
  N55101,
];
/**
 * All keys from the frenoDeManoEje_1 category in the excel file.
 */
export const frenoDeManoEje_1Keys = [
  N50250,
  N50251,
  N50260,
  N50240,
  N50270,
  N50271,
  N50280,
  N50281,
];
/**
 * All keys from the frenoDeManoEje_2 category in the excel file.
 */
export const frenoDeManoEje_2Keys = [
  N51250,
  N51251,
  N51260,
  N51240,
  N51270,
  N51271,
  N51280,
  N51281,
];
/**
 * All keys from the frenoDeManoEje_3 category in the excel file.
 */
export const frenoDeManoEje_3Keys = [
  N52250,
  N52251,
  N52260,
  N52240,
  N52270,
  N52271,
  N52280,
  N52281,
];
/**
 * All keys from the frenoDeManoEje_4 category in the excel file.
 */
export const frenoDeManoEje_4Keys = [
  N53250,
  N53251,
  N53260,
  N53240,
  N53270,
  N53271,
  N53280,
  N53281,
];
/**
 * All keys from the frenoDeManoEje_5 category in the excel file.
 */
export const frenoDeManoEje_5Keys = [
  N54250,
  N54251,
  N54260,
  N54240,
  N54270,
  N54271,
  N54280,
  N54281,
];
/**
 * All keys from the frenoDeManoEje_6 category in the excel file.
 */
export const frenoDeManoEje_6Keys = [
  N55250,
  N55251,
  N55260,
  N55240,
  N55270,
  N55271,
  N55280,
  N55281,
];
/**
 * All keys from the sonometro category in the excel file.
 */
export const sonometroKeys = ["60000"];
/**
 * All keys from the luxometro category in the excel file.
 */
export const luxometroKeys = [
  N70000,
  N70001,
  N70002,
  N70003,
  N70004,
  N70005,
  N70006,
  N70007,
  N70008,
  N70009,
];
/**
 * All keys from the inspeccionVisual category in the excel file.
 */
export const inspeccionVisualKeys = [];
/**
 * All keys from the inspeccionDH category in the excel file.
 */
export const inspeccionDHKeys = [];
/**
 * All keys from the frenos category in the excel file.
 */
export const frenosKeys = [
  N100001,
  N100002,
  N100003,
  N100004,
  N100005,
  N100006,
  N100007,
  N100008,
  N100009,
  N100010,
  N100011,
  N100012,
];
/**
 * All keys from the valoresCalibrados category in the excel file.
 */
export const valoresCalibradosKeys = [
  N100013,
  N100014,
  N100015,
  N100016,
  N100017,
  N100018,
  N100019,
  N100020,
];
/**
 * All keys from the lineaDePrueba category in the excel file.
 */
export const lineaDePruebaKeys = [80000];
/**
 * All keys from the estadisticaDePuestos category in the excel file.
 */
export const estadisticaDePuestosKeys = [
  N80001,
  N80002,
  N80003,
  N80004,
  N80005,
  N80006,
  N80007,
  N80008,
  N80009,
  N80010,
  N80011,
  N80012,
  N80013,
  N80014,
  N80015,
  N80016,
  N80017,
  N80018,
  N80019,
  N80020,
  N80021,
  N80022,
  N80023,
  N80024,
  N80025,
  N80026,
  N80027,
  N80028,
  N80029,
  N80030,
  N80031,
  N80032,
  N80033,
  N80034,
  N80035,
  N80036,
  N80037,
  N80038,
  N80039,
  N80040,
];

/**
 * All keys from the fotovalidacion category in the excel file.
 */
export const fotovalidacionKeys = [N100030];

/**
 * All keys and values from the profundidaDeNeumaticos category in the excel file.
 */
export const profundidaDeNeumaticosKeys = [
  N61000,
  N61001,
  N61002,
  N61003,
  N61004,
  N61005,
  N61006,
  N61007,
  N61008,
  N61009,
  N610010,
  N610011,
  N610012,
];

/**
 * All keys and values from the header category in the excel file.
 */
export const headerMap = new Map([
  [N10100, patente],
  [N10102, numeroDeChasis],
  [N10104, numeroMotor],
  [N10200, marcaDelVehiculo],
  [N10201, añoDeFabricacion],
  [N10202, subModelo],
  [N10203, modelo],
  [N10204, kilometros],
  [N10208, tipoVehiculo],
  [N10209, combustible],
  [N10210, cantidadDeEjes],
  [N10300, apellido],
  [N10301, nombre],
  [N10302, direccion],
  [N10303, documentoDeIdentidad],
  [N10304, email],
  [N10305, teléfono],
  [N10306, localidad],
  [N10307, provincia],
  [N16001, idPruebaRefTramite],
  [N16000, fechaHora],
  [N15000, pruebaDeAlineacion],
  [N15001, pruebaDeSuspension],
  [N15002, pruebaDeFrenos],
  [N15003, pruebaDeFrenosDeMano],
  [N15004, pruebaDeLuces],
  [N15005, pruebaDeGases],
  [N15006, pruebaDeInspVisual],
  [N15007, pruebaDeInspFosa],
  [N15008, pruebaSonometro],
]);

/**
 * All keys and values from the alineacion category in the excel file.
 */
export const alineacionMap = new Map([
  [N30100, resultadoAlineacionEje1],
  [N30101, resultadoAlineacionEje2],
  [N30102, resultadoAlineacionEje3],
  [N30103, resultadoAlineacionEje4],
  [N30104, resultadoAlineacionEje5],
  [N30105, resultadoAlineacionEje6],
]);
/**
 * All keys and values from the suspencionEjeDelantero category in the excel file.
 */
export const suspencionEjeDelanteroMap = new Map([
  [N31000, rendimientoDelanteroDerecho],
  [N31001, rendimientoDelanteroIzquierdo],
  [N31010, amplitudMaximaLadoDerecho],
  [N31011, amplitudMaximaLadoIzquierdo],
  [N31020, pesoLadoDerecho],
  [N31021, pesoLadoIzquierdo],
  [N31022, diferenciaRendimientoLadoALado],
]);
/**
 * All keys and values from the suspencionEjeTrasero category in the excel file.
 */
export const suspencionEjeTraseroMap = new Map([
  [N31100, rendimientoTraseroDerecho],
  [N31101, rendimientoTraseroIzquierdo],
  [N31110, amplitudMaximaLadoDerecho],
  [N31111, amplitudMaximaLadoIzquierdo],
  [N31120, pesoLadoDerecho],
  [N31121, pesoLadoIzquierdo],
  [N31122, diferenciaRendimientoLadoALado],
]);
/**
 * All keys and values from the opacimetro category in the excel file.
 */
export const opacimetroMap = new Map([[N38500, resultadoMedicionOpacidad]]);
/**
 * All keys and values from the analizadorDeGases category in the excel file.
 */
export const analizadorDeGasesMap = new Map([
  [N39000, resultadoMonoxidoDeCarbonoCO],
  [N39001, resultadoPartesPorMillonHC],
  [N39002, resultadoSensorDeOxigenoO2],
  [N39003, resultadoPartesPorMillonNox],
  [N39004, resultadoDioxidoDeCarbonoCO1],
  [N39005, lambda],
]);
/**
 * All keys and values from the frenosEje_1 category in the excel file.
 */
export const frenosEje_1Map = new Map([
  [N50000, fuerzaDeFrenadoLadoDerecho],
  [N50001, fuerzaDeFrenadoLadoIzquierdo],
  [N50010, diferenciaFzaFrenadoLadoALado],
  [N50020, ovalidadLadoDerecho],
  [N50021, ovalidadLadoIzquierdo],
  [N50030, resistenciaALaRodaduraLadoDerecho],
  [N50031, resistenciaALaRodaduraLadoIzquierdo],
  [N50040, rendimientoDelEje],
  [N50100, pesoLadoDerecho],
  [N50101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenosEje_2 category in the excel file.
 */
export const frenosEje_2Map = new Map([
  [N51000, fuerzaDeFrenadoLadoDerecho],
  [N51001, fuerzaDeFrenadoLadoIzquierdo],
  [N51010, diferenciaFzaFrenadoLadoALado],
  [N51020, ovalidadLadoDerecho],
  [N51021, ovalidadLadoIzquierdo],
  [N51030, resistenciaALaRodaduraLadoDerecho],
  [N51031, resistenciaALaRodaduraLadoIzquierdo],
  [N51040, rendimientoDelEje],
  [N51100, pesoLadoDerecho],
  [N51101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenosEje category in the excel file.
 */
export const frenosEje_3Map = new Map([
  [N52000, fuerzaDeFrenadoLadoDerecho],
  [N52001, fuerzaDeFrenadoLadoIzquierdo],
  [N52010, diferenciaFzaFrenadoLadoALado],
  [N52020, ovalidadLadoDerecho],
  [N52021, ovalidadLadoIzquierdo],
  [N52030, resistenciaALaRodaduraLadoDerecho],
  [N52031, resistenciaALaRodaduraLadoIzquierdo],
  [N52040, rendimientoDelEje],
  [N52100, pesoLadoDerecho],
  [N52101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenosEje_4 category in the excel file.
 */
export const frenosEje_4Map = new Map([
  [N53000, fuerzaDeFrenadoLadoDerecho],
  [N53001, fuerzaDeFrenadoLadoIzquierdo],
  [N53010, diferenciaFzaFrenadoLadoALado],
  [N53020, ovalidadLadoDerecho],
  [N53021, ovalidadLadoIzquierdo],
  [N53030, resistenciaALaRodaduraLadoDerecho],
  [N53031, resistenciaALaRodaduraLadoIzquierdo],
  [N53040, rendimientoDelEje],
  [N53100, pesoLadoDerecho],
  [N53101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenosEje_5 category in the excel file.
 */
export const frenosEje_5Map = new Map([
  [N54000, fuerzaDeFrenadoLadoDerecho],
  [N54001, fuerzaDeFrenadoLadoIzquierdo],
  [N54010, diferenciaFzaFrenadoLadoALado],
  [N54020, ovalidadLadoDerecho],
  [N54021, ovalidadLadoIzquierdo],
  [N54030, resistenciaALaRodaduraLadoDerecho],
  [N54031, resistenciaALaRodaduraLadoIzquierdo],
  [N54040, rendimientoDelEje],
  [N54100, pesoLadoDerecho],
  [N54101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenosEje_6 category in the excel file.
 */
export const frenosEje_6Map = new Map([
  [N55000, fuerzaDeFrenadoLadoDerecho],
  [N55001, fuerzaDeFrenadoLadoIzquierdo],
  [N55010, diferenciaFzaFrenadoLadoALado],
  [N55020, ovalidadLadoDerecho],
  [N55021, ovalidadLadoIzquierdo],
  [N55030, resistenciaALaRodaduraLadoDerecho],
  [N55031, resistenciaALaRodaduraLadoIzquierdo],
  [N55040, rendimientoDelEje],
  [N55100, pesoLadoDerecho],
  [N55101, pesoLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_1 category in the excel file.
 */
export const frenoDeManoEje_1Map = new Map([
  [N50250, fuerzaDeFrenadoLadoDerecho],
  [N50251, fuerzaDeFrenadoLadoIzquierdo],
  [N50260, diferenciaFzaFrenadoLadoALado],
  [N50240, rendimientoDelEje],
  [N50270, ovalidadLadoDerecho],
  [N50271, ovalidadLadoIzquierdo],
  [N50280, resistenciaALaRodaduraLadoDerecho],
  [N50281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_2 category in the excel file.
 */
export const frenoDeManoEje_2Map = new Map([
  [N51250, fuerzaDeFrenadoLadoDerecho],
  [N51251, fuerzaDeFrenadoLadoIzquierdo],
  [N51260, diferenciaFzaFrenadoLadoALado],
  [N51240, rendimientoDelEje],
  [N51270, ovalidadLadoDerecho],
  [N51271, ovalidadLadoIzquierdo],
  [N51280, resistenciaALaRodaduraLadoDerecho],
  [N51281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_3 category in the excel file.
 */
export const frenoDeManoEje_3Map = new Map([
  [N52250, fuerzaDeFrenadoLadoDerecho],
  [N52251, fuerzaDeFrenadoLadoIzquierdo],
  [N52260, diferenciaFzaFrenadoLadoALado],
  [N52240, rendimientoDelEje],
  [N52270, ovalidadLadoDerecho],
  [N52271, ovalidadLadoIzquierdo],
  [N52280, resistenciaALaRodaduraLadoDerecho],
  [N52281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_4 category in the excel file.
 */
export const frenoDeManoEje_4Map = new Map([
  [N53250, fuerzaDeFrenadoLadoDerecho],
  [N53251, fuerzaDeFrenadoLadoIzquierdo],
  [N53260, diferenciaFzaFrenadoLadoALado],
  [N53240, rendimientoDelEje],
  [N53270, ovalidadLadoDerecho],
  [N53271, ovalidadLadoIzquierdo],
  [N53280, resistenciaALaRodaduraLadoDerecho],
  [N53281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_5 category in the excel file.
 */
export const frenoDeManoEje_5Map = new Map([
  [N54250, fuerzaDeFrenadoLadoDerecho],
  [N54251, fuerzaDeFrenadoLadoIzquierdo],
  [N54260, diferenciaFzaFrenadoLadoALado],
  [N54240, rendimientoDelEje],
  [N54270, ovalidadLadoDerecho],
  [N54271, ovalidadLadoIzquierdo],
  [N54280, resistenciaALaRodaduraLadoDerecho],
  [N54281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the frenoDeManoEje_6 category in the excel file.
 */
export const frenoDeManoEje_6Map = new Map([
  [N55250, fuerzaDeFrenadoLadoDerecho],
  [N55251, fuerzaDeFrenadoLadoIzquierdo],
  [N55260, diferenciaFzaFrenadoLadoALado],
  [N55240, rendimientoDelEje],
  [N55270, ovalidadLadoDerecho],
  [N55271, ovalidadLadoIzquierdo],
  [N55280, resistenciaALaRodaduraLadoDerecho],
  [N55281, resistenciaALaRodaduraLadoIzquierdo],
]);
/**
 * All keys and values from the sonometro category in the excel file.
 */
export const sonometroMap = new Map([[N60000, valorDeMedicion]]);
/**
 * All keys and values from the luxometro category in the excel file.
 */
export const luxometroMap = new Map([
  [N70000, alineacionFaroDerechoHorizontal],
  [N70001, alineacionFaroIzquierdoHorizontal],
  [N70002, intensidadAltaDerecha],
  [N70003, intensidadAltaIzquierda],
  [N70004, intensidadBajaDerecha],
  [N70005, intensidadBajaIzquierda],
  [N70006, intensidadAuxiliarDerecha],
  [N70007, intensidadAuxiliarIzquierda],
  [N70008, alineacionFaroDerechoVertical],
  [N70009, alineacionFaroIzquierdoVertical],
]);
/**
 * All keys and values from the inspeccionVisual category in the excel file.
 */
export const inspeccionVisualMap = new Map([]);
/**
 * All keys and values from the inspeccionDH category in the excel file.
 */
export const inspeccionDHMap = new Map([]);
/**
 * All keys and values from the frenos category in the excel file.
 */
export const frenosMap = new Map([
  [N100001, motivoDeCorteDePruebaDeFrenoEje1],
  [N100002, motivoDeCorteDePruebaDeFrenoEje2],
  [N100003, motivoDeCorteDePruebaDeFrenoEje3],
  [N100004, motivoDeCorteDePruebaDeFrenoEje4],
  [N100005, motivoDeCorteDePruebaDeFrenoEje5],
  [N100006, motivoDeCorteDePruebaDeFrenoEje6],
  [N100007, motivoDeCorteDePruebaDeFManoEje1],
  [N100008, motivoDeCorteDePruebaDeFManoEje2],
  [N100009, motivoDeCorteDePruebaDeFManoEje3],
  [N100010, motivoDeCorteDePruebaDeFManoEje4],
  [N100011, motivoDeCorteDePruebaDeFManoEje5],
  [N100012, motivoDeCorteDePruebaDeFManoEje6],
]);
/**
 * All keys and values from the valoresCalibrados category in the excel file.
 */
export const valoresCalibradosMap = new Map([
  [N100013, valorDeCeroDeBFDerecho],
  [N100014, valorDeCeroDeBFIzquierdo],
  [N100015, valorDeCeroBalanzaDerecha],
  [N100016, valorDeCeroDeBalanzaIzquierda],
  [N100017, valorDeGananciaBFIzquierdo],
  [N100018, valorDeGananciaDeBFDerecho],
  [N100019, valorDeGananciaDeBalanzaIzquierda],
  [N100020, valorDeGananciaDeBalanzaDerecha],
]);
/**
 * All keys and values from the lineaDePrueba category in the excel file.
 */
export const lineaDePruebaMap = new Map([[N80000, numeroDeLinea]]);
/**
 * All keys and values from the estadisticaDePuestos category in the excel file.
 */
export const estadisticaDePuestosMap = new Map([
  [N80001, fechaDeIngresoAlPuesto1],
  [N80002, fechaDeSalidaDelPuesto1],
  [N80003, operadorPuesto1],
  [N80004, fechaDeIngresoAlPuesto2],
  [N80005, fechaDeSalidaDelPuesto2],
  [N80006, operadorPuesto2],
  [N80007, fechaDeIngresoAlPuesto3],
  [N80008, fechaDeSalidaDelPuesto3],
  [N80009, operadorPuesto3],
  [N80010, fechaDeIngresoAlPuesto4],
  [N80011, fechaDeSalidaDelPuesto4],
  [N80012, operadorPuesto4],
  [N80013, fechaDeIngresoAlPuesto5],
  [N80014, fechaDeSalidaDelPuesto5],
  [N80015, operadorPuesto5],
  [N80016, fechaDeIngresoAlPuesto6],
  [N80017, fechaDeSalidaDelPuesto6],
  [N80018, operadorPuesto6],
  [N80019, fechaDeIngresoAlPuesto7],
  [N80020, fechaDeSalidaDelPuesto7],
  [N80021, operadorPuesto7],
  [N80022, fechaDeIngresoAlPuesto8],
  [N80023, fechaDeSalidaDelPuesto8],
  [N80024, operadorPuesto8],
  [N80025, fechaDeIngresoAlPuesto9],
  [N80026, fechaDeSalidaDelPuesto9],
  [N80027, operadorPuesto9],
  [N80028, fechaDeIngresoAlPuesto10],
  [N80029, fechaDeSalidaDelPuesto10],
  [N80030, operadorPuesto10],
  [N80031, nroDeLineaPto1],
  [N80032, nroDeLineaPto2],
  [N80033, nroDeLineaPto3],
  [N80034, nroDeLineaPto4],
  [N80035, nroDeLineaPto5],
  [N80036, nroDeLineaPto6],
  [N80037, nroDeLineaPto7],
  [N80038, nroDeLineaPto8],
  [N80039, nroDeLineaPto9],
  [N80040, nroDeLineaPto10],
]);

/**
 * All keys and values from the fotovalidacion category in the excel file.
 */
export const fotovalidacionMap = new Map([[N100030, fotovalidacion]]);

/**
 * All keys and values from the profundidaDeNeumaticos category in the excel file.
 */
export const profundidaDeNeumaticosMap = new Map([
  [N61000, nomProvN61000],
  [N61001, nomProvN61001],
  [N61002, nomProvN61002],
  [N61003, nomProvN61003],
  [N61004, nomProvN61004],
  [N61005, nomProvN61005],
  [N61006, nomProvN61006],
  [N61007, nomProvN61007],
  [N61008, nomProvN61008],
  [N61009, nomProvN61009],
  [N610010, nomProvN610010],
  [N610011, nomProvN610011],
  [N610012, nomProvN610012],
]);

/**
 *  Stores the map with the excel representation of data.
 *  To remain as a comparison structure when the txt file is read and proccessed.
 */
export const structureFinalMap = new Map([
  [HEADER, headerMap],
  [ALINEACION, alineacionMap],
  [SUSPENSION_EJE_DELANTERO, suspencionEjeDelanteroMap],
  [SUSPENSION_EJE_TRASERO, suspencionEjeTraseroMap],
  [OPACIMETRO, opacimetroMap],
  [ANALIZADOR_DE_GASES, analizadorDeGasesMap],
  [FRENOS_EJE_1, frenosEje_1Map],
  [FRENOS_EJE_2, frenosEje_2Map],
  [FRENOS_EJE_3, frenosEje_3Map],
  [FRENOS_EJE_4, frenosEje_4Map],
  [FRENOS_EJE_5, frenosEje_5Map],
  [FRENOS_EJE_6, frenosEje_6Map],
  [FRENO_DE_MANO_EJE_1, frenoDeManoEje_1Map],
  [FRENO_DE_MANO_EJE_2, frenoDeManoEje_2Map],
  [FRENO_DE_MANO_EJE_3, frenoDeManoEje_3Map],
  [FRENO_DE_MANO_EJE_4, frenoDeManoEje_4Map],
  [FRENO_DE_MANO_EJE_5, frenoDeManoEje_5Map],
  [FRENO_DE_MANO_EJE_6, frenoDeManoEje_6Map],
  [SONOMETRO, sonometroMap],
  [LUXOMETRO, luxometroMap],
  [INSPECCION_VISUAL, inspeccionVisualMap],
  [INSPECCION_DH, inspeccionDHMap],
  [FRENOS, frenosMap],
  [VALORES_CALIBRADOS, valoresCalibradosMap],
  [LINEA_DE_PRUEBA, lineaDePruebaMap],
  [ESTADISTICA_DE_PUESTOS, estadisticaDePuestosMap],
  [FOTOVALIDACION, fotovalidacionMap],
  [PROFUNDIDAD_DE_NEUMATICOS, profundidaDeNeumaticosMap],
]);

/**
 * Stores al the variables that represents categories from the excel in a collection.
 */
export const collectionOfVariables = [
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
];
