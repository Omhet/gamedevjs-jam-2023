import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import { Background } from './components/Background/Background'
import { GameHeader } from './components/GameHeader/GameHeader'
import { GamePowerups } from './components/GamePowerups/GamePowerups'
import { GameUI } from './components/GameUI/GameUI'
import { PhaserGame } from './components/PhaserGame/PhaserGame'

export const Game: FC = () => {
    const { isGameInProgress } = useGame()

    return (
        <>
            <Background />
            <PhaserGame />
            {isGameInProgress && <GameHeader />}
            {isGameInProgress && <GameUI />}
            {isGameInProgress && <GamePowerups />}
        </>
    )
}
