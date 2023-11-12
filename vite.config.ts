import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	server: {
		port: 3003
	},
	plugins: [vue()],
	resolve: {
		alias: {
			'@': '/src'
		}
	},
	build: {
		target: 'esnext',
		outDir: 'dist',
		assetsDir: 'assets',
		manifest: true,
		minify: 'terser'
	}
})
