import { levelDataManager } from '@lib/levels/LevelDataManager'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { button2Variants, levelContainerVariants, levelVariants } from 'motions/motions'
import { FC } from 'react'
import s from './Level.module.scss'

export type LevelProps = {
    number: number
    score: number
    maxLevelScore: number
    isOpen: boolean
    onClick: () => void
}

export const Level: FC<LevelProps> = ({ number, score, maxLevelScore, isOpen, onClick }) => {
    const { title } = levelDataManager.getLevelData(number)
    const imgSrc = ''

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgSrc})`,
            }}
            className={classnames(s.levelCard, { [s.closedLevel]: !isOpen })}
            variants={levelContainerVariants}
            whileHover="hover"
        >
            <motion.div className={s.infoContainer} variants={levelVariants} whileHover="hover">
                <div className={s.levelTitle}>{title}</div>
                {isOpen && (
                    <div className={s.levelScore}>
                        {score} / {maxLevelScore}
                    </div>
                )}
                {isOpen && (
                    <motion.button
                        whileHover="hover"
                        variants={button2Variants}
                        className={s.playBtn}
                        disabled={!isOpen}
                        onClick={() => onClick()}
                    >
                        Play
                    </motion.button>
                )}
            </motion.div>
        </motion.div>
    )
}
