import { Howl } from 'howler'

type LevelSoundTypes<T> = {
    success: T
    miss: T
    missDeath: T
    bossDeath: T
    click: T
    combo: T
    countdown: T
    startGame: T
    superCombo: T
    win: T
    ost: T
}

export type LevelSoundUrls = LevelSoundTypes<string>
export type LevelSounds = LevelSoundTypes<Howl>

const soundUrls: LevelSoundUrls = {
    success: '/sounds/success.mp3',
    miss: '/sounds/miss.mp3',
    missDeath: '/sounds/miss-death.mp3',
    bossDeath: '/sounds/boss-death.mp3',
    click: '/sounds/click.mp3',
    combo: '/sounds/combo.mp3',
    countdown: '/sounds/countdown.mp3',
    startGame: '/sounds/start-game.mp3',
    superCombo: '/sounds/super-combo.mp3',
    win: '/sounds/win.mp3',
    ost: '/sounds/ost.mp3',
}

export class AudioManager {
    sounds: LevelSoundTypes<null> = {
        success: null,
        miss: null,
        missDeath: null,
        bossDeath: null,
        click: null,
        combo: null,
        countdown: null,
        startGame: null,
        superCombo: null,
        win: null,
        ost: null,
    }

    constructor(public urls: string[]) {}

    async loadSounds(urls: string[]): Promise<Howl[]> {
        const arr = urls.map((url) => this.loadSound(url))
        const resolvedArr = await Promise.allSettled(arr)
        // @ts-ignore
        return resolvedArr.filter((res) => res.status === 'fulfilled').map((res) => res.value)
    }

    async loadGameSounds(): Promise<LevelSounds> {
        const [
            success,
            miss,
            missDeath,
            bossDeath,
            click,
            combo,
            countdown,
            startGame,
            superCombo,
            win,
            ost,
        ] = await this.loadSounds([
            soundUrls.success,
            soundUrls.miss,
            soundUrls.missDeath,
            soundUrls.bossDeath,
            soundUrls.click,
            soundUrls.combo,
            soundUrls.countdown,
            soundUrls.startGame,
            soundUrls.superCombo,
            soundUrls.win,
            soundUrls.ost,
        ])

        console.log('Audio loaded', soundUrls, success)

        return {
            success,
            miss,
            missDeath,
            bossDeath,
            click,
            combo,
            countdown,
            startGame,
            superCombo,
            win,
            ost,
        }
    }

    async loadSound(url: string): Promise<Howl> {
        return new Promise((resolve, reject) => {
            const sound = new Howl({
                src: url,
            })

            sound.on('load', function () {
                resolve(sound)
            })

            sound.on('loaderror', function () {
                reject(new Error('Failed to load ' + url))
            })
        })
    }
}

// export class AudioManager {
//     tracks: HTMLAudioElement[] = []

//     constructor(public urls: string[]) {}

//     async loadLevelTrack(levelNumber: number): Promise<HTMLAudioElement> {
//         return new Promise((resolve, reject) => {
//             const index = levelNumber - 1

//             const url = this.urls[index]

//             if (!url) {
//                 reject(Error('No audio url for this level'))
//             }

//             // audio is already loading/loaded
//             const track = this.tracks[index]
//             if (track) {
//                 if (track.readyState === 4) {
//                     resolve(track)
//                 } else {
//                     track.addEventListener('canplaythrough', () => {
//                         resolve(track)
//                     })
//                 }
//                 return
//             }

//             const audio = new Audio(url)
//             this.tracks[index] = audio
//             audio.addEventListener('canplaythrough', () => {
//                 resolve(audio)
//             })
//         })
//     }

//     getLevelTrack(levelNumber: number) {
//         const index = levelNumber - 1
//         const audio = this.tracks[index]

//         if (!audio) {
//             throw Error('No audio for this level')
//         }

//         return audio
//     }

//     playLevelTrack(levelNumber: number) {
//         const index = levelNumber - 1

//         const audio = this.tracks[index]

//         if (audio) {
//             audio.volume = 0
//             audio.play()
//             adjustVolume(audio, 1)
//         }
//     }

//     async stopLevelTrack(levelNumber: number) {
//         const index = levelNumber - 1

//         const audio = this.tracks[index]

//         if (audio) {
//             await adjustVolume(audio, 0)
//             audio.pause()
//             audio.currentTime = 0
//         }
//     }
// }

// export async function adjustVolume(
//     element: HTMLMediaElement,
//     newVolume: number,
//     {
//         duration = 1000,
//         easing = swing,
//         interval = 13,
//     }: {
//         duration?: number
//         easing?: typeof swing
//         interval?: number
//     } = {}
// ): Promise<void> {
//     const originalVolume = element.volume
//     const delta = newVolume - originalVolume

//     if (!delta || !duration || !easing || !interval) {
//         element.volume = newVolume
//         return Promise.resolve()
//     }

//     const ticks = Math.floor(duration / interval)
//     let tick = 1

//     return new Promise((resolve) => {
//         const timer = setInterval(() => {
//             element.volume = originalVolume + easing(tick / ticks) * delta

//             if (++tick === ticks + 1) {
//                 clearInterval(timer)
//                 resolve()
//             }
//         }, interval)
//     })
// }

// export function swing(p: number) {
//     return 0.5 - Math.cos(p * Math.PI) / 2
// }
