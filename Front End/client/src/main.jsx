import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalState from './Context/index.jsx'
// import { store } from './Redux/store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById("root")).render(

    <StrictMode>
      <GlobalState>
        <App />
      </GlobalState>
    </StrictMode>

);
