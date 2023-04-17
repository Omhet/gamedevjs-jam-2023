import { LevelConfig, OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import Phaser from 'phaser'
import { ChallengeManager } from './components/ChallengeManager'
import { Clock } from './components/Clock'
import { PowerupManager } from './components/PowerupManager'

const maxPointsPerRound = 3
const initialLives = 10
export class MainScene extends Phaser.Scene {
    private clock!: Clock
    private levelConfig!: LevelConfig
    private missCounter: number = 0
    private roundsCompleted: number = 0
    private points: number = 0
    private lives: number = initialLives
    private comboCounter: number = 0
    private superComboMultiplier: number = 2
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
                let pointsEarned = Math.round(accuracy * maxPointsPerRound * this.comboCounter)

                const handCrossedZone = this.clock.handCrossedZoneTimes > 0
                const isSuperCombo = !handCrossedZone && this.comboCounter > 1
                if (isSuperCombo) {
                    pointsEarned *= this.superComboMultiplier
                }

                console.log(
                    `Accuracy: ${accuracy}`,
                    `Points Earned: ${pointsEarned}`,
                    `Combo: ${this.comboCounter}`,
                    isSuperCombo ? 'SUPERCOMBO' : ''
                )

                this.points += pointsEarned
                this.roundsCompleted++
                this.lives = initialLives

                if (this.roundsCompleted === this.getNumberOfRoundsToCompleteLevel()) {
                    this.onLevelEnds(this.points)
                } else {
                    this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)
                    this.clock.generateNewTargetZone()
                }
            } else {
                console.log('Miss')
                this.points = Math.max(0, this.points - maxPointsPerRound)
                this.comboCounter = 0
                this.missCounter++
                this.lives = Math.max(0, this.lives - 1)
                if (this.lives === 0) {
                    this.onLevelEnds(this.points)
                }
                this.clock.increaseTargetZoneSize(this.lives, initialLives)
            }

            this.onTap(this.points)
        })
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
