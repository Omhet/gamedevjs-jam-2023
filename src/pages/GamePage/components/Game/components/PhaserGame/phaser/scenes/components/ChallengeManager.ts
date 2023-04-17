import { Challenge } from '@lib/levels/levelData'
import { Clock } from './Clock'

export class ChallengeManager {
    constructor(private challenges: Challenge[]) {}

    applyChallenges(clock: Clock, roundsCompleted: number): void {
        for (const challenge of this.challenges) {
            switch (challenge.type) {
                case 'TargetZoneSizeDecrease':
                    clock.updateTargetZoneSize(roundsCompleted, challenge.minTargetZoneSize)
                    break
                case 'HandSpeedIncrease':
                    clock.updateHandRotationSpeed(roundsCompleted, challenge.maxHandSpeed)
                    break
                case 'TargetZonePositionMove':
                    clock.updateTargetZoneRotationSpeed(
                        roundsCompleted,
                        challenge.minTargetZoneSpeed,
                        challenge.maxTargetZoneSpeed
                    )
                    break
                default:
                    console.warn('Unknown challenge')
            }
        }
    }
}
