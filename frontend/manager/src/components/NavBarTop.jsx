import React from 'react'
import { CiSearch } from "react-icons/ci"
import Switcher from './Switcher'

const NavBarTop = () => {
  return (
    <div className="flex flex-row h-12 rounded w-full p-1 items-center justify-between shadow  shadow-gray-400 dark:shadow-gray-700">
        <div className='flex flex-row items-center px-1 gap-1 rounded bg-white dark:bg-gray-600'>
            <CiSearch className='dark:text-gray-50'/><input type="text" placeholder='search' className='p-1 outline-0 dark:text-gray-50 dark:bg-gray-600' />
        </div>
        <div> <Switcher /></div>
    </div>
  )
}

export default NavBarTop