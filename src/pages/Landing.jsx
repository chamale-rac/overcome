import React from 'react'
import { Intro, Auth } from '@components/pages/landing'

const Landing = () => {
  return (
    <main className="app transition-all ease-in">
      <Intro />
      <Auth />
    </main>
  )
}

export default Landing
