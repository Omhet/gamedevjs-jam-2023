import { useGame } from '@store/game';
import React, { FC } from 'react';
import { Header } from '../Header/Header';
import { Background } from './components/Background/Background';
import { Scene } from './components/Scene/Scene';

export const Game: FC = () => {
  const { isGameStarted } = useGame();

  return (
    <>
      <Background />
      {isGameStarted && <Scene />}
      {isGameStarted && <Header />}
    </>
  );
};
