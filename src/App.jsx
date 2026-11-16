/*
 * =============================================================================
 *  App.jsx — Estructura general de la página
 * =============================================================================
 *
 *  La página es solo el título (Header) y el formulario con el informe (Main).
 *  Toda la lógica está en Main.jsx y sus componentes.
 *
 * =============================================================================
 */
import React from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
// Estilos del informe (posiciones de cada casillero sobre el dibujo).
import './styles/informeStyle.scss';

function App() {
	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}

export default App;
