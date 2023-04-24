import { WithClassName } from '@app-types/common'
import { Powerup } from '@lib/levels/levelData'
import cx from 'classnames'
import { FC, useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import s from './GamePowerup.module.scss'

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

    const activate = () => {
        if (isEmpty || !isEnabled || isActivated || !powerup) {
            return
        }

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
        <button
            className={cx(className, s.root, { [s.disabled]: !isEnabled, [s.empty]: isEmpty })}
            style={{ backgroundImage: isEmpty ? '' : `url(${img})` }}
            disabled={!isEnabled}
            onClick={activate}
        >
            <CircularProgressbar
                className={s.progress}
                value={animatedValue.get()}
                strokeWidth={4}
                styles={{
                    path: { strokeLinecap: 'butt', stroke: isEmpty ? '#2e175ccc' : '#7e42ff' },
                    trail: { stroke: 'transparent' },
                }}
            />
        </button>
    )
}
