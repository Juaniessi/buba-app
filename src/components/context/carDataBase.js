/*GRUPOS*/

const group = [
	'Suspensión',
	'Frenos',
	'Emisiones',
	'Sistema Eléctrico',
	'Inspección Visual',
	'Inspección de Fosa',
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
