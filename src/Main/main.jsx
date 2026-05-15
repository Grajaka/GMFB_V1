import { StrictMode } from 'react'
import{createRoot} from 'react-dom/client'
import React from 'react'
import './Main.module.css'
import App from '../App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import VisualGnrl from "../VisualGnrl/VisualGnrl.jsx";
import Login from "../Login/Login.jsx";
import CreateGnrlv1 from "../FormNewMold/CreateGnrlv1.tsx";
import {CreateUbic} from "../FormNewMold/CreateUbic.tsx";
import VisualMold from "../MoldeHV/VisualMold.tsx";
import OrdAPiMold from "../Ordenes/OrdAPiMold.jsx";
import CreateMechanical from "../FormNewMold/CreateMechanical.jsx";
import CreateActivity from "../Activity/CreateActivity.jsx";
import VisualGnrlv2 from "../VisualGnrl/VisualGnrlv2.tsx";
import UnderConstruction from "../Components/underconst.tsx";
import {FormProvider} from "../Hooks/FormNewHerrContext/HerrContext.tsx";
import CreateMeasures from "../FormNewMold/CreateMeasures.tsx";


const router = createBrowserRouter([
    {path: '/', element: <App />},

    {path: '/VisualGnrlv2', element: <VisualGnrlv2 />},

    {path: '/CreateGnrlv1', element: <CreateGnrlv1 />},
    {path: '/CreateUbic', element: <CreateUbic />},
    {path: '/OrdAPiMold', element: <OrdAPiMold />},

    {path: '/CreateMeasures', element: <CreateMeasures />},
    {path: '/VisualMold', element: <VisualMold />},
    {path: '/VisualMold/:id', element: <VisualMold />},
    {path: '/CreateMechanical', element: <CreateMechanical />},
    {path: '/Login', element: <Login />},
    {path: '/CreateActivity', element: <CreateActivity />},
    {path: '/UnderConstruction', element: <UnderConstruction />},






    // {path: '*', element: <NotFoundPage />},

]);
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
  <StrictMode>
      <FormProvider>
          <RouterProvider router={router}/>
      </FormProvider>

  </StrictMode>
    </QueryClientProvider>
);
