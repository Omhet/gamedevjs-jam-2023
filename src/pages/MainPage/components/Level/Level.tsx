import { LevelType } from '@lib/levels/LevelDataManager'
import { useLevels } from '@store/levels/levelsStore'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { button2Variants, levelContainerVariants, levelVariants } from 'motions/motions'
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
    const imgSrc = ''

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            className={classnames(s.levelCard, { [s.closedLevel]: !isOpen, [s.boss]: Boolean(data.miniBoss) })}
            variants={levelContainerVariants}
            whileHover="hover"
        >
            <motion.div className={s.infoContainer} variants={levelVariants} whileHover="hover">
                <div className={s.levelTitle}>{data.title}</div>
                {completed && <div>Completed</div>}
                {isOpen && (
                    <div className={s.levelScore}>
                        {score} / {data.maxScore}
                    </div>
                )}
                {isOpen && (
                    <motion.button
                        whileHover="hover"
                        variants={button2Variants}
                        className={s.playBtn}
                        disabled={!isOpen}
                        onClick={() => handlePlayClick()}
                    >
                        Play
                    </motion.button>
                )}
                {!isOpen && <div>Play previous levels till the end to unblock</div>}
            </motion.div>
        </motion.div>
    )
}
