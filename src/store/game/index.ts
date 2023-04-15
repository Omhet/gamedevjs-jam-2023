import { GameStatus } from '@app-types/game'
import { createEffect, createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'

type GameStore = {
    isLoading: boolean
    status: GameStatus
}

export const gameStoreInitial = {
    isLoading: true,
    status: GameStatus.NotStarted,
}

export const gameStore = createStore<GameStore>(gameStoreInitial)

export const gameStatusStore = gameStore.map((state) => state.status)

export const setIsLoading = createEvent<boolean>()
export const setGameStatus = createEvent<GameStatus>()
export const resetGameData = createEvent()

export const startGame = createEvent()
export const endGame = createEvent()

export const loadGame = createEffect<number, void, void>()

export const useGame = () => {
    const state = useStore(gameStore)

    return {
        isGameStarted: state.status === GameStatus.InProgress,
        isGameEnd: state.status === GameStatus.End,
        ...state,
    }
}
