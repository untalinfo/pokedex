import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import sass from 'sass';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig(() => {
	return {
		build: {
			outDir: 'build',
		},
		css: {
			preprocessorOptions: {
				sass: {
					implementation: sass, // Usa el paquete sass para compilar tus estilos
				},
			},
		},
		define: {
			'process.env': process.env,
		},
		envPrefix: 'REACT_APP_',
		optimizeDeps: {
			esbuildOptions: {
				// Node.js global to browser globalThis
				define: {
					global: 'globalThis',
				},
			},
		},
		plugins: [react(), envCompatible(), eslint(), legacy({
			targets: ['defaults', 'not IE 11'],
		})],
		resolve: {
			extensions: ['.js', '.jsx', 'json'],
		},
		server: {
			port: process.env.PORT || 3000,
			host: true
		},
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: './src/setupTests.js',
		},
	};
});
