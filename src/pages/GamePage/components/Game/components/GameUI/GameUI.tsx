import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import s from './GameUI.module.scss'
import RandomPositionWrapper from './RandomPosition'

function getRandomWord(): string {
    const words: string[] = [
        'Awesome',
        'Splendid',
        'Incredible',
        'Fantastic',
        'Amazing',
        'Marvelous',
        'Stunning',
        'Impressive',
        'Superb',
        'Astounding',
    ]

    const randomIndex: number = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export const GameUI: FC = () => {
    const {
        gameUI: { comboCounter, isSuperCombo, isMiss, missCounter, points },
        countdown,
    } = useGame()

    return (
        <div className={s.root}>
            {points > 0 && !isMiss && (
                <RandomPositionWrapper key={points} className={s.fadeInOut}>
                    <div className={s.points}>+{points}</div>
                    {comboCounter > 1 && (
                        <div key={comboCounter} className={s.fadeInOut}>
                            X{comboCounter} {isSuperCombo && <span>{getRandomWord()}</span>}
                        </div>
                    )}
                </RandomPositionWrapper>
            )}

            {isMiss && (
                <RandomPositionWrapper key={missCounter} className={s.fadeInOut}>
                    MISS
                </RandomPositionWrapper>
            )}

            {countdown && (
                <div key={countdown} className={s.center}>
                    <div className={s.fadeInOut}>{countdown}</div>
                </div>
            )}
        </div>
    )
}
