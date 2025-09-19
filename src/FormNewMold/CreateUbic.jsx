import '../styles/globals.css'

import * as React from "react";
import NavBar from "../Components/NavBar.jsx";




export default function CreateUbic() {
    return(

        <>
            <NavBar/>
            <form className=" h-screen m-10 w-full  gap-5">
                <section className="grid h-full w-full grid-cols-6  gap-6 mb-8 ">
                    <input className="col-start-1" type="number" inputMode="numeric" placeholder="N° máquina PP"/>
                    <input className="col-start-1  grid-rows-1" type="number" inputMode="numeric" placeholder="Existencia"/>
                    <input className="col-start-1 rows-start-1 span-2" type="number" inputMode="numeric" placeholder="Tipo molde interiror"/>
                    <input className="col-start-2 rows-start-2" type="number" inputMode="numeric" placeholder="Estilo de molde"/>
                    <input className="col-start-1 rows-start-2" type="number" inputMode="numeric" placeholder="#Copas"/>
                    <input className="col-start-1 rows-start-2" type="number" inputMode="numeric" placeholder="Forma exterior Molde"/>
                    <select></select>

                    <section className=" col-start-1 row-start-6 gap-6 mb-8  ">
                        <select></select>
                        <select></select>
                    </section>
                </section>


            </form>


        </>
    )
}
