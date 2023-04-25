import { levelDataManager } from '@lib/levels/LevelDataManager'
import { LIVES_PER_ROUND } from '@lib/levels/levelData'
import { useGame } from '@store/game/gameStore'
import cx from 'classnames'
import { FC } from 'react'
import s from './Background.module.scss'

function mapRange(value: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number): number {
    return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin
}

export const Background: FC = () => {
    const {
        gameUI: { lives = LIVES_PER_ROUND, isMiss, roundsCompleted },
        isGameEnd,
    } = useGame()

    const back = levelDataManager.getCurrentLevelData().imgUrls.back
    const backEmpty = levelDataManager.getCurrentLevelData().imgUrls.backEmpty
    const boss = levelDataManager.getCurrentLevelData().imgUrls.character

    const isDead = lives === 0
    const bossScale = isDead ? 3 : mapRange(lives, 0, LIVES_PER_ROUND, 1.2, 1)

    const backImg = backEmpty ?? back

    return (
        <>
            <div className={s.root} style={{ backgroundImage: `url(${backImg})` }} />
            {backEmpty && (
                <div
                    className={s.boss}
                    style={{
                        transform: `scale(${bossScale})`,
                        transitionDelay: isDead ? '0.7s' : '0.2s',
                        opacity: isGameEnd && !isDead ? 0 : 1,
                    }}
                >
                    <div key={roundsCompleted} className={cx(s.inner, { [s.shake]: !isMiss })}>
                        <img src={boss} className={s.bossImg} />
                    </div>
                </div>
            )}
        </>
    )
}
