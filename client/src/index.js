import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.render(
  <Auth0Provider
    domain='wanderingadventure.us.auth0.com'
    clientId='OK1FHdAl6buDevVYFZ3dnfksZDwIhEka'
    redirectUri={window.location.origin}
  >
  
    <App />
 
  </Auth0Provider>,
  document.getElementById('root')
);


