import { Powerup } from '@lib/levels/levelData'
import { Clock } from './Clock'

export class PowerupManager {
    private clock: Clock

    constructor(clock: Clock) {
        this.clock = clock

        this.handlePowerupActivated = this.handlePowerupActivated.bind(this)
        this.handlePowerupDeactivated = this.handlePowerupDeactivated.bind(this)

        window.addEventListener('powerupActivated', this.handlePowerupActivated as EventListener)
        window.addEventListener('powerupDeactivated', this.handlePowerupDeactivated as EventListener)
    }

    destroy(): void {
        console.log('DWSTORYP')

        window.removeEventListener('powerupActivated', this.handlePowerupActivated as EventListener)
        window.removeEventListener('powerupDeactivated', this.handlePowerupActivated as EventListener)
    }

    handlePowerupActivated(event: CustomEvent<any>): void {
        const powerup = event.detail as Powerup

        switch (powerup.type) {
            case 'TimeSlowdown':
                this.clock.slowDownTime(powerup.slowdownFactor)
                break
            case 'TimeFreeze':
                this.clock.freezeTime()
                break
            default:
                console.warn('Unknown powerup')
        }
    }

    handlePowerupDeactivated(event: CustomEvent<any>): void {
        const powerup = event.detail as Powerup

        switch (powerup.type) {
            case 'TimeSlowdown':
                this.clock.resetTime()
                break
            case 'TimeFreeze':
                this.clock.resetTime()
                break
            default:
                console.warn('Unknown powerup')
        }
    }
}
