import { Title } from '@components/Title/Title'
import { WidthContainer } from '@components/WidthContainer/WidthContainer'
import { levelDataManager } from '@lib/levels/LevelDataManager'
import { Region } from '@lib/levels/levelData'
import { useLevels } from '@store/levels/levelsStore'
import { FC } from 'react'
import { Level } from '../Level/Level'
import s from './Levels.module.scss'

export const Levels: FC = () => {
    const regions = levelDataManager.getAllRegions()

    return (
        <WidthContainer>
            <div className={s.regions}>
                {regions.map((region, index) => (
                    <RegionComponent key={index} region={region} isFirst={index === 0} />
                ))}
            </div>
        </WidthContainer>
    )
}

const RegionComponent: FC<{ region: Region; isFirst: boolean }> = ({ region, isFirst }) => {
    const levelsGroupedByRegion = levelDataManager.getAllLevelsGroupedByRegion()
    const { levels: levelsFromState } = useLevels()

    const levels = levelsGroupedByRegion[region.name]

    const isAllLevelsLocked = levels.every(
        (level) => !(levelsFromState.find((lvl) => lvl.number === level.number) ?? {}).isOpen
    )

    return (
        <div key={region.name}>
            <Title className={s.regionTitle}>{region.name}</Title>
            <p className={s.regionDescription} dangerouslySetInnerHTML={{ __html: region.description }}></p>
            {isAllLevelsLocked && !isFirst && (
                <strong className={s.lockedNote}>Defeat the previous region miniboss to unlock this region</strong>
            )}
            <div className={s.levels}>
                {levels.map((levelData) => (
                    <Level key={levelData.number} data={levelData} isFullyBlocked={isAllLevelsLocked} />
                ))}
            </div>
        </div>
    )
}
