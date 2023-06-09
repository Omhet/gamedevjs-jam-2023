import { Modals } from '@components/Modals/Modals'
import { AboutPage } from '@pages/AboutPage/AboutPage'
import { GamePage } from '@pages/GamePage/GamePage'
import { HowToPage } from '@pages/HowToPage/HowToPage'
import { LeaderboardPage } from '@pages/LeaderboardPage/LeaderboardPage'
import { LevelsPage } from '@pages/LevelsPage/LevelsPage'
import { MainPage } from '@pages/MainPage/MainPage'
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage'
import { FC } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import s from './App.module.scss'

export const App: FC = () => {
    return (
        <>
            {/* @ts-ignore */}
            <Router>
                <div className={s.main}>
                    <Switch>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                        <Route exact path="/game">
                            <GamePage />
                        </Route>
                        <Route exact path="/levels">
                            <LevelsPage />
                        </Route>
                        <Route exact path="/how-to">
                            <HowToPage />
                        </Route>
                        <Route exact path="/about">
                            <AboutPage />
                        </Route>
                        <Route exact path="/leaderboard">
                            <LeaderboardPage />
                        </Route>
                        <Route>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </div>
                <Modals />
            </Router>
        </>
    )
}
