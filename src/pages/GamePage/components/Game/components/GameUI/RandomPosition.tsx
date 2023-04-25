import { WithClassName } from '@app-types/common'
import React, { useState } from 'react'
import { useMedia } from 'react-use'

type RandomPositionWrapperProps = WithClassName & {
    children: React.ReactNode
}

const RandomPositionWrapper: React.FC<RandomPositionWrapperProps> = ({ className, children }) => {
    const isSmall = useMedia('(max-width: 1150px)')

    const padding = isSmall ? window.innerWidth / 2 : window.innerWidth / 4

    const [position] = useState(() => {
        const viewportWidth = window.innerWidth - padding * 2
        const viewportHeight = window.innerHeight - padding * 2

        const randomX = Math.floor(Math.random() * viewportWidth) + padding
        const randomY = Math.floor(Math.random() * viewportHeight) + padding

        return { x: randomX, y: randomY }
    })

    const wrapperStyle: React.CSSProperties = {
        position: 'absolute',
        left: position.x,
        top: position.y,
    }

    return (
        <div className={className} style={wrapperStyle}>
            {children}
        </div>
    )
}

export default RandomPositionWrapper
