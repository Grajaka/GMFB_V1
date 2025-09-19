import { StrictMode } from 'react'
import{createRoot} from 'react-dom/client'
import React from 'react'
import './Main.module.css'
import App from '../App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import VisualGnrl from "../VisualGnrl/VisualGnrl.jsx";
//import Login from "../Login/Login.jsx";
import Orders from "../Ordenes/Orders.jsx";
import CreateGnrl from "../FormNewMold/CreateGnrl.jsx";
import CreateMeasures from "../FormNewMold/CreateMeasures.jsx";
//import VisualMold from "../MoldeHV/VisualMold.jsx";


const router = createBrowserRouter([
    {path: '/', element: <App />},
    //{path: '/Login', element: <Login />},
    {path: '/VisualGnrl', element: <VisualGnrl />},
    {path: '/Orders', element: <Orders />},
    {path: '/CreateGnrl', element: <CreateGnrl />},

    {path: '/CreateMeasures', element: <CreateMeasures />},
    //{path: '/VisualMold', element: <VisualMold />},




    //{path: '/VisualMold', element: <VisualMold />},
    // {path: '*', element: <NotFoundPage />},

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>
);
