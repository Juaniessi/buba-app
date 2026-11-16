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
});
