type LevelImageTypes<T> = {}

export type LevelImageUrls = LevelImageTypes<string>
export type LevelImages = LevelImageTypes<HTMLImageElement>

export class ImagesManager {
    images: LevelImages[] = []

    constructor(public levelImageUrls: LevelImageUrls[]) {}

    async loadLevelImages(levelNumber: number): Promise<LevelImages> {
        const index = levelNumber - 1

        const levelImageUrl = this.levelImageUrls[index]
        if (!levelImageUrl) {
            throw Error('No images url for this level')
        }

        // const {} = levelImageUrl
        // const [] = await Promise.all([
        //     this.loadImage(back.horizontal),
        //     this.loadImage(back.vertical),
        //     this.loadImages(food),
        //     this.loadImage(master),
        //     this.loadImage(ingredient),
        //     this.loadImage(table),
        //     this.loadImage(zone),
        //     this.loadImages(particles),
        // ])

        return {}
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
