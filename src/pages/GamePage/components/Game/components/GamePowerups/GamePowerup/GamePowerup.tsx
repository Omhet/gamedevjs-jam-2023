import { Powerup } from '@lib/levels/levelData'
import cs from 'classnames'
import { FC, useState } from 'react'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import s from './GamePowerup.module.scss'

interface GamePowerupProps {
    powerup: Powerup
}

export const GamePowerup: FC<GamePowerupProps> = ({ powerup }) => {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isActivated, setIsActivated] = useState(false)
    const [isCooldownShown, setIsCooldownShown] = useState(false)

    const handleClick = () => {
        const powerupEvent = new CustomEvent('powerupActivated', { detail: powerup })
        window.dispatchEvent(powerupEvent)
        setIsEnabled(false)
        setIsActivated(true)

        setTimeout(() => {
            const powerupEvent = new CustomEvent('powerupDeactivated', { detail: powerup })
            window.dispatchEvent(powerupEvent)
            setIsActivated(false)
            setIsCooldownShown(true)

            setTimeout(() => {
                setIsEnabled(true)
                setIsCooldownShown(false)
            }, powerup.cooldown)
        }, powerup.duration)
    }

    return (
        <div className={s.root}>
            {isActivated && <ProgressBar duration={powerup.duration} color="aqua" isReversed />}
            <button className={cs(s.button, { [s.disabled]: !isEnabled })} disabled={!isEnabled} onClick={handleClick}>
                {powerup.type}
            </button>
            {isCooldownShown && <ProgressBar duration={powerup.cooldown} color="white" />}
        </div>
    )
}
