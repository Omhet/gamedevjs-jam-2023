import classnames from 'classnames'
import { motion } from 'framer-motion'
import { button2Variants, levelContainerVariants, levelVariants } from 'motions/motions'
import React, { FC } from 'react'
import s from './Level.module.scss'

export type LevelProps = {
    title: string
    imgSrc: string
    score: number
    maxLevelScore: number
    isOpen: boolean
    onClick: () => void
}

export const Level: FC<LevelProps> = ({ title, imgSrc, score, maxLevelScore, isOpen, onClick }) => {
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
