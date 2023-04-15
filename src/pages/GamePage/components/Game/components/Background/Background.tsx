import { levelDataManager } from '@lib/levels/LevelDataManager';
import React, { FC } from 'react';
import s from './Background.module.scss';

export const Background: FC = () => {
  const { horizontal, vertical } = levelDataManager.getCurrentLevelData().images.back;
  const image = innerWidth > innerHeight ? horizontal : vertical;

  return <img className={s.main} src={image.src} />;
};
