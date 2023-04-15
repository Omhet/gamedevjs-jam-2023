import { MainHeader } from '@components/MainHeader/MainHeader'
import { FC } from 'react'
import s from './MainPage.module.scss'
import { Levels } from './components/Levels/Levels'

export const MainPage: FC = () => {
    return (
        <>
            <main className={s.main}>
                <MainHeader />
                {/* <Hero /> */}
                <Levels />
            </main>
        </>
    )
}
