import ReactDOM from 'react-dom/client';
import App from './App';
import React from 'react';
import { Provider } from "react-redux"
import store from './store/ReduxStore';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
        <Routes>
          <Route path='*' element={<App />}/>
        </Routes>
      </BrowserRouter> */}
      <App />
    </Provider>
  </React.StrictMode>
);

