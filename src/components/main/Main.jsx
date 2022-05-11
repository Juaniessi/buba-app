import React, {useState} from 'react';
import trashCan from '../../assets/trash-can-solid.svg';
import informeAuto from '../../assets/informe-img/informe-con-peso.svg';
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
		/* setTimeout(function () {
			console.log(window.fileAsObject);
		}, 120); */
	};

	let tipoArray = tipo === 'Auto' ? autoArray : motoArray; //esta variable cambia entre los arrays de autos y motos
	let section = grupo.value !== '' ? tipoArray.seccion[grupo.value] : []; //esta variable almacena el array de seccion a mapear
	let description =
		seccion.value !== '' && grupo.value !== ''
			? tipoArray.descripciones[grupo.value][seccion.value] || []
			: []; //esta varibale almacena el array de descripción a mapear
	let severityColour; //esta varaible me da el color de la severidad

	let armarLista = () => {
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
			<tr className={`itemLista ${severityColour}`} key={i}>
				<td className={`grupo-col ${severityColour}`}>{grupo}</td>
				{/* <td className={`${severityColour}`}>{seccion}</td> */}
				<td className={`descripcion-col ${severityColour}`}>{desc}</td>
				<td className={`severidad-col ${severityColour}`}>{sev}</td>
				<td className="erase-btn-ctn">
					<button className="erase-btn" onClick={() => eraseDefect(i)}>
						<img src={trashCan} alt="Trash-can" />
					</button>
				</td>
			</tr>
		);
	}

	//fecha de emisión y vencimiento
	let fecha = new Date();

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
		} else if (suspRend <= 50) {
			severityEvaluation = 'minor';
			severityLetter = 'L';
		} else {
			severityEvaluation = '';
			severityLetter = 'A';
		}
		return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
	}

	function brakeRendEvaluator(brakeRend) {
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

	function handBrakeRendEvaluator(brakeRend) {
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

	function nioseEvaluator(db, caseNumber, tipo) {
		let severityEvaluation = '';
		let severityLetter = '';
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
		if (db > 120) {
			severityEvaluation = 'severe';
			severityLetter = 'G';
		} else if (db > 84) {
			severityEvaluation = 'moderate';
			severityLetter = 'M';
		} else if (db > 80) {
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
					<label className="btn-inside" htmlFor="Auto">
						Auto
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
			</form>
			<div className="div-btn">
				<button className="send-btn" onClick={armarLista}>
					Agregar a la lista
				</button>
			</div>
			<h2>Listado de defectos</h2>
			<table className="lista-final">
				<thead>
					<tr className="lista-headers">
						<th className="grupo-col">Grupo</th>
						{/* <th>Sección</th> */}
						<th className="descripcion-col">Descripción</th>
						<th className="severidad-col">Severidad</th>
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

			<div className="container">
				<label htmlFor="file-input" id="file-input-label">
					Seleccione archivo a procesar
				</label>
				<input
					type="file"
					id="file-input"
					accept="text/plain"
					onChange={handleTxtRender}
				/>
			</div>
			<img className="informe" src={informeAuto} alt="informe" />
			{/* muestra lo que queda en el obejeto despues de analziar el txt  */}
			<div className="container">
				<pre>
					<code id="jsonContainer"></code>
				</pre>
			</div>
			{txtRender === '' ? (
				''
			) : (
				<article className="txtRender">
					<div className="date">
						<p>
							{fecha.getDate() +
								'/' +
								(fecha.getMonth() + 1) +
								'/' +
								fecha.getFullYear()}
						</p>
						<p>
							{fechaVen.getDate() +
								'/' +
								(fechaVen.getMonth() + 1) +
								'/' +
								fechaVen.getFullYear()}
						</p>
					</div>
					<div className="headerInfo">
						<p>{window.fileAsObject.header.patente}</p>
						<p>{window.fileAsObject.header.marcaDelVehiculo}</p>
						<p>{window.fileAsObject.header.modelo}</p>
						<p>{window.fileAsObject.header.kilometros}</p>
					</div>
					<div className="alineacion">
						<p>{window.fileAsObject.alineacion.resultadoAlineacionEje1}</p>
						<p>
							{alineationEvaluator(
								window.fileAsObject.alineacion.resultadoAlineacionEje1
							)}
						</p>
						<p>{window.fileAsObject.alineacion.resultadoAlineacionEje2}</p>
						<p>
							{alineationEvaluator(
								window.fileAsObject.alineacion.resultadoAlineacionEje2
							)}
						</p>
					</div>
					<div className="peso">
						<p>
							{window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo}
						</p>
						<p>{window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho}</p>
						<p>{window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo}</p>
						<p>{window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho}</p>
					</div>
					<div className="suspension">
						<p>
							{
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroIzquierdo
							}
						</p>
						<p>
							{suspEvaluator(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroIzquierdo
							)}
						</p>
						<p>
							{
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroDerecho
							}
						</p>
						<p>
							{suspEvaluator(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroDerecho
							)}
						</p>
						<p>
							{
								window.fileAsObject.suspensionEjeTrasero
									.rendimientoTraseroIzquierdo
							}
						</p>
						<p>
							{suspEvaluator(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoTraseroDerecho
							)}
						</p>
						<p>
							{
								window.fileAsObject.suspensionEjeTrasero
									.rendimientoTraseroDerecho
							}
						</p>
						<p>
							{suspEvaluator(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroIzquierdo
							)}
						</p>
					</div>
					<div className="frenos">
						<div className="rendimiento">
							<p>{window.fileAsObject.frenosEje_1.rendimientoDelEje}</p>
							<p>
								{brakeRendEvaluator(
									window.fileAsObject.frenosEje_1.rendimientoDelEje
								)}
							</p>
							<p>{window.fileAsObject.frenosEje_2.rendimientoDelEje}</p>
							<p>
								{brakeRendEvaluator(
									window.fileAsObject.frenosEje_2.rendimientoDelEje
								)}
							</p>
							<p>{window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje}</p>
							<p>
								{handBrakeRendEvaluator(
									window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje
								)}
							</p>
						</div>
						<div className="diferencia">
							<p>
								{window.fileAsObject.frenosEje_1.diferenciaFzaFrenadoLadoALado}
							</p>
							<p>
								{brakeDifferenceEvaluator(
									window.fileAsObject.frenosEje_1.diferenciaFzaFrenadoLadoALado
								)}
							</p>
							<p>
								{window.fileAsObject.frenosEje_2.diferenciaFzaFrenadoLadoALado}
							</p>
							<p>
								{brakeDifferenceEvaluator(
									window.fileAsObject.frenosEje_2.diferenciaFzaFrenadoLadoALado
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenoDeManoEje_2
										.diferenciaFzaFrenadoLadoALado
								}
							</p>
							<p>
								{brakeDifferenceEvaluator(
									window.fileAsObject.frenoDeManoEje_2
										.diferenciaFzaFrenadoLadoALado
								)}
							</p>
						</div>
						<div className="fuerzaDeFrenado">
							<p>
								{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo
								)}
							</p>
							<p>
								{window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho
								)}
							</p>
							<p>
								{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo
								)}
							</p>
							<p>
								{window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoIzquierdo
								}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoIzquierdo
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoDerecho
								}
							</p>
							<p>
								{brakeStrenghtEvaluator(
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoIzquierdo
								)}
							</p>
						</div>
						<div className="resistenciaRodadura">
							<p>
								{
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoIzquierdo
								}
							</p>
							<p>
								{brakeResistEvaluator(
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoIzquierdo
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoDerecho
								}
							</p>
							<p>
								{brakeResistEvaluator(
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoDerecho
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoIzquierdo
								}
							</p>
							<p>
								{brakeResistEvaluator(
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoIzquierdo
								)}
							</p>
							<p>
								{
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoDerecho
								}
							</p>
							<p>
								{brakeResistEvaluator(
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoDerecho
								)}
							</p>
						</div>
						<div className="ovalidad">
							<p>{window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo}</p>
							<p>
								{brakeOvalEvaluator(
									window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo
								)}
							</p>
							<p>{window.fileAsObject.frenosEje_1.ovalidadLadoDerecho}</p>
							<p>
								{brakeOvalEvaluator(
									window.fileAsObject.frenosEje_1.ovalidadLadoDerecho
								)}
							</p>
							<p>{window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo}</p>
							<p>
								{brakeOvalEvaluator(
									window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo
								)}
							</p>
							<p>{window.fileAsObject.frenosEje_2.ovalidadLadoDerecho}</p>
							<p>
								{brakeOvalEvaluator(
									window.fileAsObject.frenosEje_2.ovalidadLadoDerecho
								)}
							</p>
						</div>
					</div>
					<div className="luxometro">
						<div className="intesidad">
							<p>{window.fileAsObject.luxometro.intensidadBajaIzquierda}</p>
							<p>
								{LuxLowIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaIzquierda
								)}
							</p>
							<p>{window.fileAsObject.luxometro.intensidadBajaDerecha}</p>
							<p>
								{LuxLowIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaDerecha
								)}
							</p>
							<p>{window.fileAsObject.luxometro.intensidadAltaIzquierda}</p>
							<p>
								{LuxHighIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaIzquierda
								)}
							</p>
							<p>{window.fileAsObject.luxometro.intensidadAltaDerecha}</p>
							<p>
								{LuxHighIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaIzquierda
								)}
							</p>
							<p>{window.fileAsObject.luxometro.intensidadAuxiliarIzquierda}</p>
							<p>
								{LuxLowIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaIzquierda
								)}
							</p>
							<p>{window.fileAsObject.luxometro.intensidadAuxiliarDerecha}</p>
							<p>
								{LuxLowIntEvaluator(
									window.fileAsObject.luxometro.intensidadBajaDerecha
								)}
							</p>
						</div>
						<div className="alineacionLux">
							<p>
								{
									window.fileAsObject.luxometro
										.alineacionFaroIzquierdoHorizontal
								}
							</p>
							<p>
								{LuxAngleEvaluator(
									window.fileAsObject.luxometro
										.alineacionFaroIzquierdoHorizontal
								)}
							</p>
							<p>
								{window.fileAsObject.luxometro.alineacionFaroDerechoHorizontal}
							</p>
							<p>
								{LuxAngleEvaluator(
									window.fileAsObject.luxometro.alineacionFaroDerechoHorizontal
								)}
							</p>
							<p>
								{window.fileAsObject.luxometro.alineacionFaroIzquierdoVertical}
							</p>
							<p>
								{LuxAngleEvaluator(
									window.fileAsObject.luxometro.alineacionFaroIzquierdoVertical
								)}
							</p>
							<p>
								{window.fileAsObject.luxometro.alineacionFaroDerechoVertical}
							</p>
							<p>
								{LuxAngleEvaluator(
									window.fileAsObject.luxometro.alineacionFaroDerechoVertical
								)}
							</p>
						</div>
					</div>
					<div className="decibelimetro">
						<p>{window.fileAsObject.sonometro.valorDeMedicion}</p>
						<p>
							{nioseEvaluator(window.fileAsObject.sonometro.valorDeMedicion)}
						</p>
					</div>
					<div className="gases">
						{window.fileAsObject.opacimetro.resultadoMedicionOpacidad === -1 ? (
							<>
								<p>
									{
										window.fileAsObject.analizadorDeGases
											.resultadoMonoxidoDeCarbonoCO
									}
								</p>
								<p>
									{COEvaluator(
										window.fileAsObject.analizadorDeGases
											.resultadoMonoxidoDeCarbonoCO,
										yearRectificatorGas()
									)}
								</p>
								<p>
									{
										window.fileAsObject.analizadorDeGases
											.resultadoPartesPorMillonHC
									}
								</p>
								<p>
									{HCEvaluator(
										window.fileAsObject.analizadorDeGases
											.resultadoPartesPorMillonHC,
										yearRectificatorGas()
									)}
								</p>
								<p>
									{
										window.fileAsObject.analizadorDeGases
											.resultadoPartesPorMillonNox
									}
								</p>
							</>
						) : (
							<p></p>
						)}
					</div>
					<div className="opacimetro">
						{window.fileAsObject.opacimetro.resultadoMedicionOpacidad === -1 ? (
							<p></p>
						) : (
							<>
								<p>
									{window.fileAsObject.opacimetro.resultadoMedicionOpacidad}
								</p>
								<p>
									{opacitiEvaluator(
										window.fileAsObject.opacimetro.resultadoMedicionOpacidad
									)}
								</p>
							</>
						)}
					</div>
				</article>
			)}
		</main>
	);
}

export default Main;
