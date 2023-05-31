import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './Context/authContext'
import { DarkModeContextProvider } from './Context/darkModeContext'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

<React.StrictMode>
  <DarkModeContextProvider>
  <AuthContextProvider>
        <App />
    </AuthContextProvider>
    </DarkModeContextProvider>

  </React.StrictMode>,
)
