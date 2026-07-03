import * as React from "react";
import NavBar from "../Components/NavBar.jsx";
import { Link } from "react-router-dom";
import '../styles/globals.css'
import { PropiedadHerramentalSchema } from "../Hooks/Validators/PropHerram.js"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../Hooks/FormNewHerrContext/HerrContext.js";
import { useEffect } from "react";
import useAxios from "../Hooks/useAxios/IndexAx.js";

const PropiedadValuesSchema = PropiedadHerramentalSchema.pick(
    [
        "hesp_IdHerramental",
        "hesp_IdProveedor",
        "hesp_TratamientoTermico",
        "hesp_Dureza",
        "hesp_Precio",
        "hesp_FechaCreacion",
        "hesp_Observaciones"
    ]
)


export default function CreateMechanical() {

    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const onNextPage = (data) => {
        updateFormData(data); // Saves Page 2 data to Context + SessionStorage
        navigate("/CreateUbic"); // Move to Page 2
        //const finalData = { ...formData, ...data };
        // console.log("Page 1, 2 y 3 Data:", finalData);
    };

    useEffect(
        () => {
            fetchData({
                url: "/api/propiedades-herramental/",
                method: "GET",
            });
        }, []);

    const {
        register,
        handleSubmit,
        formState: { errors } //review-----------------
    } = useForm({
        resolver: zodResolver(PropiedadValuesSchema),
        defaultValues: {
            hesp_IdHerramental: formData.hesp_IdHerramental ?? 0,
            hesp_IdProveedor: formData.hesp_IdProveedor ?? 0,
            hesp_TratamientoTermico: formData.hesp_TratamientoTermico ?? "",
            hesp_Dureza: formData.hesp_Dureza ?? "",
            hesp_Precio: formData.hesp_Precio ?? "",
            hesp_FechaCreacion: formData.hesp_FechaCreacion ?? "",
            hesp_Observaciones: formData.hesp_Observaciones ?? ""
        }
    })

    return (

        <>
            <NavBar />
            <h1>Propiedades mecánicas</h1>
            <form onSubmit={handleSubmit(onNextPage, (errors) => console.log("Validation errors:", errors))} className="grid grid-cols-1 md: grid-cols-2 grid-rows-2 gap-6 max-w-full m-5" >
                <div className="space-y-8">

                    <div className="col-start-1 row-start-1">
                        <div>
                            <label className=" block p-2">Acero</label>
                            <select {...register("hesp_IdAcero")}>
                                <option value="" hidden>Acero</option>
                                {aceros.map((acero, index) => (
                                    <option value={acero.ac_IdAcero ?? index} key={acero.ac_IdAcero ?? index}>
                                        {acero.ac_DescripcionAcero ?? ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className=" block p-2">Dureza</label>
                            <select {...register("hesp_IdDureza")}>
                                <option value="" hidden>Dureza</option>
                                {durezas.map((dureza, index) => (
                                    <option value={dureza.du_IdDureza ?? index} key={dureza.du_IdDureza ?? index}>
                                        {dureza.du_ValorDureza ?? ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className=" block p-2">Proveedor</label>
                            <select {...register("hesp_IdProveedor")}>
                                <option value="" hidden>Proveedor</option>
                                {proveedores.map((proveedor, index) => (
                                    <option value={proveedor.pr_IdProveedor ?? index} key={proveedor.pr_IdProveedor ?? index}>
                                        {proveedor.pr_NombreProveedor ?? ""}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div>
                            <label className=" block p-2">Tratamiento Térmico</label>
                            <select {...register("hesp_IdTratamiento")}>
                                <option value="" hidden>Tratamiento Térmico</option>
                                {tratamientos.map((tratamiento, index) => (
                                    <option value={tratamiento.tr_IdTratamiento ?? index} key={tratamiento.tr_IdTratamiento ?? index}>
                                        {tratamiento.tr_DescripcionTratamiento ?? ""}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                    </div>
                </div>
                {/*------------------------------*/}
                <div>
                    <div className="col-start-2 row-start-1">

                        <label className="block p-1">Precio</label>
                        <input type="number" inputMode="numeric" placeholder="$Precio" />
                        <label className=" block p-1">Fecha de creación</label>
                        <input type="date" inputMode="date" placeholder="Create Date " />
                        <label className=" block">Observaciones</label>
                        <textarea name="txt" id="" className="h-30 w-[100%]" rows={10}></textarea>

                    </div>
                </div>

                {/*-----------------Buttons---------------------------------------- */}

                <Link to="/Createubic" className="col-start-3 row-start-2">
                    <button className="btn btn-orange">Continuar</button>
                </Link>

                <Link to="/CreateMeasures" className="col-start-1 row-start-2">
                    <button className="btn btn-orange justify-self-end">Atrás</button>
                </Link>
            </form>
        </>
    )
}
