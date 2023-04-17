import { FC, useEffect, useState } from 'react'
import s from './ProgressBar.module.scss'

interface ProgressBar {
    duration: number
    onComplete?: () => void
    isReversed?: boolean
    color: string
}

export const ProgressBar: FC<ProgressBar> = ({ duration, color, onComplete, isReversed = false }) => {
    const [progress, setProgress] = useState(isReversed ? 100 : 0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (isReversed ? prevProgress === 0 : prevProgress === 100) {
                    clearInterval(interval)
                    onComplete && onComplete()
                    return prevProgress
                } else {
                    return isReversed ? prevProgress - 1 : prevProgress + 1
                }
            })
        }, duration / 100)

        return () => clearInterval(interval)
    }, [duration, onComplete, isReversed])

    return (
        <div className={s.root}>
            <div className={s.bar} style={{ width: `${progress}%`, backgroundColor: color }}></div>
        </div>
    )
}
