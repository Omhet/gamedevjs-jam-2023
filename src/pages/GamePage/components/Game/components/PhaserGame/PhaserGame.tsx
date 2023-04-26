import { OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { endGame, setGameCountdown, setGameScore, setGameUI, useGame } from '@store/game/gameStore'
import { FC, useEffect, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import s from './PhaserGame.module.scss'
import { startGame } from './phaser/main'
import { MainScene } from './phaser/scenes/MainScene'

export interface PhaserGameProps {}

export const PhaserGame: FC<PhaserGameProps> = ({}) => {
    const { isGameInProgress } = useGame()
    const levelData = levelDataManager.getCurrentLevelData()
    const gameRef = useRef<Phaser.Game>()

    const handleLevelEnds: OnLevelEndsCallback = ({ isDead }) => {
        const isCompleted = Boolean(levelData.miniBoss) ? !isDead : true
        endGame({ isLevelCompleted: isCompleted, withModal: true })
    }

    const handleTap: OnTapCallback = ({ points, ...gameUI }) => {
        if (gameUI.isSuccess) {
            levelData.audio.success.play()
        }
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
            gameRef.current = game
        }

        return () => {
            console.log('Game Unmount')

            if (game) {
                ;(game.scene.getScene('MainScene') as MainScene)?.destroy()
                game.destroy(true, false)
            }
        }
    }, [levelData])

    useEffect(() => {
        if (!isGameInProgress) {
            return
        }

        let counter = 3
        let timeout = setInterval(() => {
            setGameCountdown(counter)
            if (counter === 0 && gameRef.current) {
                ;(gameRef.current.scene.getScene('MainScene') as MainScene).start()
                clearInterval(timeout)
                setGameCountdown(undefined)
                return
            }
            counter--
        }, 1000)

        return () => {
            clearInterval(timeout)
        }
    }, [isGameInProgress])

    if (!levelData) {
        return <Redirect to="/" />
    }

    return <div className={s.root} id="app"></div>
}
