import { Button } from '@components/Button/Button'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './Hero.module.scss'

export type HeroProps = {}

export const Hero: FC = () => {
    return (
        <div className={s.root}>
            <img className={s.titleImg} src="/hero-title.png" />
            <div className={s.menu}>
                <Link to="/how-to">How To PLay</Link>
                <Link to="/about">About Game</Link>
                <Link to="/leaderboard">Leaderboard</Link>
            </div>
            <div className={s.playSection}>
                <div className={s.line} />
                <Button to="/levels" isBig>
                    PLAY
                </Button>
                <div className={s.line} />
            </div>
        </div>
    )
}
