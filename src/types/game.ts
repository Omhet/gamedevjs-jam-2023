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
    pointsEarned: number
    pointsTaken: number
    roundsCompleted: number
    comboCounter: number
    missCounter: number
    lives: number
    isSuperCombo: boolean
    isMiss: boolean
    isSuccess: boolean
    isBonusRound: boolean
}
export type OnTapCallback = (params: TapParams) => void
