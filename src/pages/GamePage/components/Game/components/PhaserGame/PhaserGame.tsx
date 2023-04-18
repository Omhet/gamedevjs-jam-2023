import { OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { endGame, setGameScore, setGameUI } from '@store/game/gameStore'
import { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import s from './PhaserGame.module.scss'
import { startGame } from './phaser/main'
import { MainScene } from './phaser/scenes/MainScene'

export interface PhaserGameProps {}

export const PhaserGame: FC<PhaserGameProps> = ({}) => {
    const levelData = levelDataManager.getCurrentLevelData()

    const handleLevelEnds: OnLevelEndsCallback = ({ isDead }) => {
        const isCompleted = Boolean(levelData.miniBoss) ? !isDead : true
        endGame(isCompleted)
    }

    const handleTap: OnTapCallback = ({ points, ...gameUI }) => {
        setGameScore(points)
        setGameUI({ ...gameUI, points })
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
            console.log('Game Unmount')

            if (game) {
                ;(game.scene.getScene('MainScene') as MainScene).destroy()
                game.destroy(true, false)
            }
        }
    }, [levelData])

    if (!levelData) {
        return <Redirect to="/" />
    }

    return <div className={s.root} id="app"></div>
}
