import { GameStatus } from '@app-types/game'
import { createEffect, createEvent, createStore } from 'effector'
import { useStore } from 'effector-react'

type GameUI = {
    points: number
    comboCounter: number
    missCounter: number
    lives?: number
    isSuperCombo: boolean
    isMiss: boolean
    isBonusRound: boolean
}

type GameStore = {
    isLoading: boolean
    status: GameStatus
    gameUI: GameUI
}

export const gameStoreInitial = {
    isLoading: true,
    status: GameStatus.NotStarted,
    gameUI: {
        points: 0,
        comboCounter: 0,
        missCounter: 0,
        isSuperCombo: false,
        isMiss: false,
        isBonusRound: false,
    },
}

export const gameStore = createStore<GameStore>(gameStoreInitial)

export const gameStatusStore = gameStore.map((state) => state.status)

export const setIsLoading = createEvent<boolean>()
export const setGameStatus = createEvent<GameStatus>()
export const setGameScore = createEvent<number>()
export const setGameUI = createEvent<GameUI>()
export const resetGameData = createEvent()

export const startGame = createEvent()
export const endGame = createEvent<boolean>()

export const loadGame = createEffect<number, void, void>()

export const useGame = () => {
    const state = useStore(gameStore)

    return {
        isGameStarted: state.status === GameStatus.InProgress,
        isGameEnd: state.status === GameStatus.End,
        ...state,
    }
}
