import { WithClassName } from '@app-types/common'
import { FC } from 'react'

export const Exit: FC<WithClassName> = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
            <path
                fill="#D6CEEA"
                fillRule="evenodd"
                d="M10.67 6.67c0 .73-.6 1.33-1.34 1.33H8v16h1.33c.74 0 1.34.6 1.34 1.33 0 .74-.6 1.34-1.34 1.34H6.67c-.74 0-1.34-.6-1.34-1.34V6.67c0-.74.6-1.34 1.34-1.34h2.66c.74 0 1.34.6 1.34 1.34ZM24 9.9l3.75 5.33c.33.48.32 1.1-.03 1.57l-4 5.33a1.33 1.33 0 1 1-2.13-1.6l2.4-3.2H13.33a1.33 1.33 0 1 1 0-2.66h10.73l.05.02-2.29-3.26a1.33 1.33 0 1 1 2.19-1.53Z"
                clipRule="evenodd"
            />
            <mask
                id="a"
                width="24"
                height="22"
                x="5"
                y="5"
                maskUnits="userSpaceOnUse"
                style={{ maskType: 'luminance' }}
            >
                <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M10.67 6.67c0 .73-.6 1.33-1.34 1.33H8v16h1.33c.74 0 1.34.6 1.34 1.33 0 .74-.6 1.34-1.34 1.34H6.67c-.74 0-1.34-.6-1.34-1.34V6.67c0-.74.6-1.34 1.34-1.34h2.66c.74 0 1.34.6 1.34 1.34ZM24 9.9l3.75 5.33c.33.48.32 1.1-.03 1.57l-4 5.33a1.33 1.33 0 1 1-2.13-1.6l2.4-3.2H13.33a1.33 1.33 0 1 1 0-2.66h10.73l.05.02-2.29-3.26a1.33 1.33 0 1 1 2.19-1.53Z"
                    clipRule="evenodd"
                />
            </mask>
            <g mask="url(#a)">
                <path fill="#D6CEEA" d="M0 0h32v32H0z" />
            </g>
        </svg>
    )
}
