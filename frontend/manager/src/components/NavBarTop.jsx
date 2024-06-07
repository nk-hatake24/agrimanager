import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import Switcher from './Switcher';
import { IoMenu } from 'react-icons/io5';
import SideNav from './SideNav';
import { useNavigate } from 'react-router-dom';

const NavBarTop = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si le token est dans le localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-row h-12 rounded w-full p-2 items-center justify-between">
      <div> <Switcher /></div>
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dark:text-white">
          {isLoggedIn ? 'Account' : 'Login'}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4">
            <ul className="list-none p-0 m-0">
              {isLoggedIn ? (
                <li>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <button onClick={handleLogin} className="block w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className='block md:hidden'>
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dark:text-white">
          <IoMenu size={24} />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-50 top-12 right-0 dark:text-white bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 md:hidden">
          <div onClick={() => setIsDropdownOpen(false)} className="cursor-pointer absolute top-2 right-2 bg-gray-100 hover:bg-slate-200 dark:hover:bg-slate-600 dark:bg-gray-500 p-1">
            X
          </div>
          <SideNav />
        </div>
      )}
    </div>
  );
};

export default NavBarTop;
