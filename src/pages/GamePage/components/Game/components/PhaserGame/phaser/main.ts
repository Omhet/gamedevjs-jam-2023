import { LevelConfig, OnLevelEndsCallback, OnTapCallback } from '@app-types/game'
import Phaser, { Game } from 'phaser'
import { MainScene } from './scenes/MainScene'

const config: Phaser.Types.Core.GameConfig = {
    parent: 'app',
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    render: { pixelArt: false, antialias: true },
    scene: [MainScene],
    input: {
        keyboard: true,
    },
}

export const startGame = (props: {
    levelConfig: LevelConfig
    onLevelEnds: OnLevelEndsCallback
    onTap: OnTapCallback
}) => {
    const game = new Game(config)
    game.scene.start('MainScene', props)

    return game
}
