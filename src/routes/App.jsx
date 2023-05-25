import { ErrorPage } from '@assets'

import { Landing, Login, EventsDashboard } from '@pages'

import { Home } from '@layouts'

import UserEvents from '@features/render/RenderEvents'

import RequireAuth from '@components/requireAuth'

import { Routes, Route } from 'react-router-dom'

import HomePage from '@features/render/HomePage'

import GlobalEvents from '@features/render/RenderGlobalEvents'

import Profile from '@features/render/RenderProfile'
import EventPage from '../pages/EventPage/EventPage'

/*
TODO: Add roles to users and use them to restrict access to certain routes
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
}*/

/* Adrian: I simplified/joined both auth and non auth routes to for my mental health. TODO: Split */

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* protected */}
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<Home />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/profile" element={<Profile />} />
          <Route path="/home/events" element={<GlobalEvents />} />
          <Route path="/home/myevents" element={<UserEvents />} />
          <Route path="/home/newevent" element={<EventsDashboard />} />
          <Route path="/home/events/:_id" element={<EventPage />} />
        </Route>
      </Route>

      {/* catch all */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
