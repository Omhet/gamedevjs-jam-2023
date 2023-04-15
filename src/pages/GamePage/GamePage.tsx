import { Loader } from '@components/Loader/Loader'
import { useQuery } from '@hooks/index'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { Game } from '@pages/GamePage/components/Game/Game'
import { closeModal } from '@store/modals'
import { FC, useEffect } from 'react'
import { loadGame, useGame } from '../../store/game/index'
import s from './GamePage.module.scss'

export const GamePage: FC = () => {
    const { isLoading } = useGame()
    const { level } = useQuery()

    useEffect(() => {
        closeModal()
        loadGame(parseInt(level))

        return () => {
            closeModal()
            levelDataManager.stopLevelMusic()
        }
    }, [level])

    return <div className={s.main}>{isLoading ? <Loader /> : <Game />}</div>
}
