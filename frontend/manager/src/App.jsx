import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout"
import Layout from "./layouts/pages/Dashboard"
import Dashboard from './layouts/pages/Dashboard';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
  }, 
  {
    path: '/Dashboard',
    element: <Dashboard/>,
  }, 
 
  {
    path: '*',
    element: <NoPages/>
  }
])

const App=() =>{

  return(
    
      <RouterProvider router = {router}/>
  )
}


export default App