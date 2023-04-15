import { WithClassName } from '@app-types/common';
import React, { FC } from 'react';

export const Play: FC<WithClassName> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.8 11.2 11.6 9a1 1 0 0 0-1.6.9V14a1 1 0 0 0 1.6.9l3.2-2.2a1 1 0 0 0 0-1.6z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
    </svg>
  );
};
