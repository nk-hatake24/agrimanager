import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci"
import Switcher from './Switcher'
import { IoMenu } from 'react-icons/io5';
import SideNav from './SideNav';

const NavBarTop = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="flex flex-row h-12 rounded w-full p-2 items-center justify-between  shadow  shadow-gray-400 dark:shadow-gray-700">
        <div className='hidden md:flex md:flex-row md:items-center md:px-1 gap-1 rounded bg-white dark:bg-gray-600'>
            <CiSearch className='dark:text-gray-50 '/><input type="text" placeholder='search' className='p-1 outline-0 dark:text-gray-50 dark:bg-gray-600' />
        </div>
        <div> <Switcher /></div>
        <div className='block md:hidden'>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dark:text-white">
            <IoMenu size={24} />
          </button>
        </div>
        {isDropdownOpen && (
        <div className="absolute top-12 right-0 dark:text-white bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 md:hidden">
          <div onClick={()=> setIsDropdownOpen(false)} className=" cursor-pointer absolute top-2 right-2 bg-gray-100 hover:bg-slate-200 dark:hover:bg-slate-600 dark:bg-gray-500 p-1">X</div> 
          <SideNav />

        </div>
      )}
    </div>
  )
}

export default NavBarTop