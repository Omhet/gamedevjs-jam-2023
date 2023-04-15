import { WithClassName } from '@app-types/common';
import React from 'react';
import { FC } from 'react';

export const Close: FC<WithClassName> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};
