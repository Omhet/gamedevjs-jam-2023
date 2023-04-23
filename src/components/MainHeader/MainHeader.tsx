import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { Arrow } from '@icons/Arrow'
import { useLevels } from '@store/levels/levelsStore'
import cx from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './MainHeader.module.scss'

export interface MainHeaderProps {
    withLink?: boolean
    isBlured?: boolean
}

export const MainHeader: FC<MainHeaderProps> = ({ withLink = true, isBlured = true }) => {
    const { globalScore } = useLevels()

    return (
        <header className={cx(s.root, { [s.blur]: isBlured })}>
            <WidthContainer className={cx(s.container, { [s.center]: !withLink, [s.blur]: isBlured })}>
                {withLink && (
                    <Link to="/" className={s.link}>
                        <Arrow className={s.arrow} />
                        <span>Back To Menu</span>
                    </Link>
                )}
                <div className={s.score}>
                    Total score: <span className={s.scoreNumber}>{globalScore}</span>
                </div>
            </WidthContainer>
        </header>
    )
}
