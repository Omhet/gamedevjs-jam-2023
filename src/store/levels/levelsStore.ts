import { levelDataManager } from '@lib/levels/LevelDataManager'
import { combine, createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'

type Level = {
    number: number
    maxScore: number
    score: number
    completed: boolean
}

type LevelsStore = {
    currentLevelNumber: number
    currentLevelScore: number
    isBetterScoreThanEarlier: boolean
    levels: Level[]
}

export const levelsStore = createStore<LevelsStore>({
    currentLevelNumber: 1,
    currentLevelScore: 0,
    isBetterScoreThanEarlier: false,
    levels: levelDataManager
        .getAllLevels()
        .map(({ score, maxScore, number, completed }) => ({ score, maxScore, number, completed })),
})

export const globalScoreStore = levelsStore.map(({ levels }) => levels.reduce((a, b) => a + b.score, 0))

export const levelsListStore = combine(levelsStore, (levelsState) => {
    return levelsState.levels.map((level, index, levelsArray) => {
        const prevLevel = levelsArray[index - 1]

        const isOpen = prevLevel?.completed || level.number === 1

        return {
            isOpen,
            ...level,
        }
    })
})

const currentLevelNumberStore = levelsStore.map(({ currentLevelNumber }) => currentLevelNumber)

export const currentLevelStore = combine(currentLevelNumberStore, levelsListStore, (currentLevelNumber, levelsList) => {
    return levelsList[currentLevelNumber - 1]
})

export const nextLevelStore = combine(currentLevelNumberStore, levelsListStore, (currentLevelNumber, levelsList) => {
    return levelsList[currentLevelNumber] ?? null
})

export const useLevels = () => {
    const levels = useStore(levelsStore)
    const levelsList = useStore(levelsListStore)
    const globalScore = useStore(globalScoreStore)

    return {
        ...levels,
        globalScore,
        levels: levelsList,
    }
}

export const useCurrentLevel = () => {
    const state = useStore(currentLevelStore)

    return state
}

export const useNextLevel = () => {
    const state = useStore(nextLevelStore)

    return state
}

export const setCurrentLevelCompleted = createEvent<boolean>()
export const setCurrentLevelNumber = createEvent<number>()
export const setCurrentLevelScore = createEvent<number>()
export const rewriteCurrentLevelScore = createEvent<number>()
export const setIsBetterScoreThanEarlier = createEvent<boolean>()
