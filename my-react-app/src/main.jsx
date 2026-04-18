import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './index.css'
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Register from './Register.jsx'
import Header from '../component/Header';

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
