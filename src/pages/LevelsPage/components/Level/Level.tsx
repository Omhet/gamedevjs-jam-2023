import { Button } from '@components/Button/Button'
import { LevelType } from '@lib/levels/LevelDataManager'
import { useLevels } from '@store/levels/levelsStore'
import cx from 'classnames'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import s from './Level.module.scss'

export type LevelProps = {
    data: LevelType
}

export const Level: FC<LevelProps> = ({ data }) => {
    const { levels } = useLevels()
    const { isOpen, score, completed } = levels.find((lvl) => lvl.number === data.number) ?? {}

    const history = useHistory()

    const handlePlayClick = () => {
        history.push(`/game?level=${data.number}`)
    }

    const imgSrc = data.imgUrls.back

    const hasScore = score && score > 0

    return (
        <div
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            className={cx(s.root, { [s.closedLevel]: !isOpen, [s.boss]: Boolean(data.miniBoss) })}
        >
            <div className={s.title}>
                <div className={s.line} />
                <h3 className={s.titleText}>{data.title}</h3>
                <div className={s.line} />
            </div>
            {isOpen && hasScore ? (
                <div className={s.levelScoreContainer}>
                    <div className={s.accuracy}>
                        <span className={s.accuracyPercent}>todo% </span>Accuracy
                    </div>
                    <div className={s.levelScore}>
                        {score} / {data.maxScore}
                    </div>
                    <div style={{ width: `${Math.floor(score / data.maxScore) * 100}%` }} className={s.progress} />
                </div>
            ) : null}
            {isOpen && (
                <Button type="secondary" disabled={!isOpen} onClick={() => handlePlayClick()}>
                    {hasScore ? 'Play Again' : 'Play'}
                </Button>
            )}
            {!isOpen && <div className={s.blockedContainer}>Play previous levels to unblock</div>}
        </div>
    )
}
