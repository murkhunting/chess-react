import React from 'react'

export default function Space({children, black}) {
    //if black is true
    const bgClass = black ? "space-black" : "space-white";
    return (
        <div className={`${bgClass} board-space`}>
            {children}
        </div>
    )
}
