import { levelDataManager } from '@lib/levels/LevelDataManager'
import { Powerup } from '@lib/levels/levelData'
import { FC, useState } from 'react'
import s from './GamePowerups.module.scss'

export const GamePowerups: FC = () => {
    const { powerups } = levelDataManager.getCurrentLevelData()

    if (!powerups) {
        return null
    }

    return (
        <div className={s.root}>
            {powerups.map((powerup) => (
                <GamePowerup key={powerup.type} powerup={powerup} />
            ))}
        </div>
    )
}

interface GamePowerupProps {
    powerup: Powerup
}

const GamePowerup: FC<GamePowerupProps> = ({ powerup }) => {
    const [isEnabled, setIsEnabled] = useState(true)

    const handleClick = () => {
        const powerupEvent = new CustomEvent('powerupActivated', { detail: powerup })
        window.dispatchEvent(powerupEvent)
        setIsEnabled(false)

        setTimeout(() => {
            const powerupEvent = new CustomEvent('powerupDeactivated', { detail: powerup })
            window.dispatchEvent(powerupEvent)
            setIsEnabled(true)
        }, powerup.duration)
    }

    return (
        <button className={s.powerup} disabled={!isEnabled} onClick={handleClick}>
            {powerup.type}
        </button>
    )
}
