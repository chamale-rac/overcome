// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '@assets'

import { Landing, Login } from '@pages'

import { Home } from '@layouts'

import UserEvents from '@features/render/RenderEvents'
// Move home to auth root

const Auth = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <div>Home</div>,
      },
      {
        path: '/home/profile',
        element: <div>Profile</div>,
      },
      {
        path: '/home/events',
        element: <UserEvents />,
      },
    ],
  },
])

export default Auth
