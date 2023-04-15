import { LevelConfig, OnLevelEndsCallback } from '@app-types/game'
import Phaser from 'phaser'
import { Clock } from './components/Clock'

export class MainScene extends Phaser.Scene {
    private clock!: Clock
    private levelConfig!: LevelConfig
    private onLevelEnds!: OnLevelEndsCallback
    private roundsCompleted: number = 0
    private points: number = 0

    constructor() {
        super('MainScene')
    }

    init(data: { levelConfig: LevelConfig; onLevelEnds: OnLevelEndsCallback }): void {
        this.levelConfig = data.levelConfig
        this.onLevelEnds = data.onLevelEnds
    }

    create() {
        const centerX = this.scale.width / 2
        const centerY = this.scale.height / 2
        const radius = Math.min(centerX, centerY) * 0.8

        this.clock = new Clock(this, centerX, centerY, radius)

        const spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        spaceKey.on('down', () => {
            if (this.clock.checkHandInTargetZone()) {
                console.log('Success')
                this.points++
                this.roundsCompleted++

                if (this.roundsCompleted === this.levelConfig.numberOfRounds) {
                    this.onLevelEnds(this.points)
                    this.scene.pause()
                } else {
                    this.clock.generateNewTargetZone()
                }
            } else {
                console.log('Miss')
                this.points = Math.max(0, this.points - 1)
            }
        })
    }

    update() {
        this.clock.update()
    }
}
