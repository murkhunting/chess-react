import './App.css';
import React, {useEffect, useState} from "react";
import {gameSubject, initGame, resetGame} from "./Game";
import Tablero from "./Tablero";

function App() {
  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()

  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
    })
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="container">
      {isGameOver && (
        <h2 className="text">
          GAME OVER
          <button onClick={resetGame}>
            <span className="text"> NEW GAME</span>
          </button>
        </h2>
      )}
      <div className= "board-container">
        <Tablero board={board} />
      </div>
      {result && <p className="text">{result}</p>}
    </div>
  );
}

export default App