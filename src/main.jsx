// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import NonAuth from '@routes/non-auth'
import '@assets/global.css'

// TODO check for correct root

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={NonAuth} />
  </React.StrictMode>,
)
