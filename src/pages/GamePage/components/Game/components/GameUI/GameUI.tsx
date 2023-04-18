import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import s from './GameUI.module.scss'

export const GameUI: FC = () => {
    const {
        gameUI: { comboCounter, isSuperCombo, isBonusRound, isMiss, missCounter, points },
    } = useGame()

    return (
        <div className={s.root}>
            {points > 0 && !isMiss && (
                <div key={points}>
                    <span className={s.fadeInOut}>+{points}</span>
                </div>
            )}
            {comboCounter > 1 && (
                <div key={comboCounter} className={s.fadeInOut}>
                    X{comboCounter} {isSuperCombo && <span>SUPER COMBO</span>}
                </div>
            )}
            {isBonusRound && <div>Bonus Round</div>}
            {isMiss && (
                <div key={missCounter} className={s.fadeInOut}>
                    MISS
                </div>
            )}
        </div>
    )
}
