import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import { Background } from './components/Background/Background'
import { GameHeader } from './components/GameHeader/GameHeader'
import { Scene } from './components/Scene/Scene'

export const Game: FC = () => {
    const { isGameStarted } = useGame()

    return (
        <>
            <Background />
            {isGameStarted && <Scene />}
            {isGameStarted && <GameHeader />}
        </>
    )
}
