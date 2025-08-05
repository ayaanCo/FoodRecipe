import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './componenets/Context'
import { ToastContainer} from 'react-toastify';
import 'flowbite';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProductProvider>
       <App />
       <ToastContainer
autoClose={2000}
/>
    </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
