import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home"
import Login from "../pages/login"
import Admin from "../pages/admin"
import TablaClientes from "../components/especificos/clientes"

import {RutaPrivada} from "./rutaProtegida"

const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        errorElemebt: <p>Error 404</p>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/admin",
        element: <RutaPrivada> <Admin/> </RutaPrivada>,
        children: [
            {
                path: "agenda",
                element: "",
                children: [
                    {
                        path: "crear",
                        element: ""
                    },
                    {
                        path: "editar/:id",
                        element: ""
                    }
                ]
            },
            {
                path: "clientes",
                element: <TablaClientes/>,
                children: [
                    {
                        path: "crear",
                        element: ""
                    },
                    {
                        path: "editar/:id",
                        element: ""
                    }
                ]
            }
            
        ]
    }
]);

function MisRutas() {
    return (
        <RouterProvider router={rutas}/>
    )
}

export default MisRutas;