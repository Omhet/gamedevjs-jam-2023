import { LIVES_PER_ROUND } from '@lib/levels/levelData'
import { useGame } from '@store/game/gameStore'
import { useLevels } from '@store/levels/levelsStore'
import cx from 'classnames'
import { FC } from 'react'

import { Button } from '@components/Button/Button'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { Exit } from '@icons/Exit'
import { Timer } from '@icons/Timer'
import s from './GameHeader.module.scss'

export const GameHeader: FC = () => {
    const {
        gameUI: { lives = LIVES_PER_ROUND },
    } = useGame()
    const { currentLevelScore } = useLevels()

    return (
        <header className={s.root}>
            <WidthContainer className={cx(s.container)}>
                <div className={s.score}>
                    Score: <span className={s.scoreNumber}>{currentLevelScore}</span>
                </div>
                <div className={s.lives}>
                    {[...new Array(lives)].map((_, index) => (
                        <Timer className={s.live} key={index} />
                    ))}
                </div>
                <Button className={s.exitBtn} to="/levels" type="tertiary">
                    <Exit className={s.exit} />
                    <span>Quit</span>
                </Button>
            </WidthContainer>
        </header>
    )
}
