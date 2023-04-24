import { useCallback, useRef, useState } from 'react'

interface ProgressHook {
    progress: number
    start: () => void
    reset: () => void
}

const useProgress = (duration: number, isReverse: boolean = false): ProgressHook => {
    const [progress, setProgress] = useState<number>(isReverse ? 100 : 0)
    const animationRef = useRef<number | null>(null)

    const updateProgress = useCallback(
        (start: number, elapsed: number) => {
            const newProgress = isReverse ? 100 - (elapsed / duration) * 100 : (elapsed / duration) * 100
            setProgress(Math.min(newProgress, 100))

            if (elapsed < duration) {
                animationRef.current = requestAnimationFrame((timestamp) => updateProgress(start, timestamp - start))
            } else {
                cancelAnimationFrame(animationRef.current!)
            }
        },
        [duration, isReverse]
    )

    const start = useCallback(() => {
        const startTime = performance.now()
        animationRef.current = requestAnimationFrame((timestamp) => updateProgress(startTime, timestamp - startTime))
    }, [updateProgress])

    const reset = useCallback(() => {
        cancelAnimationFrame(animationRef.current!)
        setProgress(isReverse ? 100 : 0)
    }, [isReverse])

    return { progress, start, reset }
}

export default useProgress
