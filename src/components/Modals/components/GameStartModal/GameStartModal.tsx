import { Exit } from '@icons/Exit'
import { Play } from '@icons/Play'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { startGame } from '@store/game'
import { closeModal } from '@store/modals'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import { buttonVariants } from 'motions/motions'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './GameStartModal.module.scss'

export const GameStartModal: FC = () => {
    const { startOnboarding } = levelDataManager.getCurrentLevelData()

    const start = () => {
        startGame()
        closeModal()
    }

    return (
        <div className={s.root}>
            <div className={s.masterContainer}>
                <span className={s.masterWords}>{startOnboarding}</span>
            </div>
            <div className={s.buttonsContainer}>
                <motion.button
                    className={classnames(s.button, s.playBtn)}
                    onClick={() => start()}
                    whileHover="hover"
                    variants={buttonVariants}
                >
                    <Play className={s.icon} />
                    Let&apos;s try
                </motion.button>
                <motion.button whileHover="hover" variants={buttonVariants}>
                    <Link className={classnames(s.button, s.exitBtn)} onClick={() => closeModal()} to="/#levels">
                        <Exit className={s.icon} />
                        Menu
                    </Link>
                </motion.button>
            </div>
        </div>
    )
}
