import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Budget } from "./pages/Budget";
import Resource from "./pages/Resource";
import { Employee } from "./pages/Employee";
import { HomeDashboard1 } from "./pages/HomeDashboard1";
import Home from "./pages/Home";
import { Stock } from "./pages/Stock";
import { Transaction } from "./pages/Transaction";
import { NoPages } from "./pages/NoPages";
import { Detail } from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/homedash',
      element: <HomeDashboard1 />,
    },
    {
      path: '/budget',
      element: <Budget />,
    },
    {
      path: '/employee',
      element: <Employee />,
    },
    {
      path: '/transaction',
      element: <Transaction />,
    },
    {
      path: '/resource',
      element: <Resource />,
      children: [
        {
          path: 'detail',
          element: <Detail />,
        },
        {
          path: 'stock',
          element: <Stock />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '*',
      element: <NoPages />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
