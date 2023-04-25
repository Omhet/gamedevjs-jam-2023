import { LevelConfig } from '@app-types/game'
import { SLOWEST_HAND_SPEED } from '@lib/levels/levelData'
import Phaser from 'phaser'

const handColor = 0x7e42ff

export class Clock {
    private scene: Phaser.Scene
    private hand: Phaser.GameObjects.Rectangle
    private handRotationSpeed: number = 0
    private handRotationDirection: number = 1
    private targetZoneGraphics: Phaser.GameObjects.Graphics
    private targetZoneStartAngle!: number
    private targetZoneEndAngle!: number
    private targetZoneRotationSpeed: number = 0
    private targetZoneRotationDirection: number = 1
    private targetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private initialTargetZoneSizeRange: [number, number] = [Math.PI / 2, Math.PI / 1.5]
    private forgivingAngleOffset: number = 3 // You can adjust this value to make the game more or less forgiving
    private handTime: number = 1
    private targetZoneTime: number = 1

    private prevHandInZone: boolean = false
    public handCrossedZoneTimes: number = 0

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
        this.createClockFace()
        this.hand = this.createHand()

        this.targetZoneGraphics = scene.add.graphics({
            lineStyle: { width: 0 },
            fillStyle: { color: 0x00ff00, alpha: 0.3 },
        })
    }

    private createClockFace(): void {
        this.scene.add.circle(this.centerX, this.centerY, this.radius * 1.04, 0x150c26)
        this.scene.add.circle(this.centerX, this.centerY, this.radius * 1.02, 0x5629b5)
        this.scene.add.circle(this.centerX, this.centerY, this.radius, 0x130929)
        this.scene.add.circle(this.centerX, this.centerY, this.radius * 0.96, 0x190d33)
        this.scene.add.circle(this.centerX, this.centerY, this.radius * 0.3, 0x1d1038)
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

        const circle = this.scene.add.circle(this.centerX, this.centerY, this.radius * 0.1, 0x7e42ff)
        circle.setDepth(2)

        this.handRotationSpeed = this.levelConfig.initialHandSpeed ?? SLOWEST_HAND_SPEED
        return hand
    }

    drawTargetZone(): void {
        const adjustedStartAngle = this.targetZoneStartAngle - Math.PI / 2
        const adjustedEndAngle = this.targetZoneEndAngle - Math.PI / 2

        this.targetZoneGraphics.clear()

        const subzonePercentages = [0.3, 0.15, 0.1]
        const subzoneColors = [0x0e5a41, 0x168963, 0x0dab76]

        let currentAngle = adjustedStartAngle

        const drawSubzone = (color: number, percentage: number) => {
            const subzoneAngleDifference = (adjustedEndAngle - adjustedStartAngle) * percentage
            const nextAngle = currentAngle + subzoneAngleDifference

            this.targetZoneGraphics.fillStyle(color, 1)
            this.targetZoneGraphics.beginPath()
            this.targetZoneGraphics.moveTo(this.centerX, this.centerY)
            this.targetZoneGraphics.arc(this.centerX, this.centerY, this.radius, currentAngle, nextAngle, false, 0.01)
            this.targetZoneGraphics.closePath()
            this.targetZoneGraphics.fillPath()

            currentAngle = nextAngle
        }

        for (let i = 0; i < subzonePercentages.length; i++) {
            drawSubzone(subzoneColors[i], subzonePercentages[i])
        }

        for (let i = subzonePercentages.length - 2; i >= 0; i--) {
            drawSubzone(subzoneColors[i], subzonePercentages[i])
        }
    }

    generateNewTargetZone() {
        this.handCrossedZoneTimes = 0
        this.prevHandInZone = false

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

    hideTargetZone() {
        this.targetZoneStartAngle = 0
        this.targetZoneEndAngle = 0
        this.targetZoneRotationSpeed = 0

        this.drawTargetZone()
    }

    kill() {
        this.targetZoneStartAngle = 0
        this.targetZoneEndAngle = Math.PI * 2
        this.targetZoneRotationSpeed = 0
        this.handRotationSpeed = 0
        // this.drawTargetZone()
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
            return accuracy
        }

        return null
    }

    decreaseTargetZoneSize(round: number, minTargetZoneSize: number): void {
        const decreaseStep =
            (1 - minTargetZoneSize / this.initialTargetZoneSizeRange[1]) / this.levelConfig.maxNumberOfRounds
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

    increaseTargetZoneSize(currentLives: number, initialLives: number): void {
        const maxSize = Math.PI
        const currentSize = this.targetZoneEndAngle - this.targetZoneStartAngle
        const newSize = currentSize + (maxSize - currentSize) * (1 - currentLives / initialLives)

        const clampedNewSize = Math.min(newSize, maxSize)
        const halfNewSize = clampedNewSize / 2
        const targetZoneCenter = (this.targetZoneStartAngle + this.targetZoneEndAngle) / 2

        this.targetZoneStartAngle = Phaser.Math.Wrap(targetZoneCenter - halfNewSize, 0, 2 * Math.PI)
        this.targetZoneEndAngle = Phaser.Math.Wrap(targetZoneCenter + halfNewSize, 0, 2 * Math.PI)

        this.drawTargetZone()
    }

    increaseHandRotationSpeed(round: number, minHandSpeed: number, maxHandSpeed: number): void {
        const increaseFactorPerRound = (maxHandSpeed / minHandSpeed - 1) / (this.levelConfig.maxNumberOfRounds - 1)
        const increaseFactor = 1 + round * increaseFactorPerRound
        this.handRotationSpeed = minHandSpeed * increaseFactor * this.handRotationDirection
    }

    setHandSpeed(speed: number): void {
        this.handRotationSpeed = speed
    }

    increaseTargetZoneRotationSpeed(round: number, minTargetZoneSpeed: number, maxTargetZoneSpeed: number): void {
        const increaseFactorPerRound =
            (maxTargetZoneSpeed / minTargetZoneSpeed - 1) / (this.levelConfig.maxNumberOfRounds - 1)
        const increaseFactor = 1 + round * increaseFactorPerRound
        this.targetZoneRotationSpeed = minTargetZoneSpeed * increaseFactor

        if (Math.abs(this.handRotationSpeed - this.targetZoneRotationSpeed) < 0.01) {
            this.targetZoneRotationDirection = -this.handRotationDirection
        } else {
            this.targetZoneRotationDirection = Math.random() < 0.5 ? 1 : -1
        }
    }

    slowDownAllTime(slowdownFactor: number): void {
        this.handTime *= slowdownFactor
        this.targetZoneTime *= slowdownFactor
    }

    freezeTargetZoneTime(): void {
        this.targetZoneTime = 0
    }

    unfreezeTargetZoneTime(): void {
        this.targetZoneTime = this.handTime
    }

    resetHandTime(): void {
        this.handTime = 1
    }

    resetTargetZoneTime(): void {
        this.targetZoneTime = this.targetZoneTime !== 0 ? 1 : this.targetZoneTime
    }

    public checkHandCrossedZone(delta: number): void {
        this.hand.rotation += this.handRotationSpeed * this.handRotationDirection * this.handTime * delta
        const currHandInZone = this.isHandInTargetZone()

        if (this.prevHandInZone && !currHandInZone) {
            console.log('Crossed')
            this.handCrossedZoneTimes++
        }

        this.prevHandInZone = currHandInZone
    }

    public update(delta: number): void {
        this.checkHandCrossedZone(delta)
        this.targetZoneStartAngle +=
            this.targetZoneRotationSpeed * this.targetZoneRotationDirection * this.targetZoneTime * delta
        this.targetZoneEndAngle +=
            this.targetZoneRotationSpeed * this.targetZoneRotationDirection * this.targetZoneTime * delta
        this.drawTargetZone()
    }
}
