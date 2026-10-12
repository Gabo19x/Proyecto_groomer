import { Outlet } from "react-router-dom";
import Header from "../components/generales/Header"
import Footer from "../components/generales/footer"

import "../styles/Admin/styleAdmin.css"

export default function Admin() {
    return(
        <>
            <Header home={false}/>

            <div className="Informacion">
                <h2>Dashboard de agendamiento y clientes</h2>
                <p>Gestiona la agenda y tambien los clientes.</p>
                <hr />
            </div>

            <Outlet/>

            <Footer/>
        </>
    );
}