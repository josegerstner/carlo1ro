import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Init from './components/Init'
import GameOver from "./components/GameOver";
import NoEncontrada from "./components/NoEncontrada";

function App() {

  return (
    <Router>
      <div className="text-center">
        <h1 className="fw-bold title-game">Carlo 1ro</h1>
        <div className="card container">
          <Routes>
              <Route path="/gameover/*" element={<GameOver />} />
              <Route path="/" exact element={<Init />} />
              <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
