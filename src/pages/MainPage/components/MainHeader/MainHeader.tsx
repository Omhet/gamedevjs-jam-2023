import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { useLevels } from '@store/levels/levelsStore'
import { FC } from 'react'
import s from './MainHeader.module.scss'

export const MainHeader: FC = () => {
    const { globalScore } = useLevels()

    return (
        <header className={s.root}>
            <WidthContainer className={s.container}>
                <div className={s.logo}>Chrono</div>
                <div className={s.score}>
                    <span> Total score: {globalScore}</span>
                </div>
            </WidthContainer>
        </header>
    )
}
