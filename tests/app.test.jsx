// @vitest-environment jsdom
/*
 * =============================================================================
 *  Tests de la app completa: se usa como lo haría una persona
 * =============================================================================
 *
 *  La línea de arriba (@vitest-environment jsdom) le pide a Vitest un
 *  "navegador simulado" (jsdom), porque acá se dibuja la app de verdad con
 *  React y se le hacen clics.
 *
 *  Cada test arma una situación (tipo de vehículo, resultado, .txt cargado,
 *  defectos agregados) y guarda el HTML resultante como snapshot. Si un
 *  cambio en el código altera lo que se ve en pantalla, el test falla y
 *  muestra exactamente qué cambió. Ver tests/fileAnalizer.test.js para saber
 *  cómo actualizar los snapshots cuando un cambio es intencional.
 *
 *  Detalles:
 *    - La fecha se fija en el 15/06/2026 para que el cálculo de vencimiento y
 *      la antigüedad del vehículo no cambien según el día en que se corra.
 *    - Las imágenes no se dibujan: en los tests cada import de imagen es solo
 *      un texto con su ruta.
 * =============================================================================
 */
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import App from '../src/App.jsx';

beforeEach(() => {
	// Solo "congelamos" la fecha; los temporizadores siguen andando normales.
	vi.useFakeTimers({ toFake: ['Date'], now: new Date('2026-06-15T12:00:00-03:00') });
	// La app escribe varios console.log de depuración: los silenciamos.
	vi.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
	cleanup(); // desmonta la app entre test y test
	vi.useRealTimers();
	vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
//  Ayudantes: acciones de "usuario" reutilizables
// ---------------------------------------------------------------------------

/** Dibuja la app y devuelve el contenedor donde quedó. */
function abrirApp() {
	return render(<App />).container;
}

/**
 * Hace clic en un botón de opción (radio) por su id. Los ids son los valores
 * de src/components/dataArrays/radioBtnDB.js: 'Moto', 'Camion', 'Rechazado'...
 */
function elegir(contenedor, id) {
	const opcion = contenedor.querySelector(`input[id="${id}"]`);
	if (!opcion) throw new Error(`No existe la opción con id "${id}"`);
	fireEvent.click(opcion);
}

/**
 * Carga uno de los .txt de tests/fixtures/ en "Seleccione archivo txt" y
 * espera a que la patente aparezca en pantalla.
 */
async function cargarTxt(contenedor, nombre, patente) {
	// Ruta desde la raíz del proyecto (donde se corre `npm test`).
	const contenido = readFileSync(resolve('tests/fixtures', nombre));
	const archivo = new File([contenido], nombre, { type: 'text/plain' });
	const input = contenedor.querySelector('#file-input');
	fireEvent.change(input, { target: { files: [archivo] } });
	await waitFor(() => expect(contenedor.textContent).toContain(patente));
}

/**
 * Agrega un defecto a la lista eligiendo, en orden, la severidad, el grupo,
 * la sección y la descripción (por posición, empezando en 0).
 */
function agregarDefecto(contenedor, { severidad, grupo, seccion, descripcion }) {
	const radio = (name, i) => contenedor.querySelectorAll(`input[name="${name}"]`)[i];
	fireEvent.click(radio('severity', severidad));
	fireEvent.click(radio('group', grupo));
	fireEvent.click(radio('section', seccion));
	fireEvent.click(radio('description', descripcion));
	fireEvent.click(contenedor.querySelector('.send-btn'));
}

// ---------------------------------------------------------------------------
//  Tests
// ---------------------------------------------------------------------------

describe('pantalla inicial', () => {
	test('sin archivo cargado (snapshot)', () => {
		expect(abrirApp().innerHTML).toMatchSnapshot();
	});

	test.each(['Moto', 'Camion', 'Minibus', 'Camioneta'])(
		'tipo de vehículo %s sin archivo (snapshot)',
		(tipo) => {
			const app = abrirApp();
			elegir(app, tipo);
			expect(app.innerHTML).toMatchSnapshot();
		}
	);
});

describe('informe con .txt cargado', () => {
	test('auto con KMX-653, resultado automático (snapshot)', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		expect(app.innerHTML).toMatchSnapshot();
	});

	test.each(['Condicional', 'Rechazado'])('auto con KMX-653, %s (snapshot)', async (resultado) => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		elegir(app, resultado);
		expect(app.innerHTML).toMatchSnapshot();
	});

	test('transporte de pasajeros con KMX-653 (snapshot)', async () => {
		const app = abrirApp();
		elegir(app, 'traPas');
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		expect(app.innerHTML).toMatchSnapshot();
	});

	test('camión con VCW-112 (snapshot)', async () => {
		const app = abrirApp();
		elegir(app, 'Camion');
		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(app.innerHTML).toMatchSnapshot();
	});

	test('moto con VCW-112 (snapshot)', async () => {
		const app = abrirApp();
		elegir(app, 'Moto');
		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(app.innerHTML).toMatchSnapshot();
	});

	test('cargar otro archivo reemplaza al anterior', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(app.textContent).not.toContain('KMX-653');
	});
});

describe('opciones del formulario', () => {
	test('transporte de pasajeros propone 3 meses de vigencia, y la particular 1 año', () => {
		const app = abrirApp();
		const vigenciaElegida = () =>
			app.querySelector('input[name="dueDateSelector"]:checked')?.id;

		expect(vigenciaElegida()).toBe('1a');
		elegir(app, 'traPas');
		expect(vigenciaElegida()).toBe('3m');
		elegir(app, 'particular');
		expect(vigenciaElegida()).toBe('1a');
	});

	test('la vigencia solo se puede elegir si el resultado es Apto', () => {
		const app = abrirApp();
		const vigencias = () => [...app.querySelectorAll('input[name="dueDateSelector"]')];

		expect(vigencias().every((v) => !v.disabled)).toBe(true);
		elegir(app, 'Condicional');
		expect(vigencias().every((v) => v.disabled)).toBe(true);
	});
});

describe('botón "Imprimir informe"', () => {
	/**
	 * Reemplaza window.print y el portapapeles por versiones de prueba, que
	 * solo registran si se usaron. `copiaFalla` simula que el navegador no da
	 * permiso para copiar.
	 */
	function prepararImpresion({ copiaFalla = false } = {}) {
		const imprimir = vi.spyOn(window, 'print').mockImplementation(() => {});
		const copiar = vi.fn(() =>
			copiaFalla ? Promise.reject(new Error('sin permiso')) : Promise.resolve()
		);
		Object.defineProperty(navigator, 'clipboard', {
			value: { writeText: copiar },
			configurable: true,
		});
		vi.spyOn(console, 'error').mockImplementation(() => {});
		return { imprimir, copiar };
	}

	test('sin .txt cargado, imprime igual', () => {
		// Antes, sin .txt, el botón no hacía nada.
		const { imprimir, copiar } = prepararImpresion();
		const app = abrirApp();
		fireEvent.click(app.querySelector('#print-btn'));
		expect(imprimir).toHaveBeenCalledTimes(1);
		expect(copiar).not.toHaveBeenCalled();
	});

	test('con .txt, copia la patente y después imprime', async () => {
		const { imprimir, copiar } = prepararImpresion();
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		fireEvent.click(app.querySelector('#print-btn'));
		expect(copiar).toHaveBeenCalledWith('KMX-653');
		await waitFor(() => expect(imprimir).toHaveBeenCalledTimes(1));
	});

	test('si no se puede copiar la patente, imprime igual', async () => {
		// Antes, si el navegador no daba permiso para copiar, no imprimía.
		const { imprimir } = prepararImpresion({ copiaFalla: true });
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		fireEvent.click(app.querySelector('#print-btn'));
		await waitFor(() => expect(imprimir).toHaveBeenCalledTimes(1));
	});
});

describe('botón "Reiniciar todos los campos"', () => {
	test('deja la pantalla exactamente como al abrir la app', async () => {
		// Cómo se ve la app recién abierta, para comparar.
		const pantallaInicial = abrirApp().innerHTML;
		cleanup();

		// Cambiamos todo lo que se puede cambiar...
		const app = abrirApp();
		elegir(app, 'Camioneta');
		elegir(app, '4x4');
		elegir(app, 'traPas');
		elegir(app, 'Rechazado');
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 2, grupo: 0, seccion: 0, descripcion: 0 });
		fireEvent.click(app.querySelectorAll('input[name="severity"]')[1]);
		fireEvent.change(app.querySelector('#unlisted-defect'), {
			target: { value: 'Texto a medio escribir' },
		});

		// ...y reiniciamos.
		fireEvent.click(app.querySelector('#reset-btn'));

		expect(app.innerHTML).toBe(pantallaInicial);
		// El texto de un <textarea> no aparece en innerHTML: lo revisamos aparte.
		// (Antes de este cambio, "Reiniciar" no lo borraba.)
		expect(app.querySelector('#unlisted-defect').value).toBe('');
		expect(app.querySelector('#file-input').value).toBe('');
	});
});

describe('resultado de la RTO automático', () => {
	/** El resultado que está marcado y el que sale impreso. */
	const marcado = (app) => app.querySelector('input[name="dateCalcBtn"]:checked')?.id;
	const impreso = (app) => app.querySelector('.result-rto').textContent;

	test('sigue a los defectos: Moderado → Condicional, Grave → Rechazado', async () => {
		const app = abrirApp();
		expect(app.querySelector('#resultado-automatico').checked).toBe(true);
		expect(marcado(app)).toBe('Apto'); // sin defectos

		// VCW-112 como moto: solo una observación Leve → sigue Apto.
		elegir(app, 'Moto');
		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(marcado(app)).toBe('Apto');

		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 }); // Moderado
		expect(marcado(app)).toBe('Condicional');
		expect(impreso(app)).toBe('Resultado RTO: Condicional');

		agregarDefecto(app, { severidad: 2, grupo: 1, seccion: 0, descripcion: 0 }); // Grave
		expect(marcado(app)).toBe('Rechazado');

		// Al quitar el grave vuelve a Condicional.
		const filas = [...app.querySelectorAll('.lista-final tr.item-lista')];
		const grave = filas.find((tr) => tr.querySelector('.severidad-col').textContent === 'Grave');
		fireEvent.click(grave.querySelector('.erase-btn'));
		expect(marcado(app)).toBe('Condicional');
	});

	test('cambiar la severidad de un defecto también cambia el resultado', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653'); // trae dos Moderado automáticos
		expect(marcado(app)).toBe('Condicional');
		// La tabla se reordena después de cada cambio: se busca de nuevo cada vez.
		const moderado = () => [...app.querySelectorAll('.severidad-select')].find((s) => s.value === 'Moderado');
		while (moderado()) fireEvent.change(moderado(), { target: { value: 'Leve' } });
		expect(marcado(app)).toBe('Apto');
	});

	test('elegir un resultado a mano lo pasa a manual, y ahí queda fijo', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		elegir(app, 'SoloInforme');
		expect(app.querySelector('#resultado-automatico').checked).toBe(false);
		expect(marcado(app)).toBe('SoloInforme');

		// Agregar un Grave ya no lo mueve.
		agregarDefecto(app, { severidad: 2, grupo: 0, seccion: 0, descripcion: 0 });
		expect(marcado(app)).toBe('SoloInforme');

		// Volver a tildar "Automático" recalcula.
		fireEvent.click(app.querySelector('#resultado-automatico'));
		expect(marcado(app)).toBe('Rechazado');
	});

	test('destildar "Automático" deja fijo el resultado que había', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		fireEvent.click(app.querySelector('#resultado-automatico'));
		expect(marcado(app)).toBe('Condicional');
		// La tabla se reordena después de cada cambio: se busca de nuevo cada vez.
		const moderado = () => [...app.querySelectorAll('.severidad-select')].find((s) => s.value === 'Moderado');
		while (moderado()) fireEvent.change(moderado(), { target: { value: 'Leve' } });
		expect(marcado(app)).toBe('Condicional'); // no se movió
	});

	test('las automáticas ocultas con el filtro no cuentan', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		expect(marcado(app)).toBe('Condicional');
		fireEvent.click(app.querySelector('#mostrar-automaticas'));
		expect(marcado(app)).toBe('Apto');
	});

	test('Reiniciar vuelve a automático', async () => {
		const app = abrirApp();
		elegir(app, 'Rechazado');
		fireEvent.click(app.querySelector('#reset-btn'));
		expect(app.querySelector('#resultado-automatico').checked).toBe(true);
		expect(marcado(app)).toBe('Apto');
	});
});

describe('vigencia automática (RTO particular)', () => {
	const vigenciaMarcada = (app) => app.querySelector('input[name="dueDateSelector"]:checked')?.id ?? null;
	const aviso = (app) => app.querySelector('#aviso-vigencia');
	const vence = (app) => app.querySelector('.end-date').textContent;

	test('se calcula por la patente: KMX-653 (2011) tiene más de 7 años → 1 año', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		elegir(app, 'Apto'); // KMX-653 sale Condicional por sus defectos; lo pasamos a Apto
		expect(vigenciaMarcada(app)).toBe('1a');
		expect(app.querySelector('#vigencia-automatica').checked).toBe(true);
		expect(aviso(app).className).toContain('info');
		expect(aviso(app).textContent).toContain('más de 7 años');
		expect(vence(app)).toBe('8/7/2023');
	});

	test('patente que no está en la tabla: aviso, ninguna marcada y sin vencimiento', async () => {
		const app = abrirApp();
		elegir(app, 'Moto');
		await cargarTxt(app, 'VCW-112.txt', 'VCW-112'); // sale Apto; "VC" no está en la tabla
		expect(vigenciaMarcada(app)).toBeNull();
		expect(aviso(app).className).toContain('alerta');
		expect(aviso(app).textContent).toContain('no está en la tabla de patentes');
		expect(app.querySelectorAll('.falta-elegir')).toHaveLength(3);
		expect(vence(app)).toBe('');

		// Al elegirla a mano, pasa a manual y aparece el vencimiento.
		elegir(app, '2a');
		expect(vigenciaMarcada(app)).toBe('2a');
		expect(app.querySelector('#vigencia-automatica').checked).toBe(false);
		expect(aviso(app).textContent).toBe('Vigencia elegida a mano.');
		expect(vence(app)).toBe('13/9/2024');
	});

	test('destildar "Automática" la deja fija y avisa qué daba la automática', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		elegir(app, 'Apto');
		fireEvent.click(app.querySelector('#vigencia-automatica'));
		expect(vigenciaMarcada(app)).toBe('1a');
		expect(aviso(app).className).toContain('manual');
		expect(aviso(app).textContent).toBe('Vigencia elegida a mano. La automática daba 1 año.');
	});

	test('en transporte de pasajeros no hay vigencia automática', async () => {
		const app = abrirApp();
		elegir(app, 'traPas');
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		elegir(app, 'Apto');
		expect(app.querySelector('#vigencia-automatica')).toBeNull();
		expect(aviso(app)).toBeNull();
		expect(vigenciaMarcada(app)).toBe('3m');
	});

	test('sin resultado Apto, no hay aviso de vigencia', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653'); // Condicional
		expect(aviso(app)).toBeNull();
	});
});

describe('observaciones automáticas', () => {
	const AUTO = '.lista-final tr[data-automatica="si"]';
	const MANUAL = '.lista-final tr[data-automatica="no"]';
	const descripciones = (app, filas) =>
		[...app.querySelectorAll(`${filas} .descripcion-col`)].map((td) => td.textContent);

	test('al cargar el .txt aparecen solas, con la marca "auto"', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		expect(descripciones(app, AUTO)).toEqual([
			'Eje trasero rueda derecha frena menos (pedal).',
			'Freno de mano, eje trasero. Rueda derecha frena menos.',
		]);
		expect(app.querySelectorAll(`${AUTO} .marca-auto`)).toHaveLength(2);
		expect(app.querySelectorAll(`${MANUAL} .marca-auto`)).toHaveLength(0);
	});

	test('el filtro las oculta sin borrarlas, y las manuales siguen', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 0, grupo: 0, seccion: 0, descripcion: 0 });
		const filtro = app.querySelector('#mostrar-automaticas');
		expect(filtro.checked).toBe(true); // tildado por defecto

		fireEvent.click(filtro);
		expect(app.querySelectorAll(AUTO)).toHaveLength(0);
		expect(app.querySelectorAll(MANUAL)).toHaveLength(1);

		fireEvent.click(filtro);
		expect(app.querySelectorAll(AUTO)).toHaveLength(2);
	});

	test('Regenerar: pide confirmación y recupera las automáticas, sin tocar las manuales', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 0, grupo: 0, seccion: 0, descripcion: 0 });
		// Se borra una automática por error y a otra se le cambia la severidad.
		fireEvent.click(app.querySelector(`${AUTO} .erase-btn`));
		fireEvent.change(app.querySelector(`${AUTO} .severidad-select`), { target: { value: 'Leve' } });
		expect(app.querySelectorAll(AUTO)).toHaveLength(1);

		// Si se cancela el aviso, no cambia nada.
		const confirmar = vi.spyOn(window, 'confirm').mockReturnValue(false);
		fireEvent.click(app.querySelector('#regenerar-btn'));
		expect(confirmar).toHaveBeenCalledTimes(1);
		expect(confirmar.mock.calls[0][0]).toContain('revisá las severidades');
		expect(app.querySelectorAll(AUTO)).toHaveLength(1);

		// Si se acepta, vuelven las dos, con su severidad calculada.
		confirmar.mockReturnValue(true);
		fireEvent.click(app.querySelector('#regenerar-btn'));
		expect(app.querySelectorAll(AUTO)).toHaveLength(2);
		expect([...app.querySelectorAll(`${AUTO} .severidad-col`)].map((td) => td.textContent)).toEqual([
			'Moderado',
			'Moderado',
		]);
		expect(app.querySelectorAll(MANUAL)).toHaveLength(1); // la manual sigue
	});

	test('"Filtrar frases automáticas" (tildado por defecto) saca solo las frases, no grupos ni secciones', () => {
		const app = abrirApp();
		const opciones = (name) =>
			[...app.querySelectorAll(`input[name="${name}"]`)].map((i) => i.parentElement.textContent.trim());
		const filtro = app.querySelector('#filtrar-frases-automaticas');
		expect(filtro.checked).toBe(true);

		// Emisiones sigue estando aunque todas sus frases sean automáticas:
		// en Ruido queda "Otros" para informar cualquier otra cosa.
		expect(opciones('group')).toContain('Emisiones');
		fireEvent.click(app.querySelector('input[id="emisiones"]'));
		expect(opciones('section')).toEqual(expect.arrayContaining(['Gases', 'Ruido']));
		fireEvent.click(app.querySelector('input[id="ruido"]'));
		expect(opciones('description')).toEqual(['Otros']);
		// En Frenos están todas las secciones, sin las frases automáticas.
		fireEvent.click(app.querySelector('input[id="freno"]'));
		expect(opciones('section')).toContain('Diferencia de frenado');
		expect(opciones('section')).toContain('Ovalidad o Alabebeo');
		fireEvent.click(app.querySelector('input[id="ovalAlab"]'));
		expect(opciones('description')).toContain('Disco de freno delantero izquierdo alabeado.');
		expect(opciones('description')).not.toContain('Ovalidad o alabeo en freno delantero izquierdo.');

		// Destildado, aparece todo.
		fireEvent.click(filtro);
		expect(opciones('description')).toContain('Ovalidad o alabeo en freno delantero izquierdo.');
	});

	test('en motos, la fuerza mínima no es automática: se sigue ofreciendo', () => {
		const app = abrirApp();
		elegir(app, 'Moto');
		fireEvent.click(app.querySelector('input[id="frenos"]'));
		const secciones = [...app.querySelectorAll('input[name="section"]')].map((i) => i.parentElement.textContent.trim());
		expect(secciones.some((s) => /fuerza/i.test(s))).toBe(true);
	});

	test('sin .txt, el botón Regenerar está deshabilitado', () => {
		const app = abrirApp();
		expect(app.querySelector('#regenerar-btn').disabled).toBe(true);
	});
});

describe('lista de defectos', () => {
	// Al cargar un .txt aparecen también observaciones automáticas. Estos tests
	// prueban la carga manual, así que miran solo las filas manuales.
	const M = '.lista-final tr[data-automatica="no"]';
	test('agregar tres defectos y borrar uno (snapshot)', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');

		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 });
		// Emisiones › Ruido › "Otros" (la frase de ruido es automática y no se ofrece).
		agregarDefecto(app, { severidad: 2, grupo: 2, seccion: 1, descripcion: 0 });
		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(2);

		// Un defecto "no listado": último grupo + texto libre.
		const grupos = app.querySelectorAll('input[name="group"]');
		fireEvent.click(grupos[grupos.length - 1]);
		fireEvent.change(app.querySelector('#unlisted-defect'), {
			target: { value: 'Defecto de prueba' },
		});
		fireEvent.click(app.querySelector('.send-btn'));
		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(3);
		expect(app.textContent).toContain('Defecto de prueba');
		expect(app.innerHTML).toMatchSnapshot('con 3 defectos');

		fireEvent.click(app.querySelector(`${M} .erase-btn`));
		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(2);
		expect(app.innerHTML).toMatchSnapshot('después de borrar uno');
	});

	test('la papelera borra el defecto de esa fila (la tabla va de grave a leve)', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		// Se cargan primero uno leve y después uno grave...
		agregarDefecto(app, { severidad: 0, grupo: 0, seccion: 0, descripcion: 0 });
		agregarDefecto(app, { severidad: 2, grupo: 1, seccion: 0, descripcion: 0 });
		const severidades = () =>
			[...app.querySelectorAll(`${M} .severidad-col`)].map((td) => td.textContent);
		// ...pero la tabla muestra primero el grave.
		expect(severidades()).toEqual(['Grave', 'Leve']);

		// Borrar la primera fila tiene que borrar el grave, no el primero cargado.
		fireEvent.click(app.querySelector(`${M} .erase-btn`));
		expect(severidades()).toEqual(['Leve']);
	});

	test('el selector cambia la severidad de esa fila y la tabla se reordena', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 0, grupo: 0, seccion: 0, descripcion: 0 }); // Leve
		agregarDefecto(app, { severidad: 1, grupo: 1, seccion: 0, descripcion: 0 }); // Moderado
		const severidades = () =>
			[...app.querySelectorAll(`${M} .severidad-col`)].map((td) => td.textContent);
		expect(severidades()).toEqual(['Moderado', 'Leve']);

		// La segunda fila (la leve) pasa a grave: tiene que subir al primer lugar.
		const selectores = app.querySelectorAll(`${M} .severidad-select`);
		expect(selectores[1].value).toBe('Leve');
		fireEvent.change(selectores[1], { target: { value: 'Grave' } });

		expect(severidades()).toEqual(['Grave', 'Moderado']);
		expect(app.querySelectorAll(`${M} .severidad-select`)[0].value).toBe('Grave');
	});

	test('las notas adicionales no tienen selector de severidad', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		fireEvent.click(app.querySelector('#note'));
		fireEvent.change(app.querySelector('#unlisted-defect'), { target: { value: 'Una nota' } });
		fireEvent.click(app.querySelector('.send-btn'));

		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(1);
		expect(app.querySelectorAll(`${M} .severidad-select`)).toHaveLength(0);
	});

	test('pasar de auto a moto borra el informe y los defectos', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 });

		elegir(app, 'Moto');

		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(0);
		expect(app.querySelector('.txtRenderAuto')).toBeNull();
	});

	test('cargar un .txt nuevo borra los defectos cargados a mano', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 });
		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(1);

		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(app.querySelectorAll(`${M} .erase-btn`)).toHaveLength(0);
	});
});
