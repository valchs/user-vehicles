import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import { store, persistor } from 'store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import HttpService from 'services/HttpService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

HttpService.configure();
