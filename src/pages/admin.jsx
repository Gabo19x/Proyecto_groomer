import { Outlet } from "react-router-dom";
import Header from "../components/generales/Header"

export default function Admin() {
    return(
        <>
            <Header home={false}/>

            <h2>Base de datos de los clientes</h2>
            <p>Mira los datos de los clientes. Tambien crea nuevos, edtalos o eliminalos.</p>
            <hr />

            <Outlet/>
        </>
    );
}