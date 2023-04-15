import { Exit } from '@icons/Exit'
import { Restart } from '@icons/Restart'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { setCurrentLevelNumber, useCurrentLevel, useLevels, useNextLevel } from '@store/levels'
import { closeModal } from '@store/modals'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { buttonVariants } from 'motions/motions'
import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMedia } from 'react-use'
import s from './GameEndModal.module.scss'

const getMasterWords = (currentLevelNumber: number, isEnoughScore: boolean): string => {
    switch (currentLevelNumber) {
        case 1:
            return isEnoughScore
                ? 'Subarashī. Now you know the secret of the best susi. Use it wisely.'
                : 'Oh, you have to be more accurate. Try one more time.'
        case 2:
            return isEnoughScore
                ? '¡Fabuloso! Remember, good chili is the head of everything. Find the right spiciness.'
                : '¡Oh no! Not enough chili. Try again!'
        case 3:
            return isEnoughScore
                ? 'Отлично! Nothing improves a dish like a sour cream with herbs. Now you know that.'
                : 'Эх... I think you can do better. Try once again.'
        default:
            return isEnoughScore
                ? 'Meowtastic! Remember to cook with all your heart.'
                : 'Honey, that is not exactly what I meant. Try again with all your heart.'
    }
}

export const GameEndModal: FC = () => {
    const history = useHistory()
    const { currentLevelScore, currentLevelNumber, isBetterScoreThanEarlier } = useLevels()
    const { isEnoughScore } = useCurrentLevel()
    const nextLevel = useNextLevel()
    const { imgUrls } = levelDataManager.getCurrentLevelData()
    const isSmall = useMedia('(max-width: 1024px)')

    const isNextLevelButtonShown = isEnoughScore && nextLevel && nextLevel.isOpen

    return (
        <div className={s.root}>
            <div className={s.scoreContainer}>
                <h2>Score: {currentLevelScore}</h2>
                {/* <img className={s.scoreImg} src="/pics/cake.png" /> */}
            </div>
            <div className={s.masterContainer}>
                <span className={s.masterWords}>{getMasterWords(currentLevelNumber, isEnoughScore)}</span>
                <img className={s.master} src={imgUrls.master} />
            </div>
            <div className={s.buttonsContainer}>
                <motion.button
                    className={classnames(s.button, s.restartBtn)}
                    onClick={() => history.go(0)}
                    whileHover="hover"
                    variants={buttonVariants}
                >
                    <Restart className={s.icon} />
                    {!isSmall && 'Retry'}
                </motion.button>
                {isNextLevelButtonShown && (
                    <motion.button
                        onClick={() => {
                            setCurrentLevelNumber(currentLevelNumber + 1)
                        }}
                        className={classnames(s.button, s.nextBtn)}
                        whileHover="hover"
                        variants={buttonVariants}
                    >
                        Next level
                    </motion.button>
                )}
                <motion.button whileHover="hover" variants={buttonVariants}>
                    <Link className={classnames(s.button, s.exitBtn)} onClick={() => closeModal()} to="/#levels">
                        <Exit className={s.icon} />
                        {!isSmall && 'Menu'}
                    </Link>
                </motion.button>
            </div>
        </div>
    )
}
