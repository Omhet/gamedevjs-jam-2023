import { PowerupType } from './levelData'

type LevelImageTypes<T> = {
    back: T
    character: T
    powerups: Record<PowerupType, T>
}

export type LevelImageUrls = LevelImageTypes<string>
export type LevelImages = LevelImageTypes<HTMLImageElement>

export class ImagesManager {
    images: LevelImages[] = []

    constructor(public levelImageUrls: LevelImageUrls[]) {}

    async loadLevelImages(levelNumber: number): Promise<LevelImages> {
        const index = levelNumber - 1

        const levelImageUrls = this.levelImageUrls[index]
        if (!levelImageUrls) {
            throw Error('No images url for this level')
        }

        const { back, character, powerups } = levelImageUrls
        const [backImg, characterImg, TimeSlowdownImg, TimeFreezeImg] = await Promise.all([
            this.loadImage(back),
            this.loadImage(character),
            this.loadImage(powerups.TimeSlowdown),
            this.loadImage(powerups.TimeFreeze),
        ])

        return {
            back: backImg,
            character: characterImg,
            powerups: {
                TimeSlowdown: TimeSlowdownImg,
                TimeFreeze: TimeFreezeImg,
            },
        }
    }

    async loadImages(urls: string[]): Promise<HTMLImageElement[]> {
        const arr = urls.map((url) => this.loadImage(url))
        const resolvedArr = await Promise.allSettled(arr)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return resolvedArr.filter((res) => res.status === 'fulfilled').map((res) => res.value)
    }

    async loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = url

            img.onload = () => {
                resolve(img)
            }

            img.onerror = (err) => {
                reject(err)
            }
        })
    }
}
