import { WithClassName } from '@app-types/common'
import cx from 'classnames'
import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import s from './Button.module.scss'

type ButtonProps = WithClassName & {
    children: ReactNode
    isBig?: boolean
    to?: string
    type?: 'primary' | 'secondary' | 'tertiary'
    disabled?: boolean
    onClick?: () => void
}

export const Button: FC<ButtonProps> = ({ className, children, isBig, to, disabled, type = 'primary', onClick }) => {
    return to ? (
        <Link to={to} className={cx(s.root, className, s[type], { [s.big]: isBig })} onClick={onClick}>
            {children}
        </Link>
    ) : (
        <button className={cx(s.root, className, s[type], { [s.big]: isBig })} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}
