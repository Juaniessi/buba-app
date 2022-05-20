const minorOrEqArray = new Map([
	['susp', [10, 40, 60]],
	['brakePerf', [10, 40, 50]],
	['handBrakePerf', [1, 14.4, 17]],
	['brakeStrenght', [0.1, 0.3, 0.99]],
]);

const majorOrEqArray = new Map([
	['brakeDif', [50, 15, 12]],
	['brakeResist', [2, 1, 0.5]],
	['brakeOval', [80, 30, 16]],
	['luxLow', [200, 27, 26]],
	['luxHigh', [200, 150, 65]],
	['luxAng', [15, 7, 5]],
	['opacity', [2, 0.25, 0.2]],
	['HC<=1991', [2500, 900, 600]],
	['HC<=1994', [2500, 600, 400]],
	['HC>1994', [2500, 400, 300]],
	['CO<=1991', [10, 4.5, 3.5]],
	['CO<=1994', [10, 3, 2]],
	['CO>1994', [10, 2.5, 2]],
	['noiseAutoMotoViejo', [100, 88.1, 80]],
	['noiseAutoMotoNuevo', [100, 83.1, 80]],
	['noiseCamionViejo', [100, 95.1, 85]],
	['noiseCamionNuevo', [100, 87, 84]],
]);

export function minorOrEqual(txtProp, paramSelector) {
	let params = minorOrEqArray.get(paramSelector);
	let severityEvaluation = '';
	let severityLetter = '';
	if (txtProp <= params[0]) {
		severityEvaluation = 'severe';
		severityLetter = 'G';
	} else if (txtProp <= params[1]) {
		severityEvaluation = 'moderate';
		severityLetter = 'M';
	} else if (txtProp <= params[2]) {
		severityEvaluation = 'minor';
		severityLetter = 'L';
	} else {
		severityEvaluation = '';
		severityLetter = 'A';
	}

	return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
}

export function majorOrEqual(txtProp, paramSelector) {
	let params = majorOrEqArray.get(paramSelector);
	let severityEvaluation = '';
	let severityLetter = '';
	if (txtProp >= params[0]) {
		severityEvaluation = 'severe';
		severityLetter = 'G';
	} else if (txtProp >= params[1]) {
		severityEvaluation = 'moderate';
		severityLetter = 'M';
	} else if (txtProp >= params[2]) {
		severityEvaluation = 'minor';
		severityLetter = 'L';
	} else {
		severityEvaluation = '';
		severityLetter = 'A';
	}

	return <span className={`${severityEvaluation}`}>{severityLetter}</span>;
}
