import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { FC } from 'react'
import { Level } from '../Level/Level'
import s from './Levels.module.scss'

export const Levels: FC = () => {
    const regions = levelDataManager.getAllRegions()
    const levelsGroupedByRegion = levelDataManager.getAllLevelsGroupedByRegion()

    return (
        <WidthContainer>
            <h2 className={s.title}>Levels</h2>
            <div className={s.regions}>
                {regions.map((region) => (
                    <div key={region.name}>
                        <h3 className={s.regionTitle}>{region.name}</h3>
                        <p className={s.regionDescription}>{region.description}</p>
                        <div className={s.levels}>
                            {levelsGroupedByRegion[region.name].map((levelData) => (
                                <Level key={levelData.number} data={levelData} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </WidthContainer>
    )
}
