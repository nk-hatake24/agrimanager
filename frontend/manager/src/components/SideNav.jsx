import React from 'react'
import { IoPersonSharp } from "react-icons/io5";
import { FaDollarSign, FaHome, FaWarehouse  } from "react-icons/fa";
import {MdGroups } from "react-icons/md"
import {GrResources, GrTransaction} from "react-icons/gr"
import { NavLink } from 'react-router-dom'

const SideNav = () => {

  const CustomNavLink = ({ to, exact, children }) => {
    return (
      <NavLink
        exact={exact}
        to={to}
        className={({ isActive }) =>
          `navitems hover:bg-gray-100  dark:hover:bg-gray-700 ${
            isActive ? 'dark:bg-gray-700 bg-gray-200 shadow-sm shadow-gray-400 dark:shadow-gray-100' : 'text-black dark:text-white'
          }`
        }
      >
        {children}
      </NavLink>
    );
  };
  return (
    <div className='flex flex-col w-full'>
        <div className='hidden md:flex flex-col h-40 gap-2 justify-center bg-gray-200 dark:bg-gray-700'>
          <div className='h-30 flex justify-center items-center'> 
            <div className="photoProfile h-20 w-20 text-white bg-gray-900 rounded-[50%] flex justify-center items-center"><IoPersonSharp  size={42}/></div>
          </div>
          <div  className='flex justify-center'>username</div>
        </div>
        <div className='flex flex-col p-4 text-md md:text-lg'>
          <CustomNavLink to="/homedash" ><FaHome /> Home</CustomNavLink>
          <CustomNavLink to="/Budget"><FaDollarSign /> Budget</CustomNavLink>
          <CustomNavLink to="/employee"   ><MdGroups />Employee</CustomNavLink>
          <CustomNavLink to="/detail"  ><FaWarehouse />Resources</CustomNavLink>
          <CustomNavLink to="/transaction/detailTransaction"  ><GrTransaction />Transactions</CustomNavLink>

        </div>
    </div>
  )
}

export default SideNav