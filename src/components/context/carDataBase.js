/*AUTOS*/
/*GRUPOS*/

const group = [
	'Suspensión',
	'Frenos',
	'Emisiones',
	'Sistema Eléctrico',
	'Inspección Visual',
	'Inspección en Fosa',
];

/*SECCIONES*/

const sectionSusp = [
	'Alineación',
	'Extremos de dirección',
	'Rótulas',
	'Fuelles',
	'Parrillas',
	'Amortiguadores',
	'Cazoletas',
	'Casos poco frecuentes',
];

const sectionBrake = [
	'Rendimiento de frenado',
	'Diferencia de frenado',
	'Rueda frenada',
	'Ovalidad o Alabebeo',
	'Casos poco frecuentes',
];

const sectionEmi = ['Gases', 'Ruido'];

const sectionElect = [
	'Luces traseras',
	'Luces delanteras',
	'Bocina',
	'Instrumental',
	'Limpia Parabrisas',
];

const sectionVis = [
	'Kit de seguridad',
	'Patentes',
	'Cinturones de seguridad',
	'Equipamiento',
	'Vidrios',
	'Paragolpes',
	'Espejos',
	'Ópticas',
	'Ruedas',
	'Altura',
	'Protección pasiva',
	'Air bag',
	'Carrocería',
];

const sectionPit = ['Fluidos', 'Escape', 'Chasis'];

/*DESCRIPCIONES*/

/*Suspensión */

const descAlin = ['Tren delantero desalineado', 'Tren trasero desalineado'];

const descExtDir = [
	'Extremo de dirección izquierdo con holgura. Reemplazar y alinear.',
	'Extremo de dirección derecho con holgura. Reemplazar y alinear.',
];

const descRotulas = [
	'Extremo de dirección derecho con holgura. Reemplazar y alinear.',
	'Extremo de dirección derecho con holgura. Reemplazar y alinear',
];

const descFuelles = [
	'Fuelle caja de dirección izquierdo en mal estado. Reemplazar y alinear.',
	'Fuelle caja de dirección derecho en mal estado. Reemplazar y alinear.',
	'Fuelle de maza delantera izquierda en mal estado.',
	'Fuelle de maza delantera derecha en mal estado.',
	'Fuelle de maza trasera izquierda en mal estado.',
	'Fuelle de maza trasera derecha en mal estado.',
	'Fuelle de transmisión delantero izquierdo en mal estado.',
	'Fuelle de transmisión delantero derecho en mal estado.',
	'Fuelle de transmisión trasero izquierdo en mal estado.',
	'Fuelle de transmisión trasero derecho en mal estado.',
];

const descParrillas = [
	'Buje  parrilla de suspensión delantera izquierda en mal estado. Reemplazar y alinear.',
	'Buje parrilla de suspensión delantera derecha en mal estado. Reemplazar y alinear.',
	'Buje de parrilla de suspensión trasera izquierda en mal estado.',
	'Buje parrilla de suspensión trasera derecha en mal estado.',
	'Brazo Pitman con holgura. Reemplazar y alinear.',
];

const descAmortiguadores = [
	'Bajo rendimiento de amortiguación (amortiguador delantero izquierdo defectuoso).',
	'Bajo rendimiento de amortiguación (amortiguador delantero derecho defectuoso).',
	'Bajo rendimiento de amortiguación (amortiguador trasero izquierdo defectuoso).',
	'Bajo rendimiento de amortiguación (amortiguador trasero derecho defectuoso).',
	'Pérdida de fluido en amortiguador delantero izquierdo.',
	'Pérdida de fluido en amortiguador delantero derecho.',
	'Pérdida de fluido en amortiguador trasero izquierdo.',
	'Pérdida de fluido en amortiguador trasero derecho.',
	'Fijación de amortiguador delantero izquierdo con holgura.',
	'Fijación de amortiguador delantero derecho con holgura.',
	'Fijación de amortiguador trasero izquierdo con holgura.',
	'Fijación de amortiguador trasero derecho con holgura.',
];

const descCazoletas = [
	'Cazoleta delantera izquierda con holgura. Reemplazar y alinear.',
	'Cazoleta delantera derecha con holgura. Reemplazar y alinear.',
	'Cazoleta trasera izquierda con holgura.',
	'Cazoleta trasera derecha con holgura.',
];

const descSuspCPF = [
	'Rodamientos defectuosos rueda delantera izquierda.',
	'Rodamientos defectuosos rueda delantera derecha.',
	'Rodamientos defectuosos rueda trasera izquierda.',
	'Rodamientos defectuosos rueda trasera derecha.',
	'Barra estabilizadora delantera con defectos.',
	'Barra estabilizadora trasera con defectos.',
	'Barra de dirección con holgura rueda izquierda. Reemplazar y alinear.',
	'Barra de dirección con holgura rueda derecha. Reemplazar y alinear.',
	'Puente trasero en mal estado.',
];

/* Frenos */

const descBrakeRen = [
	'Bajo rendimiento de frenado en eje delantero.',
	'Bajo rendimiento de frenado en eje trasero.',
	'Bajo rendimiento freno de mano.',
];

const descBrakeDif = [
	'Diferencia de frenado eje delantero (frena menos rueda izquierda).',
	'Diferencia de frenado eje delantero (frena menos rueda derecha).',
	'Diferencia de frenado eje trasero (frena menos rueda izquierda).',
	'Diferencia de frenado eje trasero (frena menos rueda derecha).',
	'Diferencia de frenado freno de mano (frena menos rueda izquierda).',
	'Diferencia de frenado freno de mano (frena menos rueda derecha).',
];

const descBrakeRuedaFren = [
	'Rueda frenada, sin accionamiento de frenos (freno delantero izquierdo defectuoso).',
	'Rueda frenada, sin accionamiento de frenos (freno delantero derecho defectuoso).',
	'Rueda frenada, sin accionamiento de frenos (freno trasero izquierdo defectuoso).',
	'Rueda frenada, sin accionamiento de frenos (freno trasero derecho defectuoso).',
];

const descBrakeOval = [
	'Disco de freno delantero izquierdo alabeado.',
	'Disco de freno delantero derecho alabeado.',
	'Disco de freno trasero izquierdo alabeado.',
	'Disco de freno trasero derecho alabeado.',
	'Ovalidad en campana de freno delantera izquierda.',
	'Ovalidad en campana de freno delantera derecha.',
	'Ovalidad en campana de freno trasera izquierda.',
	'Ovalidad en campana de freno trasera derecha.',
];

const descBrakeCPF = [
	'Circuito hidráulico delantero de sistema de frenado con defectos.',
	'Circuito hidráulico trasero de sistema de frenado con defectos.',
	'Frenos delanteros no cumplen con la fuerza mínima requerida (1 kN).',
	'Frenos traseros no cumplen con la fuerza mínima requerida (1 kN).',
	'Freno de mano no cumple con la fuerza mínima requerida (1 kN).',
];

/* Emisiones */

const descGas = [
	'Emisión de gases supera los límites permitidos (alto nivel de monóxido de carbono).',
	'Emisión de gases supera los límites permitidos (alto nivel de hidrocarburos).',
	'Alto nivel de opacidad en emisiones.',
];

const descRuido = [
	'Alto nivel de contaminación sonora (superior a 84 decibeles).',
];

/* Sistema Eléctrico */

const descLuzDel = [
	'Luz de giro delantera izquierda no destella correctamente.',
	'Luz de giro delantera derecha no  destella correctamente.',
	'Luz de posición delantera izquierda no enciende.',
	'Luz de posición delantera derecha no enciende.',
	'Luz baja izquierda no enciende.',
	'Luz baja derecha no enciende.',
	'Luz alta delantera izquierda no enciende.',
	'Luz alta delantera derecha no enciende.',
	'Luces de balizas no destellan correctamente.',
	'Luz baja no describe patrón reglamentario.',
	'Luz alta no describe patrón reglamentario.',
	'Baja intensidad de iluminación en luz delantera izquierda.',
	'Baja intensidad de iluminación en luz delantera derecha.',
];

const descLuzTra = [
	'Luz de freno trasera izquierda no responde al accionamiento del pedal.',
	'Luz de freno trasera derecha no responde al accionamiento del pedal.',
	'Luz de freno trasera central no responde al accionamiento del pedal.',
	'Luz de reversa no enciende.',
	'Luz de patente no enciende.',
	'Luz de posición trasera izquierda no enciende.',
	'Luz de posición trasera derecha no enciende.',
	'Luz de giro trasera izquierda no destella correctamente.',
	'Luz de giro trasera derecha no destella correctamente.',
	'Luces de balizas no destellan correctamente.',
	'Baja intensidad de iluminación en luz trasera izquierda.',
	'Baja intensidad de iluminación en luz trasera derecha.',
];

const descBocina = ['Bocina no funciona.'];

const descInstrumental = [
	'Luz testigo de ABS encendido.',
	'Luz testigo de FALLA ELÉCTRICA encendido.',
	'Luz testigo de falta de PRESIÓN DE ACEITE encendido.',
	'Luz testigo de falla en el sistema de FRENO encendida.',
	'Luz testigo de BATERÍA encendido.',
	'Luz testigo de ALTA TEMPERATURA encendido.',
	'Instrumental no funciona correctamente.',
];

const descLimpiaPar = ['No funciona sistema de limpiaparabrisas.'];

/* Inspección Visual */

const descKit = ['Kit de seguridad de incompleto.'];

const descPatente = [
	'Patente delantera no legible y/o rota.',
	'Patente trasera no legible y/o rota.',
	'Falta patente delantera.',
	'Falta patente trasera.',
];

const descCint = [
	'Cinturón de seguridad delantero izquierdo defectuoso o faltante.',
	'Cinturón de seguridad delantero derecho defectuoso o faltante.',
	'Cinturón de seguridad trasero izquierdo defectuoso o faltante.',
	'Cinturón de seguridad trasero derecho defectuoso o faltante.',
	'Cinturón de seguridad trasero central defectuoso o faltante.',
];

const descEquip = [
	'Tapón de combustible no reglamentario.',
	'Batería sin sujeción.',
];

const descVidrios = [
	'Parabrisas roto.',
	'Polarizado en ventanas delanteras impiden ver al conductor y/o acompañante.',
	'Obstrucción de visión en parabrisas por elementos adheridos al mismo.',
	'Sistema  apertura de ventanilla delantera izquierda defectuoso.',
	'Sistema apertura de ventanilla delantera derecha defectuoso.',
	'Sistema apertura de ventanilla trasera izquierda defectuoso.',
	'Sistema apertura de ventanilla trasera derecha defectuoso.',
];

const descParaGol = [
	'Anclaje paragolpes delantero izquierdo en mal estado.',
	'Anclaje paragolpes delantero derecho en mal estado.',
	'Anclaje paragolpes trasero izquierdo en mal estado.',
	'Anclaje paragolpes trasero derecho en mal estado.',
	'Paragolpes delantero roto por golpe o descolgado.',
	'Paragolpes trasero roto por golpe o descolgado.',
	'Paragolpes delantero no reglamentario.',
	'Paragolpes trasero no reglamentario.',
];

const descEspejos = [
	'Espejo exterior izquierdo no funcional.',
	'Espejo exterior delantero no funcional.',
	'Espejo interior central no funcional.',
];

const descOpticas = [
	'Óptica delantera izquierda en mal estado.',
	'Óptica delantera derecha en mal estado.',
	'Óptica trasera izquierda en mal estado.',
	'Óptica trasera derecha en mal estado.',
	'Óptica delantera izquierda opaca.',
	'Óptica delantera derecha opaca.',
];

const descRuedas = [
	'Neumático delantero izquierdo en mal estado.',
	'Neumático delantero derecho en mal estado.',
	'Neumático trasero izquierdo en mal estado.',
	'Neumático trasero derecho en mal estado.',
	'Llanta delantera izquierda deformada.',
	'Llanta delantera derecha deformada.',
	'Llanta trasera izquierda deformada.',
	'Llanta trasera derecha deformada.',
	'Falta rueda de auxilio.',
	'Rueda de auxilio en mal estado.',
	'Soporte rueda de auxilio con defectos.',
	'Falta perno/tuerca de fijación en rueda delantera izquierda.',
	'Falta perno/tuerca de fijación en rueda delantera derecha.',
	'Falta perno/tuerca de fijación en rueda trasera izquierda.',
	'Falta perno/tuerca de fijación en rueda trasera derecha.',
];

const descAltura = [
	'Altura del vehiculo aumentada',
	'Altura del vehiculo disminuida',
];

const descProtPas = ['Sin tabique divisor.'];

const descAir = ['Airbag detonado.'];

const descCarroceria = [
	'Aditamento no reglamentario en la carrocería ',
	'Aditamento en el vehículo fuera de la línea de los paragolpes.',
];

/* Inspección de Fosa */

const descFlu = [
	'Pérdida de aceite de motor.',
	'Pérdida de aceite de transmisión.',
	'Pérdida de fluido hidráulico.',
	'Pérdida de líquido de freno.',
	'Pérdida de líquido refrigerante.',
	'Pérdida de combustible.',
	'Pérdida de ácido en la batería.',
];

const descEscape = [
	'Sistema de escape con defectos.',
	'Sistema de escape con roturas o faltantes en sus soportes.',
];

const descCha = [
	'Chasis en mal estado por corrosión.',
	'Chasis rajado.',
	'Chasis deformado.',
];

export {
	group,
	sectionSusp,
	sectionBrake,
	sectionEmi,
	sectionElect,
	sectionVis,
	sectionPit,
	descAlin,
	descExtDir,
	descRotulas,
	descFuelles,
	descParrillas,
	descAmortiguadores,
	descCazoletas,
	descSuspCPF,
	descBrakeRen,
	descBrakeDif,
	descBrakeRuedaFren,
	descBrakeOval,
	descBrakeCPF,
	descGas,
	descRuido,
	descLuzDel,
	descLuzTra,
	descBocina,
	descInstrumental,
	descLimpiaPar,
	descKit,
	descPatente,
	descCint,
	descEquip,
	descVidrios,
	descParaGol,
	descEspejos,
	descOpticas,
	descRuedas,
	descAltura,
	descProtPas,
	descAir,
	descCarroceria,
	descFlu,
	descEscape,
	descCha,
};

const autosArrays = {
	grupo: [
		{
			value: 'direccion',
			label: 'Dirección',
		},
		{
			value: 'suspension',
			label: 'Suspensión',
		},
		{
			value: 'frenos',
			label: 'Frenos',
		},
		{
			value: 'emisiones',
			label: 'Emisiones',
		},
		{
			value: 'sistemaElectrico',
			label: 'Sistema Eléctrico',
		},
		{
			value: 'inspeccionVisual',
			label: 'Inspección Visual',
		},
		{
			value: 'inspeccionFosa',
			label: 'Inspección en Fosa',
		},
	],
	seccion: {
		direccion: [
			{
				value: 'alineacion',
				label: 'Alineación',
			},
			{
				value: 'extremosDeDireccion',
				label: 'Extremos de dirección',
			},
			{
				value: 'direccionMecanica',
				label: 'Dirección mecánica',
			},
			{
				value: 'direccionAsistida',
				label: 'Dirección asistida',
			},
			{
				value: 'columnaDeDireccion',
				label: 'Columna de dirección',
			},
		],
		suspension: [
			{
				value: 'rotulas',
				label: 'Rótulas',
			},
			{
				value: 'fuelles',
				label: 'Fuelles',
			},
			{
				value: 'parrillas',
				label: 'Parrillas',
			},
			{
				value: 'amortiguadores',
				label: 'Amortiguadores',
			},
			{
				value: 'cazoletas',
				label: 'Cazoletas',
			},
			{
				value: 'suspCPF',
				label: 'Casos poco frecuentes',
			},
		],

		freno: [
			{
				value: 'rendDeFrenado',
				label: 'Rendimiento de frenado',
			},
			{
				value: 'difDeFrenado',
				label: 'Diferencia de frenado',
			},
			{
				value: 'ruedaFrenada',
				label: 'Rueda frenada',
			},
			{
				value: 'ovalAlab',
				label: 'Ovalidad o Alabebeo',
			},
			{
				value: 'frenoCPF',
				label: 'Casos poco frecuentes',
			},
		],

		emisiones: [
			{
				value: 'gases',
				label: 'Gases',
			},
			{
				value: 'ruido',
				label: 'Ruido',
			},
		],

		sistElectrico: [
			{
				value: 'lucesTra',
				label: 'Luces traseras',
			},
			{
				value: 'lucesDel',
				label: 'Luces delanteras',
			},
			{
				value: 'bocina',
				label: 'Bocina',
			},
			{
				value: 'instrumental',
				label: 'Instrumental',
			},
			{
				value: 'limpiaParabrisas',
				label: 'Limpia Parabrisas',
			},
		],

		inspVisual: [
			{
				value: 'kit',
				label: 'Kit de seguridad',
			},
			{
				value: 'patentes',
				label: 'Patentes',
			},
			{
				value: 'cintDeSeg',
				label: 'Cinturones de seguridad',
			},
			{
				value: 'equipamiento',
				label: 'Equipamiento',
			},
			{
				value: 'vidrios',
				label: 'Vidrios',
			},
			{
				value: 'paragolpes',
				label: 'Paragolpes',
			},
			{
				value: 'espejos',
				label: 'Espejos',
			},
			{
				value: 'opticas',
				label: 'Ópticas',
			},
			{
				value: 'ruedas',
				label: 'Ruedas',
			},
			{
				value: 'altura',
				label: 'Altura',
			},
			{
				value: 'protPasiva',
				label: 'Protección pasiva',
			},
			{
				value: 'airBag',
				label: 'Air bag',
			},
			{
				value: 'carroceria',
				label: 'Carrocería',
			},
		],

		inspFosa: [
			{
				value: 'fluidos',
				label: 'Fluidos',
			},
			{
				value: 'sistEscape',
				label: 'Escape',
			},
			{
				value: 'chasis',
				label: 'Chasis',
			},
		],
	},

	descripciones: {
		/*Dirección */
		direccion: {
			alineacion: [
				{
					value: 'trenDelDesalin',
					label: 'Tren delantero desalineado',
				},
				{
					value: 'trenTraDesalin',
					label: 'Tren trasero desalineado',
				},
				{
					value: 'volanteDesalin',
					label: 'Volante desalineado con respecto a la caja de dirección',
				},
			],

			extremosDir: [
				{
					value: 'extDirIzq',
					label:
						'Extremo de dirección izquierdo con holgura. Reemplazar y alinear.',
				},
				{
					value: 'extDirDer',
					label:
						'Extremo de dirección derecho con holgura. Reemplazar y alinear.',
				},
			],
			direccionMecanica: [
				{
					value: 'brazoPitman',
					label: 'Brazo Pitman con holgura. Reemplazar y alinear.',
				},
				{
					value: 'cajaDir',
					label: 'Caja de dirección con defectos.',
				},
				{
					value: 'barraDirIzq',
					label:
						'Barra de dirección con holgura rueda izquierda. Reemplazar y alinear.',
				},
				{
					value: 'barraDirDer',
					label:
						'Barra de dirección con holgura rueda derecha. Reemplazar y alinear.',
				},
			],
			direccionAsistida: [
				{
					value: 'fuelleCajaDirIzq',
					label:
						'Fuelle caja de dirección izquierdo en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'fuelleCajaDirDer',
					label:
						'Fuelle caja de dirección derecho en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'dirHolgura',
					label:
						'Dirección asistida con holgura y/o funcionamiento defectuoso.',
				},
				{
					value: 'preIzq',
					label: 'Precap izquierdo con holgura. Reemplazar y alinear.',
				},
				{
					value: 'preDer',
					label: 'Precap derecho con holgura. Reemplazar y alinear.',
				},
				{
					value: 'unionCaja',
					label: 'Unión de caja y columna de dirección con holgura.',
				},
			],
			columnaDeDireccion: [
				{
					value: 'colDir',
					label: 'Columna de dirección con holgura.',
				},
				{
					value: 'volHol',
					label: 'Volante con holgura.',
				},
			],
		},
		/*Suspensión */
		suspension: {
			rotulas: [
				{
					value: 'rotMazaIzq',
					label:
						'Rótula maza delantera izquierda con holgura. Reemplazar y alinear.',
				},
				{
					value: 'rotMazaDer',
					label:
						'Rótula maza delantera derecha con holgura. Reemplazar y alinear.',
				},
			],

			fuelles: [
				{
					value: 'fuelleCajaDirIzq',
					label:
						'Fuelle caja de dirección izquierdo en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'fuelleCajaDirDer',
					label:
						'Fuelle caja de dirección derecho en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'fuelleMazDelIzq',
					label: 'Fuelle de maza delantera izquierda en mal estado.',
				},
				{
					value: 'fuelleMazaDelDer',
					label: 'Fuelle de maza delantera derecha en mal estado.',
				},
				{
					value: 'fuelleMazaTraIzq',
					label: 'Fuelle de maza trasera izquierda en mal estado.',
				},
				{
					value: 'fuelleMazaTraDer',
					label: 'Fuelle de maza trasera derecha en mal estado.',
				},
				{
					value: 'fuelleTransDelIzq',
					label: 'Fuelle de transmisión delantero izquierdo en mal estado.',
				},
				{
					value: 'fuelleTransDelDer',
					label: 'Fuelle de transmisión delantero derecho en mal estado.',
				},
				{
					value: 'fuelleTransTraIzq',
					label: 'Fuelle de transmisión trasero izquierdo en mal estado.',
				},
				{
					value: 'fuelleTransTraDer',
					label: 'Fuelle de transmisión trasero derecho en mal estado.',
				},
			],

			parrillas: [
				{
					value: 'bujeSusDelIzq',
					label:
						'Buje parrilla de suspensión delantera izquierda en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'bujeSusDelDer',
					label:
						'Buje parrilla de suspensión delantera derecha en mal estado. Reemplazar y alinear.',
				},
				{
					value: 'bujeSusTraIzq',
					label:
						'Buje de parrilla de suspensión trasera izquierda en mal estado.Reemplazar y alinear.',
				},
				{
					value: 'bujeSusTraDer',
					label:
						'Buje parrilla de suspensión trasera derecha en mal estado.Reemplazar y alinear.',
				},
				{
					value: 'brazoPit',
					label: 'Brazo Pitman con holgura. Reemplazar y alinear.',
				},
			],

			amortiguadores: [
				{
					value: 'bajoRendAmortDelIzq',
					label:
						'Bajo rendimiento de amortiguación (amortiguador delantero izquierdo defectuoso).',
				},
				{
					value: 'bajoRendAmortDelDer',
					label:
						'Bajo rendimiento de amortiguación (amortiguador delantero derecho defectuoso).',
				},
				{
					value: 'bajoRendAmortTraIzq',
					label:
						'Bajo rendimiento de amortiguación (amortiguador trasero izquierdo defectuoso).',
				},
				{
					value: 'bajoRendAmortTraDer',
					label:
						'Bajo rendimiento de amortiguación (amortiguador trasero derecho defectuoso).',
				},
				{
					value: 'perdAmortDelIzq',
					label: 'Pérdida de fluido en amortiguador delantero izquierdo.',
				},
				{
					value: 'perdAmortDelDer',
					label: 'Pérdida de fluido en amortiguador delantero derecho.',
				},
				{
					value: 'perdAmortTraIzq',
					label: 'Pérdida de fluido en amortiguador trasero izquierdo.',
				},
				{
					value: 'perdAmortTraDer',
					label: 'Pérdida de fluido en amortiguador trasero derecho.',
				},
				{
					value: 'fijAmortDelIzq',
					label: 'Fijación de amortiguador delantero izquierdo con holgura.',
				},
				{
					value: 'fijAmortDelDer',
					label: 'Fijación de amortiguador delantero derecho con holgura.',
				},
				{
					value: 'fijAmortTraIzq',
					label: 'Fijación de amortiguador trasero izquierdo con holgura.',
				},
				{
					value: 'fijAmortTraDer',
					label: 'Fijación de amortiguador trasero derecho con holgura.',
				},
			],
			cazoletas: [
				{
					value: 'cazDelIzq',
					label:
						'Cazoleta delantera izquierda con holgura. Reemplazar y alinear.',
				},
				{
					value: 'cazDelDer',
					label:
						'Cazoleta delantera derecha con holgura. Reemplazar y alinear.',
				},
				{
					value: 'cazTraIzq',
					label:
						'Cazoleta trasera izquierda con holgura. Reemplazar y alinear.',
				},
				{
					value: 'cazTraDer',
					label: 'Cazoleta trasera derecha con holgura. Reemplazar y alinear.',
				},
			],
			suspCPF: [
				{
					value: 'rodDelIzq',
					label: 'Rodamientos defectuosos rueda delantera izquierda.',
				},
				{
					value: 'rodDelDer',
					label: 'Rodamientos defectuosos rueda delantera derecha.',
				},
				{
					value: 'rodTraIzq',
					label: 'Rodamientos defectuosos rueda trasera izquierda.',
				},
				{
					value: 'rodTraDer',
					label: 'Rodamientos defectuosos rueda trasera derecha.',
				},
				{
					value: 'barEstDel',
					label: 'Barra estabilizadora delantera con defectos.',
				},
				{
					value: 'barEstTra',
					label: 'Barra estabilizadora trasera con defectos.',
				},
				{
					value: 'barDirIzq',
					label:
						'Barra de dirección con holgura rueda izquierda. Reemplazar y alinear.',
				},
				{
					value: 'barDirDer',
					label:
						'Barra de dirección con holgura rueda derecha. Reemplazar y alinear.',
				},
				{
					value: 'puenteTra',
					label: 'Puente trasero en mal estado.',
				},
			],
		},
		/* Frenos */
		frenos: {
			rendDeFrenado: [
				{
					value: 'bajRendDel',
					label: 'Bajo rendimiento de frenado en eje delantero.',
				},
				{
					value: 'bajRendTra',
					label: 'Bajo rendimiento de frenado en eje trasero.',
				},
				{
					value: 'bajRendFrm',
					label: 'Bajo rendimiento freno de mano.',
				},
			],
			difDeFrenado: [
				{
					value: 'difFreDelRi',
					label:
						'Diferencia de frenado eje delantero (frena menos rueda izquierda).',
				},
				{
					value: 'difFreDelRd',
					label:
						'Diferencia de frenado eje delantero (frena menos rueda derecha).',
				},
				{
					value: 'difFreTraRi',
					label:
						'Diferencia de frenado eje trasero (frena menos rueda izquierda).',
				},
				{
					value: 'difFreTraRd',
					label:
						'Diferencia de frenado eje trasero (frena menos rueda derecha).',
				},
				{
					value: 'difFreFdmRi',
					label:
						'Diferencia de frenado freno de mano (frena menos rueda izquierda).',
				},
				{
					value: 'difFreFdmRd',
					label:
						'Diferencia de frenado freno de mano (frena menos rueda derecha).',
				},
			],

			ruedaFrenada: [
				{
					value: 'rueFreDelIzq',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno delantero izquierdo defectuoso).',
				},
				{
					value: 'rueFreDelDer',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno delantero derecho defectuoso).',
				},
				{
					value: 'rueFreTraIzq',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno trasero izquierdo defectuoso).',
				},
				{
					value: 'rueFreTraDer',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno trasero derecho defectuoso).',
				},
			],

			ovalAlab: [
				{
					value: 'disFreDelIzqAlab',
					label: 'Disco de freno delantero izquierdo alabeado.',
				},
				{
					value: 'disFreDelDerAlab',
					label: 'Disco de freno delantero derecho alabeado.',
				},
				{
					value: 'disFreTraIzqAlab',
					label: 'Disco de freno trasero izquierdo alabeado.',
				},
				{
					value: 'disFreTraDerAlab',
					label: 'Disco de freno trasero derecho alabeado.',
				},
				{
					value: 'ovaCampFreDelIzq',
					label: 'Ovalidad en campana de freno delantera izquierda.',
				},
				{
					value: 'ovaCampFreDelDer',
					label: 'Ovalidad en campana de freno delantera derecha.',
				},
				{
					value: 'ovaCampFreTraIzq',
					label: 'Ovalidad en campana de freno trasera izquierda.',
				},
				{
					value: 'ovaCampFreTraDer',
					label: 'Ovalidad en campana de freno trasera derecha.',
				},
			],

			frenoCPF: [
				{
					value: 'cirHidDelFre',
					label:
						'Circuito hidráulico delantero de sistema de frenado con defectos.',
				},
				{
					value: 'cirHidTraFre',
					label:
						'Circuito hidráulico trasero de sistema de frenado con defectos.',
				},
				{
					value: 'freDelFueMin',
					label:
						'Frenos delanteros no cumplen con la fuerza mínima requerida (1 kN).',
				},
				{
					value: 'freTraFueMin',
					label:
						'Frenos traseros no cumplen con la fuerza mínima requerida (1 kN).',
				},
				{
					value: 'freManFueMin',
					label:
						'Freno de mano no cumple con la fuerza mínima requerida (1 kN).',
				},
			],
		},
		/* Emisiones */
		emisiones: {
			gases: [
				{
					value: 'altoNivO2',
					label:
						'Emisión de gases supera los límites permitidos (alto nivel de monóxido de carbono).',
				},
				{
					value: 'altoNivHco',
					label:
						'Emisión de gases supera los límites permitidos (alto nivel de hidrocarburos).',
				},
				{
					value: 'altoNivOpa',
					label: 'Alto nivel de opacidad en emisiones.',
				},
			],

			ruido: [
				{
					value: 'altoNivConSon',
					label:
						'Alto nivel de contaminación sonora (superior a 84 decibeles).',
				},
			],
		},
		/* Sistema Eléctrico */
		sistElectrico: {
			lucesDel: [
				{
					value: 'luzGirDelIzq',
					label: 'Luz de giro delantera izquierda no destella correctamente.',
				},
				{
					value: 'luzGirDelDer',
					label: 'Luz de giro delantera derecha no  destella correctamente.',
				},
				{
					value: 'luzPosDelIzq',
					label: 'Luz de posición delantera izquierda no enciende.',
				},
				{
					value: 'luzPosDelDer',
					label: 'Luz de posición delantera derecha no enciende.',
				},
				{
					value: 'luzBajIzq',
					label: 'Luz baja izquierda no enciende.',
				},
				{
					value: 'luzBajDer',
					label: 'Luz baja derecha no enciende.',
				},
				{
					value: 'luzAltDelIzq',
					label: 'Luz alta delantera izquierda no enciende.',
				},
				{
					value: 'luzAltDelDer',
					label: 'Luz alta delantera derecha no enciende.',
				},
				{
					value: 'luzBalizasDel',
					label: 'Luces de balizas delanteras no destellan correctamente.',
				},
				{
					value: 'luzBajSinPatron',
					label: 'Luz baja no describe patrón reglamentario.',
				},
				{
					value: 'luzAltSinPatron',
					label: 'Luz alta no describe patrón reglamentario.',
				},
				{
					value: 'bajIntIluDelIzq',
					label: 'Baja intensidad de iluminación en luz delantera izquierda.',
				},
				{
					value: 'bajIntIluDelDer',
					label: 'Baja intensidad de iluminación en luz delantera derecha.',
				},
			],
			lucesTra: [
				{
					value: 'luzFreTraIzqNoRes',
					label:
						'Luz de freno trasera izquierda no responde al accionamiento del pedal.',
				},
				{
					value: 'luzFreTraDerNoRes',
					label:
						'Luz de freno trasera derecha no responde al accionamiento del pedal.',
				},
				{
					value: 'luzFreTraCenNoRes',
					label:
						'Luz de freno trasera central no responde al accionamiento del pedal.',
				},
				{
					value: 'luzRev',
					label: 'Luz de reversa no enciende.',
				},
				{
					value: 'luzPat',
					label: 'Luz de patente no enciende.',
				},
				{
					value: 'luzPosTraIzq',
					label: 'Luz de posición trasera izquierda no enciende.',
				},
				{
					value: 'luzPosTraDer',
					label: 'Luz de posición trasera derecha no enciende.',
				},
				{
					value: 'luzGirTraIzq',
					label: 'Luz de giro trasera izquierda no destella correctamente.',
				},
				{
					value: 'luzGirTraDer',
					label: 'Luz de giro trasera derecha no destella correctamente.',
				},
				{
					value: 'luzBalizasTra',
					label: 'Luces de balizas traseras no destellan correctamente.',
				},
				{
					value: 'bajIntIluTraIzq',
					label: 'Baja intensidad de iluminación en luz trasera izquierda.',
				},
				{
					value: 'bajIntIluTraDer',
					label: 'Baja intensidad de iluminación en luz trasera derecha.',
				},
			],
			bocina: [
				{
					value: 'bocina',
					label: 'Bocina no funciona.',
				},
			],
			instrumental: [
				{
					value: 'luzTesAbsEnc',
					label: 'Luz testigo de ABS encendido.',
				},
				{
					value: 'luzTesFalEleEnc',
					label: 'Luz testigo de FALLA ELÉCTRICA encendido.',
				},
				{
					value: 'luzTesPreAceEnc',
					label: 'Luz testigo de falta de PRESIÓN DE ACEITE encendido.',
				},
				{
					value: 'luzTesSisFreEnc',
					label: 'Luz testigo de falla en el sistema de FRENO encendida.',
				},
				{
					value: 'luzTesBatEnc',
					label: 'Luz testigo de BATERÍA encendido.',
				},
				{
					value: 'luzTesAltTempEnc',
					label: 'Luz testigo de ALTA TEMPERATURA encendido.',
				},
				{
					value: 'InsNoFunCor',
					label: 'Instrumental no funciona correctamente.',
				},
			],
			limpiaPararabrisas: [
				{
					value: 'limpiaparabrisas',
					label: 'No funciona sistema de limpiaparabrisas.',
				},
			],
		},
		/* Inspección Visual */
		inspVisual: {
			kit: [
				{
					value: 'kitSeguridad',
					label: 'Kit de seguridad de incompleto.',
				},
			],
			patente: [
				{
					value: 'patDelRot',
					label: 'Patente delantera no legible y/o rota.',
				},
				{
					value: 'patTraRot',
					label: 'Patente trasera no legible y/o rota.',
				},
				{
					value: 'falPatDel',
					label: 'Falta patente delantera.',
				},
				{
					value: 'falPatTra',
					label: 'Falta patente trasera.',
				},
			],
			cintDeSeg: [
				{
					value: 'cinDelIzqDef',
					label:
						'Cinturón de seguridad delantero izquierdo defectuoso o faltante.',
				},
				{
					value: 'cinDelDerDef',
					label:
						'Cinturón de seguridad delantero derecho defectuoso o faltante.',
				},
				{
					value: 'cinTraIzqDef',
					label:
						'Cinturón de seguridad trasero izquierdo defectuoso o faltante.',
				},
				{
					value: 'cinTraDerDef',
					label: 'Cinturón de seguridad trasero derecho defectuoso o faltante.',
				},
				{
					value: 'cinTraCenDef',
					label: 'Cinturón de seguridad trasero central defectuoso o faltante.',
				},
			],
			equipamiento: [
				{
					value: 'taponCombustible',
					label: 'Tapón de combustible no reglamentario.',
				},
				{
					value: 'bateria',
					label: 'Batería sin sujeción.',
				},
			],
			vidrios: [
				{
					value: 'parRot',
					label: 'Parabrisas roto.',
				},
				{
					value: 'polVenDel',
					label:
						'Polarizado en ventanas delanteras impiden ver al conductor y/o acompañante.',
				},
				{
					value: 'obsPar',
					label:
						'Obstrucción de visión en parabrisas por elementos adheridos al mismo.',
				},
				{
					value: 'apeVenDelIzqDef',
					label:
						'Sistema  apertura de ventanilla delantera izquierda defectuoso.',
				},
				{
					value: 'apeVenDelDerDef',
					label: 'Sistema apertura de ventanilla delantera derecha defectuoso.',
				},
				{
					value: 'apeVenTraIzqDef',
					label: 'Sistema apertura de ventanilla trasera izquierda defectuoso.',
				},
				{
					value: 'apeVenTraDerDef',
					label: 'Sistema apertura de ventanilla trasera derecha defectuoso.',
				},
			],
			paraGolpes: [
				{
					value: 'ancParDelIzqMal',
					label: 'Anclaje paragolpes delantero izquierdo en mal estado.',
				},
				{
					value: 'ancParDelDerMal',
					label: 'Anclaje paragolpes delantero derecho en mal estado.',
				},
				{
					value: 'ancParTraIzqMal',
					label: 'Anclaje paragolpes trasero izquierdo en mal estado.',
				},
				{
					value: 'ancParTraDerMal',
					label: 'Anclaje paragolpes trasero derecho en mal estado.',
				},
				{
					value: 'parDelRot',
					label: 'Paragolpes delantero roto por golpe o descolgado.',
				},
				{
					value: 'parTraRot',
					label: 'Paragolpes trasero roto por golpe o descolgado.',
				},
				{
					value: 'parDelNoReg',
					label: 'Paragolpes delantero no reglamentario.',
				},
				{
					value: 'parTraNoReg',
					label: 'Paragolpes trasero no reglamentario.',
				},
			],
			espejos: [
				{
					value: 'espExtIzqNoFun',
					label: 'Espejo exterior izquierdo no funcional.',
				},
				{
					value: 'espExtDelNoFun',
					label: 'Espejo exterior delantero no funcional.',
				},
				{
					value: 'espIntCenNoFun',
					label: 'Espejo interior central no funcional.',
				},
			],
			opticas: [
				{
					value: 'optDelIzqMal',
					label: 'Óptica delantera izquierda en mal estado.',
				},
				{
					value: 'optDelDerMal',
					label: 'Óptica delantera derecha en mal estado.',
				},
				{
					value: 'optTraIzqMal',
					label: 'Óptica trasera izquierda en mal estado.',
				},
				{
					value: 'optTraDerMal',
					label: 'Óptica trasera derecha en mal estado.',
				},
				{
					value: 'optDelIzqOpa',
					label: 'Óptica delantera izquierda opaca.',
				},
				{
					value: 'optDelDerOpa',
					label: 'Óptica delantera derecha opaca.',
				},
			],
			ruedas: [
				{
					value: 'neuDelIzqMal',
					label: 'Neumático delantero izquierdo en mal estado.',
				},
				{
					value: 'neuDelDerMal',
					label: 'Neumático delantero derecho en mal estado.',
				},
				{
					value: 'neuTraIzqMal',
					label: 'Neumático trasero izquierdo en mal estado.',
				},
				{
					value: 'neuTraDerMal',
					label: 'Neumático trasero derecho en mal estado.',
				},
				{
					value: 'llaDelIzqDef',
					label: 'Llanta delantera izquierda deformada.',
				},
				{
					value: 'llaDelDerDef',
					label: 'Llanta delantera derecha deformada.',
				},
				{
					value: 'llaTraIzqDef',
					label: 'Llanta trasera izquierda deformada.',
				},
				{
					value: 'llaTraDerDef',
					label: 'Llanta trasera derecha deformada.',
				},
				{
					value: 'sinRueAux',
					label: 'Falta rueda de auxilio.',
				},
				{
					value: 'rueAuxMal',
					label: 'Rueda de auxilio en mal estado.',
				},
				{
					value: 'sopRueAuxDef',
					label: 'Soporte rueda de auxilio con defectos.',
				},
				{
					value: 'falPerRueDelIzq',
					label: 'Falta perno/tuerca de fijación en rueda delantera izquierda.',
				},
				{
					value: 'falPerRueDelDer',
					label: 'Falta perno/tuerca de fijación en rueda delantera derecha.',
				},
				{
					value: 'falPerRueTraIzq',
					label: 'Falta perno/tuerca de fijación en rueda trasera izquierda.',
				},
				{
					value: 'falPerRueTraDer',
					label: 'Falta perno/tuerca de fijación en rueda trasera derecha.',
				},
			],
			altura: [
				{
					value: 'alturaAum',
					label: 'Altura del vehiculo aumentada',
				},
				{
					value: 'alturaDis',
					label: 'Altura del vehiculo disminuida',
				},
			],
			protPasiva: [
				{
					value: 'sinTabique',
					label: 'Sin tabique divisor.',
				},
			],
			airBag: [
				{
					value: 'airDet',
					label: 'Airbag detonado.',
				},
			],
			carroceria: [
				{
					value: 'adiNoRegCar',
					label: 'Aditamento no reglamentario en la carrocería ',
				},
				{
					value: 'adiFueLinPar',
					label:
						'Aditamento en el vehículo fuera de la línea de los paragolpes.',
				},
			],
		},
		/* Inspección de Fosa */
		inspFosa: {
			fluidos: [
				{
					value: 'perAceMot',
					label: 'Pérdida de aceite de motor.',
				},
				{
					value: 'perAceTra',
					label: 'Pérdida de aceite de transmisión.',
				},
				{
					value: 'perFluHid',
					label: 'Pérdida de fluido hidráulico.',
				},
				{
					value: 'perLiqFre',
					label: 'Pérdida de líquido de freno.',
				},
				{
					value: 'perLiqRef',
					label: 'Pérdida de líquido refrigerante.',
				},
				{
					value: 'perCombustible',
					label: 'Pérdida de combustible.',
				},
				{
					value: 'perAciBat',
					label: 'Pérdida de ácido en la batería.',
				},
			],
			sistEscape: [
				{
					value: 'sisEscDef',
					label: 'Sistema de escape con defectos.',
				},
				{
					value: 'sisEscRot',
					label: 'Sistema de escape con roturas o faltantes en sus soportes.',
				},
			],
			chasis: [
				{
					value: 'chasisCor',
					label: 'Chasis en mal estado por corrosión.',
				},
				{
					value: 'chasisRaj',
					label: 'Chasis rajado.',
				},
				{
					value: 'chasisDef',
					label: 'Chasis deformado.',
				},
			],
		},
	},
};
