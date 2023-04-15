import { levelDataManager } from '@lib/levels/LevelDataManager';
import React, { FC } from 'react';
import s from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={s.loaderContainer}>
      <div
        className={s.loader}
        style={{ backgroundImage: `url(${levelDataManager.getCurrentLevelData().imgUrls.food[0]})` }}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
