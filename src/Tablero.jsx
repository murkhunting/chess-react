import React from 'react'
import Cuadrante from "./Cuadrante"

export default function Tablero({board}) {
    return (
        <div className="board">
            {board.flat().map((piece, i) => (
                <div key={i} className="space">
                    <Cuadrante piece={piece} />
                </div> 
            ))}
        </div>
    )
}
