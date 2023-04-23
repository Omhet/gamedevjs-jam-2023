import { WithClassName } from '@app-types/common'
import { FC } from 'react'

export const Timer: FC<WithClassName> = ({ className }) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
            <path
                fill="#7E42FF"
                fill-rule="evenodd"
                d="M17.5 16.33H14c-.64 0-1.17-.52-1.17-1.16v-3.5a1.17 1.17 0 1 1 2.34 0V14h2.33a1.17 1.17 0 1 1 0 2.33m-2.35-11.6.02-.06V3.5h1.16a1.17 1.17 0 1 0 0-2.33h-4.66a1.17 1.17 0 1 0 0 2.33h1.16v1.17l.02.06A10.51 10.51 0 0 0 3.5 15.17a10.51 10.51 0 0 0 21 0c0-5.4-4.1-9.86-9.35-10.44"
                clip-rule="evenodd"
            />
            <mask id="a" width="22" height="25" x="3" y="1" maskUnits="userSpaceOnUse" style="mask-type:luminance">
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M17.5 16.33H14c-.64 0-1.17-.52-1.17-1.16v-3.5a1.17 1.17 0 1 1 2.34 0V14h2.33a1.17 1.17 0 1 1 0 2.33m-2.35-11.6.02-.06V3.5h1.16a1.17 1.17 0 1 0 0-2.33h-4.66a1.17 1.17 0 1 0 0 2.33h1.16v1.17l.02.06A10.51 10.51 0 0 0 3.5 15.17a10.51 10.51 0 0 0 21 0c0-5.4-4.1-9.86-9.35-10.44"
                    clip-rule="evenodd"
                />
            </mask>
            <g mask="url(#a)">
                <path fill="#7E42FF" d="M0 0h28v28H0z" />
            </g>
        </svg>
    )
}
