import { MainHeader } from '@components/MainHeader/MainHeader'
import { TextLink } from '@components/TextLink/TextLink'
import { Title } from '@components/Title/Title'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { FC } from 'react'
import s from './AboutPage.module.scss'

export interface AboutPageProps {}

export const AboutPage: FC = () => {
    return (
        <div className={s.root}>
            <MainHeader />
            <WidthContainer className={s.content}>
                <div className={s.mainText}>
                    <Title className={s.title}>About This Game</Title>
                    <p>
                        Chrono Guards game is made singlehandedly by{' '}
                        <TextLink to="https://github.com/Omhet/">Omhet</TextLink> in 2 weeks specially for{' '}
                        <TextLink to="https://gamedevjs.com/jam/2023/">Gamedev.js Jam 2023</TextLink>
                        <br />
                        <br />
                        In 2023 year, there were several challenges in the gamejam that this entry participated in:
                        <ul className={s.list}>
                            <li>
                                <div className={s.accentTitle}>
                                    Open Source by <TextLink to="https://github.com/">Github</TextLink>
                                </div>
                                This game code is stored in a{' '}
                                <TextLink to="https://github.com/Omhet/gamedevjs-jam-2023">public repository</TextLink>{' '}
                                on Github
                            </li>

                            <li>
                                <div className={s.accentTitle}>
                                    Flash Revival by <TextLink to="https://www.crazygames.com/">CrazyGames</TextLink>
                                </div>
                                This game was inspired by the following flash games: Clockwork, Stop The Clock, Reflex
                            </li>

                            <li>
                                <div className={s.accentTitle}>
                                    Web3 by <TextLink to="https://game7.io/">Game7</TextLink>
                                </div>
                                TODO
                            </li>

                            <li>
                                <div className={s.accentTitle}>
                                    Arcadians by <TextLink to="https://www.opgames.org/">OP Games</TextLink>, Overlord's
                                    Arena by{' '}
                                    <TextLink className={s.creepz} to="https://overlord.xyz/">
                                        Overlord
                                    </TextLink>
                                    , Interoperability
                                </div>
                                This game whole story (read below) is inspired by Arcadia and Overlord lore.
                                <br />
                                Also it integrates Arcadia leaderboards API
                                <br />
                                TODO
                            </li>
                        </ul>
                    </p>
                </div>
                <div className={s.story}>
                    <h3 className={s.secondaryTitle}>Game Story</h3>
                    <p>
                        Arcadia, a world where time flows harmoniously, faces a grave threat from the Creepz,
                        cold-blooded lizard beings led by the ruthless Overlord. To conquer Arcadia, the Creepz unleash
                        time anomalies that disrupt the natural flow of time, plunging the world into chaos.
                        <br />
                        <br />
                        As a ChronoGuardian, the player must stabilize the time anomalies by stopping clock hands at
                        precise moments, restoring the balance of time and weakening the Creepz forces. The fate of
                        Arcadia hangs in the balance as players progress through increasingly challenging clock-stopping
                        sequences and confront the Overlord and his minions.
                        <br />
                        <br />
                        In this game players wield their mastery of time manipulation to save Arcadia from the clutches
                        of the Overlord and his Creepz forces. The future is in your hands.
                    </p>
                </div>
                <div>
                    <h3 className={s.secondaryTitle}>Tech Side</h3>
                    <p>
                        <div className={s.accentTitle}>Code</div>
                        Phaser 3 - Core game
                        <br />
                        React - UI
                        <br />
                        Effector - Managing UI state
                        <br />
                        <br />
                        <div className={s.accentTitle}>Art & Design</div>
                        Figma - UI/UX design
                        <br />
                        Midjourney - Art
                        <br />
                        <br />
                        <div className={s.accentTitle}>Music</div>
                        FL Studio - Soundtracks
                        <br />
                        TODO - Game sounds
                    </p>
                </div>
            </WidthContainer>
        </div>
    )
}
