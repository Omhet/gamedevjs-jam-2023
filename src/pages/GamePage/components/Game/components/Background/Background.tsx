import { levelDataManager } from '@lib/levels/LevelDataManager'
import { FC } from 'react'
import s from './Background.module.scss'

export const Background: FC = () => {
    const back = levelDataManager.getCurrentLevelData().imgUrls.back

    return <div className={s.root} style={{ backgroundImage: `url(${back})` }} />
}
