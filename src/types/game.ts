import { LevelType } from '@lib/levels/LevelDataManager'

export enum GameStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    End = 'End',
}

export type LevelConfig = LevelType

export type OnLevelEndsCallback = (params: { points: number; isDead: boolean }) => void
export type OnTapCallback = (points: number) => void
