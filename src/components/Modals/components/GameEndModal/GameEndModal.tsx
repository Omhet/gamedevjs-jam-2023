import { Exit } from '@icons/Exit'
import { Restart } from '@icons/Restart'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { setCurrentLevelNumber, useCurrentLevel, useLevels, useNextLevel } from '@store/levels'
import { closeModal } from '@store/modals'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { buttonVariants } from 'motions/motions'
import { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMedia } from 'react-use'
import s from './GameEndModal.module.scss'

export const GameEndModal: FC = () => {
    const history = useHistory()
    const { currentLevelScore, currentLevelNumber } = useLevels()
    const { isEnoughScore } = useCurrentLevel()
    const nextLevel = useNextLevel()
    const { endOnboarding } = levelDataManager.getCurrentLevelData()
    const isSmall = useMedia('(max-width: 1024px)')

    const isNextLevelButtonShown = isEnoughScore && nextLevel && nextLevel.isOpen

    return (
        <div className={s.root}>
            <div className={s.scoreContainer}>
                <h2>Score: {currentLevelScore}</h2>
            </div>
            <div className={s.masterContainer}>
                <span className={s.masterWords}>{endOnboarding.text}</span>
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
