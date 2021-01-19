import React from 'react'
import Space from "./Space"
import Piece from "./Piece"

export default function Cuadrante({piece}) {
    return (
        <div>
            <Space>
               {piece && <Piece piece={piece}/>}
            </Space>
        </div>
    )
}
