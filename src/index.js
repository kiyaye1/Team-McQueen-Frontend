import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import { ReservationProvider } from './context/ReservationContext'; // Adjust the path as necessary
import reportWebVitals from './reportWebVitals'; // Include if you use web vitals

// Use the new root API as you've indicated
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

