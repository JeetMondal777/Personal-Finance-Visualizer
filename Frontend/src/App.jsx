import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home'
import Update from './pages/Update'
import AuthProtector from './pages/Auth/AuthProtector'

const App = () => {
  return (
    <div className=''><Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/update"
        element={
          <Update />
        }
      />
      </Routes>
      </div>
  )
}

export default App