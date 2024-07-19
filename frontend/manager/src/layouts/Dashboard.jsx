import React from 'react'
import LayoutGeneral from './LayoutGeneral'
import SideNav from '../components/SideNav'
import NavBarTop from '../components/NavBarTop'
import { NavBottom } from '../components/NavBottom'

const Dashboard = ({children}) => {
  return (
    <LayoutGeneral>
        <div className='bg-zinc-50 flex h-screen overflow-clip p-2 md:p-12 gap-4 dark:bg-zinc-900'>
            <div className="rounded hidden md:block shadow-md shadow-gray-200 md:w-1/5 dark:text-gray-50 dark:shadow-gray-700">
                <SideNav />
            </div>
            <div className="flex flex-col w-full md:w-4/5 gap-4 h-full">
                <div className='shadow shadow-gray-400 dark:shadow-gray-700'>
                  <NavBarTop />
                </div>
                <section className='flex-grow overflow-y-auto rounded shadow-md shadow-gray-200 dark:text-gray-50 dark:shadow-gray-700'>
                  {children}
                </section>
            </div>
            <NavBottom/>

        </div>
    </LayoutGeneral>
  )
}

export default Dashboard
