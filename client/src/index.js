import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-wiyvf5z0.us.auth0.com"
    clientId="7i7KV9phOuKQrDHsOAOsj090rBWLgpFp"
    redirectUri={window.location.origin}
  >
   
  </Auth0Provider>,
  document.getElementById("root")
);


ReactDOM.render(
  <Auth0Provider
    domain="dev-wiyvf5z0.us.auth0.com"
    clientId="7i7KV9phOuKQrDHsOAOsj090rBWLgpFp"
    redirectUri={window.location.origin}
  >
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </Auth0Provider>,
  document.getElementById('root')
);


