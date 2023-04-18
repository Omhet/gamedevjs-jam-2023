import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import { Background } from './components/Background/Background'
import { GameHeader } from './components/GameHeader/GameHeader'
import { GamePowerups } from './components/GamePowerups/GamePowerups'
import { GameUI } from './components/GameUI/GameUI'
import { PhaserGame } from './components/PhaserGame/PhaserGame'

export const Game: FC = () => {
    const { isGameStarted } = useGame()

    return (
        <>
            <Background />
            {isGameStarted && <PhaserGame />}
            {isGameStarted && <GameHeader />}
            {isGameStarted && <GameUI />}
            {isGameStarted && <GamePowerups />}
        </>
    )
}
