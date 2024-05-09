import React from 'react'
import { NavLink } from 'react-router-dom'


const Home = () => {
  return (
    <div>Home
      <div>
            <NavLink to= {'/dashboard'}>get start</NavLink>
        </div>
    </div>
  )
}

export default Home