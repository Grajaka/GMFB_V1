import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './Main.module.css'
import App from '../App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VisualGnrl from "../VisualGnrl/VisualGnrl.jsx";
import Login from "../Login/Login.tsx";
import CreateGnrlv1 from "../FormNewMold/CreateGnrlv1.tsx";
import { CreateUbic } from "../FormNewMold/CreateUbic.tsx";
import VisualMold from "../MoldeHV/VisualMold.tsx";
import OrdAPiMold from "../Ordenes/OrdAPiMold.jsx";
import CreateMechanical from "../FormNewMold/CreateMechanical.jsx";
import CreateActivity from "../Activity/CreateActivity.jsx";
import VisualGnrlv2 from "../VisualGnrl/VisualGnrlv2.tsx";
import UnderConstruction from "../Components/underconst.tsx";
import { FormProvider } from "../Hooks/FormNewHerrContext/HerrContext.tsx";
import CreateMeasures from "../FormNewMold/CreateMeasures.tsx";
import EditHerramental from "../EditMold/EditHerramental.tsx";
import { CreateUbicDieSet } from "../FormNewMold/CreateUbicDieSet.tsx";
import { AuthProvider } from "../Context/AuthContext.tsx";
import ProtectedRoute from "../Routes/ProtectedRoute.tsx";

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/Login', element: <Login /> },

    // Routes accessible by type 1 (Administrador), 2 (Operador), and 3 (Visualizador)
    { path: '/VisualGnrlv2', element: <ProtectedRoute allowedTypes={[1, 2, 3]}><VisualGnrlv2 /></ProtectedRoute> },
    { path: '/OrdAPiMold', element: <ProtectedRoute allowedTypes={[1, 2, 3]}><OrdAPiMold /></ProtectedRoute> },
    { path: '/VisualMold', element: <ProtectedRoute allowedTypes={[1, 2, 3]}><VisualMold /></ProtectedRoute> },
    { path: '/VisualMold/:id', element: <ProtectedRoute allowedTypes={[1, 2, 3]}><VisualMold /></ProtectedRoute> },
    { path: '/UnderConstruction', element: <ProtectedRoute allowedTypes={[1, 2, 3]}><UnderConstruction /></ProtectedRoute> },

    // Routes accessible only by type 1 (Administrador) and 2 (Operador)
    { path: '/CreateGnrlv1', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateGnrlv1 /></ProtectedRoute> },
    { path: '/CreateUbic', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateUbic /></ProtectedRoute> },
    { path: '/CreateMeasures', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateMeasures /></ProtectedRoute> },
    { path: '/CreateMechanical', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateMechanical /></ProtectedRoute> },
    { path: '/CreateActivity', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateActivity /></ProtectedRoute> },
    { path: '/EditHerramental', element: <ProtectedRoute allowedTypes={[1, 2]}><EditHerramental /></ProtectedRoute> },
    { path: '/EditHerramental/:id', element: <ProtectedRoute allowedTypes={[1, 2]}><EditHerramental /></ProtectedRoute> },
    { path: '/CreateUbicDieSet', element: <ProtectedRoute allowedTypes={[1, 2]}><CreateUbicDieSet /></ProtectedRoute> },

]);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <AuthProvider> {/* PROVIDER FOR AUTHENTICATION AND USER SESSION*/}
                <FormProvider> {/* PROVIDER FOR FORM DATA TO MOLD*/}
                    <RouterProvider router={router} /> {/* ROUTER*/}
                </FormProvider>
            </AuthProvider>
        </StrictMode>
    </QueryClientProvider>
);
