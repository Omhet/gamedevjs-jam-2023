import { useLevels } from '@store/levels/levelsStore'
import { FC } from 'react'
import s from './GameHeader.module.scss'

export const GameHeader: FC = () => {
    const { currentLevelScore } = useLevels()

    return (
        <div className={s.root}>
            Score: <b>{currentLevelScore}</b>
        </div>
    )
}
