import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Budget from './pages/Budget'
import Dashboard from './pages/Dashboard'
import Employee from './pages/Employee'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Ressource from './pages/Ressource'
import Stock from './pages/Stock'
import Transaction from './pages/Transaction'


const Layout = () => {
  return (
    <>
      <p>ta qui</p>

        <Outlet/>
    </>
  )
}

export default Layout