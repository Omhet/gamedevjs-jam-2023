import { GameStatus } from '@app-types/game'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import {
    currentLevelStore,
    rewriteCurrentLevelScore,
    setCurrentLevelNumber,
    setCurrentLevelScore,
    setIsBetterScoreThanEarlier,
} from '@store/levels'
import { openGameEndModal, openGameStartModal } from '@store/modals'
import {
    endGame,
    gameStore,
    gameStoreInitial,
    loadGame,
    resetGameData,
    setGameScore,
    setGameStatus,
    setIsLoading,
    startGame,
} from './index'

gameStore
    .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
    .on(setGameStatus, (state, status) => ({ ...state, status }))
    .on(resetGameData, () => ({ ...gameStoreInitial }))

loadGame.use(async (levelNumber: number) => {
    setIsLoading(true)
    resetGameData()
    setCurrentLevelNumber(levelNumber)
    setIsLoading(false)
    openGameStartModal()
})

startGame.watch(() => {
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
endGame.watch(() => {
    openGameEndModal()
})
