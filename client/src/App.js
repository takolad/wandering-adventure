import HomePage from './pages/Homepage/Homepage'
import NavBar from './components/Navbar/Navbar'
import Game from './components/Game/Game'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Switch>
        <Route path="/game">
          <Game />
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
