import React from 'react'

export default function Tablero({board}) {
    return (
        <div className="board">
            {board.map((piece, i) => (
                <div key={i}>
                    <p>{JSON.stringify(piece)}</p>
                </div> 
            ))}
        </div>
    )
}
