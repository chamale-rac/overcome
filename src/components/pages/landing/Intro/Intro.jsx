import React from 'react'
import { useSnapshot } from 'valtio'
import * as introStyles from './Intro.module.css'

// TODO add paper background

import arcade from '@assets/svg/arcade_transparent_bg.svg'

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
  fadeAnimation,
} from '@config/motion'

import { landing } from '@context'

import { useNavigate } from 'react-router-dom'

import { AnimatePresence, motion } from 'framer-motion'

import { NavButton } from '@components/global'

const Intro = () => {
  const navigate = useNavigate()
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home">
          <motion.header
            {...slideAnimation('down')}
            className={`${introStyles.landing_navbar} xl:px-32 px-6 pt-3 pb-3.5 mt-4`}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <img
                src="./icon.svg"
                alt="logo"
                className="w-14 h-14 object-contain"
              />
              <h1 className="font-bebas-neue text-5xl">Overcome</h1>
            </div>
            <div>
              <NavButton
                type="link"
                handleClick={() => navigate('/login')}
                customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
              >
                Login
              </NavButton>
            </div>
          </motion.header>
          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text font-bebas-neue">
                DON'T PLAY <br className="xl:hidden block" />
                ALONE
              </h1>
            </motion.div>
            <motion.div
              className="flex flex-col gap-5"
              {...headContentAnimation}
            >
              <p className="max-w-md font-normal text-black text-base">
                Join <strong>Overcome</strong>, the largest gaming community and
                discover your new teammates.
              </p>
              <NavButton
                type="normal"
                handleClick={() => (landing.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
              >
                Get Started ⇒
              </NavButton>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Intro
