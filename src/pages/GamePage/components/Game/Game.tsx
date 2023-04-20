import { FC } from 'react'
import { Background } from './components/Background/Background'
import { GameHeader } from './components/GameHeader/GameHeader'
import { GamePowerups } from './components/GamePowerups/GamePowerups'
import { GameUI } from './components/GameUI/GameUI'
import { PhaserGame } from './components/PhaserGame/PhaserGame'

export const Game: FC = () => {
    return (
        <>
            <Background />
            <PhaserGame />
            <GameHeader />
            <GameUI />
            <GamePowerups />
        </>
    )
}
