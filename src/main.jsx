// Description: Main entry point for the application
// Author: Samuel Chamalé
// Date: 22-04-2023

// BEGIN IMPORTS //
// dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// @assets
import { ErrorPage } from '@assets'
// END IMPORTS //

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
