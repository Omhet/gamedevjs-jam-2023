type LevelConfig = {
    title: string
    startOnboarding: {
        text: string
    }
    endOnboarding: {
        text: string
    }
    numberOfRounds: number
}

const LEVELS_DATA: LevelConfig[] = [
    {
        title: 'Whispers of Time',
        startOnboarding: {
            text: 'The player must navigate the dense foliage and stabilize the first time anomaly found in the woods.',
        },
        endOnboarding: {
            text: 'End onboarding',
        },
        numberOfRounds: 2,
    },
]

const LEVELS_FROM_STORAGE = JSON.parse(localStorage.getItem('levels') ?? '[]')

export const LEVELS = LEVELS_DATA.map(({ title, numberOfRounds, ...rest }, index) => {
    const number = index + 1
    const score = LEVELS_FROM_STORAGE[index]?.score ?? 0

    const maxScore = numberOfRounds

    const imgPath = `pics/levels/${number}`
    const imgUrls = {}

    return {
        ...rest,
        title,
        number,
        score,
        maxScore,
        numberOfRounds,
        musicUrl: `music/${number}.mp3`,
        imgUrls,
    }
})
