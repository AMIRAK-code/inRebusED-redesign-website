import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LangProvider } from './i18n/LangContext'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import './lib/lenis'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <App />
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
