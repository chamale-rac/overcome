import React from 'react'
import { useSnapshot } from 'valtio'
import * as introStyles from './Intro.module.css'
import { useInView } from 'react-intersection-observer'

// TODO add paper background

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

  const renderCard = (card, delay) => {
    const { ref, inView } = useInView({
      threshold: 0.5,
      triggerOnce: true,
    })

    const animationVariants = {
      visible: {
        opacity: 1,
        translateY: 0,

        transition: { duration: 0.5, delay, ease: 'easeInOut' },
      },
      hidden: { opacity: 0, translateY: 50 }, // translateY adds a slight slide up effect
    }

    var iconComponent

    switch (card.icon) {
      case 'people':
        iconComponent = (
          <img
            src="/chats_chatting.png"
            alt="chats_illustration"
            width="180px"
            className="rotate-6 "
          />
        )
        break
      case 'calendar':
        iconComponent = <img src="/calendar.png" alt="people" width="150px" />
        break
      case 'gamepad':
        iconComponent = (
          <img src="/controller_thumbs_up.png" alt="people" width="180px" />
        )
        break
      default:
        iconComponent = null
        break
    }

    return (
      <motion.div
        ref={ref}
        className={`border border-black border-2 relative flex flex-col w-full m-3 h-auto sm:w-1/3 max-w-md items-center justify-center p-4 bg-gray-50 rounded-md`}
        style={{ minHeight: '50%', height: 'auto' }}
        variants={animationVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Rotated badge */}
        <div
          className={`font-space-grotesk absolute -top-5   transform rotate-6 px-3 py-1 ${card.tagColor} text-white text-xl font-medium`}
        >
          {card.tag}
        </div>

        {iconComponent}

        <h3 className="text-3xl font-bold text-center font-space-grotesk mt-3">
          {card.title}
        </h3>
        <p className="text-lg text-center">{card.description}</p>
      </motion.div>
    )
  }

  const cards = [
    {
      title: 'No more solo queue',
      description: 'Need to fill a spot? Find teammates to play with you',
      tag: 'Team Up',
      tagColor: 'bg-red-500',
      color: '#ef635d',
      icon: 'people',
    },
    {
      title: 'Schedule game sessions',
      description:
        'Plan events for your games, or join others of your interest',
      tag: 'Strategize',
      tagColor: 'bg-green-500',
      icon: 'calendar',
    },
    {
      title: 'Discover new games',
      description:
        'Fresh to a game? Find teammates to help you learn the ropes',
      tag: 'Explore',
      tagColor: 'bg-blue-500',
      icon: 'gamepad',
    },
  ]

  const featuredCards = cards.map((card, index) =>
    renderCard(card, index * 0.2),
  )

  return (
    <AnimatePresence>
      {snap.intro && (
        <section>
          <motion.section className={`home ${introStyles.paper_bg} h-screen`}>
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
                <h1 className="font-roboto-mono  text-2xl">overcome</h1>
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
                <h1 className="head-text font-space-grotesk">
                  DON'T PLAY <br className="xl:hidden block" />
                  ALONE
                </h1>
              </motion.div>

              <motion.div
                className="flex flex-col gap-5"
                {...headContentAnimation}
              >
                <p className="max-w-md font-normal text-black text-base">
                  Join <strong>Overcome</strong>, the largest gaming community
                  and discover your new teammates.
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
          <motion.section className="grid_bg  ">
            <div className="min-h-screen flex items-center shadow-inner">
              <div class="h-full flex w-full items-center justify-center  flex-col sm:flex-row ">
                {featuredCards}
              </div>
            </div>

            <motion.div className="home-footer w-full flex flex-col items-center justify-center gap-2">
              <div className="flex flex-row items-center justify-center gap-2 ">
                <img
                  src="./icon.svg"
                  alt="logo"
                  className="w-14 h-14 object-contain"
                />
                <h1 className="font-roboto-mono  text-2xl">overcome</h1>
              </div>
              <p className="font-normal text-black text-base">
                © 2023 Overcome. All rights reserved.
              </p>
            </motion.div>
          </motion.section>
        </section>
      )}
    </AnimatePresence>
  )
}

export default Intro
