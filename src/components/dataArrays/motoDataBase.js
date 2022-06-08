const motoArray = {
	grupo: [
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
			value: 'sistElectrico',
			label: 'Sistema Eléctrico',
		},
		{
			value: 'inspVisual',
			label: 'Inspección Visual',
		},
		{
			value: 'acumDefectos',
			label: 'Acumulación de defectos',
		},
		{
			value: 'ruedas',
			label: 'Ruedas',
		},
		{
			value: 'luces',
			label: 'Luces',
		},
	],
	seccion: {
		luces: [
			{
				value: 'lucesDePos',
				label: 'Luces de posición',
			},
			{
				value: 'lucesDeFreno',
				label: 'Luces de freno',
			},
			{
				value: 'luzBaja',
				label: 'Luces bajas',
			},
			{
				value: 'luzAlta',
				label: 'Luces altas',
			},
			{
				value: 'balizas',
				label: 'Balizas',
			},
			{
				value: 'guines',
				label: 'Guiñes',
			},
			{
				value: 'luzPat',
				label: 'Luz de patente',
			},
		],
		ruedas: [
			{
				value: 'neumaticos',
				label: 'Neumáticos',
			},
			{
				value: 'llantas',
				label: 'Llantas',
			},
			{
				value: 'fijaciones',
				label: 'Fijaciones',
			},
		],
		acumDefectos: [
			{value: 'acumDefectosSeccion', label: 'Acumulación de defectos'},
		],
		suspension: [
			{
				value: 'amortiguadores',
				label: 'Amortiguadores',
			},
			{
				value: 'suspCPF',
				label: 'Casos poco frecuentes',
			},
		],
		frenos: [
			{
				value: 'rendDeFrenado',
				label: 'Rendimiento de frenado',
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
				value: 'bocina',
				label: 'Bocina',
			},
			{
				value: 'instrumental',
				label: 'Instrumental',
			},
			{
				value: 'testigos',
				label: 'Testigos',
			},
		],
		inspVisual: [
			{
				value: 'kit',
				label: 'Kit de seguridad',
			},
			{
				value: 'alineacion',
				label: 'Alineación',
			},
			{
				value: 'equipamiento',
				label: 'Equipamiento',
			},
			{
				value: 'parabrisas',
				label: 'Parabrisas',
			},
			{
				value: 'carroceria',
				label: 'Carrocería',
			},
			{
				value: 'patentes',
				label: 'Patentes',
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
				value: 'cadena',
				label: 'Cadena',
			},
			{
				value: 'altura',
				label: 'Altura',
			},
			{
				value: 'perdFluidos',
				label: 'Perdida de fluidos',
			},
			{
				value: 'sistEscape',
				label: 'Sistema de Escape',
			},
		],
	},
	descripciones: {
		luces: {
			lucesDePos: [
				{
					value: 'luzPosDel',
					label: 'Luz de posición delantera no enciende.',
				},
				{
					value: 'luzPosTra',
					label: 'Luz de posición trasera no enciende.',
				},
				{
					value: 'bajIntIluzDel',
					label: 'Baja intensidad de iluminación en luz delantera.',
				},
				{
					value: 'bajIntIluzTra',
					label: 'Baja intensidad de iluminación en luz trasera.',
				},
			],
			lucesDeFreno: [
				{
					value: 'luzFreTraIzqNoRes1',
					label: 'Luz de freno trasera no responde al accionamiento del pedal.',
				},
				{
					value: 'luzFreTraIzqNoRes2',
					label:
						'Luz de freno trasera no responde al accionamiento del manubrio.',
				},
				{
					value: 'bajIntIluTraFren',
					label: 'Baja intensidad de iluminación en luz trasera de freno.',
				},
			],
			luzBaja: [
				{
					value: 'luzBajSinPatron',
					label: 'Luz baja no describe patrón reglamentario.',
				},
				{
					value: 'luzBaj',
					label: 'Luz baja no enciende.',
				},
				{
					value: 'bajIntIluDel',
					label: 'Baja intensidad de iluminación en luz delantera.',
				},
			],
			luzAlta: [
				{
					value: 'luzAltSinPatron',
					label: 'Luz alta no describe patrón reglamentario.',
				},
				{
					value: 'luzAltDel',
					label: 'Luz alta delantera  no enciende.',
				},
				{
					value: 'bajIntIluDel',
					label: 'Baja intensidad de iluminación en luz delantera.',
				},
			],
			luzPat: [
				{
					value: 'luzPatTra',
					label: 'Luz de patente trasera no enciende.',
				},
			],
			balizas: [
				{
					value: 'luzBalizasDel',
					label: 'Luces de balizas delanteras no destellan correctamente.',
				},
				{
					value: 'luzBalizasTra',
					label: 'Luces de balizas traseras no destellan correctamente.',
				},
				{
					value: 'luzBalizasLat',
					label: 'Luces de balizas laterales no destellan correctamente.',
				},
			],
			guines: [
				{
					value: 'luzGirDelIzq',
					label: 'Luz de giro delantera izquierda no destella correctamente.',
				},
				{
					value: 'luzGirDelDer',
					label: 'Luz de giro delantera derecha no  destella correctamente.',
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
					value: 'luzGirLatIzq',
					label: 'Luz de giro lateral izquiera no destella correctamente.',
				},
				{
					value: 'luzGirLatDer',
					label: 'Luz de giro lateral derecha no destella correctamente.',
				},
			],
		},
		ruedas: {
			llantas: [
				{
					value: 'llaDelDef',
					label: 'Llanta delanteradeformada.',
				},
				{
					value: 'llaTraDef',
					label: 'Llanta trasera deformada.',
				},
			],
			neumaticos: [
				{
					value: 'neuDelMal',
					label: 'Neumático delantero en mal estado.',
				},
				{
					value: 'neuTraMal',
					label: 'Neumático trasero en mal estado.',
				},
			],
			fijaciones: [
				{
					value: 'falPerRueDel',
					label: 'Falta perno/tuerca de fijación en rueda delantera.',
				},
				{
					value: 'falPerRueTra',
					label: 'Falta perno/tuerca de fijación en rueda trasera.',
				},
			],
		},
		acumDefectos: {
			acumDefectosSeccion: [
				{
					value: 'acumDefectosDesc',
					label: 'Decrementa estado de aptitud por acumulación de defectos.',
				},
			],
		},
		suspension: {
			amortiguadores: [
				{
					value: 'bajoRendAmortDel',
					label:
						'Bajo rendimiento de amortiguación (amortiguador delantero defectuoso).',
				},
				{
					value: 'bajoRendAmortTra',
					label:
						'Bajo rendimiento de amortiguación (amortiguador trasero defectuoso).',
				},
				{
					value: 'perdFluAmortDel',
					label: 'Pérdida de fluido en amortiguador delantero.',
				},
				{
					value: 'perdFluAmortTra',
					label: 'Pérdida de fluido en amortiguador trasero.',
				},
			],
			suspCPF: [
				{
					value: 'horqDel',
					label: 'Horquilla delantera con holgura.',
				},
				{
					value: 'horqTra',
					label: 'Horquilla trasera con holgura.',
				},
			],
		},
		frenos: {
			rendDeFrenado: [
				{
					value: 'bajoRendFrenadoDel',
					label: 'Bajo rendimiento de frenado en eje delantero.',
				},
				{
					value: 'bajoRendFrenadoTra',
					label: 'Bajo rendimiento de frenado en eje trasero.',
				},
			],
			ruedaFrenada: [
				{
					value: 'ruedaFrenDel',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno delantero defectuoso).',
				},
				{
					value: 'RuedaFrenTra',
					label:
						'Rueda frenada, sin accionamiento de frenos (freno trasero defectuoso).',
				},
			],
			ovalAlab: [
				{
					value: 'discDelAlab',
					label: 'Disco de freno delantero alabeado.',
				},
				{
					value: 'discTraAlab',
					label: 'Disco de freno trasero alabeado.',
				},
				{
					value: 'ovalDel',
					label: 'Ovalidad en campana de freno delantera.',
				},
				{
					value: 'ovalTra',
					label: 'Ovalidad en campana de freno trasera.',
				},
			],
			frenoCPF: [
				{
					value: 'circHidDelDef',
					label:
						'Circuito hidráulico delantero de sistema de frenado con defectos.',
				},
				{
					value: 'circHidTraDef',
					label:
						'Circuito hidráulico trasero de sistema de frenado con defectos.',
				},
				{
					value: 'fMinDel',
					label:
						'Frenos delanteros no cumplen con la fuerza mínima requerida para el modelo.',
				},
				{
					value: 'fMilTra',
					label:
						'Frenos traseros no cumplen con la fuerza mínima requerida para el modelo.',
				},
			],
		},
		emisiones: {
			gases: [
				{
					value: 'gasCO',
					label:
						'Emisión de gases supera los límites permitidos (alto nivel de monóxido de carbono).',
				},
				{
					value: 'gasHC',
					label:
						'Emisión de gases supera los límites permitidos (alto nivel de hidrocarburos).',
				},
			],
			ruido: [
				{
					value: 'ruidoAlto',
					label:
						'Alto nivel de contaminación sonora (superior a 84 decibeles).',
				},
			],
		},
		sistElectrico: {
			bocina: [
				{
					value: 'bocina',
					label: 'Bocina no funciona.',
				},
			],
			testigos: [
				{
					value: 'tesPresAc',
					label: 'Luz testigo de falta de PRESIÓN DE ACEITE encendido.',
				},
				{
					value: 'tesFreno',
					label: 'Luz testigo de falla en el sistema de FRENO encendida.',
				},
				{
					value: 'tesBat',
					label: 'Luz testigo de BATERÍA encendido.',
				},
				{
					value: 'tesTemp',
					label: 'Luz testigo de ALTA TEMPERATURA encendido.',
				},
				{
					value: 'instrumental',
					label: 'Instrumental no funciona correctamente.',
				},
			],
			instrumental: [
				{
					value: 'velocimetro',
					label: 'Velocímetro no funciona correctamente.',
				},
				{
					value: 'tacometro',
					label: 'Tacómetro no funciona correctamente.',
				},
				{
					value: 'insNoFunCor',
					label: 'Instrumental no funciona correctamente.',
				},
			],
		},
		inspVisual: {
			kit: [
				{
					value: 'kit',
					label: 'Kit de seguridad incompleto.',
				},
			],
			alineacion: [
				{
					value: 'ruedaDelDes',
					label: 'Rueda delantera desalineada.',
				},
				{
					value: 'ruedaTraDes',
					label: 'Rueda trasera desalineada.',
				},
			],
			equipamiento: [
				{
					value: 'tapComb',
					label: 'Tapón de combustible no reglamentario.',
				},
				{
					value: 'batSuj',
					label: 'Batería sin sujeción.',
				},
			],
			parabrisas: [
				{
					value: 'parabMalEst',
					label: 'Parabrisas en mal estado.',
				},
			],
			carroceria: [
				{
					value: 'manubrio',
					label: 'Manubrio o manillar con defectos.',
				},
				{
					value: 'cuadro',
					label: 'Cuadro con defectos.',
				},
				{
					value: 'ancGuardDel',
					label: 'Anclaje guardabarros delantero en mal estado.',
				},
				{
					value: 'ancGuardTra',
					label: 'Anclaje guardabarros trasero en mal estado.',
				},
				{
					value: 'ancCaren',
					label: 'Anclaje carenado en mal estado.',
				},
				{
					value: 'ancCobTab',
					label: 'Anclaje cobertor tablero en mal estado.',
				},
				{
					value: 'ancCobOp',
					label: 'Anclaje cobertor óptica en mal estado.',
				},
				{
					value: 'guardDelGolpe',
					label: 'Guardabarros delantero roto por golpe.',
				},
				{
					value: 'guardTraGolpe',
					label: 'Guardabarros trasero roto por golpe.',
				},
				{
					value: 'carGolpe',
					label: 'Carenado roto por golpe.',
				},
				{
					value: 'cubTabGolpe',
					label: 'Cubre tablero roto por golpe.',
				},
				{
					value: 'cubOpGolpe',
					label: 'Cubre óptica roto por golpe.',
				},
			],
			patentes: [
				{
					value: 'patTraRota',
					label: 'Patente trasera no legible y/o rota.',
				},
				{
					value: 'falPat',
					label: 'Falta patente trasera.',
				},
				{
					value: 'sopPat',
					label: 'Soporte de patente en mal estado.',
				},
			],
			espejos: [
				{
					value: 'espIzq',
					label: 'Espejo exterior izquierdo no funcional.',
				},
				{
					value: 'espDer',
					label: 'Espejo exterior delantero no funcional.',
				},
			],
			opticas: [
				{
					value: 'opDel',
					label: 'Óptica delantera en mal estado.',
				},
				{
					value: 'opTra',
					label: 'Óptica trasera en mal estado.',
				},
				{
					value: 'fGiroIzq',
					label: 'Faro de giro izquierdo en mal estado.',
				},
				{
					value: 'fGiroDer',
					label: 'Faro de giro derecho en mal estado.',
				},
			],
			ruedas: [
				{
					value: 'neuDel',
					label: 'Neumático delantero en mal estado.',
				},
				{
					value: 'neuTra',
					label: 'Neumático trasero en mal estado.',
				},
				{
					value: 'llaDel',
					label: 'Llanta delantera deformada.',
				},
				{
					value: 'llaTra',
					label: 'Llanta trasera deformada.',
				},
			],
			altura: [
				{
					value: 'altAum',
					label: 'Altura del vehiculo aumentada',
				},
				{
					value: 'altDis',
					label: 'Altura del vehiculo disminuida',
				},
			],
			cadena: [
				{
					value: 'faltaLub',
					label: 'Falta de lubricación.',
				},
				{
					value: 'cadMalEst',
					label: 'Cadena en mal estado.',
				},
				{
					value: 'cadSuelta',
					label: 'Cadena Suelta.',
				},
			],
			perdFluidos: [
				{
					value: 'perdAceMot',
					label: 'Pérdida de aceite de motor.',
				},
				{
					value: 'perdAceTra',
					label: 'Pérdida de aceite de transmisión.',
				},
				{
					value: 'perdLiqFre',
					label: 'Pérdida de líquido de freno.',
				},
				{
					value: 'perdLiqRef',
					label: 'Pérdida de líquido refrigerante.',
				},
				{
					value: 'perdComb',
					label: 'Pérdida de combustible.',
				},
				{
					value: 'perdAcidoBat',
					label: 'Pérdida de ácido en la batería.',
				},
			],
			sistEscape: [
				{
					value: 'escDef',
					label: 'Sistema de escape con defectos.',
				},
				{
					value: 'escRotoFalt',
					label: 'Sistema de escape con roturas o faltantes en sus soportes.',
				},
			],
		},
	},
};
export {motoArray};
