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
import './styles/style.css';
import './styles/informeStyle.css';

function App() {
	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}

export default App;
