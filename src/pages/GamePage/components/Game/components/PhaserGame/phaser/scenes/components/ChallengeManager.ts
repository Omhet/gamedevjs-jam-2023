import { Challenge } from '@lib/levels/levelData'
import { Clock } from './Clock'

export class ChallengeManager {
    constructor(private challenges: Challenge[]) {}

    applyChallenges(clock: Clock, roundsCompleted: number): void {
        for (const challenge of this.challenges) {
            switch (challenge.type) {
                case 'TargetZoneSizeDecrease':
                    clock.decreaseTargetZoneSize(roundsCompleted, challenge.minTargetZoneSize)
                    break
                case 'HandSpeedIncrease':
                    clock.increaseHandRotationSpeed(roundsCompleted, challenge.minHandSpeed, challenge.maxHandSpeed)
                    break
                case 'TargetZonePositionMove':
                    clock.increaseTargetZoneRotationSpeed(
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
