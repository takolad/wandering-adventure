import HomeLog from './pages/Homepage/Homepage'
import NavBar from './components/Navbar/Navbar'
import {BrowserRouter, Route} from 'react-router-dom'
import Game from './components/Game/Game'


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route path="/" component={HomeLog} />
      <Route path="/game" component={Game} />
    </div>
    </BrowserRouter>
  );
}

export default App;
