import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './redux/store'
import App from './App';
import { Provider } from "react-redux";
import { EmailProvider } from "./components/userPages/EmailContext"
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientID = process.env.REACT_APP_Client_ID
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <GoogleOAuthProvider clientId="993817182132-jqeo8iqso7r810ppqqs3dl2iun8ekfdq.apps.googleusercontent.com" >
    <Provider store={store}>
      <EmailProvider>
        <App />
      </EmailProvider>
    </Provider>
  </GoogleOAuthProvider >
  </React.StrictMode>,
  document.getElementById("root")
);



