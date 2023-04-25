import { GameStatus } from '@app-types/game'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import {
    currentLevelStore,
    rewriteCurrentLevelScore,
    setCurrentLevelCompleted,
    setCurrentLevelNumber,
    setCurrentLevelScore,
    setIsBetterScoreThanEarlier,
} from '@store/levels/levelsStore'
import { openGameEndModal, openGameStartModal } from '@store/modals/modalsStore'
import {
    endGame,
    gameStore,
    gameStoreInitial,
    loadGame,
    resetGameData,
    setGameCountdown,
    setGameScore,
    setGameStatus,
    setGameUI,
    setIsLoading,
    startGame,
} from './gameStore'

gameStore
    .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
    .on(setGameStatus, (state, status) => ({ ...state, status }))
    .on(setGameCountdown, (state, countdown) => ({ ...state, countdown }))
    .on(setGameUI, (state, gameUI) => ({ ...state, gameUI }))
    .on(resetGameData, () => ({ ...gameStoreInitial }))

loadGame.use(async (levelNumber: number) => {
    setIsLoading(true)
    resetGameData()
    setCurrentLevelNumber(levelNumber)
    const data = await levelDataManager.loadLevelData(levelNumber)
    setIsLoading(false)
    openGameStartModal()
})

startGame.watch(() => {
    setCurrentLevelScore(0)
    levelDataManager.playLevelMusic()
    setGameStatus(GameStatus.InProgress)
})

setGameScore.watch((newScore) => {
    const { score: oldScore } = currentLevelStore.getState()

    setCurrentLevelScore(newScore)
    if (newScore > oldScore) {
        setIsBetterScoreThanEarlier(true)
        rewriteCurrentLevelScore(newScore)
    } else {
        setIsBetterScoreThanEarlier(false)
    }
})

// Do end game stuff
endGame.watch(({ isLevelCompleted, withModal, isGiveUp = false }) => {
    if (isGiveUp) {
        const { completed: oldCompleted } = currentLevelStore.getState()
        if (!oldCompleted) {
            setCurrentLevelCompleted(false)
            setCurrentLevelScore(0)
            rewriteCurrentLevelScore(0)
        }

        setGameStatus(GameStatus.End)

        return
    }

    setCurrentLevelCompleted(isLevelCompleted)
    setGameStatus(GameStatus.End)

    if (withModal) {
        setTimeout(() => {
            openGameEndModal()
        }, 1000)
    }
})
