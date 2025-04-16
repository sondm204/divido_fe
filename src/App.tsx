import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/home/HomePage';
import { ExpensePage } from './pages/expense/ExpensePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
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
