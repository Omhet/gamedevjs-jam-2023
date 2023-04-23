import { MainHeader } from '@components/MainHeader/MainHeader'
import { FC } from 'react'
import s from './MainPage.module.scss'
import { Hero } from './components/Hero/Hero'

export const MainPage: FC = () => {
    return (
        <main className={s.root}>
            <MainHeader withLink={false} />
            <Hero />
        </main>
    )
}
