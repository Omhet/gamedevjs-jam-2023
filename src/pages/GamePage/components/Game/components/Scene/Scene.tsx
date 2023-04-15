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
        let game: Phaser.Game
        if (levelData) {
            const { numberOfRounds } = levelData
            game = startGame({
                levelConfig: { numberOfRounds },
                onLevelEnds: handleLevelEnds,
                onTap: handleTap,
            })
        }

        return () => {
            if (game) {
                game.destroy(true, false)
            }
        }
    }, [levelData])

    if (!levelData) {
        return <Redirect to="/" />
    }

    return <div id="app"></div>
}
