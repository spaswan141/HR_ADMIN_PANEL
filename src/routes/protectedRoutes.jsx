import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Layout from '../pages/dashboard/layout'
import CandidatesPage from '../pages/dashboard/Candidate'
import Employee from '../pages/dashboard/employee'
import Attendance from '../pages/dashboard/attendance'
import Leaves from "../pages/dashboard/leaves"
const ProtectedRoutes = () => {
  return (
    <Layout>
        <Routes>
          <Route path="/" element={<CandidatesPage />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leaves" element={<Leaves/>}/>
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </Layout>
  )
}

export default ProtectedRoutes
