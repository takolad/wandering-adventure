import HomeLog from './pages/Homepage/Homepage'
import NavBar from './components/Navbar/Navbar'
import Game from './components/Game/Game'
import { BrowserRouter, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <NavBar/>
      <Route path="/" component={HomeLog}/>
      <Route path="/game" component={Game}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
