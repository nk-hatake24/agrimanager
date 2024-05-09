import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <nav>
        <div>
            <NavLink to= {'/budget'}> budget</NavLink>
        </div>
        <div>
            <NavLink to= {'/employee'}>employee</NavLink>
        </div>
        <div>
            <NavLink to= {'/ressource'} >resource</NavLink>
        </div>
        <div>
            <NavLink to={'/stock'}> stock</NavLink>
        </div>
        <div>
            <NavLink to={'/transaction'} >transaction</NavLink>
        </div>
    </nav>
  )
}

export default SideBar