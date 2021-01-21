import React from 'react'
import {useDrag, DragPreviewImage} from "react-dnd"

export default function Piece({piece: {type, color}, position}) {
    const [{ isDragging }, drag, preview ] = useDrag({
        //we need to define the item we are going to move
        item: {type:"piece", id: `${position}_${type}_${color}`}, //type and id to identify the item we are moving
        collect: (monitor) => {
            return {isDragging: !!monitor.isDragging()}
        }
    })
    const pieceImg = `../images/${type}_${color}.png`
    return(
        <>
           <DragPreviewImage connect={preview} src={pieceImg} />
            <div className="piece-container" ref={drag} style={{opacity: isDragging ? 0 : 1}}>
                <img src={pieceImg} alt="" className="piece" />
            </div>
        </>
    )
}
