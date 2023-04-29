import React from 'react'
import { useSnapshot } from 'valtio'

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '@config/motion'

import { landing } from '@store'

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/ui/Button'

const Intro = () => {
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home">
          <motion.header {...slideAnimation('down')}>
            <img
              src="./overcome.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text font-bebas-neue">
                OVER
                <br className="xl:hidden block" />
                COME
              </h1>
            </motion.div>
            <motion.div
              className="flex flex-col gap-5"
              {...headContentAnimation}
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Crea tu proprio equipo de videojuegos y conoce a personas con
                tus mismos gustos <strong>¡No te quedes atrás!</strong>
              </p>
              <Button
                type="filled"
                handleClick={() => (landing.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              >
                ¡Comenzar!
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Intro
