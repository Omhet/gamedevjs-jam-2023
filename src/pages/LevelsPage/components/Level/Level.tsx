import { Button } from '@components/Button/Button'
import { LevelType } from '@lib/levels/LevelDataManager'
import { useLevels } from '@store/levels/levelsStore'
import classnames from 'classnames'
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

    return (
        <div
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            className={classnames(s.root, { [s.closedLevel]: !isOpen, [s.boss]: Boolean(data.miniBoss) })}
        >
            <div className={s.title}>
                <div className={s.line} />
                <h3 className={s.titleText}>{data.title}</h3>
                <div className={s.line} />
            </div>
            {completed && <div>Completed</div>}
            {isOpen && score && score > 0 ? (
                <div className={s.levelScore}>
                    {score} / {data.maxScore}
                </div>
            ) : null}
            {isOpen && (
                <Button className={s.playBtn} type="secondary" disabled={!isOpen} onClick={() => handlePlayClick()}>
                    Play
                </Button>
            )}
            {!isOpen && <div className={s.blockedContainer}>Play previous levels to unblock</div>}
        </div>
    )
}
