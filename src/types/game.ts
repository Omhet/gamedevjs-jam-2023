export enum GameStatus {
    NotStarted = 'NotStarted',
    InProgress = 'InProgress',
    End = 'End',
}

export interface LevelConfig {
    numberOfRounds: number
}

export type OnLevelEndsCallback = (points: number) => void
export type OnTapCallback = (points: number) => void
