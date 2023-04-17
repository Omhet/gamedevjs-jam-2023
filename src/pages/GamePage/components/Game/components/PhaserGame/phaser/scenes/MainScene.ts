import { LevelConfig, OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import { LIVES_PER_ROUND, MAX_POINTS_PER_ROUND, SUPER_COMBO_MULTIPLIER } from '@lib/levels/levelData'
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

    constructor() {
        super('MainScene')
    }

    init(data: { levelConfig: LevelConfig; onLevelEnds: OnLevelEndsCallback; onTap: OnTapCallback }): void {
        this.levelConfig = data.levelConfig
        this.onLevelEnds = data.onLevelEnds
        this.onTap = data.onTap
    }

    destroy() {
        console.log('MainScene destroy')
        this.powerupManager.destroy()
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
            const accuracy = this.clock.checkHandInTargetZone()

            if (accuracy !== null) {
                this.comboCounter++
                const rawPoints = Math.round(accuracy * MAX_POINTS_PER_ROUND)
                let pointsEarned = rawPoints * this.comboCounter

                const handCrossedZone = this.clock.handCrossedZoneTimes > 0
                const isSuperCombo = !handCrossedZone && this.comboCounter > 1
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
                    this.finishGame(false)
                } else {
                    this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)
                    this.clock.generateNewTargetZone()
                }
            } else {
                console.log('Miss')
                this.points = Math.max(0, this.points - MAX_POINTS_PER_ROUND)
                this.comboCounter = 0
                this.missCounter++
                this.lives = Math.max(0, this.lives - 1)
                if (this.lives === 0) {
                    this.finishGame(true)
                }
                this.clock.increaseTargetZoneSize(this.lives, LIVES_PER_ROUND)
            }

            this.onTap(this.points)
        })
    }

    finishGame(isDead: boolean) {
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

    update() {
        this.clock.update()
    }
}
