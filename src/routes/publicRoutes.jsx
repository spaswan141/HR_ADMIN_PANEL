import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'

import Signup from '../pages/auth/signup'
import Login from '../pages/auth/login'
const PublicRoutes = () => {
  return (
    <Routes>
        <Route  path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
         <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default PublicRoutes
