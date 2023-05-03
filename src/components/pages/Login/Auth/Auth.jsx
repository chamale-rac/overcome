import React from 'react'

import { landing } from '@context'

import { AnimatePresence, motion } from 'framer-motion'

import { useNavigate } from 'react-router-dom'

import { NavButton } from '@components/global'

import { fadeAnimation, fastFadeAnimation } from '@config/motion'

import { Login } from '@features/authentication'

const Auth = () => {
  const navigate = useNavigate()
  return (
    <AnimatePresence>
      <motion.div className="flex flex-col">
        <motion.div className="self-end mr-10 mt-10 mb-10" {...fadeAnimation}>
          <NavButton
            type="normal"
            handleClick={() => navigate(-1)}
            customStyles="w-fit px-4 py-2.5 font-bold  rounded-full text-base"
          >
            ⇐ Return
          </NavButton>
        </motion.div>
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          {...fastFadeAnimation}
        >
          <Login
            customStyles={'xl:mt-36'}
            successAction={() => navigate('/home')}
          />
          <NavButton
            type="link"
            handleClick={() => {
              navigate('/')
              landing.intro = false
            }}
            customStyles="w-fit px-4 py-2.5 font-bold rounded-full text-base mb-20"
          >
            You have no account?
          </NavButton>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Auth
