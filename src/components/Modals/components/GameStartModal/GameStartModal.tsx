import { Button } from '@components/Button/Button'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { Exit } from '@icons/Exit'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { startGame } from '@store/game/gameStore'
import { closeModal } from '@store/modals/modalsStore'
import cx from 'classnames'
import { motion, useAnimation } from 'framer-motion'
import { FC, useEffect } from 'react'
import { useMedia } from 'react-use'
import { LevelModalHeader } from '../LevelModalHeader/LevelModalHeader'
import s from './GameStartModal.module.scss'

export const GameStartModal: FC = () => {
    const { startOnboarding, title, imgUrls } = levelDataManager.getCurrentLevelData()
    const isSmall = useMedia('(max-width: 1150px)')

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
            <LevelModalHeader title={title} />
            <WidthContainer className={s.content}>
                <div className={s.left}>
                    <div className={s.onboarding}>
                        <div className={s.name}>Sage</div>
                        <div>{startOnboarding}</div>
                    </div>
                    <div className={s.buttonsContainer}>
                        <Button className={cx(s.button, s.playBtn)} onClick={() => start()}>
                            Let&apos;s try
                        </Button>
                        <Button onClick={() => closeModal()} to="/levels" type="tertiary">
                            <Exit className={s.exit} />
                            <span>Back To Levels</span>
                        </Button>
                    </div>
                </div>
                {!isSmall && <img className={s.character} src={imgUrls.character} alt="Level Character" />}
            </WidthContainer>
        </motion.div>
    )
}
