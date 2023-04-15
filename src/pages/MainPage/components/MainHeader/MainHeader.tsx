import { useLevels } from '@store/levels/levelsStore'
import { FC } from 'react'
import s from './MainHeader.module.scss'

export const MainHeader: FC = () => {
    const { globalScore } = useLevels()

    return (
        <header className={s.headerContainer}>
            <div className={s.logo}>Chrono</div>
            <div className={s.headerContent}></div>
            <div className={s.score}>
                <span> Total score: {globalScore}</span>
            </div>
        </header>
    )
}
