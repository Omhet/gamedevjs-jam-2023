import { MainHeader } from '@components/MainHeader/MainHeader'
import { TextLink } from '@components/TextLink/TextLink'
import { Title } from '@components/Title/Title'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { FC } from 'react'
import s from './HowToPage.module.scss'

export interface HowToPageProps {}

export const HowToPage: FC = () => {
    return (
        <main className={s.root}>
            <MainHeader />
            <WidthContainer>
                <div className={s.content}>
                    <div className={s.mainText}>
                        <Title className={s.title}>How To Play</Title>
                        <p>
                            Welcome to the world of time guardians, where you must protect{' '}
                            <TextLink to="https://arcadia.fun/">Arcadia</TextLink> from time anomalies caused by the
                            evil{' '}
                            <TextLink className={s.creepz} to="https://www.overlord.xyz/">
                                Creepz
                            </TextLink>
                            . Get ready to dive into a thrilling gameplay experience that will challenge your precision
                            and timing skills. Here's how to play:
                        </p>
                    </div>
                    <div className={s.story}>
                        <h3 className={s.secondaryTitle}>Game Objective</h3>
                        <p>
                            Your main goal is to tap the screen or press the Spacebar (on desktop) when the rotating
                            clock hand is within the target zone on the clock face. The target zone is divided into
                            regions, with more points awarded for tapping closer to the center.
                            <br />
                            <br />
                            Increase your score by tapping accurately in succession. Each consecutive successful tap
                            increases your combo multiplier. But be careful, missing a tap will reset your combo
                            multiplier.If you tap outside the target zone, you'll lose points. This miss event is
                            visualized by the clock hand stopping briefly before continuing.
                            <br />
                            <br />
                            Earn points based on your performance in each level. Unlock the next level by just playing
                            all the previous ones
                        </p>
                    </div>
                    <div className={s.controls}>
                        <h3 className={s.secondaryTitle}>Controls</h3>
                        <p>
                            <div className={s.accentTitle}>Desktop</div>
                            Press the Spacebar or click the mouse to interact with the clock. To activate powerups,
                            press the numpad number keys or click the powerup buttons on the screen.
                            <br />
                            <br />
                            <div className={s.accentTitle}>Mobile</div>
                            Tap the screen to interact with the clock and use the powerup buttons on the screen to
                            activate powerups.
                        </p>
                    </div>
                </div>
            </WidthContainer>
        </main>
    )
}
