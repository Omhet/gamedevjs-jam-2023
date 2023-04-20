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
    setGameScore,
    setGameStatus,
    setGameUI,
    setIsLoading,
    startGame,
} from './gameStore'

gameStore
    .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
    .on(setGameStatus, (state, status) => ({ ...state, status }))
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
    setGameStatus(GameStatus.InProgress)
    levelDataManager.playLevelMusic()
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
endGame.watch((isCompleted) => {
    setCurrentLevelCompleted(isCompleted)

    setTimeout(() => {
        openGameEndModal()

        setTimeout(() => {
            setGameStatus(GameStatus.End)
        }, 1000)
    }, 1000)
})
