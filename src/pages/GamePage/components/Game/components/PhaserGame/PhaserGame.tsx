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
        levelData.audio.ost?.stop()

        const isBoss = Boolean(levelData.miniBoss)
        if (isDead) {
            levelData.audio.missDeath?.play()
            if (isBoss) {
                levelData.audio.bossDeath?.play()
            }
        } else {
            levelData.audio.win?.play()
        }

        const isCompleted = isBoss ? !isDead : true
        endGame({ isLevelCompleted: isCompleted, withModal: true })
    }

    const handleTap: OnTapCallback = ({ points, ...gameUI }) => {
        if (gameUI.isSuccess) {
            levelData.audio.success?.play()
            if (gameUI.comboCounter > 1) {
                levelData.audio.combo?.play()
                if (gameUI.isSuperCombo) {
                    levelData.audio.superCombo?.play()
                }
            }
        } else if (gameUI.isMiss) {
            levelData.audio.miss?.play()
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

        levelData.audio.startGame?.play()
        levelData.audio.countdown?.play()

        let counter = 3
        let timeout = setInterval(() => {
            setGameCountdown(counter)
            if (counter === 0 && gameRef.current) {
                ;(gameRef.current.scene.getScene('MainScene') as MainScene).start()
                clearInterval(timeout)
                setGameCountdown(undefined)
                levelData.audio.ost?.volume(0.75)
                levelData.audio.ost?.play()

                return
            }
            counter--
        }, 1000)

        return () => {
            clearInterval(timeout)
        }
    }, [isGameInProgress])

    useEffect(() => {
        return () => {
            levelData.audio.ost?.stop()
            levelData.audio.countdown?.stop()
        }
    }, [])

    if (!levelData) {
        return <Redirect to="/" />
    }

    return <div className={s.root} id="app"></div>
}
