import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CrowdFundingProvider } from './context/crowdFundingContext'
import {BrowserRouter} from 'react-router-dom'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrowdFundingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CrowdFundingProvider>
  </StrictMode>,
)
