/**
 * Stores the data base for the car defect list
 */
const autoArray = {
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
			value: 'freno',
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
			value: 'inspVisual',
			label: 'Inspección Visual',
		},
		{
			value: 'inspFosa',
			label: 'Inspección en Fosa',
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
				label: 'De posición',
			},
			{
				value: 'lucesDeFreno',
				label: 'De freno',
			},
			{
				value: 'luzBaja',
				label: 'Bajas',
			},
			{
				value: 'luzAlta',
				label: 'Altas',
			},
			{
				value: 'balizas',
				label: 'De balizas',
			},
			{
				value: 'guines',
				label: 'De giro',
			},
			{
				value: 'luzRevSec',
				label: 'De reversa',
			},
			{
				value: 'luzPat',
				label: 'De patente',
			},
			{
				value: 'falloGen',
				label: 'Fallo generalizado',
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
			{
				value: 'auxilio',
				label: 'Rueda de auxilio',
			},
		],
		acumDefectos: [{value: 'acumDefectosSeccion', label: 'Defectos'}],
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
				value: 'barraDir',
				label: 'Barra de dirección',
			},
			{
				value: 'barraEst',
				label: 'Barra estabilizadora',
			},
			{
				value: 'trenTras',
				label: 'Tren Trasero',
			},
			{
				value: 'rodam',
				label: 'Rodamientos',
			},
			{
				value: 'hojasDeElastico',
				label: 'Hojas de elástico',
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
				value: 'fuerzaFren',
				label: 'Fuerza de frenado',
			},
			{
				value: 'circHidr',
				label: 'Circuito hidráulico',
			},
			{
				value: 'circNeu',
				label: 'Circuito neumático',
			},
			{
				value: 'frenMan',
				label: 'Freno de mano',
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
		sistemaElectrico: [
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
				value: 'paraGolpes',
				label: 'Paragolpes',
			},
			{
				value: 'espejos',
				label: 'Espejos',
			},
			{
				value: 'opticas',
				label: 'Ópticas y faros',
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
			{
				value: 'opennings',
				label: 'Aberturas o puertas',
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
			{
				value: 'transmision',
				label: 'Transmisión',
			},
			{
				value: 'patasMotor',
				label: 'Patas de motor',
			},
		],
	},

	descripciones: {
		luces: {
			lucesDePos: [
				{
					value: 'luzPosDelIzq',
					label: 'Luz de posición delantera izquierda no enciende.',
				},
				{
					value: 'luzPosDelDer',
					label: 'Luz de posición delantera derecha no enciende.',
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
					value: 'ningunaPos',
					label: 'Ninguna luz de posición funciona.',
				},
			],
			lucesDeFreno: [
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
					value: 'ningunaFren',
					label: 'Ninguna luz de freno funciona.',
				},
			],
			luzBaja: [
				{
					value: 'luzBajIzq',
					label:
						'Luz de baja izquierda no enciende, intensidad baja o patrón no reglamentario.',
				},
				{
					value: 'luzBajDer',
					label:
						'Luz de baja derecha no enciende, intensidad baja o patrón no reglamentario.',
				},
				{
					value: 'ningunaBaja',
					label: 'Ninguna luz baja funciona.',
				},
			],
			luzAlta: [
				{
					value: 'luzAltDelIzq',
					label:
						'Luz de alta izquierda no enciende, intensidad baja o patrón no reglamentario.',
				},
				{
					value: 'luzAltDelDer',
					label:
						'Luz de alta derecha no enciende, intensidad baja o patrón no reglamentario.',
				},
				{
					value: 'ningunaAlta',
					label: 'Ninguna luz alta funciona.',
				},
			],
			luzPat: [
				{
					value: 'luzPatDel',
					label: 'Luz de patente delantera no enciende.',
				},
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
					label:
						'Luz de giro delantera izquierda no destella correctamente o su color no es ambar.',
				},
				{
					value: 'luzGirDelDer',
					label:
						'Luz de giro delantera derecha no  destella correctamente o su color no es ambar.',
				},
				{
					value: 'luzGirTraIzq',
					label:
						'Luz de giro trasera izquierda no destella correctamente o su color no es ambar.',
				},
				{
					value: 'luzGirTraDer',
					label:
						'Luz de giro trasera derecha no destella correctamente o su color no es ambar.',
				},
				{
					value: 'luzGirLatIzq',
					label:
						'Luz de giro lateral izquiera no destella correctamente o su color no es ambar.',
				},
				{
					value: 'luzGirLatDer',
					label:
						'Luz de giro lateral derecha no destella correctamente o su color no es ambar.',
				},
				{
					value: 'variosGuinDel',
					label:
						'Ambas luces de giro delanteras no destellan correctamente o su color no es ambar.',
				},
				{
					value: 'variosGuinTra',
					label:
						'Ambas luces de giro traseras no destellan correctamente o su color no es ambar.',
				},
			],
			luzRevSec: [
				{
					value: 'luzRevDes',
					label: 'Luz de reversa no funciona correctamente.',
				},
			],
			falloGen: [
				{
					value: 'optTraIzq',
					label: 'Problemas de masa en óptica trasera izquierda.',
				},
				{
					value: 'optTraDer',
					label: 'Problemas de masa en óptica trasera derecha.',
				},
				{
					value: 'optDelIzq',
					label: 'Problemas de masa en óptica delantera izquierda.',
				},
				{
					value: 'optDelDer',
					label: 'Problemas de masa en óptica delantera derecha.',
				},
			],
		},
		ruedas: {
			auxilio: [
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
			],
			llantas: [
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
					value: 'parTraLla',
					label: 'Ambas llantas traseras en mal estado.',
				},
				{
					value: 'parDelLla',
					label: 'Ambas llantas delanteras en mal estado.',
				},
			],
			neumaticos: [
				{
					value: 'neuDelIzqMal',
					label:
						'Neumático delantero izquierdo en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
				{
					value: 'neuDelDerMal',
					label:
						'Neumático delantero derecho en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
				{
					value: 'neuTraIzqMal',
					label:
						'Neumático trasero izquierdo en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
				{
					value: 'neuTraDerMal',
					label:
						'Neumático trasero derecho en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
				{
					value: 'parTraNeu',
					label:
						'Ambos neumáticos traseros en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
				{
					value: 'parDelNeu',
					label:
						'Ambos neumáticos delanteros en mal estado. Los neumáticos deben ser idénticos en su eje.',
				},
			],
			fijaciones: [
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
		},
		acumDefectos: {
			acumDefectosSeccion: [
				{
					value: 'acumDefectosDesc',
					label: 'Decrementa estado de aptitud por acumulación de defectos.',
				},
			],
		},
		direccion: {
			alineacion: [
				{
					value: 'trenDelDesalin',
					label: 'Tren delantero desalineado.',
				},
				{
					value: 'trenTraDesalin',
					label: 'Tren trasero desalineado.',
				},
				{
					value: 'volanteDesalin',
					label: 'Volante desalineado con respecto a la caja de dirección.',
				},
			],
			extremosDeDireccion: [
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
				{
					value: 'guardaExtDirDer',
					label: 'Guardapolvo de extremo de dirección derecho en mal estado.',
				},
				{
					value: 'guardaExtDirIzq',
					label: 'Guardapolvo de extremo de dirección izquierdo en mal estado.',
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
		suspension: {
			rotulas: [
				{
					value: 'rotMazaSupIzq',
					label: 'Rótula maza delantera superior izquierda con holgura.',
				},
				{
					value: 'rotMazaSupDer',
					label: 'Rótula maza delantera superior derecha con holgura.',
				},
				{
					value: 'rotMazaInfIzq',
					label: 'Rótula maza delantera inferior izquierda con holgura.',
				},
				{
					value: 'rotMazaInfDer',
					label: 'Rótula maza delantera inferior derecha con holgura.',
				},
			],
			parrillas: [
				{
					value: 'bujeSusDel',
					label:
						'Bujes de ambas parrillas de suspensión delanteras en mal estado.',
				},
				{
					value: 'bujeSusTra',
					label:
						'Bujes de ambas parrillas de suspensión traseras en mal estado.',
				},
				{
					value: 'bujeSusDelIzq',
					label:
						'Buje de parrilla de suspensión delantera izquierda en mal estado.',
				},
				{
					value: 'bujeSusDelDer',
					label:
						'Buje de parrilla de suspensión delantera derecha en mal estado.',
				},
				{
					value: 'bujeSusTraIzq',
					label:
						'Buje de parrilla de suspensión trasera izquierda en mal estado.',
				},
				{
					value: 'bujeSusTraDer',
					label:
						'Buje de parrilla de suspensión trasera derecha en mal estado.',
				},
				{
					value: 'brazoPit',
					label: 'Brazo Pitman con holgura. Reemplazar y alinear.',
				},
			],
			amortiguadores: [
				{
					value: 'ambosEjeDel',
					label: 'Ambos amortiguadores delanteros defectuosos.',
				},
				{
					value: 'ambosEjeTra',
					label: 'Ambos amortiguadores traseros defectuosos.',
				},
				{
					value: 'bajoRendAmortDelIzq',
					label:
						'Amortiguador delantero izquierdo defectuoso (se recomienda cambiar el par).',
				},
				{
					value: 'bajoRendAmortDelDer',
					label:
						'Amortiguador delantero derecho defectuoso (se recomienda cambiar el par).',
				},
				{
					value: 'bajoRendAmortTraIzq',
					label:
						'Amortiguador trasero izquierdo defectuoso (se recomienda cambiar el par).',
				},
				{
					value: 'bajoRendAmortTraDer',
					label:
						'Amortiguador trasero derecho defectuoso (se recomienda cambiar el par).',
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
			barraEst: [
				{
					value: 'barEstDel',
					label: 'Barra estabilizadora delantera con defectos.',
				},
				{
					value: 'barEstTra',
					label: 'Barra estabilizadora trasera con defectos.',
				},
				{
					value: 'bujesBarEstDel',
					label:
						'Bujes y/o bieletas de barra estabilizadora delantera con defectos.',
				},
				{
					value: 'bujesBarEstTra',
					label:
						'Bujes y/o bieletas de barra estabilizadora trasera con defectos.',
				},
			],
			barraDir: [
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
			],
			trenTras: [
				{
					value: 'puenteTra',
					label: 'Puente trasero en mal estado.',
				},
				{
					value: 'bujeIzqTra',
					label: 'Buje izquierdo de puente trasero en mal estado.',
				},
				{
					value: 'bujeDerTra',
					label: 'Buje derecho de puente trasero en mal estado.',
				},
			],
			rodam: [
				{
					value: 'rodDelIzq',
					label: 'Rodamiento defectuoso rueda delantera izquierda.',
				},
				{
					value: 'rodDelDer',
					label: 'Rodamiento defectuoso rueda delantera derecha.',
				},
				{
					value: 'rodTraIzq',
					label: 'Rodamiento defectuoso rueda trasera izquierda.',
				},
				{
					value: 'rodTraDer',
					label: 'Rodamiento defectuoso rueda trasera derecha.',
				},
			],
		},
		freno: {
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
					label: 'Bajo rendimiento de freno de mano.',
				},
			],
			difDeFrenado: [
				{
					value: 'difFreDelRi',
					label: 'Eje delantero rueda izquierda frena menos.',
				},
				{
					value: 'difFreDelRd',
					label: 'Eje delantero Rueda derecha frena menos.',
				},
				{
					value: 'difFreTraRi',
					label: 'Eje trasero rueda izquierda frena menos (pedal).',
				},
				{
					value: 'difFreTraRd',
					label: 'Eje trasero rueda derecha frena menos (pedal).',
				},
				{
					value: 'difFreFdmRi',
					label: 'Freno de mano, eje trasero. Rueda izquierda frena menos.',
				},
				{
					value: 'difFreFdmRd',
					label: 'Freno de mano, eje trasero. Rueda derecha frena menos.',
				},
			],
			ruedaFrenada: [
				{
					value: 'rueFreDelIzq',
					label: 'Freno delantero izquierdo defectuoso.',
				},
				{
					value: 'rueFreDelDer',
					label: 'Freno delantero derecho defectuoso.',
				},
				{
					value: 'rueFreTraIzq',
					label: 'Freno trasero izquierdo defectuoso.',
				},
				{
					value: 'rueFreTraDer',
					label: 'Freno trasero derecho defectuoso.',
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
			fuerzaFren: [
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
			circHidr: [
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
					value: 'flexDelIzQ',
					label: 'Flexible de freno delantero izquierdo con defectos.',
				},
				{
					value: 'flexDelDer',
					label: 'Flexible de freno delantero derecho con defectos.',
				},
				{
					value: 'flexTraIzQ',
					label: 'Flexible de freno trasero izquierdo con defectos.',
				},
				{
					value: 'flexTraDer',
					label: 'Flexible de freno trasero derecho con defectos.',
				},
				{
					value: 'perdfluDelizq',
					label: 'Pérdida de líquido de freno en rueda delantera izquierda.',
				},
				{
					value: 'perdfluDelDer',
					label: 'Pérdida de líquido de freno en rueda delantera derecha.',
				},
				{
					value: 'perdfluTraizq',
					label: 'Pérdida de líquido de freno en rueda trasera izquierda.',
				},
				{
					value: 'perdfluTraDer',
					label: 'Pérdida de líquido de freno en rueda trasera derecha.',
				},
			],
			circNeu: [
				{
					value: 'cirNeuDelFre',
					label:
						'Circuito neumático delantero de sistema de frenado con defectos.',
				},
				{
					value: 'cirNeuTraFre',
					label:
						'Circuito neumático trasero de sistema de frenado con defectos.',
				},
				{
					value: 'flexDelIzQ',
					label: 'Flexible de freno delantero izquierdo con defectos.',
				},
				{
					value: 'flexDelDer',
					label: 'Flexible de freno delantero derecho con defectos.',
				},
				{
					value: 'flexTraIzQ',
					label: 'Flexible de freno trasero izquierdo con defectos.',
				},
				{
					value: 'flexTraDer',
					label: 'Flexible de freno trasero derecho con defectos.',
				},
			],
			frenMan: [
				{
					value: 'noTraba',
					label: 'Frenos de mano no traba.',
				},
				{
					value: 'regFrenMan',
					label: 'Regular freno de mano.',
				},
			],
		},
		emisiones: {
			gases: [
				{
					value: 'altoNivO2',
					label: 'Supera los límites permitidos de monóxido de carbono.',
				},
				{
					value: 'altoNivHco',
					label: 'Supera los límites permitidos de hidrocarburos.',
				},
				{
					value: 'altoNivOpa',
					label: 'Alto nivel de opacidad en emisiones.',
				},
			],
			ruido: [
				{
					value: 'altoNivConSon',
					label: 'Alto nivel de contaminación sonora.',
				},
			],
		},
		sistemaElectrico: {
			bocina: [
				{
					value: 'bocinaNo',
					label: 'Bocina no funciona.',
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
			testigos: [
				{
					value: 'insNoFunCor',
					label: 'Instrumental no funciona correctamente.',
				},
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
					value: 'luzTestControlTraccion',
					label: 'Luz testigo de control de tracción.',
				},
				{
					value: 'luzTestDirAsist',
					label: 'Luz testigo de dirección asistida.',
				},
				{
					value: 'luzTestCintSeg',
					label: 'Luz testigo de cinturones de seguridad.',
				},
				{
					value: 'luzTestNeumaticoDes',
					label: 'Luz testigo de neumático desinflado.',
				},
				{
					value: 'luzTestAirBag',
					label: 'Luz testigo de AIRBAG.',
				},
				{
					value: 'luzTestEPC',
					label: 'Luz testigo de EPC (Electronic Power Control).',
				},
				{
					value: 'luzTestBajoNivelFluido',
					label: 'Luz testigo de bajo nivel de fluido.',
				},
				{
					value: 'luzTestPastillasFreno',
					label: 'Luz testigo de desgaste de pastillas de freno.',
				},
			],
			limpiaParabrisas: [
				{
					value: 'limpiaparabrisas',
					label: 'No funciona sistema de limpiaparabrisas.',
				},
			],
		},
		inspVisual: {
			kit: [
				{
					value: 'kitSeguridad',
					label: 'Kit de seguridad incompleto.',
				},
				{
					value: 'matafuego',
					label: 'Carga de matafuegos vencida.',
				},
			],
			patentes: [
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
					value: 'cinDel2',
					label:
						'Todos los cinturones de seguridad delanteros defectuosos o faltantes.',
				},
				{
					value: 'cinTra2',
					label:
						'Todos los cinturones de seguridad traseros defectuosos o faltantes.',
				},
				{
					value: 'cinDelIzqDef',
					label: 'Delantero izquierdo defectuoso o faltante.',
				},
				{
					value: 'cinDelDerDef',
					label: 'Delantero derecho defectuoso o faltante.',
				},
				{
					value: 'cinTraIzqDef',
					label: 'Trasero izquierdo defectuoso o faltante.',
				},
				{
					value: 'cinTraDerDef',
					label: 'Trasero derecho defectuoso o faltante.',
				},
				{
					value: 'cinTraCenDef',
					label: 'Trasero central defectuoso o faltante.',
				},
				{
					value: 'cint2Tra',
					label: 'Cinturon trasero izquierdo o derecho de de dos puntos.',
				},
				{
					value: 'cint2Del',
					label: 'Cinturon delantero izquierdo o derecho de de dos puntos.',
				},
			],
			equipamiento: [
				{
					value: 'taponCombustible',
					label: 'Tapón de combustible no reglamentario o ausente.',
				},
				{
					value: 'bateria',
					label: 'Batería sin sujeción.',
				},
				{
					value: 'bateriaRota',
					label: 'Batería con defectos.',
				},
				{
					value: 'bateriaConex',
					label: 'Conexiones de batería con defectos.',
				},
				{
					value: 'butacaDI',
					label: 'Butaca delantera izquierda mal anclada o en mal estado.',
				},
				{
					value: 'butacaDD',
					label: 'Butaca delantera derecha mal anclada o en mal estado.',
				},
				{
					value: 'butacaT',
					label: 'Butaca trasera mal anclada o en mal estado.',
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
					label: 'Parabrisas obstruido por elementos adheridos al mismo.',
				},
				{
					value: 'apeVenDelIzqDef',
					label:
						'Sistema de apertura de ventanilla delantera izquierda defectuoso.',
				},
				{
					value: 'apeVenDelDerDef',
					label:
						'Sistema de apertura de ventanilla delantera derecha defectuoso.',
				},
				{
					value: 'apeVenTraIzqDef',
					label:
						'Sistema de apertura de ventanilla trasera izquierda defectuoso.',
				},
				{
					value: 'apeVenTraDerDef',
					label:
						'Sistema de apertura de ventanilla trasera derecha defectuoso.',
				},
			],
			paraGolpes: [
				{
					value: 'ancParDelIzqMal',
					label: 'Anclaje de paragolpes delantero izquierdo en mal estado.',
				},
				{
					value: 'ancParDelDerMal',
					label: 'Anclaje de paragolpes delantero derecho en mal estado.',
				},
				{
					value: 'ancParTraIzqMal',
					label: 'Anclaje de paragolpes trasero izquierdo en mal estado.',
				},
				{
					value: 'ancParTraDerMal',
					label: 'Anclaje de paragolpes trasero derecho en mal estado.',
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
					label: 'Espejo exterior derecho no funcional.',
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
				{
					value: 'optLatDer',
					label: 'Óptica laterla derecha en mal estado.',
				},
				{
					value: 'optLatIzq',
					label: 'Óptica laterla izquierda en mal estado.',
				},
				{
					value: 'farLatDer',
					label:
						'Fáro de posición lateral derecho en mal estado (vehículo pesado).',
				},
				{
					value: 'farLatizq',
					label:
						'Fáro de posición lateral izquierdo en mal estado (vehículo pesado).',
				},
			],
			altura: [
				{
					value: 'alturaAum',
					label: 'Altura del vehículo aumentada.',
				},
				{
					value: 'alturaDis',
					label: 'Altura del vehículo disminuida.',
				},
			],
			protPasiva: [
				{
					value: 'sinTabique',
					label: 'Sin tabique divisor.',
				},
				{
					value: 'headDelIzq',
					label: 'Apoyacabezas delantero izquierdo en mal estado o faltante.',
				},
				{
					value: 'headTraIzq',
					label: 'Apoyacabezas trasero izquierdo en mal estado o faltante.',
				},
				{
					value: 'headDelDer',
					label: 'Apoyacabezas delantero derecho en mal estado o faltante.',
				},
				{
					value: 'headTraDer',
					label: 'Apoyacabezas trasero derecho en mal estado o faltante.',
				},
				{
					value: 'headTraCen',
					label: 'Apoyacabezas trasero central en mal estado o faltante.',
				},
				{
					value: 'headTraNo',
					label: 'Sin apoyacabezas traseros.',
				},
				{
					value: 'doorPanelDI',
					label:
						'Panel de puerta delantero izquierdo en mal estado o faltante.',
				},
				{
					value: 'doorPanelDD',
					label: 'Panel de puerta delantero derecho en mal estado o faltante.',
				},
				{
					value: 'doorPanelTI',
					label: 'Panel de puerta trasero izquierdo en mal estado o faltante.',
				},
				{
					value: 'doorPanelTD',
					label: 'Panel de puerta trasero derecho en mal estado o faltante.',
				},
			],
			airBag: [
				{
					value: 'airDet',
					label: 'AIRBAG detonado.',
				},
			],
			carroceria: [
				{
					value: 'adiNoRegCar',
					label: 'Aditamento no reglamentario en la carrocería.',
				},
				{
					value: 'adiFueLinPar',
					label:
						'Aditamento en el vehículo fuera de la línea de los paragolpes.',
				},
				{
					value: 'cintaRefFront',
					label:
						'Cinta reflectiva frontal color blanco, bajo ópticas faltante o en mal estado (camionetas).',
				},
				{
					value: 'cintaRefLat',
					label:
						'Cinta reflectiva lateral color blanco, dos partes de 50cm adelante y atrás faltante o en mal estado.',
				},
				{
					value: 'cintaRefTra',
					label:
						'Cinta reflectiva trasera color rojo (camionetas), dos partes de 50cm a cada lado faltante o en mal estado.',
				},
				{
					value: 'cintaRefTraCamiones',
					label:
						'Cinta reflectiva trasera cebrada a 45° R/B (camiones), dos partes de 50cm a cada lado faltante o en mal estado.',
				},
				{
					value: 'discoVelMax',
					label:
						'Disco de velocidad máxima faltante o en mal estado. Camionetas (110), combi carga (90), camiones (80).',
				},
			],
			opennings: [
				{
					value: 'pDelIzq',
					label: 'Puerta delantera izquierda no abre o cierra correctamente.',
				},
				{
					value: 'pTraIzq',
					label: 'Puerta trasera izquierda no abre o cierra correctamente.',
				},
				{
					value: 'pDelDer',
					label: 'Puerta delantera derecha no abre o cierra correctamente.',
				},
				{
					value: 'pTraDer',
					label: 'Puerta trasera derecha no abre o cierra correctamente.',
				},
				{
					value: 'baul',
					label: 'Portón trasero o tapa baúl no abre o cierra correctamente.',
				},
				{
					value: 'capo',
					label: 'Capó no abre o cierra correctamente.',
				},
			],
		},
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
				{
					value: 'perAcIndef',
					label: 'Pérdida de aceite indefinida.',
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
			transmision: [
				{
					value: 'homoIzq',
					label: 'Homocinética delantera izquierda con holgura.',
				},
				{
					value: 'homoDer',
					label: 'Homocinética delantera derecha con holgura.',
				},
				{
					value: 'protCardDel',
					label: 'Protección para caida de cardan delantero.',
				},
				{
					value: 'protCardTra',
					label: 'Protección para caida de cardan trasero.',
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
			],
			patasMotor: [
				{
					value: 'pataBlanda',
					label: 'Blandas.',
				},
				{
					value: 'pataMala',
					label: 'Con holgura o en mal estado.',
				},
			],
		},
	},
};

export {autoArray};
