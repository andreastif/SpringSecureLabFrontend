import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ApplicationContextProvider} from "./contexts/ApplicationContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApplicationContextProvider>
            <App/>
        </ApplicationContextProvider>
    </React.StrictMode>,
)
