import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const AdminLayout = () => {
  useEffect(() => {
    document.title = 'KICKS Admin Panel'
  }, [])
  
  return (
    <div>
      <AdminNavbar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
