import { levelDataManager } from '@lib/levels/LevelDataManager'
import { FC } from 'react'
import s from './GamePowerups.module.scss'

export const GamePowerups: FC = () => {
    const { powerups } = levelDataManager.getCurrentLevelData()

    if (!powerups) {
        return null
    }

    return (
        <div className={s.root}>
            {powerups.map((powerup) => (
                <button className={s.powerup}>{powerup.type}</button>
            ))}
        </div>
    )
}
