import { Powerup } from '@lib/levels/levelData'
import cs from 'classnames'
import { FC, useEffect, useState } from 'react'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import s from './GamePowerup.module.scss'

interface GamePowerupProps {
    powerup: Powerup
    keyToActivate: string
}

export const GamePowerup: FC<GamePowerupProps> = ({ powerup, keyToActivate }) => {
    const [isEnabled, setIsEnabled] = useState(true)
    const [isActivated, setIsActivated] = useState(false)
    const [isCooldownShown, setIsCooldownShown] = useState(false)

    const activate = () => {
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === keyToActivate && isEnabled) {
                activate()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [keyToActivate, isEnabled])

    return (
        <div className={s.root}>
            {isActivated && <ProgressBar duration={powerup.duration} color="aqua" isReversed />}
            <button className={cs(s.button, { [s.disabled]: !isEnabled })} disabled={!isEnabled} onClick={activate}>
                {powerup.type}
            </button>
            {isCooldownShown && <ProgressBar duration={powerup.cooldown} color="white" />}
        </div>
    )
}
