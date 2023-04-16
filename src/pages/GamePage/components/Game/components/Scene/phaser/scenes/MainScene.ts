import { LevelConfig, OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import Phaser from 'phaser'
import { ChallengeManager } from './components/ChallengeManager'
import { Clock } from './components/Clock'

const MAX_POINTS_PER_ROUND = 10
export class MainScene extends Phaser.Scene {
    private clock!: Clock
    private levelConfig!: LevelConfig
    private roundsCompleted: number = 0
    private points: number = 0
    private challengeManager!: ChallengeManager
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

    create() {
        const centerX = this.scale.width / 2
        const centerY = this.scale.height / 2
        const radius = Math.min(centerX, centerY) * 0.8

        this.clock = new Clock(this, centerX, centerY, radius, this.levelConfig)
        this.challengeManager = new ChallengeManager(this.levelConfig.challenges ?? [])
        this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)

        const spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        spaceKey.on('down', () => {
            const accuracy = this.clock.checkHandInTargetZone()

            if (accuracy !== null) {
                const pointsEarned = Math.round(accuracy * MAX_POINTS_PER_ROUND)
                console.log(`Accuracy: ${accuracy}`, `Points Earned: ${pointsEarned}`)

                this.points += pointsEarned
                this.roundsCompleted++

                if (this.roundsCompleted === this.levelConfig.numberOfRounds) {
                    this.onLevelEnds(this.points)
                } else {
                    this.challengeManager.applyChallenges(this.clock, this.roundsCompleted)
                    this.clock.generateNewTargetZone()
                }
            } else {
                console.log('Miss')
                this.points = Math.max(0, this.points - MAX_POINTS_PER_ROUND)
            }

            this.onTap(this.points)
        })
    }

    update() {
        this.clock.update()
    }
}
