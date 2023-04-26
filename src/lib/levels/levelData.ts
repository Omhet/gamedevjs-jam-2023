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
            minNumberOfRounds: 3,
            maxNumberOfRounds: 3,
        },
        {
            title: 'Ticking Thicket',
            startOnboarding:
                'ChronoGuardian, you have ventured deeper into the ChronoWoods and entered the Ticking Thicket. In this mysterious part of the forest, the trees have been warped by time anomalies, their movements distorted by these strange forces. As you face this new challenge, I bestow upon you a new ability: Time Slowdown. Use it wisely to navigate through the thicket and stabilize the time anomaly hidden within. To activate Time Slowdown, focus your energy and click the button on screen or press "1" key on your numpad. Remember, timing is crucial. Good luck on your journey!',
            endOnboarding:
                'Congratulations, ChronoGuardian! You have triumphed over the Ticking Thicket and stabilized the time anomaly, restoring the natural flow of time to this enchanted grove. Your mastery of the Time Slowdown ability has proven invaluable in this endeavor. As you continue your quest through the lands of Arcadia, stay vigilant, for the Creepz forces grow stronger and more cunning with each challenge. Trust in your abilities, and the balance of time shall be preserved.',
            minNumberOfRounds: 3,
            maxNumberOfRounds: 6,
            initialHandSpeed: SLOWEST_HAND_SPEED * 1.2,
            powerups: [Powerups.TimeSlowdown],
        },
        {
            title: 'Temporal Glade',
            startOnboarding:
                'ChronoGuardian, your journey has led you to the Temporal Glade, a place of serenity and age-old wisdom. At its heart lies a magnificent ancient tree, a beacon of life and stability in the forest. Alas, the tree has become ensnared by multiple time anomalies, threatening its very existence. You must act swiftly and with great precision to save this symbol of timeless strength. In this challenge, the target zone will decrease in size with every successful tap, demanding even greater focus from you. Trust in your skills and restore harmony to the Temporal Glade!',
            endOnboarding:
                'Well done, ChronoGuardian! Your swift actions and unwavering focus have saved the ancient tree and stabilized the time anomalies in the Temporal Glade. The tree stands tall once again, a testament to your growing mastery over time itself. As you venture further into the lands of Arcadia, remember the lessons of the glade and face the ever-increasing challenges with courage and determination. The Creepz forces will not rest, and neither shall you, guardian of time!',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 7,
            initialHandSpeed: SLOWEST_HAND_SPEED * 1.2,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 8,
                },
            ],
            powerups: [Powerups.TimeSlowdown],
        },
        {
            title: 'Enchanted Canopy',
            startOnboarding:
                'ChronoGuardian, your journey takes you to the Enchanted Canopy, where the treetops brim with concentrated magical energies. These energies have given rise to a series of anomalies, high above the forest floor, that you must now face. The challenge grows more difficult as you climb higher, but I am confident in your ability to stabilize these anomalies and protect the enchanted forest.',
            endOnboarding:
                'Splendid work, ChronoGuardian! Your unwavering determination has brought stability to the Enchanted Canopy. As you continue your journey, the challenges will become increasingly difficult, and I sense the presence of a formidable foe ahead: the Chrono Creeper. Be prepared for this confrontation, and let your skill and perseverance carry you through. Remember, your duty as a guardian of time is to restore harmony to the lands of Arcadia. Keep pressing forward, and let the wisdom of the ChronoWoods guide you.',
            endOnboardingLoose:
                'ChronoGuardian, it appears that the time anomalies in the Enchanted Canopy have proven to be quite challenging, and you were not able to fully stabilize them this time. Remember, the path of a guardian is filled with trials and tribulations, and as the Chrono Creeper looms closer, it is crucial that you gather your strength and hone your skills. Do not lose heart, for your journey must continue. Face the challenges that lie ahead, and soon you will be ready to confront the formidable Chrono Creeper. I have faith in your abilities.',
            minNumberOfRounds: 3,
            maxNumberOfRounds: 8,
            initialHandSpeed: SLOWEST_HAND_SPEED * 1.5,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 10,
                },
            ],
            powerups: [Powerups.TimeSlowdown],
        },
        {
            title: 'Chrono Creeper',
            startOnboarding:
                "Hahaha, puny ChronoGuardian! You think you can just waltz into my lair and mess with my plans? The Creepz created me, the ChronoCreeper, the biggest, baddest, time-twisted serpent around! You're just a tiny little bug waiting to be squashed. Get ready for a world of pain! And remember, even if you defeat me, the Creepz won't stop until they conquer all of Arcadia!",
            endOnboarding:
                "Argh! No way! How could a puny little Guardian like you beat the amazing ChronoCreeper? The Creepz may have created me, but they won't stop coming. There are bigger, badder, and meaner Creepz out there just waiting to get their hands on you. Enjoy your victory while you can, because Arcadia is still far from safe!",
            endOnboardingLoose:
                "Hahaha! I told you that you were no match for me, the mighty ChronoCreeper! The Creepz will continue their conquest of Arcadia, and there's nothing you can do about it. Enjoy your failure, little Guardian. Maybe next time, you'll learn not to mess with the big boys!",
            minNumberOfRounds: 7,
            maxNumberOfRounds: 10,
            initialHandSpeed: SLOWEST_HAND_SPEED * 2,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 14,
                },
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
                "ChronoGuardian, you've defeated the ChronoCreeper and halted the Creepz in the ChronoWoods. Yet, they've reached the Clockwork Canyons, an area filled with ancient clockwork relics. We now venture to the Sands of Time, where you'll face a new challenge: the moving target zone, which increases its speed with each successful tap. Stay focused and adaptable. Good luck!",
            endOnboarding:
                'Well done, ChronoGuardian! Your swift and precise actions have brought stability back to the Sands of Time. As we continue our journey through the Clockwork Canyons, more challenges and mysteries await. Remember to stay vigilant and adaptable, as the Creepz will not rest until they conquer all of Arcadia. I have faith in your abilities and trust that you will protect the land from their nefarious schemes.',
            minNumberOfRounds: 4,
            maxNumberOfRounds: 6,
            initialHandSpeed: SLOWEST_HAND_SPEED * 1.5,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 12,
                },
                {
                    type: 'TargetZonePositionMove',
                    minTargetZoneSpeed: 0.0004,
                    maxTargetZoneSpeed: 0.0007,
                },
            ],
            powerups: [Powerups.TimeSlowdown],
        },
        {
            title: 'Gear Gorge',
            startOnboarding:
                'Brace yourself, ChronoGuardian, as we journey into Gear Gorge, where functional clockwork mechanisms line the walls. These gears, while impressive, may trigger additional time anomalies. But fear not, for you have gained a new power: Time Freeze. Activate with "2" key or click the button. This ability will briefly halt time, allowing you to better navigate the challenges ahead. Use it wisely and continue your mission to protect Arcadia.',
            endOnboarding:
                'Excellent work, ChronoGuardian! Your mastery of Time Freeze has proven invaluable in stabilizing the time anomalies within Gear Gorge. Your journey through the Clockwork Canyons continues, and the Creepz shall not prevail. With your growing skills and determination, I have no doubt that you will succeed in safeguarding Arcadia from their grasp.',
            minNumberOfRounds: 6,
            maxNumberOfRounds: 8,
            initialHandSpeed: SLOWEST_HAND_SPEED * 1.5,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 14,
                },
                {
                    type: 'TargetZonePositionMove',
                    minTargetZoneSpeed: 0.0005,
                    maxTargetZoneSpeed: 0.0008,
                },
            ],
            powerups: [Powerups.TimeSlowdown, Powerups.TimeFreeze],
        },
        {
            title: 'Winding Ravine',
            startOnboarding:
                'ChronoGuardian, you now face the Winding Ravine, a narrow passage filled with wind-up creatures unleashed by the Creepz, causing chaos and time disruptions. As you progress, be aware of a new challenge: the clock hand speed will increase. Stay focused and adapt to this change to continue restoring balance to the Clockwork Canyons.',
            endOnboarding:
                "Well done, ChronoGuardian! You have skillfully navigated the Winding Ravine and adapted to the increasing clock hand speed. Your unwavering determination brings us closer to restoring peace in the Clockwork Canyons. Remember, the Creepz' plans will not succeed as long as you stand in their way. Keep pushing forward, and protect the lands of Arcadia.",
            minNumberOfRounds: 5,
            maxNumberOfRounds: 7,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 14,
                },
                {
                    type: 'TargetZonePositionMove',
                    minTargetZoneSpeed: 0.0005,
                    maxTargetZoneSpeed: 0.0008,
                },
                {
                    type: 'HandSpeedIncrease',
                    minHandSpeed: SLOWEST_HAND_SPEED * 1.5,
                    maxHandSpeed: SLOWEST_HAND_SPEED * 2,
                },
            ],
            powerups: [Powerups.TimeSlowdown, Powerups.TimeFreeze],
        },
        {
            title: 'Cog Citadel',
            startOnboarding:
                "ChronoGuardian, you now approach the Cog Citadel, an ancient clockwork fortress that the Creepz have overtaken. This fortress has become a major source of time anomalies in the region. Infiltrate the citadel and neutralize the time disruptions to weaken the Creepz' grip on the Clockwork Canyons. Stay vigilant and trust in your abilities.",
            endOnboarding:
                'Impressive work, ChronoGuardian! By neutralizing the time anomalies within the Cog Citadel, you have struck a significant blow against the Creepz in this region. However, be prepared for an even greater challenge ahead. The Creepz have reanimated a giant, mechanical insect called the Clockroach to protect their stronghold. You must defeat this fearsome adversary to secure the region and push the Creepz forces back. Your actions continue to protect the lands of Arcadia and keep them from falling into darkness. Be proud of your accomplishments and remember that your journey is far from over. I have faith in your abilities.',
            minNumberOfRounds: 3,
            maxNumberOfRounds: 8,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 14,
                },
                {
                    type: 'TargetZonePositionMove',
                    minTargetZoneSpeed: 0.0007,
                    maxTargetZoneSpeed: 0.001,
                },
                {
                    type: 'HandSpeedIncrease',
                    minHandSpeed: SLOWEST_HAND_SPEED * 1.3,
                    maxHandSpeed: SLOWEST_HAND_SPEED * 1.7,
                },
            ],
            powerups: [Powerups.TimeSlowdown, Powerups.TimeFreeze],
        },
        {
            title: 'Clockroach',
            startOnboarding:
                'ChronoGuardian... me protect... Creepz stronghold. You... no pass. Me... Clockroach. You... fight me... now.',
            endOnboarding: 'Me... defeated. You... strong, ChronoGuardian... Me... go now.',
            endOnboardingLoose: 'You... weak. Me... Clockroach... win. You... try again.',
            minNumberOfRounds: 10,
            maxNumberOfRounds: 15,
            challenges: [
                {
                    type: 'TargetZoneSizeDecrease',
                    minTargetZoneSize: Math.PI / 16,
                },
                {
                    type: 'TargetZonePositionMove',
                    minTargetZoneSpeed: 0.0008,
                    maxTargetZoneSpeed: 0.003,
                },
                {
                    type: 'HandSpeedIncrease',
                    minHandSpeed: SLOWEST_HAND_SPEED * 1.8,
                    maxHandSpeed: SLOWEST_HAND_SPEED * 2.2,
                },
            ],
            powerups: [Powerups.TimeSlowdown, Powerups.TimeFreeze],
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
        const score = LEVELS_FROM_STORAGE[number - 1]?.score ?? 0
        const completed = LEVELS_FROM_STORAGE[number - 1]?.completed ?? false

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
