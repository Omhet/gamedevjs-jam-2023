import { WithClassName } from '@app-types/common'
import cx from 'classnames'
import { FC, ReactNode } from 'react'
import s from './TextLink.module.scss'

export const TextLink: FC<WithClassName & { children: ReactNode; to?: string }> = ({ className, children, to }) => {
    return (
        <a href={to} target="_blank" className={cx(className, s.root)}>
            {children}
        </a>
    )
}
