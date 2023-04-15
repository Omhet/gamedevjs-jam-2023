import { gameStore, gameStoreInitial, resetGameData, setGameStatus, setIsLoading } from './index'

gameStore
    .on(setIsLoading, (state, isLoading) => ({ ...state, isLoading }))
    .on(setGameStatus, (state, status) => ({ ...state, status }))
    .on(resetGameData, () => ({ ...gameStoreInitial }))
