import { LevelConfig, OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import {
    LIVES_PER_ROUND,
    MAX_POINTS_PER_ROUND,
    MISS_POINTS_PER_ROUND,
    SUPER_COMBO_MULTIPLIER,
} from '@lib/levels/levelData'
import Phaser from 'phaser'
import { ChallengeManager } from './components/ChallengeManager'
import { Clock } from './components/Clock'
import { PowerupManager } from './components/PowerupManager'

export class MainScene extends Phaser.Scene {
    private clock!: Clock
    private levelConfig!: LevelConfig
    private missCounter: number = 0
    private roundsCompleted: number = 0
    private points: number = 0
    private lives: number = LIVES_PER_ROUND
    private comboCounter: number = 0
    private challengeManager!: ChallengeManager
    private powerupManager!: PowerupManager
    private onLevelEnds!: OnLevelEndsCallback
    private onTap!: OnTapCallback
    isGameInProgress: boolean = false

    constructor() {
        super('MainScene')
    }

    init(data: {
        levelConfig: LevelConfig
        isGameInProgress: boolean
        onLevelEnds: OnLevelEndsCallback
        onTap: OnTapCallback
    }): void {
        this.levelConfig = data.levelConfig
        this.onLevelEnds = data.onLevelEnds
        this.onTap = data.onTap
    }

    destroy() {
        console.log('MainScene destroy')
        this.powerupManager.destroy()
    }

    start() {
        this.isGameInProgress = true
    }

    create() {
        const centerX = this.scale.width / 2
        const centerY = this.scale.height / 2
        const radius = Math.min(centerX, centerY) * 0.8

        this.clock = new Clock(this, centerX, centerY, radius, this.levelConfig)
        this.clock.generateNewTargetZone()

        this.challengeManager = new ChallengeManager(this.levelConfig.challenges ?? [])
        this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)

        this.powerupManager = new PowerupManager(this.clock)

        const spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        spaceKey.on('down', () => {
            this.handleInput()
        })

        this.input.on('pointerdown', () => {
            console.log('POINTER')

            this.handleInput()
        })
    }

    handleInput = () => {
        if (!this.isGameInProgress) {
            return
        }

        const accuracy = this.clock.checkHandInTargetZone()
        let isSuperCombo = false
        let isMiss = false
        let isSuccess = false
        let isBonusRound = false
        let pointsTaken = 0
        let pointsEarned = 0

        if (accuracy !== null) {
            isSuccess = true
            this.comboCounter++
            const rawPoints = Math.round(accuracy * MAX_POINTS_PER_ROUND)
            pointsEarned = rawPoints * this.comboCounter

            const handCrossedZone = this.clock.handCrossedZoneTimes > 0
            isSuperCombo = !handCrossedZone && this.comboCounter > 1
            if (isSuperCombo) {
                pointsEarned *= SUPER_COMBO_MULTIPLIER
            }

            console.log(
                `Accuracy: ${accuracy}`,
                `Raw Points: ${rawPoints}`,
                `Points Earned: ${pointsEarned}`,
                `Combo: ${this.comboCounter}`,
                isSuperCombo ? 'SUPERCOMBO' : ''
            )

            this.points += pointsEarned
            this.roundsCompleted++
            this.lives = LIVES_PER_ROUND

            if (this.roundsCompleted === this.getNumberOfRoundsToCompleteLevel()) {
                this.finishGame({ isDead: false })
                this.clock.hideTargetZone()
                this.clock.setHandSpeed(0.05)
            } else {
                this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)
                this.clock.generateNewTargetZone()
            }
        } else {
            console.log('Miss')
            pointsTaken = Math.min(MISS_POINTS_PER_ROUND, this.points)
            this.points = Math.max(0, this.points - pointsTaken)
            this.comboCounter = 0
            this.missCounter++
            this.lives = Math.max(0, this.lives - 1)
            isMiss = true
            isSuperCombo = false

            if (this.lives === 0) {
                this.finishGame({ isDead: true })
                this.clock.kill()
            } else {
                this.clock.increaseTargetZoneSize(this.lives, LIVES_PER_ROUND)
            }
        }

        isBonusRound =
            this.roundsCompleted >= this.levelConfig.minNumberOfRounds &&
            this.levelConfig.minNumberOfRounds < this.levelConfig.maxNumberOfRounds
        this.onTap({
            points: this.points,
            isSuperCombo,
            isMiss,
            isSuccess,
            comboCounter: this.comboCounter,
            isBonusRound,
            missCounter: this.missCounter,
            lives: this.lives,
            pointsTaken,
            pointsEarned,
            roundsCompleted: this.roundsCompleted,
        })
    }

    finishGame({ isDead }: { isDead: boolean }) {
        this.onLevelEnds({ points: this.points, isDead })
    }

    getNumberOfRoundsToCompleteLevel(): number {
        if (this.missCounter > 2) {
            const num = Math.max(
                this.levelConfig.minNumberOfRounds,
                Math.min(this.levelConfig.maxNumberOfRounds, this.roundsCompleted)
            )
            return num
        }

        return this.levelConfig.maxNumberOfRounds
    }

    update(time: number, delta: number) {
        if (this.isGameInProgress) {
            this.clock.update(delta)
        }
    }
}
