import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../context/Autenticar"

import "../../styles/header/styleHeader.css"
import IconoHuella from "../../assets/Huella.svg"

export default function Header({home}) {
    const navegar = useNavigate();
    const {user, signOut} = useAuth();

    async function CerrarSesion() {
        await signOut();
        navegar('/');
    }

    function BotonesCuenta() {
        if(user) {
            return(
            <div className="BotonesCuenta">
                <button className='BotonRelleno' onClick={() => {navegar("/admin")}}>🐶 Ver más</button>
                <button className='BotonNormal' onClick={() => {CerrarSesion()}}>❌ Cerrar sesion</button>
            </div>
            );
            
        } else {
            return (
            <div className="BotonesCuenta">
                <button className='BotonNormal' onClick={() => {navegar("/login")}}>✅ Iniciar sesion</button>
            </div>
            );
            
        }
    }

    if(home) {
        return (
            <header>
                <img src={IconoHuella} alt='Icono huella' />

                <BotonesCuenta />
            </header>
        );
    } else {
        return (
            <header>
                <img src={IconoHuella} alt='Icono huella' />
                <button className='BotonRelleno' onClick={() => {navegar("/admin/agenda/dashboard")}}>💬 Agenda</button>
                <button className='BotonRelleno'onClick={() => {navegar("/admin/clientes/dashboard")}}>🐶 Clientes</button>
            </header>
        );
        
    }
}