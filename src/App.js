import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Game from './pages/Game';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="game/:playerCount" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
