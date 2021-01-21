import React from 'react'
import Space from "./Space"
import Piece from "./Piece"
import {useDrop} from "react-dnd"
import {move} from "./Game"

export default function Cuadrante({piece, black, position}) {
    const [ , drop] = useDrop({
        //same type we put in the piece item: "piece"
        accept: "piece",
        //we need to pass to the move function the "from" and the "to"
        //the "to" we take it from the position prop 
        //the "from" we take it from the id of the piece
        drop: (item) => {
            const [fromPosition] = item.id.split("_", 1)
            move(fromPosition, position)
        },
    })
    return (
        <div className="board-space" ref={drop}>
            <Space black={black}>
               {piece && <Piece piece={piece} position={position}/>}
            </Space>
        </div>
    )
}
