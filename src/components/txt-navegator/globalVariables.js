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
} from "./constantVariables.js";

import {
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
} from "./constantCollections.js";

/**
 * File used to store global variables, should the exist probably not, but they do, so deal with it
 *
 * TODO --> https://stackoverflow.com/questions/44415229/how-can-i-store-my-data-in-a-global-variable
 * --> https://trackjs.com/blog/how-to-wrap-javascript-functions/
 * --> https://stackoverflow.com/questions/5258829/wrapping-a-function-in-javascript-jquery
 *
 *      //let singleFileData = [];
 *      //let mapSingleFile = new Map();
 *
 */

/**
 *  Global Variable stores the map with the excel representation of data
 *  To be replaced by actual data when the txt file is read and proccessed.
 */
export let structureMap = new Map([
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
]);
