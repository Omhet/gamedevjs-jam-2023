import React, { FC, useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { startGame } from './phaser/main'

export interface SceneProps {}

export const Scene: FC<SceneProps> = ({}) => {
    const { levelNumber: levelNumberParam } = useParams<{ levelNumber: string }>()
    const levelNumber = parseInt(levelNumberParam, 10)
    // const levelConfig = levelsData[levelNumber - 1]
    const levelConfig = {}

    useEffect(() => {
        if (levelConfig) {
            startGame({ numberOfRounds: 1 }, () => {
                console.log('Level end')
            })
        }
    }, [levelConfig])

    if (!levelConfig) {
        return <Redirect to="/" />
    }

    return <div id="app"></div>
}
