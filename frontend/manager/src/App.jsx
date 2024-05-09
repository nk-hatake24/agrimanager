import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout"
import Dashboard from "./layouts/pages/Dashboard"
import NoPage from "./layouts/pages/NoPage"
import Home from './layouts/pages/Home';
import Budget from './layouts/pages/Budget';
import Employee from './layouts/pages/Employee';
import Transaction from './layouts/pages/Transaction';
import Ressource from './layouts/pages/Ressource';
import Stock from './layouts/pages/Stock';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  }, 
  {
    path: '/Dashboard',
    element: <Dashboard/>,
  }, 
  {
    path: '/budget',
    element: <Budget/>,
  },
  {
    path: '/employee',
    element: <Employee/>,
  },
  {
    path: '/transaction',
    element: <Transaction/>,
  },
  {
    path: '/ressource',
    element: <Ressource/>,
  },
  {
    path: '/stock',
    element: <Stock/>,
  },
  {
    path: '*',
    element: <NoPage/>
  }
])

const App=() =>{

  return(
    
      <RouterProvider router = {router}/>
  )
}


export default App