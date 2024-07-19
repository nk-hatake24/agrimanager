import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBottom = () => {
    const CustomNavLink = ({ to, exact, children }) => {
        return (
            <NavLink
                exact={exact}
                to={to}
                className={({ isActive }) =>
                    `p-2 rounded-[50%] bg-blue-400 flex justify-center text-white items-center h-14 w-14 transition-all duration-300 ${
                        isActive
                            ? "shadow-sm shadow-blue-400 dark:shadow-blue-100 bg-emerald-600"
                            : ""
                    } hover:h-20 hover:w-20 hover:bg-blue-700 hover:p-10`
                }
            >
                {children}
            </NavLink>
        );
    };

    return (
        <div className='z-50 absolute bottom-4 gap-3 flex justify-center w-screen'>
            <CustomNavLink to={'/chatBot'}>tala</CustomNavLink>
            <CustomNavLink to={'/homedash'}>tamo</CustomNavLink>
        </div>
    );
};
