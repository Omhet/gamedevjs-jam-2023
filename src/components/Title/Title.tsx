import { WithClassName } from '@app-types/common'
import cx from 'classnames'
import { FC, ReactNode } from 'react'
import s from './Title.module.scss'

export const Title: FC<WithClassName & { children: ReactNode }> = ({ className, children }) => {
    return <h2 className={cx(className, s.root)}>{children}</h2>
}
