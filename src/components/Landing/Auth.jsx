import React from 'react'
import { useSnapshot } from 'valtio'

import { landing } from '@store'

import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@components/ui/Button'

import { slideAnimation } from '@config/motion'

const Auth = () => {
  const snap = useSnapshot(landing)
  return (
    <AnimatePresence>
      {!snap.intro && (
        <motion.div
          className="flex flex-col items-center justify-center h-screen"
          {...slideAnimation('right')}
        >
          <h1>Auth</h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Auth
