import { GameStatus } from '@app-types/game'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { setCurrentLevelNumber } from '@store/levels'
import { openGameEndModal, openGameStartModal } from '@store/modals'
import { createEvent, guard } from 'effector'
import {
    endGame,
    gameStatusStore,
    gameStore,
    gameStoreInitial,
    loadGame,
    resetGameData,
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

const preGameEnd = createEvent()
// Set end game status
// guard({
//     source: gameStore,
//     filter: ({ status, blastCount, noteCount }) =>
//         status === GameStatus.InProgress && (blastCount === 0 || noteCount === 0),
//     target: preGameEnd,
// })
preGameEnd.watch(() => {
    setTimeout(() => {
        setGameStatus(GameStatus.End)
    }, 300)
})
// Call end game
guard({
    source: gameStatusStore,
    filter: (status) => status === GameStatus.End,
    target: endGame,
})

// Do end game stuff
endGame.watch(() => {
    // const { score: oldScore } = currentLevelStore.getState()

    // const newScore = hitCount
    // setCurrentLevelScore(newScore)
    // if (newScore > oldScore) {
    //     setIsBetterScoreThanEarlier(true)
    //     rewriteCurrentLevelScore(newScore)
    // } else {
    //     setIsBetterScoreThanEarlier(false)
    // }

    openGameEndModal()
})
