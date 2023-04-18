import { useGame } from '@store/game/gameStore'
import { FC } from 'react'
import s from './GameUI.module.scss'

export const GameUI: FC = () => {
    const { gameUI } = useGame()

    return (
        <div className={s.root}>
            {gameUI.comboCounter > 0 && (
                <div className={s.fadeIn}>
                    X{gameUI.comboCounter} {gameUI.isSuperCombo && <span className={s.fadeIn}>SUPER COMBO</span>}
                </div>
            )}
            {gameUI.isBonusRound && <div className={s.fadeIn}>AWESOME</div>}
            {gameUI.isMiss && (
                <div key={gameUI.missCounter} className={s.fadeInOut}>
                    MISS
                </div>
            )}
        </div>
    )
}
