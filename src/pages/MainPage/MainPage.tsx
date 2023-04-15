import { NavigationItem } from '@app-types/navigationItem'
import { FullScreenMenu } from '@components/FullScreenMenu/FullScreenMenu'
import { Header } from '@components/Header/Header'
import { AnimatePresence } from 'framer-motion'
import React, { FC, useState } from 'react'
import { toggleFreezePage } from 'utils/toggleFreezePage'
import s from './MainPage.module.scss'
import { Levels } from './components/Levels/Levels'

const navigation: NavigationItem[] = [
    { id: '#story', title: 'Story' },
    { id: '#rules', title: 'How to play' },
    { id: '#levels', title: 'Levels' },
    { id: '#rankings', title: 'Rankings' },
    { id: '#titles', title: 'Authors' },
]

export type MainPageProps = {}

export const MainPage: FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false)
    const openMenu = () => {
        setMenuOpen(true)
        toggleFreezePage()
    }
    const closeMenu = () => {
        setMenuOpen(false)
        toggleFreezePage()
    }
    return (
        <>
            <main className={s.main}>
                <Header onOpenMenu={openMenu} navigation={navigation} />
                {/* <Hero /> */}
                <Levels />
            </main>
            <AnimatePresence exitBeforeEnter>
                {isMenuOpen && <FullScreenMenu navigation={navigation} onCloseMenu={closeMenu} isOpen={isMenuOpen} />}
            </AnimatePresence>
        </>
    )
}
