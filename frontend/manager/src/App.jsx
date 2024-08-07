import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Budget } from "./pages/Budget";
// import Resource from "./pages/Resource";
import { Employee } from "./pages/Employee";
import { HomeDashboard1 } from "./pages/HomeDashboard1";
import Home from "./pages/Home";
import { Transaction } from "./pages/Transaction";
import { NoPages } from "./pages/NoPages";
import { Detail } from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { DetailTransaction } from "./pages/DetailTransaction";

import { Supplier } from "./pages/Supplier";
import { Note } from "./pages/Note";
import {AccountRegister} from './pages/AccountRegister'
import { Sell } from "./pages/Sell";
import Chatbot from "./pages/Chatbot";
import { Todo } from "./pages/Todo";

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
      path: 'detailTransaction',
      element: <DetailTransaction />
    },


    {
      path: '/account',
      element: <AccountRegister />,
    },
    {
      path: 'detail',
      element: <Detail />,
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
      path: '/supplier',
      element: <Supplier />,
    },
    {
      path: '/note',
      element: <Note />,
    },
    {
      path: '/sell',
      element: <Sell />,
    },
    {
      path: '/todo',
      element: <Todo />
    },
    {
      path: '/chatbot',
      element: <Chatbot />
    },

    {
      path: '*',
      element: <NoPages />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
