import '../styles/globals.css'
import * as React from 'react';
import Switch from '@mui/material/Switch';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { blue } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import FilterForm from './FilterForm.js';
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar.jsx";
import ChecklistIcon from '@mui/icons-material/Checklist';
import LoadingAnimation from "../Components/LoadingAnimation.jsx";
import { useParams, useNavigate } from "react-router-dom";
//***********************************************************

import useAxios from "../Hooks/useAxios/IndexAx.js";
import { useEffect, useState, useMemo } from "react";
import Stack from "@mui/material/Stack";
import { FETCH_STATUS } from "../Hooks/useAxios/FetchStatus.js";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    flexRender,
    getSortedRowModel,
} from '@tanstack/react-table';
import Pagination from "@mui/material/Pagination";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { zodResolver } from "@hookform/resolvers/zod";


/*
const initialMoldes = [
    {
        qr: "src/assets/qr-code.png",
        id: 1,
        name: "M-HX01",
        image: "src/assets/MoldesImg/M-HX01.JPEG",
        machine: "Ona",
        state: "Taller",
    },
    {
        qr: "src/assets/qr-code.png",
        id: 2,
        name: "M-HX02",
        image: "src/assets/MoldesImg/M-HX02.JPEG",
        machine: "24",
        state: "Taller",
    },
    {
        qr: "src/assets/qr-code.png",
        id: 3,
        name: "M-HX03",
        image: "src/assets/MoldesImg/M-HX03.JPEG",
        machine: "16",
        state: "Taller",
    },
    {
        qr: "src/assets/qr-code.png",
        id: 4,
        name: "M-HX05",
        image: "src/assets/MoldesImg/M-HX05.JPEG",
        machine: "22",
        state: "Taller",

    },
]
*/



import useToolImage from "../Hooks/useToolImage.js";
import useToolQrCode from "../Hooks/useToolQrCode.js";
import QRCode from "react-qr-code";


export default function VisualGnrlv2() {
    const { response, error, status, fetchData } = useAxios(); //Response stores the data fetched from API
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([])
    const [filters, setFilters] = useState<any>({});
    const isLoading = status === FETCH_STATUS.LOADING;
    const navigate = useNavigate();

    useEffect(() => {
        // Clean out default 0 values and empty/null values
        const cleanParams = Object.keys(filters).reduce((acc, key) => {
            const val = filters[key];
            if (val !== 0 && val !== '' && val !== null && val !== undefined) {
                acc[key] = val;
            }
            return acc;
        }, {} as any);

        fetchData({
            url: '/api/herramental_especifico/',
            method: "GET",
            params: cleanParams,
        });
    }, [filters, fetchData]);

    // Apply client-side filter fallback (ideal for mock testing and backend variations)
    const filteredData = useMemo(() => {
        if (!response || !Array.isArray(response)) return [];
        return response.filter((item: any) => {
            // 1. Tipo de Herramental
            if (filters.hesp_IdTipoHerramental) {
                const selId = Number(filters.hesp_IdTipoHerramental);
                const itemVal = item.hesp_IdTipoHerramental;
                if (itemVal !== undefined && itemVal !== null) {
                    if (Number(itemVal) !== selId) return false;
                } else {
                    const mockTiposMap: Record<number, string> = {
                        1: "Troquel (T)",
                        2: "Molde (M)",
                        3: "Copa (C)"
                    };
                    if (item.nombre_tipo_herramental !== mockTiposMap[selId]) return false;
                }
            }
            // 2. Familia
            if (filters.hesp_IdFamilia) {
                const selId = Number(filters.hesp_IdFamilia);
                const itemVal = item.hesp_IdFamilia;
                if (typeof itemVal === 'string') {
                    const mockCodes: Record<string, number> = { "HX": 3, "CU": 4, "RE": 5 };
                    if (mockCodes[itemVal] !== selId) return false;
                } else if (itemVal !== undefined && itemVal !== null) {
                    if (Number(itemVal) !== selId) return false;
                }
            }
            // 3. Máquina PP
            if (filters.hesp_IdMaquinaPP) {
                const selId = Number(filters.hesp_IdMaquinaPP);
                const itemVal = item.hesp_IdMaquinaPP;
                if (itemVal !== undefined && itemVal !== null) {
                    if (Number(itemVal) !== selId) return false;
                } else {
                    const mockMaquinasMap: Record<number, string> = { 1: "84", 2: "25", 3: "28" };
                    if (item.nombre_maquina_pp !== mockMaquinasMap[selId]) return false;
                }
            }
            // 4. Estantería (Ubicación)
            if (filters.hesp_IdEstanteria) {
                const selId = Number(filters.hesp_IdEstanteria);
                const itemVal = item.hesp_IdEstanteria;
                if (itemVal !== undefined && itemVal !== null) {
                    if (Number(itemVal) !== selId) return false;
                } else {
                    const mockEstanteriasMap: Record<number, string> = { 50: "A", 60: "B" };
                    if (item.nombre_estanteria !== mockEstanteriasMap[selId]) return false;
                }
            }
            // 5. DieSet
            if (filters.hesp_IdDieSet) {
                const selId = Number(filters.hesp_IdDieSet);
                const itemVal = item.hesp_IdDieSet;
                if (itemVal !== undefined && itemVal !== null) {
                    if (Number(itemVal) !== selId) return false;
                } else {
                    const mockDiesetsMap: Record<number, string> = { 1: "1500", 2: "1600", 3: "1700" };
                    if (item.codigo_dieset !== mockDiesetsMap[selId]) return false;
                }
            }
            return true;
        });
    }, [response, filters]);

    //Define (Memoizing) Columns
    const columns = useMemo(() => [
        {
            header: 'id',
            accessorKey: 'hesp_IdHerramentalEspecifico',
        },
        {
            header: 'name',
            accessorKey: 'hesp_CodigoHerramental',
        },
        {
            header: 'machine',
            accessorKey: 'nombre_maquina_pp',
        },
        {
            header: 'state',
            accessorKey: 'nombre_estado_Herr',
        },
        {
            header: 'image',
            accessorKey: 'hesp_IdImagen',
            cell: ({ getValue }) => {
                const idImagen = getValue() as number;
                return <TableImage idImagen={idImagen} />;
            }
        },

        {
            header: 'QR',
            cell: ({ row }) => {
                const toolData = row.original;
                return <TableQrCode toolData={toolData} />;
            }
        }

    ], []);

    //DEBUGGING

    // fetch('http://localhost:8000/api/herramental_especifico/')
    //     .then(res => res.json())
    //     .then(data => console.log('API RESPONSE:', data))
    //     .catch(err => console.error('API ERROR:', err));
    //-----------------------------------------------------------------0
    console.log("RESPONSE", response);

    console.log("RESPONSE TYPE", typeof response);
    console.log("IS ARRAY?", Array.isArray(response));

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter, //Owns globalFilter state
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getSortedRowModel: getSortedRowModel(),
    });


    if (isLoading) {
        return <LoadingAnimation message="Moldes" />;

    }

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <NavBar />
            <div className="grid grid-cols-[0.45fr_1.9fr]">

                <div>
                    <FilterForm
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        onApplyFilters={setFilters}
                    />
                </div>

                <div className="ml-7 mt-0  ">
                    <Link to="/CreateGnrlv1">
                        <button className="btn btn-blue">Nuevo molde</button>
                    </Link>


                    {/* RENDER THE LIST USING TANSTACK ROW MODEL */}

                    <ul>
                        {table.getRowModel().rows.map((row) => (
                            <Molde
                                key={row.original.hesp_IdHerramentalEspecifico}
                                molde={row.original}
                                onNavigate={() => navigate(`/VisualMold/${row.original.hesp_IdHerramentalEspecifico}`)}
                            />
                        ))}
                    </ul>

                    {/* MUI PAGINATION INTEGRATION */}

                    <div className="mt-8 flex justify-center pb-10">
                        <Stack spacing={10}>
                            <Pagination
                                count={table.getPageCount()}
                                page={table.getState().pagination.pageIndex + 1}
                                onChange={(event, value) => table.setPageIndex(value - 1)}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                    </div>
                </div>
            </div >
        </>
    )
}



function TableImage({ idImagen }: { idImagen: number | null | undefined }) {
    const { imageUrl } = useToolImage(idImagen);
    if (!idImagen) return <span>Sin imagen</span>;
    return (
        <img
            src={imageUrl || "./default-image.svg"}
            alt="Herramental"
            className="w-24 h-24 object-cover"
        />
    );
}

function TableQrCode({ toolData }: { toolData: any }) {
    const qrCodeValue = useToolQrCode(toolData);
    return (
        <div className="w-16 h-16 bg-white flex items-center justify-center border border-gray-300 rounded p-1">
            <QRCode
                value={qrCodeValue}
                size={500}
                style={{ height: "100%", maxWidth: "200%", width: "200%" }}
            />
        </div>
    );
}

function Molde({ molde, onNavigate }) {
    const { imageUrl } = useToolImage(molde.hesp_IdImagen);
    const qrCodeValue = useToolQrCode(molde);

    return (
        <li className="molde-list-item" onClick={onNavigate} style={{ cursor: 'pointer' }}>
            <div className="col-start-1 row-span-5 self-center justify-self-center w-auto h-auto object-cover">
                <Avatar
                    alt={molde.hesp_CodigoHerramental}
                    src={imageUrl || "./default-image.svg"}
                    sx={{ width: 200, height: 200 }}
                    variant="rounded"
                    className=" col-start-1 row-span-5 items-center m-5"
                />
            </div>


            <h3 className="col-start-3 row-start-1 justify-self-start">{molde.hesp_CodigoHerramental}</h3>
            <p className="col-start-3 row-start-2 row-end-3 justify-self-start bg-blue-50">Estado: {molde.nombre_estado_Herr} </p>
            <p className="col-start-3 row-start-3 row-end-4 justify-self-start bg-blue-50">Máquina: {molde.nombre_maquina_pp} </p>
            <p className="col-start-3 row-start-4 row-end-5 justify-self-start bg-blue-50">Código alterno: {molde.hesp_CodigoAlterno} </p>

            <div className="col-start-2 row-span-5 self-center justify-self-center w-auto h-auto bg-white flex items-center justify-center border border-gray-300 rounded  shadow-sm m-2">
                <QRCode
                    value={qrCodeValue}
                    size={200}
                    style={{ height: "100%", maxWidth: "100%", width: "100%" }}
                />
            </div>

            <div className="col-start-5 row-span-2 m-2 bg-blue-50">
                <Link to="/CreateActivity">
                    <ChecklistIcon />
                </Link>

                {/* Agrega el botón de editar con el icono */}
                <Link to={`/EditHerramental/${molde.hesp_IdHerramentalEspecifico}`}>
                    <button>
                        <ModeEditIcon sx={{ color: blue[500], cursor: 'pointer' }} />
                    </button>
                </Link>
            </div>
        </li>

    )
}

