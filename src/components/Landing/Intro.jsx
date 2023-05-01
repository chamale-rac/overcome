import React from 'react'
import { useSnapshot } from 'valtio'
import './Landing.css'

import arcade from '@assets/svg/arcade_transparent_bg.svg'

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
  fadeAnimation,
} from '@config/motion'

import { landing } from '@store'

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/ui'

const Intro = () => {
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home">
          <motion.header
            {...slideAnimation('down')}
            className="landing-navbar xl:px-32 px-6 pt-3 pb-3.5 mt-4"
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
              <Button
                type="link"
                handleClick={() => (landing.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
              >
                Login
              </Button>
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
              <Button
                type="normal"
                handleClick={() => (landing.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Intro
