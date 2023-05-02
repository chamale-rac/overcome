import React from 'react'
import { useSnapshot } from 'valtio'

import { landing } from '@context'

import { AnimatePresence, motion } from 'framer-motion'

import { NavButton } from '@components/global'

import { fadeAnimation, fastFadeAnimation } from '@config/motion'

import { Register } from '@features/authentication'

const Auth = () => {
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <motion.div className="flex flex-col">
          <motion.div className="self-end mr-10 mt-10 mb-10" {...fadeAnimation}>
            <NavButton
              type="normal"
              handleClick={() => (landing.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
            >
              ⇐ Return
            </NavButton>
          </motion.div>
          <motion.div
            className="flex flex-col items-center justify-center h-full"
            {...fastFadeAnimation}
          >
            <Register />
            <NavButton
              type="link"
              handleClick={() => alert('go login')}
              customStyles="w-fit px-4 py-2.5 font-bold rounded-full text-base mb-20"
            >
              Already have an account?
            </NavButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Auth
