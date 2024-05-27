import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Budget } from "./pages/Budget";
import Resource from "./pages/Resource";
import { Employee } from "./pages/Employee";
import { HomeDashboard1 } from "./pages/HomeDashboard1";
import Home from "./pages/Home";
import { Stock } from "./pages/Stock";
import { Transaction } from "./pages/Transaction";
import { NoPages } from "./pages/NoPages";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
    },  
    {
      path: '/homedash',
      element: <HomeDashboard1/>,
    },  
    {
      path: '/budget',
      element: <Budget/>,
    },  
    {
      path: '/resource',
      element: <Resource/>,
    },  
    {
      path: '/employee',
      element: <Employee/>,
    },  
    {
      path: '/stock',
      element: <Stock/>,
    },  
    {
      path: '/transaction',
      element: <Transaction/>,
    },
    {
      path: '*',
      element: <NoPages/>,
    },    
  ])

  return (
    <RouterProvider router = {router}/>
  )
}

export default App
