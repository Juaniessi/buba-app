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
			class: "yellow",
		},
		{
			value: 'Moderado',
			label: 'Moderado',
			order: 2,
			class: "orange",
		},
		{
			value: 'Grave',
			label: 'Grave',
			order: 3,
			class: "black",
		},
	],
	engineType: [
		{
			value: '4T',
			label: '4 Tiempos',
		},
		{
			value: '2T',
			label: '2 Tiempos',
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
};

export {radioGeneratorArray};
