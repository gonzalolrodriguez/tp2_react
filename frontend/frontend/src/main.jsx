import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GlobalProvider } from './context/GlobalContext';
import './index.css';

// Si se quiere usar BrowserRouter en el futuro, solo descomentar:
// import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
