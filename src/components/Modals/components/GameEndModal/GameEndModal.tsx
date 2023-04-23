import { Exit } from '@icons/Exit'
import { Retry } from '@icons/Retry'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { useLevels, useNextLevel } from '@store/levels/levelsStore'
import { closeModal } from '@store/modals/modalsStore'
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
    const nextLevel = useNextLevel()
    const { endOnboarding } = levelDataManager.getCurrentLevelData()
    const isSmall = useMedia('(max-width: 1024px)')

    const isNextLevelButtonShown = nextLevel && nextLevel.isOpen

    return (
        <motion.div
            className={s.root}
            initial={{ opacity: 0, scale: 0, originX: 0.5, originY: 0.5 }}
            animate={{ opacity: 1, scale: 1, originX: 0.5, originY: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <div className={s.scoreContainer}>
                <h2>Score: {currentLevelScore}</h2>
            </div>
            <div className={s.masterContainer}>
                <span className={s.masterWords}>{endOnboarding}</span>
            </div>
            <div className={s.buttonsContainer}>
                <motion.button
                    className={classnames(s.button, s.RetryBtn)}
                    onClick={() => {
                        window.location.reload()
                    }}
                    whileHover="hover"
                    variants={buttonVariants}
                >
                    <Retry className={s.icon} />
                    {!isSmall && 'Retry'}
                </motion.button>
                {isNextLevelButtonShown && (
                    <motion.button
                        onClick={() => {
                            history.push(`/game?level=${currentLevelNumber + 1}`)
                            window.location.reload()
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
        </motion.div>
    )
}
