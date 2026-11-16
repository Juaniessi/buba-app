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
	test('auto con KMX-653, apto (snapshot)', async () => {
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

describe('lista de defectos', () => {
	test('agregar tres defectos y borrar uno (snapshot)', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');

		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 });
		agregarDefecto(app, { severidad: 2, grupo: 2, seccion: 1, descripcion: 1 });
		expect(app.querySelectorAll('.erase-btn')).toHaveLength(2);

		// Un defecto "no listado": último grupo + texto libre.
		const grupos = app.querySelectorAll('input[name="group"]');
		fireEvent.click(grupos[grupos.length - 1]);
		fireEvent.change(app.querySelector('#unlisted-defect'), {
			target: { value: 'Defecto de prueba' },
		});
		fireEvent.click(app.querySelector('.send-btn'));
		expect(app.querySelectorAll('.erase-btn')).toHaveLength(3);
		expect(app.textContent).toContain('Defecto de prueba');
		expect(app.innerHTML).toMatchSnapshot('con 3 defectos');

		fireEvent.click(app.querySelector('.erase-btn'));
		expect(app.querySelectorAll('.erase-btn')).toHaveLength(2);
		expect(app.innerHTML).toMatchSnapshot('después de borrar uno');
	});

	test('cargar un .txt nuevo vacía la lista de defectos', async () => {
		const app = abrirApp();
		await cargarTxt(app, 'KMX-653.txt', 'KMX-653');
		agregarDefecto(app, { severidad: 1, grupo: 0, seccion: 0, descripcion: 0 });
		expect(app.querySelectorAll('.erase-btn')).toHaveLength(1);

		await cargarTxt(app, 'VCW-112.txt', 'VCW-112');
		expect(app.querySelectorAll('.erase-btn')).toHaveLength(0);
	});
});
