const minorOrEqArray = new Map([
	['susp', [10, 40, 60]],
	['brakePerf', [10, 40, 50]],
	['handBrakePerf', [1, 14.4, 17]],
	['brakeStrenght', [0.1, 0.3, 0.99]],
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
