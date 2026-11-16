/*
 * Configuración de Vite (compila la app y levanta el servidor de desarrollo)
 * y de Vitest (corre los tests automáticos de la carpeta tests/).
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	// La app se publica en https://juaniessi.github.io/buba-app/
	base: '/buba-app/',
	build: {
		// Misma carpeta que usaba react-scripts, para que `npm run deploy` no cambie
		outDir: 'build',
	},
	server: {
		port: 3000,
		open: true,
	},
	// https://vitest.dev/config/
	test: {
		include: ['tests/**/*.test.{js,jsx}'],
		// Los .txt traen fechas sin zona horaria. Fijamos la de Argentina para
		// que los tests den lo mismo en cualquier PC (y en GitHub, si algún
		// día se corren ahí).
		env: { TZ: 'America/Argentina/Buenos_Aires' },
	},
});
