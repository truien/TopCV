import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Path from 'path';
import { fileURLToPath } from 'url';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': Path.resolve(__dirname, 'src'),
            '@components': Path.resolve(__dirname, 'src/components'),
            '@images': Path.resolve(__dirname, 'src/assets/images'),
        },
    },
});
