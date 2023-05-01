import React from 'react'
import { Intro, Auth } from '@components/Landing'

const Landing = () => {
  return (
    <main className="app transition-all ease-in">
      <Intro />
      <Auth />
    </main>
  )
}

export default Landing
