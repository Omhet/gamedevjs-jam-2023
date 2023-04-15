import { endGame, setGameScore } from '@store/game'
import { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { startGame } from './phaser/main'

export interface SceneProps {}

export const Scene: FC<SceneProps> = ({}) => {
    const levelConfig = {}

    const handleLevelEnds = () => {
        endGame()
    }

    const handleTap = (points: number) => {
        setGameScore(points)
    }

    useEffect(() => {
        if (levelConfig) {
            startGame({
                levelConfig: { numberOfRounds: 1 },
                onLevelEnds: handleLevelEnds,
                onTap: handleTap,
            })
        }
    }, [levelConfig])

    if (!levelConfig) {
        return <Redirect to="/" />
    }

    return <div id="app"></div>
}
