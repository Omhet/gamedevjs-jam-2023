export type Region = {
    name: string
    description: string
    levels: Level[]
}

type Level = {
    title: string
    startOnboarding: string
    endOnboarding: string
    numberOfRounds: number
    powerups?: string[]
    challenges?: string[]
    miniBoss?: {
        name: string
        description: string
    }
}

type LevelsData = {
    regions: Region[]
}

const WoodsRegion = {
    name: 'ChronoWoods',
    description:
        'A lush, magical forest filled with ancient trees and mysterious creatures. Time anomalies are more common here due to the mystical energies of the woods.',
    levels: [
        {
            title: 'Whispers of Time',
            startOnboarding:
                'The player must navigate the dense foliage and stabilize the first time anomaly found in the woods.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 5,
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease', 'TargetZonePositionMove'],
        },
        {
            title: 'Ticking Thicket',
            startOnboarding:
                'The player encounters an area where the trees themselves have become affected by the time anomalies, causing the entire thicket to move in strange ways.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 2,
            powerups: ['TimeSlowdown'],
        },
        {
            title: 'Temporal Glade',
            startOnboarding:
                'In a serene glade, the player discovers a massive, ancient tree at the center of multiple time anomalies, requiring them to act quickly to save the tree.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown'],
            challenges: ['TargetZoneSizeDecrease'],
        },
        {
            title: 'Enchanted Canopy',
            startOnboarding:
                'The player climbs to the treetops and faces a series of anomalies high above the forest floor, where the magical energies are even more concentrated.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown'],
            challenges: ['TargetZoneSizeDecrease'],
        },
        {
            title: 'Beware ChronoCreeper',
            startOnboarding: 'First miniboss level',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown'],
            challenges: ['TargetZoneSizeDecrease'],
            miniBoss: {
                name: 'ChronoCreeper',
                description:
                    'A massive, time-twisted serpent-like creature that has been corrupted by the time anomalies. The player must defeat the ChronoCreeper to restore balance to the woods.',
            },
        },
    ],
}

const CanyonsRegion = {
    name: 'Clockwork Canyons',
    description:
        'A desolate region filled with mechanical contraptions and clockwork devices built by an ancient civilization, now inhabited by the Creepz.',
    levels: [
        {
            title: 'Sands of Time',
            startOnboarding:
                'The player enters the Clockwork Canyons, facing time anomalies within a vast desert landscape filled with buried clockwork relics.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 1,
            powerups: ['TimeSlowdown'],
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease'],
        },
        {
            title: 'Gear Gorge',
            startOnboarding:
                'The player traverses a deep gorge lined with functioning clockwork mechanisms, some of which trigger additional time anomalies.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 2,
            powerups: ['TimeSlowdown', 'TimeFreeze'],
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease'],
        },
        {
            title: 'Winding Ravine',
            startOnboarding:
                'In a serene glade, the player discovers a massive, ancient tree at the center of multiple time anomalies, requiring them to act quickly to save the tree.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown', 'TimeFreeze'],
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease'],
        },
        {
            title: 'Cog Citadel',
            startOnboarding:
                'The player climbs to the treetops and faces a series of anomalies high above the forest floor, where the magical energies are even more concentrated.',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown', 'TimeFreeze'],
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease', 'TargetZonePositionMove'],
        },
        {
            title: 'Mighty Clockroach',
            startOnboarding: 'Second miniboss level',
            endOnboarding: 'End onboarding',
            numberOfRounds: 3,
            powerups: ['TimeSlowdown', 'TimeFreeze'],
            challenges: ['TargetZoneSizeDecrease', 'HandSpeedIncrease', 'TargetZonePositionMove'],
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
        const { numberOfRounds, ...rest } = level
        const number = regionIndex * region.levels.length + levelIndex + 1
        const score = LEVELS_FROM_STORAGE[levelIndex]?.score ?? 0

        const maxScore = numberOfRounds

        const imgPath = `pics/levels/${number}`
        const imgUrls = {}

        return {
            ...rest,
            number,
            score,
            maxScore,
            numberOfRounds,
            musicUrl: `music/${number}.mp3`,
            imgUrls,
            region,
            regionName: region.name,
        }
    })
)
