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
			label: 'Minibus',
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
			label: 'Camión pequeño',
		},
		{
			value: 'bigTruck',
			label: 'Camión grande (No susp. ni Rueda frenada)',
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
			value: 'normal',
			label: 'Normal',
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
			tooltip: 'Colectivo de línea',
		},
		{
			value: '3m',
			label: '3 M',
			tooltip: 'APTO',
		},
		{
			value: '2m',
			label: '2 M',
			tooltip: 'Más de 10 años',
		},
	],
};

export {radioGeneratorArray};
