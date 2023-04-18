import { LIVES_PER_ROUND } from '@lib/levels/levelData'
import { useGame } from '@store/game/gameStore'
import { useLevels } from '@store/levels/levelsStore'
import { FC } from 'react'
import s from './GameHeader.module.scss'

export const GameHeader: FC = () => {
    const {
        gameUI: { lives = LIVES_PER_ROUND },
    } = useGame()
    const { currentLevelScore } = useLevels()

    return (
        <div className={s.root}>
            <div>
                Score: <b>{currentLevelScore}</b>
            </div>
            <div>
                Lives: <b>{lives}</b>
            </div>
        </div>
    )
}
