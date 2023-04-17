import { FC } from 'react'
import s from './Background.module.scss'

export const Background: FC = () => {
    // const { horizontal, vertical } = levelDataManager.getCurrentLevelData().images?.back ?? {}
    // const image = innerWidth > innerHeight ? horizontal : vertical

    return <div className={s.main} />
}
