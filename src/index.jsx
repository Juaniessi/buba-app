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
import './styles/style.css';
import App from './App';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
