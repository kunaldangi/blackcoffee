import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "./main.css";

import Dashboard from './dashboard/index.jsx';
import Login from './login/index.jsx';
import Register from './register/index.jsx';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Router,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: ( <Dashboard />),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
