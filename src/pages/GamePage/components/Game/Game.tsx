import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import { Background } from './components/Background/Background'
import { GameHeader } from './components/GameHeader/GameHeader'
import { PhaserGame } from './components/PhaserGame/PhaserGame'

export const Game: FC = () => {
    const { isGameStarted } = useGame()

    return (
        <>
            <Background />
            {isGameStarted && <PhaserGame />}
            {isGameStarted && <GameHeader />}
        </>
    )
}
