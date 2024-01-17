import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApplicationContextProvider} from "./contexts/ApplicationContext.tsx";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApplicationContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApplicationContextProvider>
    </React.StrictMode>,
)
