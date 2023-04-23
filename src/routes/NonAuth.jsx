// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

// BEGIN IMPORTS //
// React, hooks and dependencies
import { createBrowserRouter } from 'react-router-dom'

// @assets
import { ErrorPage } from '@assets'

// @pages
import Landing from '@pages/Landing'
// END IMPORTS //

const NonAuth = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/landing',
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
])

export default NonAuth
