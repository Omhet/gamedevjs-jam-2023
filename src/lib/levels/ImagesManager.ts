type LevelImageTypes<T> = {
    back: T
    character: T
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

        const { back, character } = levelImageUrls
        const [backImg, characterImg] = await Promise.all([this.loadImage(back), this.loadImage(character)])

        return {
            back: backImg,
            character: characterImg,
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
        console.log(url)

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
