import { MainHeader } from '@components/MainHeader/MainHeader'
import { FC } from 'react'
import s from './LevelsPage.module.scss'
import { Levels } from './components/Levels/Levels'

export interface LevelsPageProps {}

export const LevelsPage: FC = () => {
    return (
        <main className={s.root}>
            <MainHeader />
            <Levels />
        </main>
    )
}
