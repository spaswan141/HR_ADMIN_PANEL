import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <ToastContainer
            position="top-right"
            autoClose={3000}      // close after 3s
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"       // 'light', 'dark', 'colored'
        />
    </BrowserRouter>
)
