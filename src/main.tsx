import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// On GitHub Pages the app is served from /<repo>/, so set the router basename there.
const basename = window.location.hostname.endsWith('github.io')
  ? '/kikuubo-market'
  : '/'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
)
