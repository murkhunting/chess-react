import React, {useEffect, useState} from 'react'
import {useDrop} from "react-dnd"
import Space from "./Space"
import Piece from "./Piece"
import Promotion from "./Promotion"
import {handleMove} from "./Game"
import {gameSubject} from "./Game"

export default function Cuadrante({piece, black, position}) {
    const [promotion, setPromotion] = useState (null)
    const [ , drop] = useDrop({
        //same type we put in the piece item: "piece"
        accept: "piece",
        //we need to pass to the move function the "from" and the "to"
        //the "to" we take it from the position prop 
        //the "from" we take it from the id of the piece
        drop: (item) => {
            const [fromPosition] = item.id.split("_", 1)
            handleMove(fromPosition, position)
        },
    })
    useEffect(() => {
        const subscribe = gameSubject.subscribe(({pendingPromotion}) => 
            pendingPromotion && pendingPromotion.to === position 
            ? setPromotion(pendingPromotion) 
            : setPromotion(null)
        )
        return () => subscribe.unsubscribe()
    }, [position])
    return (
        <div className="board-space" ref={drop}>
            <Space black={black}>
                {promotion ? (
                    <Promotion promotion={promotion} /> 
                ) : piece ? (
                    <Piece piece={piece} position={position}/>
                ) : null}                   
            </Space>
        </div>
    )
}
