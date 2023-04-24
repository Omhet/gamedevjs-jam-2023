import { MainHeader } from '@components/MainHeader/MainHeader'
import { FC } from 'react'
import s from './HowToPage.module.scss'

export interface HowToPageProps {}

export const HowToPage: FC = () => {
    return (
        <main className={s.root}>
            <MainHeader />
        </main>
    )
}
