import '../styles/globals.css'
import * as React from "react";
import NavBar from "../Components/NavBar.jsx";
import {Link} from "react-router-dom";

export default function CreateMeasures() {
    return(

    <>
        <NavBar/>
        <h1>Medidas de Molde</h1>
        <form className="grid grid-cols-[5, auto] grid-rows-[repeat(6,auto)] gap-2 w-fit m-5">

            <input className="col-start-1 row-start-1" type="number" inputMode="numeric" placeholder="A"/>
                <input className="col-start-1 row-start-2" type="number" inputMode="numeric" placeholder="C"/>
                <input className="col-start-1 row-start-3 " type="number" inputMode="numeric" placeholder="H-Pestaña"/>
                <input className="col-start-2 row-start-1" type="number" inputMode="numeric" placeholder="B"/>
                <input className="col-start-2 row-start-2" type="number" inputMode="numeric" placeholder="H-Cono"/>
                <input className="col-start-2 row-start-3" type="number" inputMode="numeric" placeholder="N°Narices"/>
                <select className= "col-start-1 col-end-3 row-start-4">
                    <option>
                        Material
                    </option>
                </select>
                <input type="Date" className= " col-start-1 row-start-5" ></input>


                <p className= " col-start-4 col-end-5 row-start-1 place-self-center " >Esquema: Familia AAA</p>
                <img className= " col-start-4 col-end-5 row-start-2 row-end-5 place-self-center object-cover px-10" src="src/assets/Squemas/SquemaBristol.png" alt="esquema"/>
                <textarea  className= "col-start-4 col-end-5 row-start-5  justify-self-center h-15 w-[70%]"  name="txt" id="" rows={2} ></textarea>


                <Link to="/CreateMeasures" className="col-start-5 row-start-6 ">
                    <button className="btn btn-orange ">Continuar</button>
                </Link>

                <Link to="/VisualGnrl" className="col-start-1 row-start-6">
                    <button className="btn btn-orange">Atrás</button>
                </Link>




        </form>


    </>
    )
}
