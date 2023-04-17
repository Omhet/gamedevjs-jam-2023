import {
    levelsStore,
    rewriteCurrentLevelScore,
    setCurrentLevelCompleted,
    setCurrentLevelNumber,
    setCurrentLevelScore,
    setIsBetterScoreThanEarlier,
} from './levelsStore'

levelsStore
    .on(setCurrentLevelNumber, (state, currentLevelNumber) => ({ ...state, currentLevelNumber }))
    .on(setCurrentLevelScore, (state, score) => ({ ...state, currentLevelScore: score }))
    .on(setIsBetterScoreThanEarlier, (state, isBetter) => ({ ...state, isBetterScoreThanEarlier: isBetter }))
    .on(rewriteCurrentLevelScore, (state, score) => ({
        ...state,
        levels: state.levels.map((level) => {
            if (level.number === state.currentLevelNumber) {
                return {
                    ...level,
                    score,
                }
            }
            return level
        }),
    }))
    .on(setCurrentLevelCompleted, (state, isCompleted) => ({
        ...state,
        levels: state.levels.map((level) => {
            if (level.number === state.currentLevelNumber) {
                return {
                    ...level,
                    completed: isCompleted,
                }
            }
            return level
        }),
    }))

levelsStore.watch(({ levels }) => {
    localStorage.setItem('levels', JSON.stringify(levels))
})
