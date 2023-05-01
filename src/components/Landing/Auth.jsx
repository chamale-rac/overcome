import React from 'react'
import { useSnapshot } from 'valtio'

import { landing } from '@store'

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/ui'

import { fadeAnimation, fastFadeAnimation } from '@config/motion'

import { Register } from '@features/authentication/components'

const Auth = () => {
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="flex flex-col items-center justify-center h-screen"
            {...fastFadeAnimation}
          >
            <Register />
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <Button
              type="normal"
              handleClick={() => (landing.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
            >
              ⇐ Return
            </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Auth
