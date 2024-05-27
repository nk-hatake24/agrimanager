import React from 'react'
import LayoutGeneral from './LayoutGeneral'
import SideNav from '../components/SideNav'
import NavBarTop from '../components/NavBarTop'



const Dashboard = ({children}) => {
  return (
    <LayoutGeneral>
        <div className='bg-gray-50 h-screen overflow-clip flex flex-row p-10 gap-4 dark:bg-gray-900'>
            <div className="w-1/5 rounded shadow-md shadow-gray-200 dark:text-gray-50 dark:shadow-gray-700">
                <SideNav/>
            </div>
            <div className="flex flex-col w-4/5 gap-4">
                <div>
                  <NavBarTop />
                </div>
              <section className='h-full w-full p-1 rounded shadow-md shadow-gray-200 dark:text-gray-50 dark:shadow-gray-700'>
                  {children}
              </section>
            </div>
        </div>
     
        
    </LayoutGeneral>
  )
}

export default Dashboard