export type Region = {
    name: string
    description: string
    levels: Level[]
}

export type Challenge =
    | {
          type: 'TargetZoneSizeDecrease'
          minTargetZoneSize: number
      }
    | {
          type: 'HandSpeedIncrease'
          minHandSpeed: number
          maxHandSpeed: number
      }
    | {
          type: 'TargetZonePositionMove'
          minTargetZoneSpeed: number
          maxTargetZoneSpeed: number
      }

export type Powerup =
    | {
          type: 'TimeSlowdown'
          slowdownFactor: number
          duration: number
          cooldown: number
      }
    | {
          type: 'TimeFreeze'
          duration: number
          cooldown: number
      }

export type PowerupType = Powerup['type']

type Level = {
    title: string
    startOnboarding: string
    endOnboarding: string
    endOnboardingLoose?: string
    initialHandSpeed?: number
    minNumberOfRounds: number
    maxNumberOfRounds: number
    powerups?: Powerup[]
    challenges?: Challenge[]
    miniBoss?: {
        name: string
        description: string
    }
}

type LevelsData = {
    regions: Region[]
}

export const MAX_POINTS_PER_ROUND = 3
export const MISS_POINTS_PER_ROUND = 3
export const LIVES_PER_ROUND = 3
export const SUPER_COMBO_MULTIPLIER = 2
export const SLOWEST_HAND_SPEED = 0.001

const Challenges = {
    TargetZoneSizeDecrease: {
        type: 'TargetZoneSizeDecrease',
        minTargetZoneSize: Math.PI / 12,
    },
    HandSpeedIncrease: {
        type: 'HandSpeedIncrease',
        minHandSpeed: 0.002,
        maxHandSpeed: 0.005,
    },
    TargetZonePositionMove: {
        type: 'TargetZonePositionMove',
        minTargetZoneSpeed: 0.0005,
        maxTargetZoneSpeed: 0.001,
    },
} as const

const Powerups = {
    TimeSlowdown: {
        type: 'TimeSlowdown',
        slowdownFactor: 0.5,
        duration: 5000,
        cooldown: 5000,
    },
    TimeFreeze: {
        type: 'TimeFreeze',
        duration: 2000,
        cooldown: 2000,
    },
} as const

const WoodsRegion: Region = {
    name: 'ChronoWoods',
    description:
        'A lush, magical forest filled with ancient trees and mysterious creatures.<br/>Time anomalies are more common here due to the mystical energies of the woods.',
    levels: [
        {
            title: 'Whispers of Time',
            startOnboarding:
                'Young ChronoGuardian, welcome to the ChronoWoods. The mystical energies of these ancient trees have attracted time anomalies, disrupting the harmony of this once peaceful land. Our journey begins here, in the whispers of time. Stabilize the first time anomaly found in the woods and restore order to the forest. Remember, focus on the clock hand and tap with precision. Good luck!',
            endOnboarding:
                'Well done, ChronoGuardian! You have successfully stabilized the time anomaly and brought tranquility back to this part of the woods. Your journey has only just begun, and many more challenges lie ahead. Continue to hone your skills and protect the lands of Arcadia from the Creepz forces. I have faith in your abilities.',
            minNumberOfRounds: 1,
            maxNumberOfRounds: 1,
            challenges: [
                // Challenges.HandSpeedIncrease,
                // Challenges.TargetZonePositionMove,
                // Challenges.TargetZoneSizeDecrease,
            ],
            powerups: [Powerups.TimeSlowdown],
        },
        {
            title: 'Ticking Thicket',
            startOnboarding:
                'The player encounters an area where the trees themselves have become affected by the time anomalies, causing the entire thicket to move in strange ways.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
            challenges: [
                Challenges.HandSpeedIncrease,
                Challenges.TargetZonePositionMove,
                Challenges.TargetZoneSizeDecrease,
            ],
            powerups: [Powerups.TimeSlowdown, Powerups.TimeFreeze],
        },
        {
            title: 'Temporal Glade',
            startOnboarding:
                'In a serene glade, the player discovers a massive, ancient tree at the center of multiple time anomalies, requiring them to act quickly to save the tree.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Enchanted Canopy',
            startOnboarding:
                'The player climbs to the treetops and faces a series of anomalies high above the forest floor, where the magical energies are even more concentrated.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Chrono Creeper',
            startOnboarding: 'First miniboss level',
            endOnboarding: 'End onboarding',
            endOnboardingLoose: 'HAHAHA YOU LOST',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
            challenges: [
                // Challenges.HandSpeedIncrease,
                // Challenges.TargetZonePositionMove,
                // Challenges.TargetZoneSizeDecrease,
            ],
            powerups: [Powerups.TimeSlowdown],
            miniBoss: {
                name: 'ChronoCreeper',
                description:
                    'A massive, time-twisted serpent-like creature that has been corrupted by the time anomalies. The player must defeat the ChronoCreeper to restore balance to the woods.',
            },
        },
    ],
}

const CanyonsRegion: Region = {
    name: 'Clockwork Canyons',
    description:
        'A desolate region filled with mechanical contraptions and clockwork devices built by an ancient civilization, now inhabited by the Creepz.',
    levels: [
        {
            title: 'Sands of Time',
            startOnboarding:
                'The player enters the Clockwork Canyons, facing time anomalies within a vast desert landscape filled with buried clockwork relics.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Gear Gorge',
            startOnboarding:
                'The player traverses a deep gorge lined with functioning clockwork mechanisms, some of which trigger additional time anomalies.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Winding Ravine',
            startOnboarding:
                'In a serene glade, the player discovers a massive, ancient tree at the center of multiple time anomalies, requiring them to act quickly to save the tree.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Cog Citadel',
            startOnboarding:
                'The player climbs to the treetops and faces a series of anomalies high above the forest floor, where the magical energies are even more concentrated.',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
        },
        {
            title: 'Clockroach',
            startOnboarding: 'Second miniboss level',
            endOnboarding: 'End onboarding',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
            miniBoss: {
                name: 'Clockroach',
                description:
                    'A giant, mechanical insect that has been reanimated by the Creepz to protect their stronghold. The player must defeat the Clockroach to secure the region.',
            },
        },
    ],
}

const LEVELS_DATA: LevelsData = {
    regions: [WoodsRegion, CanyonsRegion],
}

const LEVELS_FROM_STORAGE = JSON.parse(localStorage.getItem('levels') ?? '[]')

export const LEVELS = LEVELS_DATA.regions.flatMap((region, regionIndex) =>
    region.levels.map((level, levelIndex) => {
        const { maxNumberOfRounds, minNumberOfRounds, ...rest } = level
        const number = regionIndex * region.levels.length + levelIndex + 1
        const score = LEVELS_FROM_STORAGE[levelIndex]?.score ?? 0
        const completed = LEVELS_FROM_STORAGE[levelIndex]?.completed ?? false

        let maxScore = 0
        for (let i = 1; i <= maxNumberOfRounds; i++) {
            const pointsEarned = i * MAX_POINTS_PER_ROUND
            if (i > 1) {
                maxScore += pointsEarned * SUPER_COMBO_MULTIPLIER
            } else {
                maxScore += pointsEarned
            }
        }

        const imgPath = `/levels-assets/pics/${number}`
        const imgUrls = {
            back: `${imgPath}/back.jpg`,
            backEmpty: rest.miniBoss ? `${imgPath}/back-empty.jpg` : undefined,
            character: rest.miniBoss ? `${imgPath}/character.png` : '/sage.png',
            powerups: {
                TimeSlowdown: '/powerups/TimeSlowdown.jpg',
                TimeFreeze: '/powerups/TimeFreeze.jpg',
            },
        }

        return {
            ...rest,
            number,
            score,
            maxScore,
            maxNumberOfRounds,
            minNumberOfRounds,
            musicUrl: `music/${number}.mp3`,
            imgUrls,
            region,
            regionName: region.name,
            completed,
        }
    })
)
