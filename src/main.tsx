import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { OrderProvider } from './contexts/OrderContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </UserProvider>
  </StrictMode>,
)
