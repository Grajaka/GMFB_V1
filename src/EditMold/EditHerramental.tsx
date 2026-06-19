import '../styles/globals.css'
import * as React from "react";
import NavBar from "../Components/NavBar.jsx";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../Hooks/useAxios/IndexAx.js";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingAnimation from "../Components/LoadingAnimation.jsx";
import z from "zod";
import DropDown from "../Components/DropDown";
import familiasSchema from "../assets/Schemas/familias.schema.json" with { type: "json" };
import FilesUpload from '../Components/FilesUpload.js';
import useToolImage from "../Hooks/useToolImage.js";

const EditHerramentalSchema = z.object({
    hesp_IdHerramental: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdTipoHerramental: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdFamilia: z.coerce.number().int().min(1, "Requerido"),
    hesp_CodigoAlterno: z.string().min(1, "Requerido"),
    hesp_CodigoHerramental: z.string().optional(),
    hesp_Descripcion1: z.string().optional(),
    consecutive: z.coerce.number().optional(),
    hesp_IdImagen: z.coerce.number().int().nullable().optional(),

    // Measures
    hesp_A: z.coerce.number().nullable().optional(),
    hesp_B: z.coerce.number().nullable().optional(),
    hesp_C: z.coerce.number().nullable().optional(),
    hesp_D: z.coerce.number().nullable().optional(),
    hesp_E: z.coerce.number().nullable().optional(),
    hesp_F: z.coerce.number().nullable().optional(),
    hesp_G: z.coerce.number().nullable().optional(),
    hesp_H: z.coerce.number().nullable().optional(),
    hesp_J: z.coerce.number().nullable().optional(),
    hesp_L: z.coerce.number().nullable().optional(),
    hesp_P: z.coerce.number().nullable().optional(),
    hesp_Q: z.coerce.number().nullable().optional(),
    hesp_T: z.coerce.number().nullable().optional(),
    hesp_Observacion: z.string().nullable().optional(),

    // Ubicación
    hesp_IdMaquinaPP: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdMaquinaOpc: z.coerce.number().int().nullable().optional(),
    hesp_IdPiso: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdEstanteria: z.coerce.number().int().min(1, "Requerido"),
    uh_NumeroFila: z.coerce.number().int().min(0, "Requerido"),
    uh_NumeroColumna: z.coerce.number().int().min(0, "Requerido"),
    uh_NumeroPosicion: z.coerce.number().int().min(0, "Requerido"),
    hesp_IdDieSet: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdEstadoHerr: z.coerce.number().int().min(1, "Requerido"),
    hesp_IdActividad: z.coerce.number().int().nullable().optional(),
    hesp_CantHerramental: z.coerce.number().int().min(1, "Requerido"),
});

type FormValues = z.infer<typeof EditHerramentalSchema>;

export default function EditHerramental() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // Axios hook instances
    const { response, loading, fetchData } = useAxios();
    const { CreatePost, loading: isSaving } = useAxios();

    const [generalData, setGeneralData] = useState<any>(null);
    const [dropdowns, setDropdowns] = useState<any>({
        tipo_herramental: [],
        familias: [],
        herramentales: [],
        maquinas: [],
        actividades: [],
        estanterias: [],
        pisos: [],
        estados: [],
        diesets: []
    });

    const { register, handleSubmit, reset, watch, setValue, formState: { errors, isDirty } } = useForm<FormValues>({
        resolver: zodResolver(EditHerramentalSchema),
        defaultValues: {
            hesp_IdHerramental: 0,
            hesp_IdTipoHerramental: 0,
            hesp_IdFamilia: 0,
            hesp_CodigoAlterno: "",
            consecutive: 0,
            hesp_CodigoHerramental: "",
            hesp_Descripcion1: "",
            hesp_A: null,
            hesp_B: null,
            hesp_C: null,
            hesp_D: null,
            hesp_E: null,
            hesp_Observacion: "",
            hesp_IdMaquinaPP: 0,
            hesp_IdMaquinaOpc: null,
            hesp_IdPiso: 0,
            hesp_IdEstanteria: 0,
            uh_NumeroFila: 0,
            uh_NumeroColumna: 0,
            uh_NumeroPosicion: 0,
            hesp_IdDieSet: 0,
            hesp_IdEstadoHerr: 0,
            hesp_IdActividad: null,
            hesp_CantHerramental: 1,
            hesp_IdImagen: null,
        }
    });

    // Watch the category and family fields to update description and dynamic layouts
    const watched = watch();
    const {
        hesp_IdHerramental,
        hesp_IdTipoHerramental,
        hesp_IdFamilia,
        hesp_CodigoAlterno,
        consecutive
    } = watched;

    const { imageUrl } = useToolImage(watched.hesp_IdImagen);

    // Load tool details and dropdown data in parallel
    useEffect(() => {
        const load = async () => {
            const urls = [
                `/api/herramental_especifico/${id}/`,
                "/api/tipo_herramental/",
                "/api/familia/",
                "/api/herramental/",
                "/api/maquinas/",
                "/api/actividades/",
                "/api/estanterias/",
                "/api/pisos/",
                "/api/estado_herramental/",
                "/api/diesets/"
            ];
            const results = await fetchData({ url: urls });
            if (results && Array.isArray(results)) {
                const [
                    toolRes,
                    tipoRes,
                    famRes,
                    herrRes,
                    maqRes,
                    actRes,
                    estRes,
                    pisRes,
                    estdRes,
                    dieRes
                ] = results;

                const getData = (res: any) => {
                    if (!res) return [];
                    if (Array.isArray(res)) return res;
                    if (res?.results && Array.isArray(res.results)) return res.results;
                    return [];
                };

                setDropdowns({
                    tipo_herramental: getData(tipoRes),
                    familias: getData(famRes),
                    herramentales: getData(herrRes),
                    maquinas: getData(maqRes),
                    actividades: getData(actRes),
                    estanterias: getData(estRes),
                    pisos: getData(pisRes),
                    estados: getData(estdRes),
                    diesets: getData(dieRes)
                });

                if (toolRes) {
                    setGeneralData(toolRes);
                    const mappedData = {
                        ...toolRes,
                        uh_NumeroFila: toolRes.numero_fila ?? toolRes.uh_NumeroFila ?? 0,
                        uh_NumeroColumna: toolRes.numero_columna ?? toolRes.uh_NumeroColumna ?? 0,
                        uh_NumeroPosicion: toolRes.numero_posicion ?? toolRes.uh_NumeroPosicion ?? 0,
                    };
                    reset(mappedData);
                }
            }
        };
        if (id) load();
    }, [id, fetchData, reset]);

    // Warning before leaving with unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isDirty]);

    // Sync fa_CodigoFamilia / fa_NombreFamilia when hesp_IdFamilia changes
    useEffect(() => {
        const selectedFamily = dropdowns.familias?.find((i: any) => i.fa_IdFamilia === Number(hesp_IdFamilia));
        if (selectedFamily?.fa_CodigoFamilia) {
            setValue("fa_CodigoFamilia", selectedFamily.fa_CodigoFamilia);
            setValue("fa_NombreFamilia", selectedFamily.fa_NombreFamilia);
        }
    }, [hesp_IdFamilia, dropdowns.familias, setValue]);

    // Memoize the description
    const description = useMemo(() => {
        const hName = dropdowns.herramentales?.find(
            (i: any) => i.he_IdHerramental === Number(hesp_IdHerramental)
        )?.he_NombreHerramental || "...";

        const tName = dropdowns.tipo_herramental?.find(
            (i: any) => i.th_IdTipoHerramental === Number(hesp_IdTipoHerramental)
        )?.th_NombreTipoHerramental || "...";

        const fName = dropdowns.familias?.find(
            (i: any) => i.fa_IdFamilia === Number(hesp_IdFamilia)
        )?.fa_NombreFamilia || "...";

        return `Herramental ${hName} tipo ${tName} de la Familia ${fName} con código alterno ${hesp_CodigoAlterno || "..."}`;
    }, [
        hesp_IdHerramental,
        hesp_IdTipoHerramental,
        hesp_IdFamilia,
        hesp_CodigoAlterno,
        dropdowns.herramentales,
        dropdowns.tipo_herramental,
        dropdowns.familias,
    ]);

    // Prefix CodeBase Generator
    const baseCodePrefix = useMemo(() => {
        const hCode = dropdowns.herramentales?.find((i: any) => i.he_IdHerramental === Number(hesp_IdHerramental))?.he_CodigoHerramental || "";
        const tCode = dropdowns.tipo_herramental?.find((i: any) => i.th_IdTipoHerramental === Number(hesp_IdTipoHerramental))?.th_CodigoTipoHerramental || "";
        const fCode = dropdowns.familias?.find((i: any) => i.fa_IdFamilia === Number(hesp_IdFamilia))?.fa_CodigoFamilia || "";
        return `${hCode}${tCode}-${fCode}`;
    }, [hesp_IdHerramental, hesp_IdTipoHerramental, hesp_IdFamilia, dropdowns.herramentales, dropdowns.tipo_herramental, dropdowns.familias]);

    const consecutiveCode = String(consecutive || "").padStart(2, "0");
    const HerramentalCode = `${baseCodePrefix}${consecutiveCode}`;

    // Sync HerramentalCode and Description
    // (Disabled code regeneration logic as editing the code is disabled)
    /*
    useEffect(() => {
        if (HerramentalCode && HerramentalCode !== "00") {
            setValue("hesp_CodigoHerramental", HerramentalCode);
        }
    }, [HerramentalCode, setValue]);
    */

    useEffect(() => {
        setValue("hesp_Descripcion1", description);
    }, [description, setValue]);

    // Fetch next consecutive if categories change
    // (Disabled as categories are now disabled in edit view)
    /*
    useEffect(() => {
        if (hesp_IdHerramental && hesp_IdTipoHerramental && hesp_IdFamilia) {
            // If it matches the original data, keep the original consecutive
            if (generalData &&
                Number(hesp_IdHerramental) === Number(generalData.hesp_IdHerramental) &&
                Number(hesp_IdTipoHerramental) === Number(generalData.hesp_IdTipoHerramental) &&
                Number(hesp_IdFamilia) === Number(generalData.hesp_IdFamilia)) {
                setValue("consecutive", generalData.consecutive);
                return;
            }

            const fetchNext = async () => {
                const res = await fetchData({
                    url: `/api/herramental/next-consecutive`,
                    method: "GET",
                    params: {
                        h: hesp_IdHerramental,
                        t: hesp_IdTipoHerramental,
                        f: hesp_IdFamilia
                    }
                });
                if (res && res.nextValue !== undefined) {
                    setValue("consecutive", res.nextValue);
                }
            };
            fetchNext();
        }
    }, [hesp_IdHerramental, hesp_IdTipoHerramental, hesp_IdFamilia, generalData, fetchData, setValue]);
    */

    // Dynamic Measures Scheme Information
    const familyCode = watched.fa_CodigoFamilia || 'nan';
    const schemaLookup = familiasSchema as any;
    const familyData = schemaLookup[familyCode] ?? schemaLookup['nan'];
    const literals: string[] = familyData?.Literals || [];
    const schemeUrl = familyData ? `http://10.1.1.14:8000/api/media/esquemas/${familyData.EsquemaFamilia}.png` : "";
    const familyName = familyData?.Familia || "";

    const onSubmit = async (data: FormValues) => {
        try {
            // First create/find the Ubicacion relation record
            const ubicacionData = {
                uh_NumeroFila: data.uh_NumeroFila,
                uh_NumeroColumna: data.uh_NumeroColumna,
                uh_NumeroPosicion: data.uh_NumeroPosicion,
                hesp_IdEstanteria: data.hesp_IdEstanteria,
            };

            let ubicacionId;
            try {
                const resUbic = await CreatePost("/api/ubicaciones/", "POST", ubicacionData);
                ubicacionId = resUbic?.uh_IdUbicacionHerr;
            } catch (err: any) {
                const nonFieldErrors = err?.non_field_errors || [];
                const isUniqueError = nonFieldErrors.some((e: string) => typeof e === 'string' && e.includes("unique set"));

                if (isUniqueError) {
                    const existingData = await fetchData({
                        url: "/api/ubicaciones/",
                        params: {
                            uh_NumeroFila: ubicacionData.uh_NumeroFila,
                            uh_NumeroColumna: ubicacionData.uh_NumeroColumna,
                            uh_NumeroPosicion: ubicacionData.uh_NumeroPosicion
                        }
                    });

                    const list = Array.isArray(existingData) ? existingData : existingData?.results || [];
                    const found = list.find((u: any) =>
                        u.uh_NumeroFila === ubicacionData.uh_NumeroFila &&
                        u.uh_NumeroColumna === ubicacionData.uh_NumeroColumna &&
                        u.uh_NumeroPosicion === ubicacionData.uh_NumeroPosicion
                    );

                    if (found) {
                        ubicacionId = found.uh_IdUbicacionHerr;
                    } else {
                        alert("Esta ubicación ya existe pero no se pudo vincular automáticamente.");
                        return;
                    }
                } else {
                    alert("Error guardando la ubicación.");
                    throw err;
                }
            }

            if (!ubicacionId) {
                throw new Error("No se pudo obtener el ID de la ubicación");
            }

            // Prepare the patch data for the specific tool
            const finalData = {
                ...data,
                hesp_IdUbicacionHerr: ubicacionId,
            };

            await CreatePost(`/api/herramental_especifico/${id}/`, "PATCH", finalData);
            navigate(`/VisualMold/${id}`);
        } catch (err) {
            console.error("Error updating tool:", err);
            alert("No se pudo guardar la información del herramental.");
        }
    };

    if (loading || isSaving) return <LoadingAnimation />;

    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto p-4 md:p-8 font-['Poppins']">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Editar Herramental: {generalData?.hesp_CodigoHerramental}</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit, (errs) => console.log("Validation errors:", errs))} className="space-y-6">
                    {/* SECTION 1: General Data */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-4">Información General</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block p-2 font-bold" htmlFor="NombreHerramental">Categoría Herramental</label>
                                <select {...register("hesp_IdHerramental")} disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed">
                                    <option value="">Seleccione Herramental</option>
                                    {dropdowns.herramentales?.map((item: any) => (
                                        <option value={item.he_IdHerramental} key={item.he_IdHerramental}>{item.he_NombreHerramental}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdHerramental && <p className="text-red-500 text-sm">{errors.hesp_IdHerramental.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="NombreTipoHerramental" className="block p-2 font-bold">Uso del Herramental</label>
                                <select {...register("hesp_IdTipoHerramental")} disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed">
                                    <option value="">Seleccione tipo de uso</option>
                                    {dropdowns.tipo_herramental?.map((typeh: any) => (
                                        <option value={typeh.th_IdTipoHerramental} key={typeh.th_IdTipoHerramental}>{typeh.th_NombreTipoHerramental}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdTipoHerramental && <p className="text-red-500 text-sm">{errors.hesp_IdTipoHerramental.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold" htmlFor="NombreFamilia">Familia Herramental</label>
                                <select {...register("hesp_IdFamilia")} disabled className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed">
                                    <option value="">Seleccione Familia</option>
                                    {dropdowns.familias?.map((item: any) => (
                                        <option value={item.fa_IdFamilia} key={item.fa_IdFamilia}>{item.fa_NombreFamilia}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdFamilia && <p className="text-red-500 text-sm">{errors.hesp_IdFamilia.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold" htmlFor="CodigoAlterno">Código Alterno</label>
                                <input
                                    type="text"
                                    {...register("hesp_CodigoAlterno")}
                                    className="w-full p-2 border rounded bg-white"
                                />
                                {errors.hesp_CodigoAlterno && <p className="text-red-500 text-sm">{errors.hesp_CodigoAlterno.message}</p>}
                            </div>
                        </div>

                        {/*  <div className="mt-6 p-4 bg-white rounded border">
                            <span className="text-gray-500 font-bold block text-sm">Código Estándar Generado:</span>
                            <span className="text-2xl font-mono text-blue-700 font-bold">{HerramentalCode}</span>
                        </div>*/}
                    </div>

                    {/* SECTION 2: IMAGE */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-4">Imagen de Herramental</h2>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={generalData?.hesp_CodigoHerramental || "Imagen de herramental"}
                                    className="max-w-xs aspect-[3/4] object-contain border border-gray-300 rounded shadow-sm"
                                />
                            ) : (
                                <img
                                    src="./default-image.svg"
                                    alt="Default"
                                    className="max-w-xs aspect-[3/4] object-cover border border-gray-300 rounded shadow-sm"
                                />
                            )}
                            <div className="flex-grow">
                                <FilesUpload onUploadSuccess={(imageId) => {
                                    setValue("hesp_IdImagen", imageId, { shouldDirty: true });
                                }} />
                            </div>
                        </div>
                    </div>



                    {/* SECTION 3: Dynamic Technical Measures */}
                    <div className="bg-gray-50 p-6 rounded-lg border">

                        <h2 className="text-xl font-bold mb-4">Medidas Técnicas (Familia: {familyName})</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {literals.map((lit) => (
                                <div key={lit}>
                                    <label className="block p-1 font-bold text-xs uppercase text-gray-500">Medida {lit}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder={`Valor ${lit}`}
                                        {...register(`hesp_${lit}` as any, { valueAsNumber: true })}
                                        className={`border p-2 w-full rounded bg-white ${errors[`hesp_${lit}` as any] ? "border-red-500" : ""}`}
                                    />
                                    {errors[`hesp_${lit}` as any] && (
                                        <span className="text-red-500 text-xs">Requerido</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {schemeUrl && (
                            <div className="mt-6 flex flex-col items-center border-t pt-6">
                                <h3 className="font-bold text-sm text-gray-700 mb-2 uppercase">Esquema Técnico de Referencia</h3>
                                <img
                                    src={schemeUrl}
                                    alt={`Esquema ${familyName}`}
                                    className="max-h-64 object-contain border p-2 bg-white rounded"
                                    onError={(e) => {
                                        e.currentTarget.src = "/media/esquemas/HEX.png";
                                    }}
                                />
                            </div>
                        )}


                    </div>

                    {/* SECTION 4: Location and Status */}
                    <div className="bg-gray-50 p-6 rounded-lg border">
                        <h2 className="text-xl font-bold mb-4">Ubicación y Estado</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div>
                                <label className="block p-2 font-bold">N° Máquina PP</label>
                                <select {...register("hesp_IdMaquinaPP")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Máquina</option>
                                    {dropdowns.maquinas?.map((maquina: any) => (
                                        <option value={maquina.id} key={maquina.id}>{maquina.numero}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdMaquinaPP && <p className="text-red-500 text-sm">{errors.hesp_IdMaquinaPP.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">N° Máquina Opcional</label>
                                <select {...register("hesp_IdMaquinaOpc")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Máquina</option>
                                    {dropdowns.maquinas?.map((maquina: any) => (
                                        <option value={maquina.id} key={maquina.id}>{maquina.numero}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block p-2 font-bold">DieSet</label>
                                <select {...register("hesp_IdDieSet")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione DieSet</option>
                                    {dropdowns.diesets?.map((dieSet: any) => (
                                        <option value={dieSet.di_IdDieSet} key={dieSet.di_IdDieSet}>{dieSet.di_CodigoDieSet}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdDieSet && <p className="text-red-500 text-sm">{errors.hesp_IdDieSet.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Piso</label>
                                <select {...register("hesp_IdPiso")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Piso</option>
                                    {dropdowns.pisos?.map((piso: any) => (
                                        <option value={piso.pi_NumeroPiso} key={piso.pi_NumeroPiso}>{piso.pi_DescripcionPiso}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdPiso && <p className="text-red-500 text-sm">{errors.hesp_IdPiso.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Estante</label>
                                <select {...register("hesp_IdEstanteria")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Estante</option>
                                    {dropdowns.estanterias?.map((estante: any) => (
                                        <option value={estante.es_IdEstanteria} key={estante.es_IdEstanteria}>{estante.es_NombreEstanteria}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdEstanteria && <p className="text-red-500 text-sm">{errors.hesp_IdEstanteria.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Fila</label>
                                <DropDown length={8} start={0} {...register("uh_NumeroFila")} className="w-full p-2 border rounded bg-white" />
                                {errors.uh_NumeroFila && <p className="text-red-500 text-sm">{errors.uh_NumeroFila.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Columna</label>
                                <DropDown length={31} start={0} {...register("uh_NumeroColumna")} className="w-full p-2 border rounded bg-white" />
                                {errors.uh_NumeroColumna && <p className="text-red-500 text-sm">{errors.uh_NumeroColumna.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Posición</label>
                                <DropDown length={22} start={0} {...register("uh_NumeroPosicion")} className="w-full p-2 border rounded bg-white" />
                                {errors.uh_NumeroPosicion && <p className="text-red-500 text-sm">{errors.uh_NumeroPosicion.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Estado</label>
                                <select {...register("hesp_IdEstadoHerr")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Estado</option>
                                    {dropdowns.estados?.map((estado: any) => (
                                        <option value={estado.eh_IdEstadoHerr} key={estado.eh_IdEstadoHerr}>{estado.eh_NombreEstado}</option>
                                    ))}
                                </select>
                                {errors.hesp_IdEstadoHerr && <p className="text-red-500 text-sm">{errors.hesp_IdEstadoHerr.message}</p>}
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Actividad Pendiente</label>
                                <select {...register("hesp_IdActividad")} className="w-full p-2 border rounded bg-white">
                                    <option value="">Seleccione Actividad</option>
                                    {dropdowns.actividades?.map((actividad: any) => (
                                        <option value={actividad.id} key={actividad.id}>{actividad.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block p-2 font-bold">Existencia</label>
                                <input
                                    type="number"
                                    {...register("hesp_CantHerramental")}
                                    className="w-full p-2 border rounded bg-white"
                                />
                                {errors.hesp_CantHerramental && <p className="text-red-500 text-sm">{errors.hesp_CantHerramental.message}</p>}
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block p-2 font-bold">Observaciones Generales</label>
                            <textarea
                                {...register("hesp_Observacion")}
                                className="w-full p-2 border rounded bg-white"
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Form Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2 border rounded text-gray-700 bg-white hover:bg-gray-50 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold transition"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form >
            </div >
        </>
    );
}