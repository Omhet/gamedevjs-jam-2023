import { levelDataManager } from '@lib/levels/LevelDataManager'
import { endGame, setGameScore } from '@store/game'
import { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { startGame } from './phaser/main'

export interface SceneProps {}

export const Scene: FC<SceneProps> = ({}) => {
    const levelData = levelDataManager.getCurrentLevelData()

    const handleLevelEnds = () => {
        endGame()
    }

    const handleTap = (points: number) => {
        setGameScore(points)
    }

    useEffect(() => {
        if (levelData) {
            const { numberOfRounds } = levelData
            startGame({
                levelConfig: { numberOfRounds },
                onLevelEnds: handleLevelEnds,
                onTap: handleTap,
            })
        }
    }, [levelData])

    if (!levelData) {
        return <Redirect to="/" />
    }

    return <div id="app"></div>
}
