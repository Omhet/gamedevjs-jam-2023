import { Button } from '@components/Button/Button'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { Exit } from '@icons/Exit'
import { Retry } from '@icons/Retry'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { useGame } from '@store/game/gameStore'
import { useLevels, useNextLevel } from '@store/levels/levelsStore'
import { closeModal } from '@store/modals/modalsStore'
import cx from 'classnames'
import { motion } from 'framer-motion'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useMedia } from 'react-use'
import { LevelModalHeader } from '../LevelModalHeader/LevelModalHeader'
import s from './GameEndModal.module.scss'

const endOnboardingLooseDefault =
    'ChronoGuardian, it seems the time anomaly was not fully stabilized this time. However, do not be disheartened, for the path of a guardian is filled with trials and tribulations. Your journey must continue, and as you face more challenges, your skills will grow. Keep persevering, and soon you will master the art of restoring balance to the lands of Arcadia. I believe in you.'

export const GameEndModal: FC = () => {
    const history = useHistory()
    const {
        gameUI: { lives },
    } = useGame()
    const { currentLevelScore, currentLevelNumber, globalScore } = useLevels()
    const nextLevel = useNextLevel()
    const { title, endOnboarding, endOnboardingLoose, imgUrls, maxScore } = levelDataManager.getCurrentLevelData()

    const isSmall = useMedia('(max-width: 1150px)')
    const isNextLevelButtonShown = nextLevel && nextLevel.isOpen

    const isLostLives = lives !== undefined && lives <= 0

    return (
        <motion.div
            className={s.root}
            initial={{ opacity: 0, scale: 0, originX: 0.5, originY: 0.5 }}
            animate={{ opacity: 1, scale: 1, originX: 0.5, originY: 0.5 }}
            transition={{ duration: 0.5 }}
        >
            <LevelModalHeader title={title} />
            <WidthContainer className={s.content}>
                <div className={s.left}>
                    <div className={s.stats}>
                        <div className={s.score}>
                            Score:&nbsp;&nbsp;
                            <span className={s.scoreNumber}>
                                {currentLevelScore} / {maxScore}
                            </span>
                        </div>
                        <div className={s.score}>
                            Total Score:&nbsp;&nbsp;
                            <span className={s.scoreNumber}>{globalScore}</span>
                        </div>
                    </div>

                    <div className={s.onboarding}>
                        <div className={s.name}>Sage</div>
                        <div>{isLostLives ? endOnboardingLoose ?? endOnboardingLooseDefault : endOnboarding}</div>
                    </div>

                    <div className={s.buttonsContainer}>
                        {isNextLevelButtonShown && (
                            <Button
                                className={cx(s.button, s.playBtn)}
                                onClick={() => {
                                    history.push(`/game?level=${currentLevelNumber + 1}`)
                                    window.location.reload()
                                }}
                            >
                                <span>Next Level</span>
                            </Button>
                        )}
                        <Button
                            className={cx(s.button, s.playBtn)}
                            type="tertiary"
                            onClick={() => window.location.reload()}
                        >
                            <Retry className={s.retry} />
                            <span>Retry</span>
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
