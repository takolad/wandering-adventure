import HomePage from './pages/Homepage/Homepage';
import NavBar from './components/Navbar/Navbar';
import Game from './components/Game/Game';
import UserPage from './pages/Userpage';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/userpage">
          <UserPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
