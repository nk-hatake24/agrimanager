import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaDollarSign, FaHome, FaWarehouse  } from "react-icons/fa";
import {MdGroups } from "react-icons/md"
import {GrResources, GrTransaction} from "react-icons/gr"
import { NavLink } from 'react-router-dom'

const SideNav = () => {
  return (
    <div className='flex flex-col w-full'>
        <div className='hidden md:flex flex-col h-40 gap-2 justify-center bg-gray-200 dark:bg-gray-700'>
          <div className='h-30 flex justify-center items-center'> 
            <div className="photoProfile h-20 w-20 text-white bg-gray-900 rounded-[50%] flex justify-center items-center"><IoPersonSharp  size={42}/></div>
          </div>
          <div  className='flex justify-center'>username</div>
        </div>
        <div className='flex flex-col p-4 text-md md:text-lg'>
          <NavLink to="/homedash" className={'navitems hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700'}><FaHome /> Home</NavLink>
          <NavLink to="/Budget" className={'navitems hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700'}><FaDollarSign /> Budget</NavLink>
          <NavLink to="/employee" className={'navitems  hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700  '}><MdGroups />Employee</NavLink>
          <NavLink to="/resource" className='navitems  hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700  '><GrResources />Resources</NavLink>
          <NavLink to="/stock" className='navitems   hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700  '><FaWarehouse />Stocks</NavLink>
          <NavLink to="/transaction" className='navitems  hover:bg-gray-200 dark:focus:bg-gray-700 dark:hover:bg-gray-700  '><GrTransaction />Transactions</NavLink>

        </div>
    </div>
  )
}

export default SideNav