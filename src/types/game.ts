import { LevelType } from '@lib/levels/LevelDataManager'

export enum GameStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    End = 'End',
}

export type LevelConfig = LevelType

type LevelEndParams = { points: number; isDead: boolean }
export type OnLevelEndsCallback = (params: LevelEndParams) => void

type TapParams = {
    points: number
    comboCounter: number
    missCounter: number
    lives: number
    isSuperCombo: boolean
    isMiss: boolean
    isBonusRound: boolean
}
export type OnTapCallback = (params: TapParams) => void
