import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import './index.css'
import axios from 'axios'
import { disableReactTools } from '@fvilers/disable-react-devtools';

if (ProcessingInstruction.env.NODEE_ENV === 'production') disableReactTools()

// axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.baseURL = "https://animalshelter.onrender.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
