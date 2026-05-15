import '../styles/globals.css'
import Search from '../Components/Search.jsx';
import { useId } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from 'react';
import { useForm } from "react-hook-form";
import { HerramentalModelSchema } from "../Hooks/Validators/HerramentalEsp.js";
import { useHerramental } from '../Hooks/useAxios/useHerramental.js'


// Seleccionamos solo lo necesario para el filtro
const FilterFormSchema = HerramentalModelSchema.pick({
    hesp_IdTipoHerramental: true,
    hesp_IdFamilia: true,
    hesp_IdMaquinaPP: true,
    hesp_IdEstanteria: true,
});

export default function FilterForm() {
    const { useGetLookups } = useHerramental();
    const selectId = useId();

    // 1. Obtenemos todos los datos usando el nuevo hook
    const { tipos, familias, maquinas, estanterias } = useGetLookups();

    const { handleSubmit, setValue } = useForm({
        resolver: zodResolver(FilterFormSchema),
        defaultValues: {
            hesp_IdTipoHerramental: 0,
            hesp_IdFamilia: 0,
            hesp_IdMaquinaPP: 0,
            hesp_IdEstanteria: 0,
        },
    });
    console.log("estanterias.data:", estanterias.data);
    console.log("maquinas.data:", maquinas.data);
    console.log("tipos.data:", tipos.data);
    console.log("familias.data:", familias.data);


    // 2. Estado de carga global (opcional)
    const isLoading = tipos.isLoading || familias.isLoading || maquinas.isLoading || estanterias.isLoading;

    const onSubmit = (data: any) => {
        console.log("Filtros Aplicados:", data);

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-orangeFB h-full hidden sm:block flex-col gap-3 px-5 py-6 shadow-3xl"
        >
            <Search />

            {isLoading ? (
                <p className="text-white text-xs animate-pulse">Cargando filtros...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {/* Ubicación / Estanterías */}
                    <div>
                        <label className="block p-2 text-sm font-bold">Ubicación</label>
                        <select onChange={(e) => setValue('hesp_IdEstanteria', Number(e.target.value))}>
                            <option value="">Estante</option>
                            {Array.isArray(estanterias.data) && estanterias.data.map((est: any) => (
                                <option key={est.es_IdEstanteria} value={est.es_IdEstanteria}>
                                    {est.es_NombreEstanteria}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Máquinas */}
                    <div>
                        <label className="block p-2 text-sm font-bold">N° máquina PP</label>
                        <select onChange={(e) => setValue('hesp_IdMaquinaPP', Number(e.target.value))}>
                            <option value="">Seleccionar máquina</option>
                            {Array.isArray(maquinas.data) && maquinas.data.map((maq: any) => (
                                <option key={maq.id} value={maq.id}>
                                    {maq.numero ?? `Máquina ${maq.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tipos de Herramental */}
                    <div>
                        <label className="block p-2 text-sm font-bold">Tipo de Herramental</label>
                        <select onChange={(e) => setValue('hesp_IdTipoHerramental', Number(e.target.value))}>
                            <option value="">Seleccionar tipo</option>
                            {tipos.data?.map((tipo: any) => (
                                <option key={tipo.th_IdTipoHerramental} value={tipo.th_IdTipoHerramental}>
                                    {tipo.th_NombreTipoHerramental}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <button type="submit" className="btn btn-blue text-xs">Aplicar</button>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="btn btn-blue text-xs"
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}