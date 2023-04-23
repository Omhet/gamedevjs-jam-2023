import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { useLevels } from '@store/levels/levelsStore'
import cx from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './MainHeader.module.scss'

export interface MainHeaderProps {
    withLink?: boolean
}

export const MainHeader: FC<MainHeaderProps> = ({ withLink = true }) => {
    const { globalScore } = useLevels()

    return (
        <header className={s.root}>
            <WidthContainer className={cx(s.container, { [s.center]: !withLink })}>
                {withLink && (
                    <Link to="/" className={s.link}>
                        Back To Menu
                    </Link>
                )}
                <div className={s.score}>
                    Total score: <span className={s.scoreNumber}>{globalScore}</span>
                </div>
            </WidthContainer>
        </header>
    )
}
