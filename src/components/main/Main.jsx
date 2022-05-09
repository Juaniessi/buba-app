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
		setTimeout(function () {
			objectReplacer();
		}, 90);
		setTimeout(function () {
			console.log(window.fileAsObject);
		}, 120);
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

	/* convierte strings en números, le pasas el string como primer parámetro y
	la cantidad de cifras significativas, como segundo parámetro. */

	/* No la borro porque fue un logro investigar y crearla. Así me queda. */

	/* function numConverter(strNum, n) {
		let numReady =
			Math.round(Number(strNum.replace(',', '.')) * Math.pow(10, n)) /
			Math.pow(10, n);
		return numReady;
	} */

	function numConverter(strNum, n) {
		let numReady = Number(parseFloat(strNum.replace(',', '.')).toFixed(n));
		return numReady;
	}

	/* Esta sirve para los números que no vienen calculados en % directamente */

	function numConverter2(strNum, n) {
		let numReady = Number((parseFloat(strNum.replace(',', '.')) * 100).toFixed(n));
		return numReady;
	}

	/* funciones para evaluar valores extraidos de txt */

	function objectReplacer() {
		window.fileAsObject.alineacion.resultadoAlineacionEje1 = numConverter(
			window.fileAsObject.alineacion.resultadoAlineacionEje1,
			2
		);
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
						<p></p>
						<p>
							{numConverter(
								window.fileAsObject.alineacion.resultadoAlineacionEje2,
								2
							)}
						</p>
						<p></p>
					</div>
					<div className="peso">
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoIzquierdo,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeDelantero.pesoLadoDerecho,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeTrasero.pesoLadoIzquierdo,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeTrasero.pesoLadoDerecho,
								2
							)}
						</p>
					</div>
					<div className="suspension">
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroIzquierdo,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeDelantero
									.rendimientoDelanteroDerecho,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeTrasero
									.rendimientoTraseroIzquierdo,
								2
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.suspensionEjeTrasero
									.rendimientoTraseroDerecho,
								2
							)}
						</p>
					</div>
					<div className="frenos">
						<div className="rendimiento">
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2.rendimientoDelEje,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1.rendimientoDelEje,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenoDeManoEje_2.rendimientoDelEje,
									2
								)}
							</p>
						</div>
						<div className="diferencia">
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1.diferenciaFzaFrenadoLadoALado,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2.diferenciaFzaFrenadoLadoALado,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenoDeManoEje_2
										.diferenciaFzaFrenadoLadoALado,
									2
								)}
							</p>
						</div>
						<div className="fuerzaDeFrenado">
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1.fuerzaDeFrenadoLadoDerecho,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2.fuerzaDeFrenadoLadoDerecho,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenoDeManoEje_2
										.fuerzaDeFrenadoLadoDerecho,
									2
								)}
							</p>
						</div>
						<div className="resistenciaRodadura">
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_1
										.resistenciaALaRodaduraLadoDerecho,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.frenosEje_2
										.resistenciaALaRodaduraLadoDerecho,
									2
								)}
							</p>
						</div>
						<div className="ovalidad">
							{/* multiplico x100 porque el dato que traigo no trae ese detalle. */}
							<p>
								{numConverter2(
									window.fileAsObject.frenosEje_1.ovalidadLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter2(
									window.fileAsObject.frenosEje_1.ovalidadLadoDerecho,
									2
								)}
							</p>
							<p>
								{numConverter2(
									window.fileAsObject.frenosEje_2.ovalidadLadoIzquierdo,
									2
								)}
							</p>
							<p>
								{numConverter2(
									window.fileAsObject.frenosEje_2.ovalidadLadoDerecho,
									2
								)}
							</p>
						</div>
					</div>
					<div className="luxometro">
						<div className="intesidad">
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadBajaIzquierda,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadBajaDerecha,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadAltaIzquierda,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadAltaDerecha,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadAuxiliarIzquierda,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.intensidadAuxiliarDerecha,
									1
								)}
							</p>
						</div>
						<div className="alineacionLux">
							<p>
								{numConverter(
									window.fileAsObject.luxometro
										.alineacionFaroIzquierdoHorizontal,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.alineacionFaroDerechoHorizontal,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.alineacionFaroIzquierdoVertical,
									1
								)}
							</p>
							<p>
								{numConverter(
									window.fileAsObject.luxometro.alineacionFaroDerechoVertical,
									1
								)}
							</p>
						</div>
					</div>
					<div className="decibelimetro">
						<p>
							{numConverter(window.fileAsObject.sonometro.valorDeMedicion, 1)}
						</p>
					</div>
					<div className="gases">
						<p>
							{numConverter(
								window.fileAsObject.analizadorDeGases
									.resultadoMonoxidoDeCarbonoCO,
								1
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.analizadorDeGases
									.resultadoPartesPorMillonHC,
								1
							)}
						</p>
						<p>
							{numConverter(
								window.fileAsObject.analizadorDeGases
									.resultadoPartesPorMillonNox,
								1
							)}
						</p>
					</div>
					<div className="opacimetro">
						<p>
							{numConverter(
								window.fileAsObject.opacimetro.resultadoMedicionOpacidad,
								1
							)}
						</p>
					</div>
				</article>
			)}
		</main>
	);
}

export default Main;
