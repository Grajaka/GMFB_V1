import '../styles/globals.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';



import * as React from 'react';

export default function FilterForm(){
    return(
        <div className="bg-orangeFB h-screen hidden sm:block flex-col gap-3 px-5 py-6 shadow-3xl">
            <div className="flex-row ml-0 mt-3">
                <MenuIcon/>
                <input className= "bg-white rounded-l-sm ml-2 mb-10" inputMode="text" placeholder="Buscar"/>
                <button className="bg-white rounded-r-sm h-9.5 border-l-gray-500"> <SearchIcon /> </button>
            </div>
                <label>Ubicación</label>
                <select className="bg-white border-2 rounded-md border-light-greyFB h-10 w-full" >
                    <option>
                        Estante A
                    </option>
                </select>

                <label>Máquina</label>
                <select className="bg-white border-2 rounded-md border-light-greyFB h-10 w-full" >
                    <option>
                        Niagara
                    </option>
                </select>

                <label>Tipo de molde</label>
                <select className="bg-white border-2 rounded-md border-light-greyFB h-10 w-full" >
                    <option>
                        HX
                    </option>
                </select>

                <label>Estado</label>
                <select className="bg-white border-2 rounded-md border-light-greyFB h-10 w-full" >
                    <option>
                        En reparación
                    </option>
                </select>

                <label>Nomenclatura</label>
                <select className="bg-white border-2 rounded-md border-light-greyFB h-10 w-full" >
                    <option>
                        HX-05
                    </option>
                </select>


            <div className= "flex items-center gap-8">
                <button className="btn btn-blue">Aplicar</button>
                <button className="btn btn-blue" >Limpiar </button>
            </div>

        </div>

    )
}