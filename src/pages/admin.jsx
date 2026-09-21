import { Outlet } from "react-router-dom";
import Header from "../components/generales/Header"

export default function Admin() {
    return(
        <>
            <Header home={false}/>

            <Outlet/>
        </>
    );
}