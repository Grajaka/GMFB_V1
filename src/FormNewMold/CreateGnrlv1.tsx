import '../styles/globals.css'
import * as React from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "../Components/NavBar.jsx";
import useAxios from "../Hooks/useAxios/IndexAx.js";
import {useEffect, useMemo} from "react";
import QRCode from "react-qr-code";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {HerramentalModelSchema} from "../Hooks/Validators/HerramentalEsp.js";
import LoadingAnimation from "../Components/LoadingAnimation.jsx";
import {useFormData} from "../Hooks/FormNewHerrContext/HerrContext.js";
import {z} from "zod";

//pick Validator variables in this form
const HerramentalValuesSchema = HerramentalModelSchema.pick(
    {

        he_IdHerramental: true,
        th_IdTipoHerramental: true,
        hesp_IdHerramental: true,
        hesp_IdTipoHerramental: true,
        hesp_IdFamilia: true,         // El select de Familia
        hesp_CodigoAlterno: true,
        consecutive: true,
        hesp_CodigoHerramental: true,
        hesp_Descripcion1: true,
        fa_NombreFamilia: true,
        fa_IdFamilia: true,
        fa_CodigoFamilia: true,
    }
)

interface HerramentalItem {
    id: number;
    nombre: string;
}

export default function CreateGnrlv1() {
    const {updateFormData} = useFormData();
    const navigate = useNavigate();
    const {response, loading, fetchData} = useAxios();




    //Initialization React Hook Form

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors} //review-----------------
    }=useForm({
        resolver: zodResolver(HerramentalValuesSchema),
        defaultValues: {
            hesp_IdHerramental: 0,
            he_IdHerramental: 0,
            th_IdTipoHerramental: 0,
            fa_IdFamilia: "",
            hesp_CodigoAlterno: "",
            consecutive: 0,
            hesp_CodigoHerramental: "",
            hesp_Descripcion1: "",
            hesp_IdFamilia:0,
            hesp_IdTipoHerramental:0,
            fa_NombreFamilia:"",
            fa_CodigoFamilia:"",
        }
    });




    //watch fields to update Description and Qr code automatically

// Watch the IDs
// 1. Destructure the watched fields as an object
    const watched = watch();
    const {
        he_IdHerramental,
        th_IdTipoHerramental,
        fa_IdFamilia,
        hesp_CodigoAlterno,
        fa_CodigoFamilia,
        consecutive} = watched;



    //Maps the API responses to const if response is null, it safaly fallsback to empty arrays

    const [tipo_herramental, familias, herramentales] = response || [[], [], []];

    // Sync fa_CodigoFamilia whenever fa_IdFamilia changes
    useEffect(() => {
        const selectedFamily = familias?.find(i => i.fa_IdFamilia === Number(fa_IdFamilia));
        if (selectedFamily?.fa_CodigoFamilia) {
            setValue("fa_CodigoFamilia", selectedFamily.fa_CodigoFamilia);
            setValue("fa_NombreFamilia", selectedFamily.fa_NombreFamilia);
        }
    }, [fa_IdFamilia, familias, setValue]);
    console.log("fa_CodigoFamilia", fa_CodigoFamilia);



    //Memoize the description so it only recalculates when watched fields change

    const description = useMemo(() =>{

// Find the object in your original response arrays
        const hName =
            herramentales?.find(
                (i) => i.he_IdHerramental === Number(he_IdHerramental)
            )?.he_NombreHerramental || "...";

        const tName =
            tipo_herramental?.find(
                (i) => i.th_IdTipoHerramental === Number(th_IdTipoHerramental)
            )?.th_NombreTipoHerramental || "...";

        const fName =
            familias?.find(
                (i) => i.fa_IdFamilia === Number(fa_IdFamilia)
            )?.fa_NombreFamilia || "...";


        console.log("description", fName);
        return `Herramental ${hName} tipo ${tName} de la Familia ${fName} con código alterno ${hesp_CodigoAlterno || "..."}`;
    }, [
        he_IdHerramental,
        th_IdTipoHerramental,
        fa_IdFamilia,
        hesp_CodigoAlterno,
        herramentales,
        tipo_herramental,
        familias,
    ]);
    //only re-runs if response changes




    // Prefix CodeBase Generator

    const baseCodePrefix = useMemo(() => {
        // Find codes in your response arrays
        const hCode = herramentales?.find(i => i.he_IdHerramental === Number(he_IdHerramental))?.he_CodigoHerramental || "";
        const tCode = tipo_herramental?.find(i => i.th_IdTipoHerramental === Number(th_IdTipoHerramental))?.th_CodigoTipoHerramental || "";
        const fCode = familias?.find(i => i.fa_IdFamilia === Number(fa_IdFamilia))?.fa_CodigoFamilia || "";

        return `${hCode}${tCode}-${fCode}`;
    }, [he_IdHerramental, th_IdTipoHerramental, fa_IdFamilia, response]);

    const consecutiveCode = String(consecutive || "").padStart(2, "0");
    const HerramentalCode = `${baseCodePrefix}${consecutiveCode}`;
    const Description1 = description;


    //Sync HerramentalCode whenever hesp_CodigoAlterno changes
    useEffect(() => {
        setValue("hesp_CodigoHerramental", HerramentalCode);
    }, [HerramentalCode]);

    //Sync HerramentalCode whenever hesp_CodigoAlterno changes
    useEffect(() => {
        setValue("hesp_Descripcion1", description);
    }, [description]);

    useEffect(
        () => {
            fetchData({
                url: [
                    "/api/tipo_herramental/",
                    "/api/familia/",
                    "api/herramental/"
                ],
                method: "GET",
            });
        }, []); //Empty array means Run the code once when page Loads
    //On mount, it fetches data from 3 endpoints in parallel. The results are destructured from the response array.

/*    //Handle Logical Navigation
    const onSubmit = (data:z.infer<typeof HerramentalValuesSchema>) =>{
        console.log("it worked", data)
        navigate("/CreateMeasures");
        };*/

    // Define your onNextPage function
    const onNextPage = (data: z.infer<typeof HerramentalValuesSchema>) => {
        updateFormData(data); // Saves Page 1 data to Context + SessionStorage
        navigate("/CreateMeasures"); // Move to Page 2
        console.log("Page 1 Data:", data);
    };



    if (loading) return <LoadingAnimation/>;

    return (
        <>
            <NavBar />
            <h1 className="text-2xl font-bold p-5"> Información General</h1>

            <form
                onSubmit={handleSubmit(onNextPage, (errors) => console.log("Validation errors:", errors))}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full m-5">
                <div className="space-y-8">
                    <div>
                        <label className="block p-2" htmlFor="NombreHerramental"> Categoria Herramental</label>
                        <select {...register("he_IdHerramental")} className="w-full p-2 border round ed">
                            <option value=""> Seleccione Herramental</option>
                            {herramentales?.map((item:number) => (
                                <option value={item.he_IdHerramental} key={item.he_IdHerramental}>{item.he_NombreHerramental}</option>
                            ))}
                        </select>
                        {errors.he_IdHerramental && <p className="text-red-500 text-sm">{errors.he_IdHerramental.message}</p>}
                    </div>

                    <div>
                        <label htmlFor={"NombreTipoHerramental"} className="block p-2">Uso del Herramental</label>
                        <select {...register("th_IdTipoHerramental")} className="w-full p-2 border round ed">
                            <option value=""> Seleccione tipo de uso </option>
                            {tipo_herramental?.map((typeh:number)=>(
                                <option value={typeh.th_IdTipoHerramental} key={typeh.th_IdTipoHerramental}>{typeh.th_NombreTipoHerramental}</option>
                            ))}
                        </select>
                        {errors.th_IdTipoHerramental && <p className="text-red-500 text-sm">{errors.th_IdTipoHerramental.message}</p>}
                    </div>

                    <div>
                        <label className="block p-2" htmlFor={"NombreFamilia"} >Familia Herramental</label>
                        <select {...register("fa_IdFamilia")} className="w-full p-2 border">
                            <option value="">Seleccione Familia</option>
                            {familias?.map((item:number)=>(
                                <option value={item.fa_IdFamilia} key={item.fa_IdFamilia}>{item.fa_NombreFamilia}</option>
                            ))}
                        </select>
                        {errors.fa_IdFamilia && <p className="text-red-500 text-sm">{errors.fa_IdFamilia.message}</p>}

                    </div>

                    <div>
                        <label className="block p-2" htmlFor={"CodigoAlterno"}> Código alterno</label>
                        <input
                        type="text"
                            {...register("hesp_CodigoAlterno")}
                                className="block p-2 border"
                            />
                        {errors.hesp_CodigoAlterno && <p className="text-red-500 text-sm">{errors.hesp_CodigoAlterno.message}</p>}

                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold"> Descripción</h3>
                    <p className=" uppercase text-sm mb-4">{description}</p>

                    <div className="flex justify-center mb-4">
                        <QRCode
                            {...register("hesp_Descripcion1")}
                            value={description}
                            size={256}
                        />
                    </div>
                    <h4 className="font-bold"> Código Estándar</h4  >
                    <div>
                        <p className="uppercase m-0 text-2xl text-blueFB"> {HerramentalCode}</p>
                        <input type={"hidden"} {...register("hesp_CodigoHerramental")} value={HerramentalCode}/>
                        <input
                            type="number"
                            {...register("consecutive", {valueAsNumber: true})}
                            className="block p-2 border"
                        />
                        {errors.consecutive&& <p className="text-red-500 text-sm">{errors.consecutive.message}</p>}

                    </div>

                </div>

                <div className="col-span-2 flex justify-between mt-10">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-orange">
                        Atrás
                    </button>

                    <button type="submit" className="btn btn-orange">
                        Continuar
                    </button>
                </div>

            </form>

        </>
    )





}