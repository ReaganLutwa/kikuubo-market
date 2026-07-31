import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { A } from './lib/asset'
import App from './App.tsx'

// Register the PWA service worker in production (A() handles the subpath).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(A('sw.js')).catch((err) => {
      console.warn('SW registration failed:', err)
    })
  })
}

// On GitHub Pages the app is served from /<repo>/, so set the router basename there.
const basename = window.location.hostname.endsWith('github.io')
  ? '/kikuubo-market'
  : '/'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>,
)
