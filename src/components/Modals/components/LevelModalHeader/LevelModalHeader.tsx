import cx from 'classnames'
import { FC } from 'react'
import s from './LevelModalHeader.module.scss'

export interface LevelModalHeaderProps {
    title: string
}

export const LevelModalHeader: FC<LevelModalHeaderProps> = ({ title }) => {
    return (
        <header className={cx(s.root)}>
            <div className={s.line} />
            <h1 className={s.titleText}>{title}</h1>
            <div className={s.line} />
        </header>
    )
}
