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

            <div className="m-5 justify-items-center">
                <div className="flex gap-2 flex-row justify-self-start m-4">
                    <h1> Código</h1>
                    <Avatar sx={{width: 24, height: 24}}/>
                </div>

                <form className="grid grid-cols-3 grid-rows-2  ">
                    <div className="space-y-8">
                        <input type="text" className="form-{input}" placeholder="N° molde"/>
                        <select></select>
                        <select></select>
                        <select></select>
                        <input type="number" inputMode="numeric" placeholder="Copas"/>
                    </div>


                    <div className="space-y-8">
                        <select></select>
                        <select></select>
                        <select></select>

                        <div
                            className=" flex flex-row gap-4 items-center justify-self-start  whitespace-nowrap overflow-hidden text-ellipsis">
                            <p>Con Nariz</p>
                            <input type="checkbox" placeholder="Con Nariz"/>
                            <p>Sin Nariz</p>
                            <input type='checkbox' placeholder="Sin Nariz"/>

                        </div>
                    </div>

                    <div>
                        <h3>Descripción 1</h3>
                        <p>Lorem ipsum dolor diet massa dis fames. spendisse cum phasellus fringilla at, senectus
                            ultricies fusce.</p>

                        <h3>Descripción 2</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit suscipit eget, neque vulputate laoreet
                            hac proin vestibulum duis dictumst scelerisque lacinia, conubia sociis est bibendum
                            imperdiet massa dis fames. Platea varius aptent a nisl, suspendisse cum phasellus fringilla
                            at, senectus ultricies fusce.</p>

                    </div>

                        <Link to="/CreateMeasures" className="col-start-3 row-start-2">
                            <button className="btn btn-orange ">Continuar</button>
                        </Link>

                    <Link to="/VisualGnrl" className="col-start-1 row-start-2">
                        <button className="btn btn-orange">Atrás</button>
                    </Link>

                </form>


            </div>
        </>
    )
}