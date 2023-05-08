// Description: Main entry point for the application
// Author: Samuel Chamalé
// Created at: 22-04-2023

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from '@routes/App'
import '@assets/global.css'

// TODO check for correct root (not anymore, I think)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
