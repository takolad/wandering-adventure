import LoginPage from "./pages/LoginPage/LoginPage";
import NavBar from "./components/Navbar/Navbar";
import Game from "./components/Game/Game";
import HomePage from "./pages/HomePage/HomePage";
import CharacterSelect from './pages/CharacterSelect/CharacterSelect';
import SaveSelect from './pages/SaveSelect/SaveSelect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("authenticated: ", isAuthenticated);
  console.log("loading: ", isLoading);
  const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    console.log("auth status: ", auth);

    return (

      <Route
        {...rest}
        render={(props) =>
          auth ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };
  if (isLoading) {
    return <div> Loading </div>;
  }

  return (
    <Router>
      <div className="App">
      <NavBar />
        <br />
        <Switch>
          <PrivateRoute
            exact path="/"
            auth={isAuthenticated}
            component={HomePage}
          />

          <PrivateRoute
            exact path="/character"
            auth={isAuthenticated}
            component={CharacterSelect}
          />

          <PrivateRoute
            exact path="/game"
            auth={isAuthenticated}
            component={Game}
          />

          <PrivateRoute
            exact path="/game/:gameId/user/:userId/character/:charId"
            auth={isAuthenticated}
            component={Game}
          />

          <PrivateRoute
            exact path="/save"
            auth={isAuthenticated}
            component={SaveSelect}
          />

          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
