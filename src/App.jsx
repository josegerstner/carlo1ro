import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Init from './components/Init'
import GameOver from "./components/GameOver";
import NoEncontrada from "./components/NoEncontrada";

function App() {

  const [maxScore, setMaxScore] = useState(0)

  useEffect(()=>{
    setMaxScore(0)
    console.log('cuantas veces corre esto?')
  },[])

  return (
    <Router>
      <div className="text-center">
        <h1 className="fw-bold title-game">Carlo 1ro</h1>
        <div className="card container">
          <Routes>
              <Route path="/gameover/*" element={<GameOver maxScore={maxScore} setMaxScore={setMaxScore} />} />
              <Route path="/" exact element={<Init maxScore={maxScore} setMaxScore={setMaxScore} />} />
              <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
