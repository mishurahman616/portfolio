import React from 'react'
import ReactDOM from 'react-dom/client'
import clarity from '@microsoft/clarity'
import App from './App.jsx'
import './index.css'

// Initialize Microsoft Clarity
clarity.init('vqi3cfd3fq')

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
