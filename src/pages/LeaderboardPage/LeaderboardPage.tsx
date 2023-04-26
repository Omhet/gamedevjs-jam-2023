import { MainHeader } from '@components/MainHeader/MainHeader'
import { Title } from '@components/Title/Title'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { FC } from 'react'
import s from './LeaderboardPage.module.scss'

export interface LeaderboardPageProps {}

export const LeaderboardPage: FC = () => {
    return (
        <div className={s.root}>
            <MainHeader />
            <WidthContainer className={s.content}>
                <Title>COMING SOON!</Title>
            </WidthContainer>
        </div>
    )
}
