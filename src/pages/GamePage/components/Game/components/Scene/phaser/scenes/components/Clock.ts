import Phaser from 'phaser'

const clockFaceColor = 0xcccccc
const handColor = 0x0000ff
const targetZoneColor = 0x000000

export class Clock {
    private scene: Phaser.Scene
    private clockFace: Phaser.GameObjects.Arc
    private hand: Phaser.GameObjects.Rectangle
    private handRotationSpeed: number = 0.01
    private targetZoneGraphics: Phaser.GameObjects.Graphics
    private targetZoneStartAngle!: number
    private targetZoneEndAngle!: number
    private centerX: number
    private centerY: number
    private radius: number

    constructor(scene: Phaser.Scene, centerX: number, centerY: number, radius: number) {
        this.centerX = centerX
        this.centerY = centerY
        this.radius = radius
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

    // Add this method to the Clock class
    generateNewTargetZone() {
        this.targetZoneStartAngle = Phaser.Math.FloatBetween(0, Math.PI * 2)
        const targetZoneSize = Phaser.Math.FloatBetween(Math.PI / 6, Math.PI / 3)
        this.targetZoneEndAngle = Phaser.Math.Wrap(this.targetZoneStartAngle + targetZoneSize, 0, Math.PI * 2)
        this.drawTargetZone()
    }

    isHandInTargetZone(): boolean {
        // Get the hand's current angle, wrapping it between 0 and 360
        const handAngle = Phaser.Math.Wrap(this.hand.angle, 0, 360)

        // Convert the start and end angles of the target zone to degrees
        const targetZoneStartAngle = Phaser.Math.RadToDeg(this.targetZoneStartAngle)
        const targetZoneEndAngle = Phaser.Math.RadToDeg(this.targetZoneEndAngle)

        // Check if the target zone spans across the 0 angle (360 degrees)
        const targetZoneCrossesZero = targetZoneEndAngle < targetZoneStartAngle

        // console.log({ targetZoneStartAngle, targetZoneEndAngle, handAngle })

        // Check if the hand is within the target zone, taking into account whether the target zone spans across the 0 angle
        const isHandInTargetZone = targetZoneCrossesZero
            ? handAngle >= targetZoneStartAngle || handAngle <= targetZoneEndAngle
            : handAngle >= targetZoneStartAngle && handAngle <= targetZoneEndAngle

        // Return true if the hand is within the target zone, otherwise return false
        return isHandInTargetZone
    }

    checkHandInTargetZone(): boolean {
        const isHandInZone = this.isHandInTargetZone()

        if (isHandInZone) {
            this.generateNewTargetZone()
        }

        return isHandInZone
    }

    public update(): void {
        this.hand.rotation += this.handRotationSpeed
    }
}
