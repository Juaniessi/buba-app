/*
 * =============================================================================
 *  radioBtnDB.js — Opciones de los botones del formulario
 * =============================================================================
 *
 *  Cada lista tiene las opciones de un grupo de botones (radio buttons):
 *    - value:   el valor que usa el código (por ejemplo 'Camion').
 *    - label:   el texto que se ve en pantalla (por ejemplo 'Camión').
 *    - tooltip: (solo vigencias) la ayuda que aparece al pasar el mouse.
 *    - order / class: (solo severidades) orden en la lista de defectos y color.
 *
 *  Listas:
 *    type               tipo de vehículo
 *    severity           severidad del defecto (Leve, Moderado, Grave)
 *    engineType         motor de moto (4 o 2 tiempos)
 *    truckSize          tamaño de camión / colectivo
 *    transmisionType    tracción de auto / camioneta (4x2 o 4x4)
 *    rtoType            RTO particular o transporte de pasajeros
 *    dateCalc           resultado (Apto, Condicional, Rechazado, Solo informe)
 *    selectValidity     vigencias posibles en RTO particular
 *    selectValidityTra  vigencias posibles en transporte de pasajeros
 *
 *  Ojo: los value se usan también como id de los botones en la página, así que
 *  no conviene repetirlos entre listas distintas.
 *
 * =============================================================================
 */
const radioGeneratorArray = {
	type: [
		{
			value: 'Auto',
			label: 'Auto',
		},
		{
			value: 'Camioneta',
			label: 'Camioneta',
		},
		{
			value: 'Camion',
			label: 'Camión',
		},
		{
			value: 'Minibus',
			label: 'Colectivo',
		},
		{
			value: 'Moto',
			label: 'Moto',
		},
	],
	severity: [
		{
			value: 'Leve',
			label: 'Leve',
			order: 1,
			class: 'yellow',
		},
		{
			value: 'Moderado',
			label: 'Moderado',
			order: 2,
			class: 'orange',
		},
		{
			value: 'Grave',
			label: 'Grave',
			order: 3,
			class: 'black',
		},
	],
	engineType: [
		{
			value: '4T',
			label: 'Motor 4 tiempos',
		},
		{
			value: '2T',
			label: 'Motor 2 tiempos',
		},
	],
	truckSize: [
		{
			value: 'smallTruck',
			label: 'Normal',
		},
		{
			value: 'bigTruck',
			label: 'No susp. ni Rueda frenada',
		},
	],
	transmisionType: [
		{
			value: '4x2',
			label: 'Normal',
		},
		{
			value: '4x4',
			label: 'Integral (ignora resistencia de F.)',
		},
	],
	rtoType: [
		{
			value: 'particular',
			label: 'Particular',
		},
		{
			value: 'traPas',
			label: 'Transporte de Pasajeros',
		},
	],
	dateCalc: [
		{
			value: 'Apto',
			label: 'Apto',
		},
		{
			value: 'Condicional',
			label: 'Condicional',
		},
		{
			value: 'Rechazado',
			label: 'Rechazado',
		},
		{
			value: 'SoloInforme',
			label: 'Solo informe',
		},
	],
	selectValidity: [
		{
			value: '2a',
			label: '2 A',
			tooltip: '7 Años o menos',
		},
		{
			value: '1a',
			label: '1 A',
			tooltip: 'APTO',
		},
		{
			value: '6m',
			label: '6 M',
			tooltip: 'Plataforma digital',
		},
	],
	selectValidityTra: [
		{
			value: '1a',
			label: '1 A',
			tooltip: '1era revisión y 0km',
		},
		{
			value: '6m',
			label: '6 M',
			tooltip: 'Col. Urbano',
		},
		{
			value: '3m',
			label: '3 M',
			tooltip: 'APTO o Col. Urbano >10 años',
		},
		{
			value: '2m',
			label: '2 M',
			tooltip: 'Más de 10 años',
		},
	],
};

export {radioGeneratorArray};
