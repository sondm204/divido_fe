import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ExpensePage } from './pages/expense/ExpensePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/expenses",
    element: <ExpensePage />,
  }
  
]);


const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
