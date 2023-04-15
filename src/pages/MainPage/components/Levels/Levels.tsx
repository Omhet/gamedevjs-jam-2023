import { levelDataManager } from '@lib/levels/LevelDataManager'
import { FC } from 'react'
import { Level } from '../Level/Level'
import s from './Levels.module.scss'

export const Levels: FC = () => {
    const regions = levelDataManager.getAllRegions()
    const levelsGroupedByRegion = levelDataManager.getAllLevelsGroupedByRegion()

    return (
        <section id="levels" className={s.sectionContainer}>
            <h2 className={s.levelsTitle}>Levels</h2>
            {regions.map((region) => (
                <div key={region.name}>
                    <h3>{region.name}</h3>
                    <p>{region.description}</p>
                    <div className={s.levelsContainer}>
                        {levelsGroupedByRegion[region.name].map((levelData) => (
                            <Level key={levelData.number} data={levelData} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}
