import React from 'react'
import Space from './Space'
import { move } from './Game'

const promotionPieces = ["r", "n", "b", "q"]

export default function Promotion({promotion: {from, to, color},}) {
    return (
        <div className="board">
            {promotionPieces.map((p, i) => (
                <div key={i} className="promote-space">
                    <Space black={i % 3 ===0}>
                        <div className="pice-container" onClick={() => move(from, to, p)}>
                            <img src= {`../images/${p}_${color}.png`} alt="piece" className="piece cursor-pointer" />
                        </div>
                    </Space>
                </div>
            ))}
        </div>
    )
}
