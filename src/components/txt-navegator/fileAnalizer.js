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
  headerKeys,
  alineacionKeys,
  suspencionEjeDelanteroKeys,
  suspencionEjeTraseroKeys,
  opacimetroKeys,
  analizadorDeGasesKeys,
  frenosEje_1Keys,
  frenosEje_2Keys,
  frenosEje_3Keys,
  frenosEje_4Keys,
  frenosEje_5Keys,
  frenosEje_6Keys,
  frenoDeManoEje_1Keys,
  frenoDeManoEje_2Keys,
  frenoDeManoEje_3Keys,
  frenoDeManoEje_4Keys,
  frenoDeManoEje_5Keys,
  frenoDeManoEje_6Keys,
  sonometroKeys,
  luxometroKeys,
  inspeccionVisualKeys,
  inspeccionDHKeys,
  frenosKeys,
  valoresCalibradosKeys,
  lineaDePruebaKeys,
  estadisticaDePuestosKeys,
  fotovalidacionKeys,
  profundidaDeNeumaticosKeys,
  collectionOfVariables,
  profundidaDeNeumaticosMap,
  pruebasKeys,
  pruebasMap,
} from './constantCollections.js';
import {
  SEMICOLON,
  EMPTY,
  EMPTY_SPACE,
  NEW_LINE,
  TABS,
  intHeader,
  intAlineacion,
  intSuspencionEjeDelantero,
  intSuspencionEjeTrasero,
  intOpacimetro,
  intAnalizadorDeGases,
  intFrenosEje_1,
  intFrenosEje_2,
  intFrenosEje_3,
  intFrenosEje_4,
  intFrenosEje_5,
  intFrenosEje_6,
  intFrenoDeManoEje_1,
  intFrenoDeManoEje_2,
  intFrenoDeManoEje_3,
  intFrenoDeManoEje_4,
  intFrenoDeManoEje_5,
  intFrenoDeManoEje_6,
  intSonometro,
  intLuxometro,
  intInspeccionVisual,
  intInspeccionDH,
  intFrenos,
  intValoresCalibrados,
  intLineaDePrueba,
  intEstadisticaDePuesto,
  intFotovalidacion,
  TWO_INT,
  intprofundidaDeNeumaticos,
  intPruebas,
} from './constantVariables.js';
import { structureMap } from './globalVariables.js';

/**
 *   Global Variable scopped to this file only
 *   Is used to store the value of the read file.
 *   While it's cleaned trimed parsed and deconstructed
 */
let singleFileData = [];

/**
 *  Global Variable scopped to this file only
 *  Will hold data from the txt file
 *  already parsed, cleaned and deconstructed.
 */
let mapSingleFile = new Map();

/**
 *  Global Variable scopped to this file only
 *  Will hold data from the txt file as object
 */
let fileAsObject;

// Handle multiple fileuploads
/* document.getElementById('file-input').addEventListener(
	'change', */
export function procesTxt(ev) {
  let files = ev.currentTarget.files;
  let readers = [];

  // Abort if there were no files selected
  if (!files.length) return;

  // Store promises in array
  for (let i = 0; i < files.length; i++) {
    readers.push(readFileAsText(files[i]));
  }

  singleFileData = [];

  // Trigger Promises
  Promise.all(readers).then((values) => {
    // Values will be an array that contains an item
    // with the text of every selected file
    // ["File1 Content", "File2 Content" ... "FileN Content"]
    singleFileData.push(values.toString());
  });

  setTimeout(function () {
    proccesFileGetJson(true);
    fileAsObject = proccesFileGetObject();

    window.fileAsObject = fileAsObject;
    window.fileAsMap = structureMap;
    return fileAsObject;
  }, 50);
}

/**
 * Calls the functions that will process any files stored in singleFileData
 * @returns retrieves the json object
 */
export function proccesFileGetJson(stringify) {
  returnSetOfDataSF();
  populateStructure();
  return transformMapToJson(stringify);
}

/**
 * Calls the functions that will process any files stored in singleFileData
 * @returns retrieves the object
 */
export function proccesFileGetObject() {
  returnSetOfDataSF();
  populateStructure();
  return transformMapToObject();
}

/**
 * Simple JavaScript Promise that reads a file as text.
 *
 * @param {*} file A file to read
 * @returns returns a promise with the file read
 */
function readFileAsText(file) {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsText(file);
  });
}

/**
 * Reads an array an normalices the data in it to a map
 * it asumes the array has only one object
 *
 * @returns  the map with normalized uncategorized and deconstructed data.
 */
function returnSetOfDataSF() {
  // Abort if there were no files selected
  if (!singleFileData.length) return;

  //console.log(singleFileData) ; //aca se ve la mugre a limpiar

  let sanitizedFileData = cleanCategories(singleFileData[0]);

  // split by newline separator
  let firstDivisionArr = sanitizedFileData.split(NEW_LINE);

  // clean empty, semicolons, and blank spaces
  let secondDivision = cleanElementsOfArray(firstDivisionArr);

  // clean previous map
  mapSingleFile = new Map();

  secondDivision.forEach(createMap);
  //console.log(mapSingleFile);
  //console.log("Termine ^_^ mapSingleFile" + mapSingleFile);

  return mapSingleFile;
}

function createMap(item, index, arr) {
  let itemArr = item.split('=');

  mapSingleFile.set(itemArr[0], itemArr[1]);
}

/**
 * Clean each garbage categories from the file read.
 *
 * @param {*} data a stirng of text from the file read.
 * @returns a string of text clean from categories.
 */
function cleanCategories(data) {
  let result = data !== undefined ? data : '';

  for (let i = 0; i < categories.length; i++) {
    let replaceCategories = categories[i] + '\r\n';
    result = result.replace(replaceCategories, '');
  }

  return result;
}

/**
 * Clean each element of the array from
 * - semicolons
 * - blank spaces and
 * - new lines at end of file
 * - and empty slots created by new lines at initial split of file
 *
 * @param {*} data an array of splited text by NEW_LINE from the file read
 * @returns a very clean and tidy array, such wow, such clean.
 */
function cleanElementsOfArray(data) {
  // Abort if there were no files selected
  if (!data.length) return;

  let result = data !== undefined ? data : [];

  for (let i = 0; i < data.length; i++) {
    result[i] = result[i].replaceAll(EMPTY_SPACE, '');
    result[i] = result[i].replaceAll(SEMICOLON, '');
    result[i] = result[i].replaceAll(NEW_LINE, '');
    result[i] = result[i].trim();
  }

  result = cleanArrayOfEmpty(result);

  return result;
}

/**
 *
 * Remove empty_SPACE elements and return a new array
 *
 * @param {*} dirtyOne the array to clean
 * @returns  A new array with no empty spaces
 */
function cleanArrayOfEmpty(dirtyOne) {
  let newArray = [];
  for (let i = 0; i < dirtyOne.length; i++) {
    if (dirtyOne[i]) {
      newArray.push(dirtyOne[i]);
    }
  }
  return newArray;
}
/**
 * Populates the structureMap with the data from the txt file stored in mapSinfleFile
 *
 * @returns the structuredMap global object with each generated content replacing the placeholder.
 */
function populateStructure() {
  let mappedHeader = new Map();
  let mappedAlineacion = new Map();
  let mappedSuspencionEjeDelantero = new Map();
  let mappedSuspencionEjeTrasero = new Map();
  let mappedOpacimetro = new Map();
  let mappedAnalizadorDeGases = new Map();
  let mappedFrenosEje_1 = new Map();
  let mappedFrenosEje_2 = new Map();
  let mappedFrenosEje_3 = new Map();
  let mappedFrenosEje_4 = new Map();
  let mappedFrenosEje_5 = new Map();
  let mappedFrenosEje_6 = new Map();
  let mappedFrenoDeManoEje_1 = new Map();
  let mappedFrenoDeManoEje_2 = new Map();
  let mappedFrenoDeManoEje_3 = new Map();
  let mappedFrenoDeManoEje_4 = new Map();
  let mappedFrenoDeManoEje_5 = new Map();
  let mappedFrenoDeManoEje_6 = new Map();
  let mappedSonometro = new Map();
  let mappedLuxometro = new Map();
  let mappedInspeccionVisual = new Map();
  let mappedInspeccionDH = new Map();
  let mappedFrenos = new Map();
  let mappedValoresCalibrados = new Map();
  let mappedLineaDePrueba = new Map();
  let mappedEstadisticaDePuestos = new Map();
  let mappedFotovalidacion = new Map();
  let mappedProfundidaDeNeumaticos = new Map();
  let mappedPrueba = new Map();

  let collectionOfMaps = [
    mappedHeader,
    mappedAlineacion,
    mappedSuspencionEjeDelantero,
    mappedSuspencionEjeTrasero,
    mappedOpacimetro,
    mappedAnalizadorDeGases,
    mappedFrenosEje_1,
    mappedFrenosEje_2,
    mappedFrenosEje_3,
    mappedFrenosEje_4,
    mappedFrenosEje_5,
    mappedFrenosEje_6,
    mappedFrenoDeManoEje_1,
    mappedFrenoDeManoEje_2,
    mappedFrenoDeManoEje_3,
    mappedFrenoDeManoEje_4,
    mappedFrenoDeManoEje_5,
    mappedFrenoDeManoEje_6,
    mappedSonometro,
    mappedLuxometro,
    mappedInspeccionVisual,
    mappedInspeccionDH,
    mappedFrenos,
    mappedValoresCalibrados,
    mappedLineaDePrueba,
    mappedEstadisticaDePuestos,
    mappedFotovalidacion,
    mappedProfundidaDeNeumaticos,
    mappedPrueba,
  ];

  /** Generates structure elements to be replaced on the model map */
  mapSingleFile.forEach(function (item, key, map) {
    generateAllStructuresOnMap(item, key, map, collectionOfMaps);
  });

  /** Replace elements in structure map if they where updated, instantiate empty map them if unchanged */
  for (let i = 0; i < collectionOfMaps.length; i++) {
    if (collectionOfMaps[i].size > 0) {
      structureMap.set(collectionOfVariables[i], collectionOfMaps[i]);
    } else {
      structureMap.set(collectionOfVariables[i], new Map());
    }
  }

  return structureMap;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Constructs the mappedCategories of structureMap
 *
 * @param {*} value current value from mapSingleFile
 * @param {*} key current key from mapSingleFile
 * @param {*} map the global object mapSingleFile
 * @param {*} collectionOfMaps the maps that will store the new mapping of elements from.
 */
function generateAllStructuresOnMap(value, key, map, collectionOfMaps) {
  mapHeader(key, value, collectionOfMaps[intHeader]);
  mapAlineacion(key, value, collectionOfMaps[intAlineacion]);
  mapSuspencionEjeDelantero(
    key,
    value,
    collectionOfMaps[intSuspencionEjeDelantero]
  );
  mapSuspencionEjeTrasero(
    key,
    value,
    collectionOfMaps[intSuspencionEjeTrasero]
  );
  mapOpacimetro(key, value, collectionOfMaps[intOpacimetro]);
  mapAnalizadorDeGases(key, value, collectionOfMaps[intAnalizadorDeGases]);
  mapFrenosEje_1(key, value, collectionOfMaps[intFrenosEje_1]);
  mapFrenosEje_2(key, value, collectionOfMaps[intFrenosEje_2]);
  mapFrenosEje_3(key, value, collectionOfMaps[intFrenosEje_3]);
  mapFrenosEje_4(key, value, collectionOfMaps[intFrenosEje_4]);
  mapFrenosEje_5(key, value, collectionOfMaps[intFrenosEje_5]);
  mapFrenosEje_6(key, value, collectionOfMaps[intFrenosEje_6]);
  mapFrenoDeManoEje_1(key, value, collectionOfMaps[intFrenoDeManoEje_1]);
  mapFrenoDeManoEje_2(key, value, collectionOfMaps[intFrenoDeManoEje_2]);
  mapFrenoDeManoEje_3(key, value, collectionOfMaps[intFrenoDeManoEje_3]);
  mapFrenoDeManoEje_4(key, value, collectionOfMaps[intFrenoDeManoEje_4]);
  mapFrenoDeManoEje_5(key, value, collectionOfMaps[intFrenoDeManoEje_5]);
  mapFrenoDeManoEje_6(key, value, collectionOfMaps[intFrenoDeManoEje_6]);
  mapSonometro(key, value, collectionOfMaps[intSonometro]);
  mapLuxometro(key, value, collectionOfMaps[intLuxometro]);
  mapInspeccionVisual(key, value, collectionOfMaps[intInspeccionVisual]);
  mapInspeccionDH(key, value, collectionOfMaps[intInspeccionDH]);
  mapFrenos(key, value, collectionOfMaps[intFrenos]);
  mapValoresCalibrados(key, value, collectionOfMaps[intValoresCalibrados]);
  mapLineaDePrueba(key, value, collectionOfMaps[intLineaDePrueba]);
  mapEstadísticaDePuestos(key, value, collectionOfMaps[intEstadisticaDePuesto]);
  mapFotovalidacion(key, value, collectionOfMaps[intFotovalidacion]);
  mapProfundidadDeNeumaticos(
    key,
    value,
    collectionOfMaps[intprofundidaDeNeumaticos]
  );
  mapPruebas(key, value, collectionOfMaps[intPruebas]);
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the header structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapHeader(key, value, mappedObj) {
  for (let i = 0; i < headerKeys.length; i++) {
    if (key === headerKeys[i]) {
      mappedObj.set(headerMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}
/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the alineacion structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapAlineacion(key, value, mappedObj) {
  for (let i = 0; i < alineacionKeys.length; i++) {
    if (key === alineacionKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(alineacionMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the suspensionEjeDelantero structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedSuspencionEjeDelantero the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapSuspencionEjeDelantero(key, value, mappedSuspencionEjeDelantero) {
  for (let i = 0; i < suspencionEjeDelanteroKeys.length; i++) {
    if (key === suspencionEjeDelanteroKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 1);

      mappedSuspencionEjeDelantero.set(
        suspencionEjeDelanteroMap.get(key),
        convertedToNum
      );
    }
  }
  return mappedSuspencionEjeDelantero;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapSuspencionEjeTrasero structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapSuspencionEjeTrasero(key, value, mappedObj) {
  for (let i = 0; i < suspencionEjeTraseroKeys.length; i++) {
    if (key === suspencionEjeTraseroKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 1);

      mappedObj.set(suspencionEjeTraseroMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapOpacimetro structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapOpacimetro(key, value, mappedObj) {
  for (let i = 0; i < opacimetroKeys.length; i++) {
    if (key === opacimetroKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(opacimetroMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapAnalizadorDeGases structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapAnalizadorDeGases(key, value, mappedObj) {
  for (let i = 0; i < analizadorDeGasesKeys.length; i++) {
    if (key === analizadorDeGasesKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(analizadorDeGasesMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_1 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_1(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_1Keys.length; i++) {
    if (key === frenosEje_1Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_1Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_2 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_2(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_2Keys.length; i++) {
    if (key === frenosEje_2Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_2Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_3 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_3(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_3Keys.length; i++) {
    if (key === frenosEje_3Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_3Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_4 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_4(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_4Keys.length; i++) {
    if (key === frenosEje_4Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_4Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_5 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_5(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_5Keys.length; i++) {
    if (key === frenosEje_5Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_5Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the mapFrenosEje_6 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenosEje_6(key, value, mappedObj) {
  for (let i = 0; i < frenosEje_6Keys.length; i++) {
    if (key === frenosEje_6Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenosEje_6Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_1 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_1(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_1Keys.length; i++) {
    if (key === frenoDeManoEje_1Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_1Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_2 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_2(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_2Keys.length; i++) {
    if (key === frenoDeManoEje_2Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_2Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_3 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_3(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_3Keys.length; i++) {
    if (key === frenoDeManoEje_3Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_3Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_4 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_4(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_4Keys.length; i++) {
    if (key === frenoDeManoEje_4Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_4Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_5 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_5(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_5Keys.length; i++) {
    if (key === frenoDeManoEje_5Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_5Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenoDeManoEje_6 structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenoDeManoEje_6(key, value, mappedObj) {
  for (let i = 0; i < frenoDeManoEje_6Keys.length; i++) {
    if (key === frenoDeManoEje_6Keys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(frenoDeManoEje_6Map.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the sonometro structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapSonometro(key, value, mappedObj) {
  for (let i = 0; i < sonometroKeys.length; i++) {
    if (key === sonometroKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(sonometroMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the luxometro structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapLuxometro(key, value, mappedObj) {
  for (let i = 0; i < luxometroKeys.length; i++) {
    if (key === luxometroKeys[i]) {
      let convertedToNum = stringToNumber(mapSingleFile.get(key), 2);

      mappedObj.set(luxometroMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the inspeccionVisual structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapInspeccionVisual(key, value, mappedObj) {
  for (let i = 0; i < inspeccionVisualKeys.length; i++) {
    if (key === inspeccionVisualKeys[i]) {
      mappedObj.set(inspeccionVisualMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the inspeccionDH structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapInspeccionDH(key, value, mappedObj) {
  for (let i = 0; i < inspeccionDHKeys.length; i++) {
    if (key === inspeccionDHKeys[i]) {
      mappedObj.set(inspeccionDHMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the frenos structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFrenos(key, value, mappedObj) {
  for (let i = 0; i < frenosKeys.length; i++) {
    if (key === frenosKeys[i]) {
      mappedObj.set(frenosMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the valoresCalibrados structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapValoresCalibrados(key, value, mappedObj) {
  for (let i = 0; i < valoresCalibradosKeys.length; i++) {
    if (key === valoresCalibradosKeys[i]) {
      let convertedToNum = stringToNumberNotFixed(mapSingleFile.get(key));

      mappedObj.set(valoresCalibradosMap.get(key), convertedToNum);
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the lineaDePrueba structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapLineaDePrueba(key, value, mappedObj) {
  for (let i = 0; i < lineaDePruebaKeys.length; i++) {
    if (key === lineaDePruebaKeys[i]) {
      mappedObj.set(lineaDePruebaMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the estadísticaDePuestos structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapEstadísticaDePuestos(key, value, mappedObj) {
  for (let i = 0; i < estadisticaDePuestosKeys.length; i++) {
    if (key === estadisticaDePuestosKeys[i]) {
      mappedObj.set(estadisticaDePuestosMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}
/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the fotovalidacion structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapFotovalidacion(key, value, mappedObj) {
  for (let i = 0; i < fotovalidacionKeys.length; i++) {
    if (key === fotovalidacionKeys[i]) {
      mappedObj.set(fotovalidacionMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the ProfundidadDeNeumaticos structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapProfundidadDeNeumaticos(key, value, mappedObj) {
  for (let i = 0; i < profundidaDeNeumaticosKeys.length; i++) {
    if (key === profundidaDeNeumaticosKeys[i]) {
      mappedObj.set(profundidaDeNeumaticosMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Function to be called in a for each loop of the global variable mapSingleFile
 * Function that maps the ProfundidadDeNeumaticos structure
 *
 * @param {*} key current key from mapSingleFile
 * @param {*} value current value from mapSingleFile
 * @param {*} mappedObj the placeholder for data to be mapped into from data in the mapSingleFile global variable
 * @returns the new constructed map with data from the mapSingleFile global variable
 */
function mapPruebas(key, value, mappedObj) {
  for (let i = 0; i < pruebasKeys.length; i++) {
    if (key === pruebasKeys[i]) {
      mappedObj.set(pruebasMap.get(key), mapSingleFile.get(key));
    }
  }
  return mappedObj;
}

/**
 * Transforms the structureMap into a object
 * And returns it as a JSON
 *
 * @returns Jsonified global variable structureMap.
 */
function transformMapToJson(Stringify) {
  let jsonString;

  /** Transform main Map into object */
  let obj = Object.fromEntries(structureMap);

  /** Transform submap into object and set it to obj */
  for (let i = 0; i < collectionOfVariables.length; i++) {
    let internalObj = Object.fromEntries(
      structureMap.get(collectionOfVariables[i])
    );
    let varToSearch = collectionOfVariables[i];
    obj[varToSearch] = internalObj;
  }

  jsonString = JSON.stringify(obj); // just the minimized json

  if (Stringify === true) {
    jsonString = JSON.stringify(obj, null, TABS); // Stringify with tabs
  }

  return jsonString;
}

/**
 * Transforms the structureMap into a object
 * And returns it.
 *
 * @returns objectified global variable structureMap.
 */
function transformMapToObject() {
  /** Transform main Map into object */
  let obj = Object.fromEntries(structureMap);

  /** Transform submap into object and set it to obj */
  for (let i = 0; i < collectionOfVariables.length; i++) {
    let internalObj = Object.fromEntries(
      structureMap.get(collectionOfVariables[i])
    );
    let varToSearch = collectionOfVariables[i];
    obj[varToSearch] = internalObj;
  }

  fixPercentajesInObj(obj);
  fixStringsToDates(obj);

  console.log(obj);

  return obj;
}

/**
 * Transforms a String into a number.
 *
 * @param {*} number Number to be transformed.
 * @returns the string transformed into number without rounding or Empty if Nan.
 */
function stringToNumberNotFixed(number) {
  let numReady = Number(parseFloat(number.replace(',', '.')));

  if (isNaN(parseFloat(numReady))) {
    numReady = EMPTY;
  }

  return numReady;
}

/**
 * Transform a string into a number rounded to a fixed amount of decimal values.
 *
 * @param {*} number Number to be transformed
 * @param {*} decimalValues Amount of decimal values to round
 * @returns the string transformed into number with rounding or Empty if Nan.
 */
function stringToNumber(number, decimalValues) {
  let numReady = Number(
    parseFloat(number.replace(',', '.')).toFixed(decimalValues)
  );

  if (isNaN(parseFloat(numReady))) {
    numReady = EMPTY;
  }

  return numReady;
}

/**
 * Transforms a number into a percentual value
 * Removes the NaN values with EMPTY
 *
 * @param {*} number Number to be transformed
 * @param {*} decimalValues Amount of decimal values to round
 * @returns the number as a percentage
 */
function numberToPercentage(number, decimalValues) {
  let numReady = Number((number * 1).toFixed(decimalValues));

  if (isNaN(parseFloat(numReady))) {
    numReady = EMPTY;
  }

  return numReady;
}

/**
 * Special transformation into percentages to specific values of each map in the transformed obj
 *
 * @param {*} obj the structureMap transformed into obj
 */
function fixPercentajesInObj(obj) {
  let freno1Ovalidad1 = obj.frenosEje_1.ovalidadLadoDerecho;
  let freno1Ovalidad2 = obj.frenosEje_1.ovalidadLadoIzquierdo;
  obj.frenosEje_1.ovalidadLadoDerecho = numberToPercentage(
    freno1Ovalidad1,
    TWO_INT
  );

  obj.frenosEje_1.ovalidadLadoIzquierdo = numberToPercentage(
    freno1Ovalidad2,
    TWO_INT
  );

  let freno2Ovalidad1 = obj.frenosEje_2.ovalidadLadoDerecho;
  let freno2Ovalidad2 = obj.frenosEje_2.ovalidadLadoIzquierdo;
  obj.frenosEje_2.ovalidadLadoDerecho = numberToPercentage(
    freno2Ovalidad1,
    TWO_INT
  );
  obj.frenosEje_2.ovalidadLadoIzquierdo = numberToPercentage(
    freno2Ovalidad2,
    TWO_INT
  );

  let freno3Ovalidad1 = obj.frenosEje_3.ovalidadLadoDerecho;
  let freno3Ovalidad2 = obj.frenosEje_3.ovalidadLadoIzquierdo;
  obj.frenosEje_3.ovalidadLadoDerecho = numberToPercentage(
    freno3Ovalidad1,
    TWO_INT
  );
  obj.frenosEje_3.ovalidadLadoIzquierdo = numberToPercentage(
    freno3Ovalidad2,
    TWO_INT
  );

  let freno4Ovalidad1 = obj.frenosEje_4.ovalidadLadoDerecho;
  let freno4Ovalidad2 = obj.frenosEje_4.ovalidadLadoIzquierdo;
  obj.frenosEje_4.ovalidadLadoDerecho = numberToPercentage(
    freno4Ovalidad1,
    TWO_INT
  );
  obj.frenosEje_4.ovalidadLadoIzquierdo = numberToPercentage(
    freno4Ovalidad2,
    TWO_INT
  );

  let freno5Ovalidad1 = obj.frenosEje_5.ovalidadLadoDerecho;
  let freno5Ovalidad2 = obj.frenosEje_5.ovalidadLadoIzquierdo;
  obj.frenosEje_5.ovalidadLadoDerecho = numberToPercentage(
    freno5Ovalidad1,
    TWO_INT
  );
  obj.frenosEje_5.ovalidadLadoIzquierdo = numberToPercentage(
    freno5Ovalidad2,
    TWO_INT
  );

  let freno6Ovalidad1 = obj.frenosEje_6.ovalidadLadoDerecho;
  let freno6Ovalidad2 = obj.frenosEje_6.ovalidadLadoIzquierdo;
  obj.frenosEje_6.ovalidadLadoDerecho = numberToPercentage(
    freno6Ovalidad1,
    TWO_INT
  );
  obj.frenosEje_6.ovalidadLadoIzquierdo = numberToPercentage(
    freno6Ovalidad2,
    TWO_INT
  );

  let frenoMano1_Ovalidad1 = obj.frenoDeManoEje_1.ovalidadLadoDerecho;
  let frenoMano1_Ovalidad2 = obj.frenoDeManoEje_1.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_1.ovalidadLadoDerecho = numberToPercentage(
    frenoMano1_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_1.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano1_Ovalidad2,
    TWO_INT
  );

  let frenoMano2_Ovalidad1 = obj.frenoDeManoEje_2.ovalidadLadoDerecho;
  let frenoMano2_Ovalidad2 = obj.frenoDeManoEje_2.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_2.ovalidadLadoDerecho = numberToPercentage(
    frenoMano2_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_2.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano2_Ovalidad2,
    TWO_INT
  );

  let frenoMano3_Ovalidad1 = obj.frenoDeManoEje_3.ovalidadLadoDerecho;
  let frenoMano3_Ovalidad2 = obj.frenoDeManoEje_3.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_3.ovalidadLadoDerecho = numberToPercentage(
    frenoMano3_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_3.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano3_Ovalidad2,
    TWO_INT
  );

  let frenoMano4_Ovalidad1 = obj.frenoDeManoEje_4.ovalidadLadoDerecho;
  let frenoMano4_Ovalidad2 = obj.frenoDeManoEje_4.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_4.ovalidadLadoDerecho = numberToPercentage(
    frenoMano4_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_4.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano4_Ovalidad2,
    TWO_INT
  );

  let frenoMano5_Ovalidad1 = obj.frenoDeManoEje_5.ovalidadLadoDerecho;
  let frenoMano5_Ovalidad2 = obj.frenoDeManoEje_5.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_5.ovalidadLadoDerecho = numberToPercentage(
    frenoMano5_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_5.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano5_Ovalidad2,
    TWO_INT
  );

  let frenoMano6_Ovalidad1 = obj.frenoDeManoEje_6.ovalidadLadoDerecho;
  let frenoMano6_Ovalidad2 = obj.frenoDeManoEje_6.ovalidadLadoIzquierdo;
  obj.frenoDeManoEje_6.ovalidadLadoDerecho = numberToPercentage(
    frenoMano6_Ovalidad1,
    TWO_INT
  );
  obj.frenoDeManoEje_6.ovalidadLadoIzquierdo = numberToPercentage(
    frenoMano6_Ovalidad2,
    TWO_INT
  );

  let año = obj.header.añoDeFabricacion;
  obj.header.añoDeFabricacion = stringToNumberNotFixed(año);
}

/**
 * Transforms strings into dates
 * @param {*} obj the file as object
 */
function fixStringsToDates(obj) {
  let dateIn1 = obj.estadísticaDePuestos.fechaDeIngresoAlPuesto1;
  obj.estadísticaDePuestos.fechaDeIngresoAlPuesto1 =
    getDatesFromString(dateIn1);

  let dateOut1 = obj.estadísticaDePuestos.fechaDeSalidaDelPuesto1;
  obj.estadísticaDePuestos.fechaDeSalidaDelPuesto1 =
    getDatesFromString(dateOut1);

  /**
   * When dates in and out of station 2 are undefined
   * they will take the values of in and outs in station 1
   */

  let dateIn2 = obj.estadísticaDePuestos.fechaDeIngresoAlPuesto2;
  if (dateIn2 === undefined) {
    dateIn2 = dateIn1;
  }
  obj.estadísticaDePuestos.fechaDeIngresoAlPuesto2 =
    getDatesFromString(dateIn2);

  let dateOut2 = obj.estadísticaDePuestos.fechaDeSalidaDelPuesto2;
  if (dateOut2 === undefined) {
    dateOut2 = dateOut1;
  }
  obj.estadísticaDePuestos.fechaDeSalidaDelPuesto2 =
    getDatesFromString(dateOut2);
}

/**
 * Parses a string with the format [dd/mm/yyyy HH:mm:ss] or [dd/m/yyyy HH:mm:ss]  into a date
 *
 * @param {*} value a date in string format. Example: [25/2/2021 09:32:49]
 * @returns A date or undefined if undefined
 */
function getDatesFromString(value) {
  if (value === undefined) {
    return undefined;
  }

  let day;
  let month;
  let year;
  let hours;
  let minutes;
  let seconds;

  let date;
  let time;
  let resultDate;

  if (value.length === 16) {
    date = value.substring(0, 8);
    time = value.substring(8, 16);
  }

  if (value.length === 17) {
    date = value.substring(0, 9);
    time = value.substring(9, 17);
  }

  if (value.length === 18) {
    date = value.substring(0, 10);
    time = value.substring(10, 18);
  }

  let dateArray = date.split('/');

  day = dateArray[0];
  month = dateArray[1];
  year = dateArray[2];

  let timeArray = time.split(':');

  hours = timeArray[0];
  minutes = timeArray[1];
  seconds = timeArray[2];

  if (month - 1 !== NaN) {
    month = month - 1;
  }

  resultDate = new Date(year, month, day, hours, minutes, seconds);

  return resultDate;
}
