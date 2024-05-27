import React from 'react'

const LayoutGeneral= ({ children }) => {
    return (
      <div className='h-screen w-screen  bg-gray-50   dark:bg-gray-900 '>
        
        <main>
          {children}
        </main>
      </div>
    )
  }

export default LayoutGeneral
