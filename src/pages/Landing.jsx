import React from 'react'
import { Intro, Auth } from '@components/pages/landing'
import * as landingStyles from './Landing.module.css'

const Landing = () => {
  return (
    <main className={`${landingStyles.background} app transition-all ease-in`}>
      <Intro />
      <Auth />
    </main>
  )
}

export default Landing
