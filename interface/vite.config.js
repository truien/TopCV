import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Path from 'path';
import { fileURLToPath } from 'url';

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    css: {
        additionalData: '@import "tippy.js/dist/tippy.css";', 
        },
    plugins: [react()],
    resolve: {
        alias: {
            '@': Path.resolve(__dirname, 'src'),
            '@components': Path.resolve(__dirname, 'src/components'),
            '@layouts': Path.resolve(__dirname, 'src/layouts'),
            '@images': Path.resolve(__dirname, 'src/assets/images'),
            '@adminlayout': Path.resolve(__dirname, 'src/components/AdminLayout'),
            '@employerlayout': Path.resolve(__dirname, 'src/components/Employer'),
            '@mainlayout': Path.resolve(__dirname, 'src/components/MainLayout'),
            '@hooks': Path.resolve(__dirname, 'src/hooks'),
        },
    },
});
