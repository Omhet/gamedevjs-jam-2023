import { Exit } from '@icons/Exit'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { startGame } from '@store/game/gameStore'
import { closeModal } from '@store/modals/modalsStore'
import classnames from 'classnames'
import { motion, useAnimation } from 'framer-motion'
import { buttonVariants } from 'motions/motions'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import s from './GameStartModal.module.scss'

export const GameStartModal: FC = () => {
    const { startOnboarding, title } = levelDataManager.getCurrentLevelData()

    const controls = useAnimation()

    const start = async () => {
        startGame()
        await controls.start({ opacity: 0, scale: 0, originX: 0.5, originY: 0.5 })
        closeModal()
    }

    useEffect(() => {
        controls.set({ opacity: 1, scale: 1, originX: 0.5, originY: 0.5 })

        return () => {
            controls.start({ opacity: 0, scale: 0, originX: 0.5, originY: 0.5 })
        }
    }, [controls])

    return (
        <motion.div
            className={s.root}
            animate={controls}
            initial={{ opacity: 1, scale: 1, originX: 0.5, originY: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <div className={s.masterContainer}>
                <h1>{title}</h1>
                <span className={s.masterWords}>{startOnboarding}</span>
            </div>
            <div className={s.buttonsContainer}>
                <motion.button
                    className={classnames(s.button, s.playBtn)}
                    onClick={() => start()}
                    whileHover="hover"
                    variants={buttonVariants}
                >
                    Let&apos;s try
                </motion.button>
                <motion.button whileHover="hover" variants={buttonVariants}>
                    <Link className={classnames(s.button, s.exitBtn)} onClick={() => closeModal()} to="/#levels">
                        <Exit className={s.icon} />
                        Menu
                    </Link>
                </motion.button>
            </div>
        </motion.div>
    )
}
