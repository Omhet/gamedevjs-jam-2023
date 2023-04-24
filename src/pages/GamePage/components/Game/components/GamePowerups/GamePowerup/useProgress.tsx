import { useEffect, useState } from 'react'

interface ProgressBar {
    duration: number
    onComplete?: () => void
    isReversed?: boolean
}

export const useProgress = (props: ProgressBar) => {
    const { duration, onComplete, isReversed = false } = props

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

    return progress
}
