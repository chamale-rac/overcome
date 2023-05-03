// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '@assets'

import { Landing, Login } from '@pages'

import { Home } from '@layouts'

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
        path: '/a',
        element: <div>Home</div>,
      },
    ],
  },
])

export default Auth
