// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import { createBrowserRouter } from 'react-router-dom'

import { ErrorPage } from '@assets'

import Landing from '@pages/Landing'

const NonAuth = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
])

export default NonAuth
