import './App.css';
import React, {useEffect, useState} from "react";
import {gameSubject} from "./Game";
import Tablero from "./Tablero";

function App() {
  const [board, setBoard] = useState([])
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => 
      setBoard(game.board)
    )
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div>
      <Tablero board={board} />
    </div>
  );
}

export default App