import { WithClassName } from '@app-types/common'
import cx from 'classnames'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './Button.module.scss'

export const Button: FC<WithClassName & { children: ReactNode; isBig?: boolean; to?: string }> = ({
    className,
    children,
    isBig,
    to,
}) => {
    return to ? (
        <Link to={to} className={cx(s.root, className, { [s.big]: isBig })}>
            {children}
        </Link>
    ) : (
        <button className={cx(s.root, className, { [s.big]: isBig })}>{children}</button>
    )
}
