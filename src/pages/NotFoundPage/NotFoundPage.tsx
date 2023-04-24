import { FC } from 'react'
import s from './NotFoundPage.module.scss'

export interface NotFoundPageProps {}

export const NotFoundPage: FC = () => {
    return <div className={s.root}>404</div>
}
