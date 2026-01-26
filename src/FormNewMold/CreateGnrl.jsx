import '../styles/globals.css'
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import {Link} from "react-router-dom";
import CreateMeasures from "./CreateMeasures.jsx";
import NavBar from "../Components/NavBar.jsx";


export default function CreateGnrl() {
    return (
        <>
            <NavBar/>
            <h1> Información General</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full m-5 ">
                <div>
                    <div>
                        <label className="block p-2">Tipo Herramental</label>
                        <select>
                            <option value="" disabled selected>Herramental</option>
                            <option value=""> Molde</option>
                            <option value=""> Troquel</option>
                            <option value=""> Copa</option>
                            <option value=""> Dispositivo</option>
                        </select>
                    </div>
                    <div>
                        <label className=" block p-2">Función Molde</label>
                        <select>
                            <option value="" disabled selected> Función Herramental</option>
                            <option value=""> Estampador</option>
                            <option value=""> Recogedor</option>
                            <option value=""> Desbarbador</option>
                            <option value=""> Punzonador</option>
                            <option value=""> Doblador</option>
                        </select>
                    </div>
                    <div>
                        <label className=" block p-2">Familia Herramental</label>
                        <select className="">
                            <option value="" disabled selected> Familia</option>
                            <option value="">General</option>
                            <option value="">N/A</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="">
                        <label className=" block p-2">Carac. Molde</label>
                        <select>
                            <option value="" disabled selected> Carac. Molde</option>
                        </select>
                    </div>
                    <div
                        className=" flex flex-row gap-4 items-center flex-wrap ">
                        <p>Con Nariz</p>
                        <input type="checkbox"/>
                        <p>Sin Nariz</p>
                        <input type="checkbox"/>
                    </div>
                    <div className="space-y-4 md:col-start-2 ">
                        <div>
                            <h3>Descripción 1</h3>
                            <p>Lorem ipsum dolor diet massa dis fames. spendisse cum phasellus fringilla at,
                                senectus
                                ultricies fusce.</p>
                            <h3>Descripción 2</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit eget, neque vulputate
                                laoreet
                                hac proin vestibulum duis dictumst scelerisque lacinia, conubia sociis est bibendum
                                imperdiet massa dis fames. Platea varius aptent a nisl, suspendisse cum phasellus
                                fringilla
                                at, senectus ultricies fusce.</p>
                        </div>
                    </div>
                </div>

                <Link to="/VisualGnrl" className="">
                    <button className="btn btn-orange col-start-1 row-start-2">Atrás</button>
                </Link>
                <Link to="/CreateMeasures">
                    <button
                        className="btn btn-orange grid-col-2 row-start-2 sm:col-start-2 flex justify-end">Continuar
                    </button>
                </Link>

            </form>
        </>
    )
}