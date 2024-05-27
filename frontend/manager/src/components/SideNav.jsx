import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaDollarSign, FaHome, FaTree  } from "react-icons/fa";
import {MdGroups } from "react-icons/md"
import {GrResources} from "react-icons/gr"
import { NavLink } from 'react-router-dom'

const SideNav = () => {
  return (
    <div className='flex flex-col w-full'>
        <div className='flex flex-col h-40 gap-2 justify-center bg-gray-200 dark:bg-gray-700'>
          <div className='h-30 flex justify-center items-center'> 
            <div className="photoProfile h-20 w-20 text-white bg-gray-900 rounded-[50%] flex justify-center items-center"><IoPersonSharp  size={42}/></div>
          </div>
          <div  className='flex justify-center'>username</div>
        </div>
        <div className='flex flex-col p-4'>
          <NavLink to="/home" className={'p-2 gap-2  flex justify-start items-center focus:bg-gray-200 dark:focus:bg-gray-700'}><FaHome size={18}/> Home</NavLink>
          <NavLink to="/Budget" className={'p-2 gap-2  flex justify-start items-center focus:bg-gray-200 dark:focus:bg-gray-700'}><FaDollarSign size={18}/> Budget</NavLink>
          <NavLink to="/employee" className={'p-2 gap-2 flex justify-start items-center focus:bg-gray-200 dark:focus:bg-gray-700 '}><MdGroups size={18}/>Employee</NavLink>
          <NavLink to="/resources" className='p-2 gap-2 flex justify-start items-center focus:bg-gray-200 dark:focus:bg-gray-700 '><GrResources size={18}N/>Resources</NavLink>
          <NavLink to="/stock" className='p-2 gap-2 flex justify-start items-center  focus:bg-gray-200 dark:focus:bg-gray-700 '>Stocks</NavLink>
          <NavLink to="/transaction" className='p-2 flex justify-start items-center focus:bg-gray-200 dark:focus:bg-gray-700 '>Transactions</NavLink>

        </div>
    </div>
  )
}

export default SideNav