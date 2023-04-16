import { Clock } from './Clock'

export class ChallengeManager {
    constructor(private challenges: string[]) {}

    applyChallenges(clock: Clock, roundsCompleted: number): void {
        for (const challenge of this.challenges) {
            switch (challenge) {
                case 'TargetZoneSizeDecrease':
                    clock.updateTargetZoneSize(roundsCompleted)
                    break
                case 'HandSpeedIncrease':
                    clock.updateHandRotationSpeed(roundsCompleted)
                    break
                case 'TargetZonePositionMove':
                    clock.updateTargetZoneRotationSpeed(roundsCompleted)
                    break
                default:
                    console.warn(`Unknown challenge: ${challenge}`)
            }
        }
    }
}
