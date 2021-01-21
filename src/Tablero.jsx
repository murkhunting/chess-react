import React from 'react'
import Cuadrante from "./Cuadrante"

export default function Tablero({board}) {
    //calculate the x and y position in the board with the index of the array
    function getXYPosition (i) {
        const x = i % 8 
        const y = Math.abs(Math.floor(i / 8) - 7)
        return {x, y}
    }
    //know if the piece is black
    function isBlack (i) {
        const {x, y} = getXYPosition(i)
        const isblack = (x + y) % 2 === 1
        return (isblack)
    }

    //to know the position as a chess board
    function getPosition(i){
        const {x,y} = getXYPosition(i)
        //need to change x from numbers to letters
        const letter = ["a", "b", "c", "d", "e", "f", "g", "h"][x]
        //need to add 1 to the y positions to start from 1 instead of 0
        return `${letter}${y + 1}`
    }

    return (
        <div className="board">
            {board.flat().map((piece, i) => (
                <div key={i} className="space">
                    <Cuadrante 
                        piece={piece} 
                        black={isBlack(i)} 
                        position={getPosition(i)} 
                    />
                </div> 
            ))}
        </div>
    )
}
