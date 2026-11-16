/*
 * =============================================================================
 *  index.jsx — Punto de arranque de la app
 * =============================================================================
 *
 *  index.html carga este archivo, que dibuja <App /> dentro del <div id="root">.
 *  React.StrictMode solo afecta al modo desarrollo (npm start): hace chequeos
 *  extra y avisa en la consola si algo está mal usado. No cambia el sitio
 *  publicado.
 *
 * =============================================================================
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
// Estilos generales. Van antes que App para que el orden del CSS final sea
// el mismo de siempre (generales → asteriscos → informe).
import './styles/style.scss';
import App from './App';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
