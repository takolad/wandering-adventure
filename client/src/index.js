import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const domain =
  process.env.REACT_APP_AUTH0_DOMAIN || "wanderingadventure.us.auth0.com";
const clientId =
  process.env.REACT_APP_AUTH0_CLIENT_ID || "OK1FHdAl6buDevVYFZ3dnfksZDwIhEka";

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
