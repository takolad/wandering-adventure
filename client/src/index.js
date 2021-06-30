import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const domain = process.env.REACT_AUTH0_DOMAIN;
const clientID = process.env.REACT_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientID={clientID}
    redirectUri={window.location.origin}
  >
  
    <App />
 
  </Auth0Provider>,
  document.getElementById('root')
);


