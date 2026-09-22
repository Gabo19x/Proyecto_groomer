import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../context/Autenticar"

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
                <button className='BotonMenu' onClick={() => {navegar("/admin")}}>🐶 Ver más</button>
                <button className='BotonMenu' onClick={() => {CerrarSesion()}}>❌ Cerrar sesion</button>
            </div>
            );
            
        } else {
            return (
            <div className="BotonesCuenta">
                <button className='BotonMenu' onClick={() => {navegar("/login")}}>✅ Iniciar sesion</button>
            </div>
            );
            
        }
    }

    if(home) {
        return (
            <header>
                <h2>Gabi´s Pets</h2>

                <BotonesCuenta />
            </header>
        );
    } else {
        return (
            <header>
                <button className='BotonMenu' onClick={() => {navegar("/admin/agenda/dashboard")}}>💬 Agenda</button>
                <button className='BotonMenu'onClick={() => {navegar("/admin/clientes/dashboard")}}>🐶 Clientes</button>
            </header>
        );
        
    }
}