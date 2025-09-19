import {use, useState} from "react";
import '../styles/globals.css'
import './Login.css';
import Logo from "../assets/MoldesImg/Logo.png";
import { Link } from 'react-router-dom';
import login from "../Endpoints/api.jsx";
export default function Login(){

    const [userName, setUser] = useState("");
    const [psw, setPsw] = useState("");



    function handleLogin(){
        login(userName,psw)
    }
    return(
        <form className="form">
            <div className="rectangle-header">
                    <img
                        src={Logo}
                        alt="LogoFb"
                        className="img_logo"
                        />
            </div>

            <div className="main_container">
                <section className ="img_forjadora">
                    <div className="title_description" >
                    <h3>Bienvenido a GMFB</h3>
                    </div>
                    <div className="text_description">
                    <p>Gestiona el inventario de los moldes, ubícalos y realiza prestamos</p>
                 </div>
                </section>

                <section className="rectangle-form">
                    <h3 className="h3-ingresar">Ingresar</h3>
                    <input className="input-login"
                           onChange={(e)=>setUser(e.target.value)} value={userName} type="text"
                    placeholder="Usuario"/>
                    <input className="input-login"
                        onChange={(e)=>setPsw(e.target.value)} value={psw} type="text"
                    placeholder="Contraseña"/>
                    <button className="button_login" onClick={handleLogin}>Ingresar</button>

                </section>
            </div>
        </form>
    )
}
