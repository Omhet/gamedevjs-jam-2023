import { WithClassName } from '@app-types/common';
import classnames from 'classnames';
import React, { FC } from 'react';
import s from './Spinner.module.scss';

export const Spinner: FC<WithClassName> = ({ className }) => {
  return (
    <div className={classnames(s.loader, className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
