import { useState } from "react";
import '../styles/globals.css'
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import * as React from "react";
import { useAuth } from "../Context/AuthContext.js";
//import side_image from "../assets/MoldesImg/IMG_Login.JPG";

export default function Login() {
    const [userName, setUser] = useState("");
    const [psw, setPsw] = useState("");
    const { login, error } = useAuth();
    const navigate = useNavigate();
    const [localError, setLocalError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName.trim() || !psw.trim()) {
            setLocalError("Usuario y contraseña son requeridos");
            return;
        }
        setIsSubmitting(true);
        setLocalError(null);
        try {
            await login(userName, psw);
            navigate("/VisualGnrlv2");
        } catch (err: any) {
            setLocalError(err?.message || err?.error || "Error de credenciales o de servidor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.form_login} onSubmit={handleLoginSubmit}>
            <div className=" overflow-hidden h-screen flex items-center justify-center dark-greyFB">
                <div className="flex shadow-2xl ">
                    <section className={styles.img_forjadora} >
                        <div className="m:rounded-bl-2xl md:rounded-tl-2xl md:block hidden">
                            <div className={styles.title_description}>
                                <h3>Bienvenido a GHFB</h3>
                            </div>
                            <div className={styles.text_description}>
                                <p>Gestiona el inventario de los herramentales, ubícalos y realiza prestamos</p>
                            </div>
                        </div>

                    </section>

                    <div className="flex flex-col items-center
                    justify-center text-center p-10 gap-6
                    bg-blueFB rounded-2xl
                         md:rounded-bl-none md:rounded-tl-none"
                    >
                        <h3 className={styles.h3_ingresar}>Ingresar</h3>

                        <div className="flex flex-col
                        text-left gap-1 text-white">
                            <span className="text-lg">Usuario</span>
                            <input className="rounded-md p-1 border-2 outline-none
                            focus:border-[#4d4d4d] focus:bg-[#fffff] text-dark-greyFB"
                                onChange={(e) => setUser(e.target.value)} value={userName} type="text"
                                placeholder="Usuario" />
                        </div>
                        <div className="flex flex-col
                        text-left gap-1 text-white">
                            <span className="text-lg">Contraseña</span>
                            <input className="rounded-md p-1 border-2 outline-none
                            focus:border-[#4d4d4d] focus:bg-[#fffff] text-dark-greyFB"
                                onChange={(e) => setPsw(e.target.value)} value={psw}
                                type="password" placeholder="Contraseña" />
                            {(localError || error) && (
                                <div className="text-red-500 text-sm font-medium bg-red-100 p-2 rounded max-w-xs">
                                    {localError || error}
                                </div>
                            )}
                        </div>
                        <button
                            className={styles.button_login}
                            type="submit"
                            disabled={isSubmitting}>
                            {isSubmitting ? "Accediendo..." : "Acceder"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
