import { useLevels } from '@store/levels'
import { FC } from 'react'
import s from './MainHeader.module.scss'

export const MainHeader: FC = () => {
    const { globalScore } = useLevels()

    return (
        <header className={s.headerContainer}>
            <div className={s.logo}>Chrono</div>
            <div className={s.headerContent}></div>
            {globalScore > 0 && (
                <div className={s.score}>
                    <span> Score: {globalScore}</span>
                </div>
            )}
        </header>
    )
}
