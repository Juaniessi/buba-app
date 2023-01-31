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
	],
	extendDueDate: [
		{
			value: '1a',
			label: '1 año',
		},
		{
			value: '2a',
			label: '2 años',
		},
		{
			value: '6m',
			label: '6 meses',
		},
	],
};

export {radioGeneratorArray};
