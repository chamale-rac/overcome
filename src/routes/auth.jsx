// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '@assets'

import { Landing, Login } from '@pages'

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
])

export default Auth
