import { levelDataManager } from '@lib/levels/LevelDataManager'
import { endGame, setGameScore } from '@store/game/gameStore'
import { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { startGame } from './phaser/main'

export interface PhaserGameProps {}

export const PhaserGame: FC<PhaserGameProps> = ({}) => {
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
            game = startGame({
                levelConfig: levelData,
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
