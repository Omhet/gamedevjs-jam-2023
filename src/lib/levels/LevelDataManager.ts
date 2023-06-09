import { groupBy } from 'utils/groupBy'
import { uniqueByField } from 'utils/unique'
import { AudioManager, LevelSounds } from './AudioManager'
import { ImagesManager, LevelImageUrls, LevelImages } from './ImagesManager'
import { Challenge, LEVELS, Powerup, Region } from './levelData'

export type LevelType = {
    number: number
    score: number
    maxScore: number
    completed: boolean
    title: string
    initialHandSpeed?: number
    startOnboarding: string
    endOnboarding: string
    endOnboardingLoose?: string
    minNumberOfRounds: number
    maxNumberOfRounds: number
    audio: LevelSounds
    images: LevelImages
    imgUrls: LevelImageUrls
    region: Region
    regionName: string
    powerups?: Powerup[]
    challenges?: Challenge[]
    miniBoss?: {
        name: string
        description: string
    }
}

class LevelDataManager {
    currentLevel = 1
    levels: LevelType[] = []

    constructor(public audioManager: AudioManager, public imagesManager: ImagesManager) {
        // @ts-ignore
        this.levels = [...LEVELS]
    }

    async loadLevelData(levelNumber: number) {
        this.currentLevel = levelNumber

        const requests: [Promise<LevelSounds>, Promise<LevelImages>] = [
            this.audioManager.loadGameSounds(),
            this.imagesManager.loadLevelImages(levelNumber),
        ]

        try {
            const [audio, images] = await Promise.all(requests)
            const data = {
                audio,
                images,
            }
            const index = levelNumber - 1

            this.levels[levelNumber - 1] = {
                ...LEVELS[index],
                ...data,
            }

            return data
        } catch (error) {
            console.error(error)
        }
    }

    // getLevelMusic() {
    //     return this.audioManager.getLevelTrack(this.currentLevel)
    // }

    // playLevelMusic() {
    //     this.audioManager.playLevelTrack(this.currentLevel)
    // }

    // stopLevelMusic() {
    //     this.audioManager.stopLevelTrack(this.currentLevel)
    // }

    getAllLevels() {
        return this.levels
    }

    getAllLevelsGroupedByRegion() {
        return groupBy(this.levels, 'regionName')
    }

    getAllRegions() {
        return uniqueByField(
            this.levels.map((level) => level.region),
            'name'
        )
    }

    getCurrentLevelData() {
        return this.levels[this.currentLevel - 1]
    }

    getLevelData(number: number) {
        return this.levels[number - 1]
    }
}

const musicUrls = LEVELS.map(({ musicUrl }) => musicUrl)
const audioManager = new AudioManager([])

const imageUrls = LEVELS.map(({ imgUrls }) => imgUrls)
const imagesManager = new ImagesManager(imageUrls)

export const levelDataManager = new LevelDataManager(audioManager, imagesManager)
// @ts-ignore
window.getCurrentLevelData = levelDataManager.getCurrentLevelData.bind(levelDataManager)
