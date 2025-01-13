import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ToastContainer } from 'react-toastify';
import 'tippy.js/dist/tippy.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>    
            <App />
            <ToastContainer />
    </StrictMode>
);
