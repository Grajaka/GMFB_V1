import '../styles/globals.css'
import NavBar from "../Components/NavBar.jsx";
import * as React from "react";
import useAxios from "../Hooks/useAxios/IndexAx.jsx";

import {useEffect, useState} from "react";
//import {useState} from "react";

export default function Orders() {
    const {response, error, loading, fetchData} = useAxios();
    const [NumeroPedido, setNumeroPedido] = useState("");
    const [User, setUser] = useState(null);
    //const [title, setTitle] = useState("");
    //const[thumbnailUrl, setThumbnailUrl] = useState("");
    const KEY = '';
    const fetchOrders = async () => {
        await fetchData({
            url: '/api/moldes',
            //url: '/api/planta-virtual',
            method: "GET",
        });
    };
    useEffect(() => {
        fetchOrders();
    }, []);
//DEBUGGING
    fetch('http://10.1.1.14:8000/api/moldes')
        .then(res => res.json())
        .then(data => console.log('API RESPONSE:', data))
        .catch(err => console.error('API ERROR:', err));
//-----------------------------------------------------------------0
    console.log("RESPONSE", response);

    console.log("RESPONSE TYPE", typeof response);
    console.log("IS ARRAY?", Array.isArray(response));


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (

        <>
            <NavBar/>
            <div>
                <h1>Orders</h1>

                <table className="w-full table-fixed border-spacing-2 md:border-spacing-4 border-bg-blueFB bg-bg-blueFB">
                    <thead className="bg-white border-b-2 border-light-greyFB">
                    <tr>
                        <th className="p-3 text-sm text-blueFB font-bold tracking-wide text-left">
                            Número Pedido
                        </th>
                        <th className="p-3 text-sm text-blueFB font-bold tracking-wide text-left">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {response && response.map((moldes) => (
                        <tr className="bg-white border-2 border-b-dark-greyFB" key={moldes.mo_IdMolde}>
                            <td className="p-5 text-sm text-light-grayFB">
                                <span>{moldes.mo_EstiloMolde}</span>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}