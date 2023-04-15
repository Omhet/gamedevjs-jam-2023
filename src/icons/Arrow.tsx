import { WithClassName } from '@app-types/common';
import React, { FC } from 'react';

export const Arrow: FC<WithClassName> = ({ className }) => {
  return (
    <svg className={className} viewBox="0 0 152 91" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.8 90.6C.3 80.3-.4 72.3 4.4 63c3.2-6.1 7-12.1 11-17.8 2.7-4 13.6-18.5 20-12 3.9 4.2 19 48 31.3 27.1 6.5-11 12.5-31.3 25.6-36.9 7.8-3.2 13.6 27 17.3 31.7 5.3 6.8 9.1-6 11-10 4.7-9.8 9.8-19.4 15.9-28.4 3-4.5 5.6-8.7 9.8-12 2.2-1.6.4-1.1-1.4-1-2.7.3-15.2 2-6.2.6 5.4-.9 7.5 2.5 9 7.4.7 2.3 1 4.6 1.2 7 0 .5-.3 1.8.3 1.6.9-.3 1.2-16.8 2.2-19.4M137.4 7l8.2 9.8"
        stroke="#eb7070"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
