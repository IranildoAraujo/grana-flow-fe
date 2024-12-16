import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Ant Design CSS
import 'antd/dist/reset.css'; // para o antd 5+
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter
     future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <App />
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
);

reportWebVitals();