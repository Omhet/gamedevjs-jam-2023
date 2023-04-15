import { Loader } from '@components/Loader/Loader';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Game } from '@pages/GamePage/components/Game/Game';
import { useLevels } from '@store/levels';
import { closeModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { loadGame, useGame } from '../../store/game/index';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const { currentLevelNumber } = useLevels();

  useEffect(() => {
    closeModal();
    loadGame(currentLevelNumber);

    return () => {
      closeModal();
      levelDataManager.stopLevelMusic();
    };
  }, [currentLevelNumber]);

  return <div className={s.main}>{isLoading ? <Loader /> : <Game />}</div>;
};
