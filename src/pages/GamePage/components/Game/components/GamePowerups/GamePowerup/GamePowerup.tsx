import { WithClassName } from '@app-types/common'
import { Powerup } from '@lib/levels/levelData'
import cx from 'classnames'
import { FC, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import s from './GamePowerup.module.scss'
import useProgress from './useProgress'

type GamePowerupProps = WithClassName & {
    powerup?: Powerup
    keyToActivate?: string
    img?: string
    isEmpty?: boolean
}

export const GamePowerup: FC<GamePowerupProps> = (props) => {
    const { className, powerup, keyToActivate, img, isEmpty } = props

    const [isEnabled, setIsEnabled] = useState(true)
    const [isActivated, setIsActivated] = useState(false)
    const [isCooldownShown, setIsCooldownShown] = useState(false)

    const activeProgress = useProgress(powerup?.duration ?? 1000, true)
    const cooldownProgress = useProgress(powerup?.cooldown ?? 1000, false)

    const activate = () => {
        if (isEmpty || !isEnabled || isActivated || !powerup) {
            return
        }

        const powerupEvent = new CustomEvent('powerupActivated', { detail: powerup })
        window.dispatchEvent(powerupEvent)
        setIsEnabled(false)
        setIsActivated(true)
        activeProgress.start()

        setTimeout(() => {
            const powerupEvent = new CustomEvent('powerupDeactivated', { detail: powerup })
            window.dispatchEvent(powerupEvent)
            setIsActivated(false)
            setIsCooldownShown(true)
            activeProgress.reset()
            cooldownProgress.start()

            setTimeout(() => {
                setIsEnabled(true)
                setIsCooldownShown(false)
                cooldownProgress.reset()
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
        <button
            className={cx(className, s.root, {
                [s.disabled]: !isEnabled,
                [s.empty]: isEmpty,
                [s.activated]: isActivated,
            })}
            style={{
                backgroundImage: isEmpty ? '' : `url(${img})`,
                opacity: isCooldownShown ? cooldownProgress.progress / 100 : 1,
            }}
            disabled={!isEnabled}
            onClick={activate}
        >
            <CircularProgressbar
                className={s.progress}
                value={isCooldownShown ? cooldownProgress.progress : activeProgress.progress}
                strokeWidth={4}
                counterClockwise
                styles={{
                    ...buildStyles({
                        pathTransition: 'none',
                        pathColor: isCooldownShown
                            ? `rgba(126, 66, 255, ${cooldownProgress.progress / 100})`
                            : isEmpty
                            ? 'rgba(126, 66, 255, 0.8)'
                            : 'rgba(126, 66, 255, 1)',
                        trailColor: 'transparent',
                        strokeLinecap: 'butt',
                    }),
                }}
            />
        </button>
    )
}
