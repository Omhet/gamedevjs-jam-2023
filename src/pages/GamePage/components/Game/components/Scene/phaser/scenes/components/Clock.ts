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
    private handRotationSpeed: number = 0.01
    private handRotationDirection: number = 1
    private targetZoneGraphics: Phaser.GameObjects.Graphics
    private targetZoneStartAngle!: number
    private targetZoneEndAngle!: number
    private targetZoneRotationSpeed: number = 0
    private targetZoneRotationDirection: number = 1
    private targetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private initialTargetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private forgivingAngleOffset: number = 3 // You can adjust this value to make the game more or less forgiving
    private time: number = 1

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
        const angleDifference = Phaser.Math.Angle.Wrap(adjustedEndAngle - adjustedStartAngle)

        this.targetZoneGraphics.clear()

        const subzonePercentages = [0.3, 0.15, 0.1]
        const subzoneColors = [0x888888, 0x444444, 0x000000]

        let startAngle = adjustedStartAngle

        const drawSubzone = (color: number, percentage: number) => {
            const subzoneAngleDifference = angleDifference * percentage
            const endAngle = startAngle + subzoneAngleDifference

            this.targetZoneGraphics.fillStyle(color, 1)
            this.targetZoneGraphics.beginPath()
            this.targetZoneGraphics.moveTo(this.centerX, this.centerY)
            this.targetZoneGraphics.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle, false, 0.01)
            this.targetZoneGraphics.closePath()
            this.targetZoneGraphics.fillPath()

            startAngle = endAngle
        }

        for (let i = 0; i < subzonePercentages.length; i++) {
            drawSubzone(subzoneColors[i], subzonePercentages[i])
        }

        for (let i = subzonePercentages.length - 2; i >= 0; i--) {
            drawSubzone(subzoneColors[i], subzonePercentages[i])
        }
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
        const targetZoneStartAngle = Phaser.Math.Wrap(Phaser.Math.RadToDeg(this.targetZoneStartAngle), 0, 360)
        const targetZoneEndAngle = Phaser.Math.Wrap(Phaser.Math.RadToDeg(this.targetZoneEndAngle), 0, 360)

        const extendedStartAngle = Phaser.Math.Wrap(targetZoneStartAngle - this.forgivingAngleOffset, 0, 360)
        const extendedEndAngle = Phaser.Math.Wrap(targetZoneEndAngle + this.forgivingAngleOffset, 0, 360)

        const targetZoneCrossesZero = extendedEndAngle < extendedStartAngle

        const isHandInTargetZone = targetZoneCrossesZero
            ? handAngle >= extendedStartAngle || handAngle <= extendedEndAngle
            : handAngle >= extendedStartAngle && handAngle <= extendedEndAngle

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
        const angularDistance = Math.abs(Phaser.Math.Angle.Wrap(handAngleRad - targetZoneCenter))

        const halfZoneSize = (this.targetZoneEndAngle - this.targetZoneStartAngle) / 2

        // Adjusting the target zone size with forgivingAngleOffset
        const adjustedHalfZoneSize = halfZoneSize + Phaser.Math.DegToRad(this.forgivingAngleOffset)

        // Clamp angularDistance to be between 0 and adjustedHalfZoneSize
        const clampedAngularDistance = Phaser.Math.Clamp(angularDistance, 0, adjustedHalfZoneSize)

        const normalizedDistance = clampedAngularDistance / adjustedHalfZoneSize
        const accuracy = 1 - normalizedDistance

        return accuracy
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

    updateTargetZoneSize(round: number, minTargetZoneSize: number): void {
        const decreaseStep =
            (1 - minTargetZoneSize / this.initialTargetZoneSizeRange[1]) / this.levelConfig.numberOfRounds
        const decreaseFactor = 1 - round * decreaseStep

        const newSizeRange = [
            Math.max(minTargetZoneSize, this.targetZoneSizeRange[0] * decreaseFactor),
            Math.max(minTargetZoneSize, this.targetZoneSizeRange[1] * decreaseFactor),
        ] as [number, number]

        // Ensure that the minimum size is not greater than the maximum size
        if (newSizeRange[0] <= newSizeRange[1]) {
            this.targetZoneSizeRange = newSizeRange
        }
    }

    updateHandRotationSpeed(round: number, maxHandSpeed: number): void {
        const increaseFactorPerRound =
            (maxHandSpeed / this.initialHandRotationSpeed - 1) / (this.levelConfig.numberOfRounds - 1)
        const increaseFactor = 1 + round * increaseFactorPerRound
        this.handRotationSpeed = this.initialHandRotationSpeed * increaseFactor * this.handRotationDirection
    }

    updateTargetZoneRotationSpeed(round: number, minTargetZoneSpeed: number, maxTargetZoneSpeed: number): void {
        const increaseFactorPerRound =
            (maxTargetZoneSpeed / minTargetZoneSpeed - 1) / (this.levelConfig.numberOfRounds - 1)
        const increaseFactor = 1 + round * increaseFactorPerRound
        this.targetZoneRotationSpeed = minTargetZoneSpeed * increaseFactor

        if (Math.abs(this.handRotationSpeed - this.targetZoneRotationSpeed) < 0.01) {
            this.targetZoneRotationDirection = -this.handRotationDirection
        } else {
            this.targetZoneRotationDirection = Math.random() < 0.5 ? 1 : -1
        }
    }

    updateTime(time: number): void {
        this.time = time
    }

    public update(): void {
        this.hand.rotation += this.handRotationSpeed * this.handRotationDirection * this.time
        this.targetZoneStartAngle += this.targetZoneRotationSpeed * this.targetZoneRotationDirection * this.time
        this.targetZoneEndAngle += this.targetZoneRotationSpeed * this.targetZoneRotationDirection * this.time
        this.drawTargetZone()
    }
}
