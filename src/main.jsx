import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from "./context/userContext"
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </UserContextProvider>
  </BrowserRouter>
)
