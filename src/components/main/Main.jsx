import React, {useState, useRef} from 'react';
import trashCan from '../../assets/trash-can-solid.svg';
import carReport from '../../assets/informe-img/informe-auto.svg';
import pickupReport from '../../assets/informe-img/informe-camioneta.svg';
import truckReport from '../../assets/informe-img/informe-camion.svg';
import motoReport from '../../assets/informe-img/informe-moto.svg';
import {procesTxt} from '../txt-navegator/fileAnalizer.js';
import {autoArray} from '../context/carDataBase';
import {motoArray} from '../context/motoDataBase';

function Main() {
	const [tipo, setTipo] = useState('Auto');
	const handleTipo = (e) => {
		setSeveridad('Moderado');
		setTipo(e.target.value);
		setGrupo({value: '', label: ''});
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
		setLista([]);
		setTxtRender('');
	};
	const [severidad, setSeveridad] = useState('Moderado');
	const handleSeveridad = (e) => {
		setSeveridad(e.target.value);
	};
	const [grupo, setGrupo] = useState({value: '', label: ''});
	const handleGrupo = (item) => {
		setGrupo(item);
		setSeccion({value: '', label: ''});
		setDescripcion({value: '', label: ''});
	};
	const [seccion, setSeccion] = useState({value: '', label: ''});
	const handleSeccion = (item) => {
		setSeccion(item);
		setDescripcion({value: '', label: ''});
	};
	const [descripcion, setDescripcion] = useState({value: '', label: ''});
	const handleDescripcion = (item) => {
		setDescripcion(item);
	};
	const [unlistedDef, setUnlistedDef] = useState('');
	const [lista, setLista] = useState([]);

	const [txtRender, setTxtRender] = useState('');
	const handleTxtRender = (e) => {
		
		procesTxt(e);
		setTimeout(function () {
			setTxtRender(window.fileAsObject);
		}, 60);
		setTimeout(function () {
			loadFileRef.current.value = null;
		}, 90);
	};

	const loadFileRef = useRef(null);

	let tipoArray = tipo !== 'Moto' ? autoArray : motoArray; //esta variable cambia entre los arrays de autos y motos
	let section = grupo.value !== '' ? tipoArray.seccion[grupo.value] : []; //esta variable almacena el array de seccion a mapear
	let description =
		seccion.value !== '' && grupo.value !== ''
			? tipoArray.descripciones[grupo.value][seccion.value] || []
			: []; //esta varibale almacena el array de descripción a mapear
	let severityColour; //esta varaible me da el color de la severidad
	let imgSelector; // this varaible sets te img to show

	function reportImgselector(tipo) {
		if (tipo === 'Auto') {
			imgSelector = carReport;
		} else if (tipo === 'Camioneta') {
			imgSelector = pickupReport;
		} else if (tipo === 'Camion') {
			imgSelector = truckReport;
		} else if (tipo === 'Moto') {
			imgSelector = motoReport;
		} else {
			imgSelector = carReport;
		}
		return imgSelector;
	}

	let armarLista = (e) => {
		e.preventDefault(); // va con esto para que el submit no borre todo, porque esta dentro de la etiqueta form
		let sevOrder = 2; //variable creada para poder ordenar por severidad

		switch (severidad) {
			case 'Leve':
				sevOrder = 3;
				break;
			case 'Grave':
				sevOrder = 1;
				break;
			default:
				sevOrder = 2; //este es el caso de moderado, que de paso esta seteado al comienzo
		}

		let itemLista = {
			grupo: grupo.label,
			seccion: seccion.label,
			desc: seccion.value === 'otro' ? unlistedDef : descripcion.label,
			sev: severidad,
			Ord: sevOrder,
		};

		if (
			severidad !== '' &&
			grupo.value !== '' &&
			seccion.value !== '' &&
			(unlistedDef !== '' || descripcion.value !== '')
		) {
			setLista(lista.concat(itemLista));
			setSeveridad('Moderado');
			setGrupo({value: '', label: ''});
			setSeccion({value: '', label: ''});
			setDescripcion({value: '', label: ''});
			setUnlistedDef('');
		} else {
			alert('Todos los campos deben estar completos');
		}

		return;
	};

	//funcion que borra un item de la lista
	function eraseDefect(index) {
		const nuevaLista = lista.filter((algo, i) => {
			/* "algo" es para decirle al filter que tome las props
			 y despues "i" que es el índice */
			return index !== i ? true : false;
		});
		setLista(nuevaLista);
	}

	function defectList(props, i) {
		/* no estoy usando seccion porque de momento no lo quiero en el render, 
		pero lo dejo por si algún día pinta que aparezca */
		const {grupo, seccion, desc, sev} = props;

		switch (
			sev //cambia entre las clases de los posibles colores según la severidad
		) {
			case 'Leve':
				severityColour = 'yellow';
				break;
			case 'Moderado':
				severityColour = 'orange';
				break;
			case 'Grave':
				severityColour = 'black';
				break;
			default:
				severityColour = '';
		}

		return (
			<tr className={`item-lista`} key={i}>
				<td className={`grupo-col ${severityColour}`}>{grupo}</td>
				{/* <td className={`${severityColour}`}>{seccion}</td> */}
				<td className={`descripcion-col ${severityColour}`}>{desc}</td>
				<td className={`severidad-col ${severityColour}`}>{sev}</td>
				<td className="phantom-col"></td>
				<td className="erase-btn-ctn">
					<button className="erase-btn" onClick={() => eraseDefect(i)}>
						<img className="trash-can" src={trashCan} alt="Trash-can" />
					</button>
				</td>
			</tr>
		);
	}

	/**  function to evaluate if alineation is ok, the same function is used for most evaluations
	 * @param {*} fecha from object: fileAsObject, starts undefined so must check to that
	 * @returns the date of expiration
	 */
	let fecha =
		window.fileAsObject === undefined
			? ''
			: window.fileAsObject.estadísticaDePuestos.fechaDeSalidaDelPuesto2;

	function addDays(date, days) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	let fechaVen = addDays(fecha, 60);

	/**  function to evaluate if alineation is ok, the same function is used for most evaluations
	 * @param {*} alineation prop from object: fileAsObject
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */

	function alineationEvaluator(alineation) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (alineation <= -10 || alineation >= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (alineation <= -5 || alineation >= 5) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (alineation <= -3 || alineation >= 3) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function suspEvaluator(suspRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (suspRend <= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (suspRend <= 40) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (suspRend <= 60) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakePerfEvaluator(brakeRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeRend <= 10) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeRend <= 40) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeRend <= 50) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function handBrakePerfEvaluator(brakeRend) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeRend <= 0) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeRend <= 14.4) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeRend <= 17) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeDifferenceEvaluator(brakeDif) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeDif >= 50) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeDif >= 15) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeDif >= 12) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeStrenghtEvaluator(brakeStrenght) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeStrenght < 0.1) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeStrenght < 0.5) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeStrenght < 1) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeResistEvaluator(brakeResist) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeResist > 2) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeResist > 1) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeResist > 0.5) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeOvalEvaluator(brakeOval) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (brakeOval > 80) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (brakeOval > 30) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (brakeOval > 15) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxLowIntEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt > 200) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt > 27) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt > 26) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxHighIntEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt > 200) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt > 150) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt > 65) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function LuxAngleEvaluator(luxInt) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (luxInt > 15) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (luxInt > 7) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (luxInt > 5) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function opacitiEvaluator(opaciti) {
		let severityEvaluation = '';
		let severityLetter = '';
		if (opaciti > 2) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (opaciti > 0.25) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (opaciti > 0.2) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}
	/**
	 *Function to be called to rectify a bad year input
	 * @returns {*} the case number to be applied to the noiseEvaluator evaluators
	 */
	function yearRectificatordb() {
		let anoFabrication = window.fileAsObject.header.añoDeFabricacion;
		let caseNumber;

		if (
			anoFabrication < 1920 ||
			anoFabrication > 2200 ||
			anoFabrication === ''
		) {
			anoFabrication = 2000;
		}
		if (anoFabrication <= 1997) {
			caseNumber = 1;
		} else {
			caseNumber = 2;
		}
		return caseNumber;
	}
	/**  function to evaluate if HC ppm are ok, the same function is used for most evaluations.
	 * @param {*} db prop from object: fileAsObject.
	 * @param {*} caseNumber value extracted from yearRectificatorGas.
	 * @param {*} tipo uses the state variable to understand wich vehicle is being evaluated.
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */
	function noiseEvaluator(db, caseNumber, tipo) {
		let severityEvaluation = '';
		let severityLetter = '';

		if (tipo === 'Auto' || tipo === 'Camioneta' || tipo === 'Moto') {
			switch (caseNumber) {
				case 1:
					if (db > 120) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db > 88) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db > 80) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
				case 2:
					if (db > 120) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db > 83) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db > 80) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
			}
		} else if (tipo === 'Camion') {
			switch (caseNumber) {
				case 1:
					if (db > 110) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db > 95) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db > 85) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
				case 2:
					if (db > 110) {
						severityEvaluation = 'severe';
						severityLetter = 'G';
					} else if (db > 87) {
						severityEvaluation = 'moderate';
						severityLetter = 'M';
					} else if (db > 84) {
						severityEvaluation = 'minor';
						severityLetter = 'L';
					} else {
						severityEvaluation = '';
						severityLetter = 'A';
					}
					return (
						<span className={`${severityEvaluation}`}>{severityLetter}</span>
					);
			}
		}
	}

	/**
	 *Function to be called to rectify a bad year input
	 * @returns {*} the case number to be applied to the HC or CO evaluators
	 */
	function yearRectificatorGas() {
		let anoFabrication = window.fileAsObject.header.añoDeFabricacion;
		let caseNumber;

		if (
			anoFabrication < 1920 ||
			anoFabrication > 2200 ||
			anoFabrication === ''
		) {
			anoFabrication = 2000;
		}
		if (anoFabrication <= 1991) {
			caseNumber = 1;
		} else if (anoFabrication <= 1994) {
			caseNumber = 2;
		} else if (anoFabrication > 1994) {
			caseNumber = 3;
		}
		return caseNumber;
	}

	/**  function to evaluate if HC ppm are ok, the same function is used for most evaluations
	 * @param {*} ppm prop from object: fileAsObject
	 * @param {*} caseNumber value extracted from yearRectificatorGas
	 * @returns the HTML tag, className and the filling to be inserted inside <p>
	 */

	function HCEvaluator(ppm, caseNumber) {
		let severityEvaluation = '';
		let severityLetter = '';

		switch (caseNumber) {
			case 1:
				if (ppm > 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm > 900) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm > 600) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 2:
				if (ppm > 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm > 600) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm > 400) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 3:
				if (ppm > 2500) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (ppm > 400) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (ppm > 300) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
		}
	}

	function COEvaluator(CO, caseNumber) {
		let severityEvaluation = '';
		let severityLetter = '';

		switch (caseNumber) {
			case 1:
				if (CO > 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO > 4.5) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO > 3.5) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 2:
				if (CO > 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO > 3) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO > 2) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
			case 3:
				if (CO > 10) {
					severityEvaluation = 'severe';
					severityLetter = 'G';
				} else if (CO > 2.5) {
					severityEvaluation = 'moderate';
					severityLetter = 'M';
				} else if (CO > 2) {
					severityEvaluation = 'minor';
					severityLetter = 'L';
				} else {
					severityEvaluation = '';
					severityLetter = 'A';
				}
				return (
					<span className={`${severityEvaluation}`}>{severityLetter}</span>
				);
		}
	}

	return (
		<main>
			<form className="form-radio">
				<h2>Tipo de vehículo</h2>
				<div className="btn-package type-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Auto"
						value="Auto"
						checked={tipo === 'Auto'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Camioneta">
						Auto
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Camioneta"
						value="Camioneta"
						checked={tipo === 'Camioneta'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Camioneta">
						Camioneta
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Camion"
						value="Camion"
						checked={tipo === 'Camion'} //determina que visualmente se vea checked
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Camion">
						Camión / Minibus
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="tipo"
						id="Moto"
						value="Moto"
						checked={tipo === 'Moto'}
						onChange={handleTipo}
					/>
					<label className="btn-inside" htmlFor="Moto">
						Moto
					</label>
				</div>
			</form>
			<div className="btn-input-txt">
				<label htmlFor="file-input" id="file-input-label">
					Seleccione archivo a procesar
				</label>
				<input
					ref={loadFileRef}					
					type="file"
					id="file-input"
					accept="text/plain"
					onChange={handleTxtRender}
				/>
			</div>
			<section className="finalReport">
				<img
					className="report-img"
					src={reportImgselector(tipo)}
					alt="report-img"
				/>
				{/* muestra lo que queda en el obejeto despues de analziar el txt  */}
				{/* <div className="container">
				<pre>
					<code id="jsonContainer"></code>
				</pre>
			</div> */}
				{txtRender === '' ? (
					''
				) : (
					<article className="txtRender">
						<div className="date">
							<p className="start-date">
								{fecha.getDate() +
									'/' +
									(fecha.getMonth() + 1) +
									'/' +
									fecha.getFullYear()}
							</p>
							<p className="end-date">
								{fechaVen.getDate() +
									'/' +
									(fechaVen.getMonth() + 1) +
									'/' +
									fechaVen.getFullYear()}
							</p>
						</div>
						<div className="header-info">
							<p className="plate">{window.fileAsObject.header.patente}</p>
							<p className="brand">
								{window.fileAsObject.header.marcaDelVehiculo}
							</p>
							<p className="model">{window.fileAsObject.header.modelo}</p>
							<p className="mileage">{window.fileAsObject.header.kilometros}</p>
						</div>
						<div className="alineation">
							<p className="front-al">
								{window.fileAsObject.alineacion.resultadoAlineacionEje1}
							</p>
							<p className="front-al-eval">
								{alineationEvaluator(
									window.fileAsObject.alineacion.resultadoAlineacionEje1
								)}
							</p>
							<p className="rear-al">
								{window.fileAsObject.alineacion.resultadoAlineacionEje2}
							</p>
							<p className="rear-al-eval">
								{alineationEvaluator(
									window.fileAsObject.alineacion.resultadoAlineacionEje2
								)}
							</p>
						</div>
						<div className="weight">
							<p className="front-left">
								{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo}
							</p>
							<p className="front-right">
								{window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho}
							</p>
							<p className="rear-left">
								{window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo}
							</p>
							<p className="rear-right">
								{window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho}
							</p>
						</div>
						<div className="suspention">
							<p className="front-left">
								{
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoDelanteroIzquierdo
								}
							</p>
							<p className="front-left-eval">
								{suspEvaluator(
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoDelanteroIzquierdo
								)}
							</p>
							<p className="front-right">
								{
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoDelanteroDerecho
								}
							</p>
							<p className="front-right-eval">
								{suspEvaluator(
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoDelanteroDerecho
								)}
							</p>
							<p className="rear-left">
								{
									window.fileAsObject.suspensionEjeTrasero
										.rendimientoTraseroIzquierdo
								}
							</p>
							<p className="rear-left-eval">
								{suspEvaluator(
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoTraseroIzquierdo
								)}
							</p>
							<p className="rear-right">
								{
									window.fileAsObject.suspensionEjeTrasero
										.rendimientoTraseroDerecho
								}
							</p>
							<p className="rear-right-eval">
								{suspEvaluator(
									window.fileAsObject.suspensionEjeDelantero
										.rendimientoTraseroDerecho
								)}
							</p>
						</div>
						<div className="brake">
							<div className="performance">
								<p className="front">
									{window.fileAsObject.frenosEje_1.rendimientoDelEje}
								</p>
								<p className="front-eval">
									{brakePerfEvaluator(
										window.fileAsObject.frenosEje_1.rendimientoDelEje
									)}
								</p>
								<p className="rear">
									{window.fileAsObject.frenosEje_2.rendimientoDelEje}
								</p>
								<p className="rear-eval">
									{brakePerfEvaluator(
										window.fileAsObject.frenosEje_2.rendimientoDelEje
									)}
								</p>
								<p className="hand">
									{window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje}
								</p>
								<p className="hand-eval">
									{handBrakePerfEvaluator(
										window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje
									)}
								</p>
							</div>
							<div className="difference">
								<p className="front">
									{
										window.fileAsObject.frenosEje_1
											.diferenciaFzaFrenadoLadoALado
									}
								</p>
								<p className="front-eval">
									{brakeDifferenceEvaluator(
										window.fileAsObject.frenosEje_1
											.diferenciaFzaFrenadoLadoALado
									)}
								</p>
								<p className="rear">
									{
										window.fileAsObject.frenosEje_2
											.diferenciaFzaFrenadoLadoALado
									}
								</p>
								<p className="rear-eval">
									{brakeDifferenceEvaluator(
										window.fileAsObject.frenosEje_2
											.diferenciaFzaFrenadoLadoALado
									)}
								</p>
								<p className="hand">
									{
										window.fileAsObject.frenoDeManoEje_2
											.diferenciaFzaFrenadoLadoALado
									}
								</p>
								<p className="hand-eval">
									{brakeDifferenceEvaluator(
										window.fileAsObject.frenoDeManoEje_2
											.diferenciaFzaFrenadoLadoALado
									)}
								</p>
							</div>
							<div className="strength">
								<p className="front-left">
									{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo}
								</p>
								<p className="front-left-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo
									)}
								</p>
								<p className="front-right">
									{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho}
								</p>
								<p className="front-right-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho
									)}
								</p>
								<p className="rear-left">
									{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo}
								</p>
								<p className="rear-left-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo
									)}
								</p>
								<p className="rear-right">
									{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho}
								</p>
								<p className="rear-right-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho
									)}
								</p>
								<p className="hand-left">
									{
										window.fileAsObject.frenoDeManoEje_2
											.fuerzaDeFrenadoLadoIzquierdo
									}
								</p>
								<p className="hand-left-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenoDeManoEje_2
											.fuerzaDeFrenadoLadoIzquierdo
									)}
								</p>
								<p className="hand-right">
									{
										window.fileAsObject.frenoDeManoEje_2
											.fuerzaDeFrenadoLadoDerecho
									}
								</p>
								<p className="hand-right-eval">
									{brakeStrenghtEvaluator(
										window.fileAsObject.frenoDeManoEje_2
											.fuerzaDeFrenadoLadoIzquierdo
									)}
								</p>
							</div>
							<div className="resistance-rod">
								<p className="front-left">
									{
										window.fileAsObject.frenosEje_1
											.resistenciaALaRodaduraLadoIzquierdo
									}
								</p>
								<p className="front-left-eval">
									{brakeResistEvaluator(
										window.fileAsObject.frenosEje_1
											.resistenciaALaRodaduraLadoIzquierdo
									)}
								</p>
								<p className="front-right">
									{
										window.fileAsObject.frenosEje_1
											.resistenciaALaRodaduraLadoDerecho
									}
								</p>
								<p className="front-right-eval">
									{brakeResistEvaluator(
										window.fileAsObject.frenosEje_1
											.resistenciaALaRodaduraLadoDerecho
									)}
								</p>
								<p className="rear-left">
									{
										window.fileAsObject.frenosEje_2
											.resistenciaALaRodaduraLadoIzquierdo
									}
								</p>
								<p className="rear-left-eval">
									{brakeResistEvaluator(
										window.fileAsObject.frenosEje_2
											.resistenciaALaRodaduraLadoIzquierdo
									)}
								</p>
								<p className="rear-right">
									{
										window.fileAsObject.frenosEje_2
											.resistenciaALaRodaduraLadoDerecho
									}
								</p>
								<p className="rear-right-eval">
									{brakeResistEvaluator(
										window.fileAsObject.frenosEje_2
											.resistenciaALaRodaduraLadoDerecho
									)}
								</p>
							</div>
							<div className="ovality">
								<p className="front-left">
									{window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo}
								</p>
								<p className="front-left-eval">
									{brakeOvalEvaluator(
										window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo
									)}
								</p>
								<p className="front-right">
									{window.fileAsObject.frenosEje_1.ovalidadLadoDerecho}
								</p>
								<p className="front-right-eval">
									{brakeOvalEvaluator(
										window.fileAsObject.frenosEje_1.ovalidadLadoDerecho
									)}
								</p>
								<p className="rear-left">
									{window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo}
								</p>
								<p className="rear-left-eval">
									{brakeOvalEvaluator(
										window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo
									)}
								</p>
								<p className="rear-right">
									{window.fileAsObject.frenosEje_2.ovalidadLadoDerecho}
								</p>
								<p className="rear-right-eval">
									{brakeOvalEvaluator(
										window.fileAsObject.frenosEje_2.ovalidadLadoDerecho
									)}
								</p>
							</div>
						</div>
						<div className="lux-meter">
							<div className="intensity">
								<p className="left-low">
									{window.fileAsObject.luxometro.intensidadBajaIzquierda}
								</p>
								<p className="left-low-eval">
									{LuxLowIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaIzquierda
									)}
								</p>
								<p className="right-low">
									{window.fileAsObject.luxometro.intensidadBajaDerecha}
								</p>
								<p className="right-low-eval">
									{LuxLowIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaDerecha
									)}
								</p>
								<p className="left-high">
									{window.fileAsObject.luxometro.intensidadAltaIzquierda}
								</p>
								<p className="left-high-eval">
									{LuxHighIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaIzquierda
									)}
								</p>
								<p className="right-high">
									{window.fileAsObject.luxometro.intensidadAltaDerecha}
								</p>
								<p className="right-high-eval">
									{LuxHighIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaIzquierda
									)}
								</p>
								<p className="left-aux">
									{window.fileAsObject.luxometro.intensidadAuxiliarIzquierda}
								</p>
								<p className="left-aux-eval">
									{LuxLowIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaIzquierda
									)}
								</p>
								<p className="right-aux">
									{window.fileAsObject.luxometro.intensidadAuxiliarDerecha}
								</p>
								<p className="right-aux-eval">
									{LuxLowIntEvaluator(
										window.fileAsObject.luxometro.intensidadBajaDerecha
									)}
								</p>
							</div>
							<div className="alineationLux">
								<p className="left-hor">
									{
										window.fileAsObject.luxometro
											.alineacionFaroIzquierdoHorizontal
									}
								</p>
								<p className="left-hor-eval">
									{LuxAngleEvaluator(
										window.fileAsObject.luxometro
											.alineacionFaroIzquierdoHorizontal
									)}
								</p>
								<p className="right-hor">
									{
										window.fileAsObject.luxometro
											.alineacionFaroDerechoHorizontal
									}
								</p>
								<p className="right-hor-eval">
									{LuxAngleEvaluator(
										window.fileAsObject.luxometro
											.alineacionFaroDerechoHorizontal
									)}
								</p>
								<p className="left-vert">
									{
										window.fileAsObject.luxometro
											.alineacionFaroIzquierdoVertical
									}
								</p>
								<p className="left-vert-eval">
									{LuxAngleEvaluator(
										window.fileAsObject.luxometro
											.alineacionFaroIzquierdoVertical
									)}
								</p>
								<p className="right-vert">
									{window.fileAsObject.luxometro.alineacionFaroDerechoVertical}
								</p>
								<p className="right-vert-eval">
									{LuxAngleEvaluator(
										window.fileAsObject.luxometro.alineacionFaroDerechoVertical
									)}
								</p>
							</div>
						</div>
						<div className="decibel-meter">
							<p className="sound-int">
								{window.fileAsObject.sonometro.valorDeMedicion}
							</p>
							<p className="sound-int-eval">
								{noiseEvaluator(
									window.fileAsObject.sonometro.valorDeMedicion,
									yearRectificatordb(),
									tipo
								)}
							</p>
						</div>
						<div className="gases">
							{window.fileAsObject.opacimetro.resultadoMedicionOpacidad ===
							-1 ? (
								<>
									<p className="CO">
										{
											window.fileAsObject.analizadorDeGases
												.resultadoMonoxidoDeCarbonoCO
										}
									</p>
									<p className="CO-eval">
										{COEvaluator(
											window.fileAsObject.analizadorDeGases
												.resultadoMonoxidoDeCarbonoCO,
											yearRectificatorGas()
										)}
									</p>
									<p className="HCC">
										{
											window.fileAsObject.analizadorDeGases
												.resultadoPartesPorMillonHC
										}
									</p>
									<p className="HCC-eval">
										{HCEvaluator(
											window.fileAsObject.analizadorDeGases
												.resultadoPartesPorMillonHC,
											yearRectificatorGas()
										)}
									</p>
									<p className="Nox">
										{
											window.fileAsObject.analizadorDeGases
												.resultadoPartesPorMillonNox
										}
									</p>
									<p className="Nox-eval"></p>
								</>
							) : (
								<p></p>
							)}
						</div>
						<div className="opacimeter">
							{window.fileAsObject.opacimetro.resultadoMedicionOpacidad ===
							-1 ? (
								<>
									<p className="opacity"></p>
									<p className="opacity-eval"></p>
								</>
							) : (
								<>
									<p className="opacity">
										{window.fileAsObject.opacimetro.resultadoMedicionOpacidad}
									</p>
									<p className="opacity-eval">
										{opacitiEvaluator(
											window.fileAsObject.opacimetro.resultadoMedicionOpacidad
										)}
									</p>
								</>
							)}
						</div>
					</article>
				)}
				<table className="lista-final">
					<thead>
						<tr className="lista-headers">
							<th className="grupo-col">Grupo</th>
							{/* <th>Sección</th> */}
							<th className="descripcion-col">Descripción</th>
							<th className="severidad-col">Severidad</th>
							<th className="phantom-col"></th>
							<th className="quitar-col">Quitar</th>
						</tr>
					</thead>
					<tbody>
						{lista
							.sort(function (a, b) {
								if (a.Ord !== b.Ord) return a.Ord - b.Ord;
								if (a.grupo !== b.grupo) return a.grupo > b.grupo ? 1 : -1;
								if (a.seccion !== b.seccion)
									return a.seccion > b.seccion ? 1 : -1;
								return a.desc > b.desc ? 1 : -1;
							}) //uso operadores ternarios para devolver números y no comparar longitudes de strings
							.map(defectList)}
					</tbody>
				</table>
			</section>
			<form className="formRadio-ext">
				<h2>Severidad</h2>
				<div className="btn-package severity-c">
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Leve"
						value="Leve"
						checked={severidad === 'Leve'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Leve">
						Leve
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Moderado"
						value="Moderado"
						checked={severidad === 'Moderado'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Moderado">
						Moderado
					</label>
					<input
						type="radio"
						className="btn-inside rad-c"
						name="severity"
						id="Grave"
						value="Grave"
						checked={severidad === 'Grave'}
						onChange={handleSeveridad}
					/>
					<label className="btn-inside" htmlFor="Grave">
						Grave
					</label>
				</div>
				<div className="variable-btn">
					<div className="btn-package col-class group-c">
						<h3>Grupo</h3>
						{tipoArray.grupo
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="group"
										id={item.value}
										value={item.value}
										checked={grupo.value === item.value}
										onChange={() => handleGrupo(item)}
									/>
									{item.label}
								</label>
							))}
					</div>
					<div className="btn-package col-class section-c">
						<h3>Sección</h3>
						{section
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="section"
										id={item.value}
										value={item.value}
										checked={seccion.value === item.value}
										onChange={() => handleSeccion(item)}
									/>
									{item.label}
								</label>
							))}
						{grupo.value.length > 0 && ( //esta primera línea hace que se renderice solo si encuentra algo en el array de grupo
							<label className="btn-inside" htmlFor="otro">
								<input
									type="radio"
									name="section"
									id="otro"
									value="otro"
									checked={seccion.value === 'otro'}
									className="btn-inside rad-c"
									onChange={() => handleSeccion({value: 'otro', label: 'Otro'})}
								/>
								<b>Otros</b>
							</label>
						)}
					</div>
					<div className="btn-package col-class description-c">
						<h3>Descripción</h3>
						{description
							.sort(function (a, b) {
								if (a.label !== b.label);
								return a.label > b.label ? 1 : -1;
							})
							.map((item, i) => (
								<label className="btn-inside" htmlFor={item.value} key={i}>
									<input
										type="radio"
										className="btn-inside rad-c"
										name="description"
										id={item.value}
										value={item.value}
										checked={descripcion.value === item.value}
										onChange={() => handleDescripcion(item)}
									/>
									{item.label}
								</label>
							))}
					</div>
				</div>
				<h3 className="unlisted-defect"> Defecto no listado</h3>
				<div className="unlisted-ctn">
					<label htmlFor="unlisted-defect" className="unlisted-defect">
						Seleccióne grupo al que pertenece la falla, luego el seleccione la
						opción "Otros" y finalmente escriba el defecto:
					</label>
					<textarea
						name="unlisted-defect"
						id="unlisted-defect"
						className="unlisted-defect"
						value={unlistedDef}
						cols="50"
						rows="3"
						onChange={(e) => setUnlistedDef(e.target.value)}></textarea>
				</div>
				<div className="div-btn">
					<button className="send-btn" onClick={armarLista}>
						Agregar a la lista
					</button>
				</div>
			</form>
		</main>
	);
}

export default Main;
