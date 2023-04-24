import { levelDataManager } from '@lib/levels/LevelDataManager'
import { FC } from 'react'
import { GamePowerup } from './GamePowerup/GamePowerup'
import s from './GamePowerups.module.scss'

export const GamePowerups: FC = () => {
    const { powerups, imgUrls } = levelDataManager.getCurrentLevelData()

    if (!powerups) {
        return null
    }

    return (
        <div className={s.root}>
            {[...new Array(4)].map((_, index) => {
                const powerup = powerups[index]
                return (
                    <GamePowerup
                        className={s.powerup}
                        key={index}
                        powerup={powerup}
                        keyToActivate={String(index + 1)}
                        img={imgUrls.powerups[powerup?.type]}
                        isEmpty={!powerup}
                    />
                )
            })}
        </div>
    )
}
