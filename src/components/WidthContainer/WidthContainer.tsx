import { WithClassName } from '@app-types/common'
import cs from 'classnames'
import { FC, ReactNode } from 'react'
import s from './WidthContainer.module.scss'

export const WidthContainer: FC<{ children: ReactNode } & WithClassName> = ({ children, className }) => {
    return <div className={cs(className, s.root)}>{children}</div>
}
