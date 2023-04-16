import { LevelConfig } from '@app-types/game'
import Phaser from 'phaser'

const clockFaceColor = 0xcccccc
const handColor = 0x0000ff
const targetZoneColor = 0x000000

export class Clock {
    private scene: Phaser.Scene
    private clockFace: Phaser.GameObjects.Arc
    private hand: Phaser.GameObjects.Rectangle
    private initialHandRotationSpeed: number = 0.01
    private maxHandRotationSpeed: number = 0.04
    private handRotationSpeed: number = 0.01
    private targetZoneGraphics: Phaser.GameObjects.Graphics
    private targetZoneStartAngle!: number
    private targetZoneEndAngle!: number
    private targetZoneRotationSpeed: number = 0
    private targetZoneRotationDirection: number = 1
    private initialTargetZoneRotationSpeed: number = 0
    private targetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private initialTargetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private minZoneSize: number = Math.PI / 12
    private centerX: number
    private centerY: number
    private radius: number
    private levelConfig: LevelConfig

    constructor(scene: Phaser.Scene, centerX: number, centerY: number, radius: number, levelConfig: LevelConfig) {
        this.centerX = centerX
        this.centerY = centerY
        this.radius = radius
        this.levelConfig = levelConfig
        this.scene = scene
        this.clockFace = this.createClockFace()
        this.hand = this.createHand()

        this.targetZoneGraphics = scene.add.graphics({
            lineStyle: { width: 0 },
            fillStyle: { color: 0x00ff00, alpha: 0.3 },
        })

        this.generateNewTargetZone()
    }

    private createClockFace(): Phaser.GameObjects.Arc {
        const clockFace = this.scene.add.circle(this.centerX, this.centerY, this.radius, clockFaceColor)
        return clockFace
    }

    private calculateHandDimensions(): { width: number; height: number } {
        const width = this.radius * 0.025
        const height = this.radius * 0.75
        return { width, height }
    }

    private createHand(): Phaser.GameObjects.Rectangle {
        const { width, height } = this.calculateHandDimensions()
        const hand = this.scene.add.rectangle(this.centerX, this.centerY, width, height, handColor)
        hand.setOrigin(0.5, 1)
        hand.setDepth(1)
        return hand
    }

    drawTargetZone(): void {
        const adjustedStartAngle = this.targetZoneStartAngle - Math.PI / 2
        const adjustedEndAngle = this.targetZoneEndAngle - Math.PI / 2

        this.targetZoneGraphics.clear()
        this.targetZoneGraphics.fillStyle(targetZoneColor, 1)
        this.targetZoneGraphics.beginPath()
        this.targetZoneGraphics.moveTo(this.centerX, this.centerY)
        this.targetZoneGraphics.arc(
            this.centerX,
            this.centerY,
            this.radius,
            adjustedStartAngle,
            adjustedEndAngle,
            false,
            0.01
        )
        this.targetZoneGraphics.closePath()
        this.targetZoneGraphics.fillPath()
    }

    generateNewTargetZone() {
        const handAngle = Phaser.Math.Wrap(this.hand.angle, 0, 360)
        const handAngleRad = Phaser.Math.DegToRad(handAngle)

        const minDistanceRad = Phaser.Math.DegToRad(45)
        let validTargetZone = false

        while (!validTargetZone) {
            this.targetZoneStartAngle = Phaser.Math.FloatBetween(0, Math.PI * 2)
            const targetZoneSize = Phaser.Math.FloatBetween(this.targetZoneSizeRange[0], this.targetZoneSizeRange[1])
            this.targetZoneEndAngle = Phaser.Math.Wrap(this.targetZoneStartAngle + targetZoneSize, 0, Math.PI * 2)

            const minDistanceStart = Phaser.Math.Angle.ShortestBetween(handAngleRad, this.targetZoneStartAngle)
            const minDistanceEnd = Phaser.Math.Angle.ShortestBetween(handAngleRad, this.targetZoneEndAngle)

            validTargetZone =
                (minDistanceStart >= minDistanceRad && minDistanceEnd >= minDistanceRad) ||
                (minDistanceStart <= -minDistanceRad && minDistanceEnd <= -minDistanceRad)
        }

        this.drawTargetZone()
    }

    isHandInTargetZone(): boolean {
        const handAngle = Phaser.Math.Wrap(this.hand.angle, 0, 360)

        const targetZoneStartAngle = Phaser.Math.RadToDeg(this.targetZoneStartAngle)
        const targetZoneEndAngle = Phaser.Math.RadToDeg(this.targetZoneEndAngle)

        const targetZoneCrossesZero = targetZoneEndAngle < targetZoneStartAngle

        const isHandInTargetZone = targetZoneCrossesZero
            ? handAngle >= targetZoneStartAngle || handAngle <= targetZoneEndAngle
            : handAngle >= targetZoneStartAngle && handAngle <= targetZoneEndAngle

        return isHandInTargetZone
    }

    private calculateTapAccuracy(): number {
        const handAngle = Phaser.Math.Wrap(this.hand.angle, 0, 360)
        const handAngleRad = Phaser.Math.DegToRad(handAngle)

        const targetZoneCenter = Phaser.Math.Wrap(
            (this.targetZoneStartAngle + this.targetZoneEndAngle) / 2,
            0,
            Math.PI * 2
        )
        const angularDistance = Math.abs(handAngleRad - targetZoneCenter)

        const halfZoneSize = (this.targetZoneEndAngle - this.targetZoneStartAngle) / 2

        const normalizedDistance = angularDistance / halfZoneSize
        const accuracy = 1 - normalizedDistance

        return Math.max(0, accuracy)
    }

    checkHandInTargetZone(): number | null {
        const isHandInZone = this.isHandInTargetZone()

        if (isHandInZone) {
            const accuracy = this.calculateTapAccuracy()
            this.generateNewTargetZone()
            return accuracy
        }

        return null
    }

    updateTargetZoneSize(round: number): void {
        const decreaseStep =
            (1 - this.minZoneSize / this.initialTargetZoneSizeRange[1]) / this.levelConfig.numberOfRounds
        const decreaseFactor = 1 - round * decreaseStep

        const newSizeRange = [
            Math.max(this.minZoneSize, this.targetZoneSizeRange[0] * decreaseFactor),
            Math.max(this.minZoneSize, this.targetZoneSizeRange[1] * decreaseFactor),
        ] as [number, number]

        // Ensure that the minimum size is not greater than the maximum size
        if (newSizeRange[0] <= newSizeRange[1]) {
            this.targetZoneSizeRange = newSizeRange
        }
    }

    updateHandRotationSpeed(round: number): void {
        const increaseFactorPerRound =
            (this.maxHandRotationSpeed / this.initialHandRotationSpeed - 1) / (this.levelConfig.numberOfRounds - 1)
        const increaseFactor = 1 + round * increaseFactorPerRound
        this.handRotationSpeed = this.initialHandRotationSpeed * increaseFactor
    }
    updateTargetZoneRotationSpeed(round: number): void {
        const increaseFactor = Math.min(1.5, 1 + round * 0.05)
        this.targetZoneRotationSpeed = this.initialTargetZoneRotationSpeed * increaseFactor
        this.targetZoneRotationDirection = Math.random() < 0.5 ? 1 : -1
    }

    public update(): void {
        this.hand.rotation += this.handRotationSpeed
        this.targetZoneStartAngle += this.targetZoneRotationSpeed * this.targetZoneRotationDirection
        this.targetZoneEndAngle += this.targetZoneRotationSpeed * this.targetZoneRotationDirection
        this.drawTargetZone()
    }
}
