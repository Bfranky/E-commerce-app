// import { StrictMode } from 'react'
import { CartProvider } from './CartContext.jsx';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 
   <CartProvider>
    <App />
  </CartProvider>,
  
)
