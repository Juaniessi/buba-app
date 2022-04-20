import {
	structureFinalMap,
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
	collectionOfVariables,
} from './constantCollections.js';
import {
	SEMICOLON,
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
} from './constantVariables.js';
import {structureMap} from './globalVariables.js';
// This didnt work as planned i have to wrap global variables into a function. More info appended to globalVariables.js
// import {singleFileData,mapSingleFile} from "./globalVariables.js";

/**
 *   Global Variable
 *   Is used to store the value of the read file.
 *   While it's cleaned trimed parsed and deconstructed
 */
let singleFileData = [];

/**
 *  Global Variable
 *  Will hold data from the txt file
 *  already parsed, cleaned and deconstructed.
 */
let mapSingleFile = new Map();

let valorJson = new Map();

// Handle multiple fileuploads
document.getElementById('file-input').addEventListener(
	'change',
	function (ev) {
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
			// document.getElementById("singleFileButton").click();
			valorJson = proccesFileGetJson(true);
			document.querySelector('#jsonContainer').innerHTML = valorJson;
			document.querySelector('#jsonContainer').style.display = 'block';
			//console.log(valorJson) ;
		}, 20);
	},
	false
);

/**
 * Button to parse data from file into json and print in text
 */
document.getElementById('singleFileButton').addEventListener(
	'click',
	function (ev) {
		returnSetOfDataSF();
		let transformedMap = populateStructure();
		let text = transformMapToJson(true);

		if (transformedMap !== structureFinalMap) {
			document.querySelector('#jsonContainer').innerHTML = text;
			document.querySelector('#jsonContainer').style.display = 'block';
		}
	},
	false
);

/**
 * Calls the functions that will process any files stored in singleFileData
 * @returns retrieves the json object
 */
export function proccesFileGetJson(stringify) {
	returnSetOfDataSF();
	populateStructure();
	let text = transformMapToJson(stringify);

	return text;
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
			mappedObj.set(alineacionMap.get(key), mapSingleFile.get(key));
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
			mappedSuspencionEjeDelantero.set(
				suspencionEjeDelanteroMap.get(key),
				mapSingleFile.get(key)
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
			mappedObj.set(suspencionEjeTraseroMap.get(key), mapSingleFile.get(key));
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
			mappedObj.set(opacimetroMap.get(key), mapSingleFile.get(key));
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
			mappedObj.set(analizadorDeGasesMap.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_1Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_2Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_3Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_4Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_5Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenosEje_6Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_1Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_2Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_3Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_4Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_5Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(frenoDeManoEje_6Map.get(key), mapSingleFile.get(key));
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
			mappedObj.set(sonometroMap.get(key), mapSingleFile.get(key));
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
			mappedObj.set(luxometroMap.get(key), mapSingleFile.get(key));
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
			mappedObj.set(valoresCalibradosMap.get(key), mapSingleFile.get(key));
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
