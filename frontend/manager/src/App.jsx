import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import LayoutGeneral from "./layouts/LayoutGeneral";
import { Budget } from "./pages/Budget";
import Resource from "./pages/Resource";
import { Employee } from "./pages/Employee";


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard/>,
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
  ])

  return (
    <RouterProvider router = {router}/>
  )
}

export default App
