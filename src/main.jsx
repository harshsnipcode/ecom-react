  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter
  import App from './App';
  import { ContextProvider } from './utils/Context';
  import './index.css';
  import { ToastContainer } from 'react-toastify';
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter> {/* ✅ Wrap everything inside BrowserRouter */}
        <ContextProvider>
          <App />
          <ToastContainer />
        </ContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
