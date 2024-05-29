import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home
        <p><Link to='/homedash'>go to dashoard</Link></p>
    </div>
  )
}

export default Home