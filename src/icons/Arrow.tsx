import { WithClassName } from '@app-types/common'
import { FC } from 'react'

export const Arrow: FC<WithClassName> = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
            <path
                fill="#D6CEEA"
                fillRule="evenodd"
                d="M19 11.5H7.13l3.64-4.36a1 1 0 1 0-1.54-1.28l-5 6-.09.15-.07.13a.99.99 0 0 0-.07.36c0 .13.03.25.07.36l.07.13c.03.05.05.1.1.15l5 6a1 1 0 1 0 1.53-1.28L7.14 13.5H19a1 1 0 0 0 0-2Z"
                clipRule="evenodd"
            />
            <mask
                id="Arrow"
                width="16"
                height="15"
                x="4"
                y="5"
                maskUnits="userSpaceOnUse"
                style={{ maskType: 'luminance' }}
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M19 11.5H7.13l3.64-4.36a1 1 0 1 0-1.54-1.28l-5 6-.09.15-.07.13a.99.99 0 0 0-.07.36c0 .13.03.25.07.36l.07.13c.03.05.05.1.1.15l5 6a1 1 0 1 0 1.53-1.28L7.14 13.5H19a1 1 0 0 0 0-2Z"
                    clipRule="evenodd"
                />
            </mask>
            <g mask="url(#Arrow)">
                <path fill="#D6CEEA" d="M0 .5h24v24H0z" />
            </g>
        </svg>
    )
}
