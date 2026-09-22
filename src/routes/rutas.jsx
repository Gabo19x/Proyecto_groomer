import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home"
import Login from "../pages/login"
import Admin from "../pages/admin"
import TablaClientes from "../components/especificos/clientes"
import FormClientes from "../components/especificos/formClientes"

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
                children: [
                    {
                        path: "dashboard",
                        element: ""
                    },
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
                children: [
                    {
                        path: "dashboard",
                        element: <TablaClientes/>
                    },
                    {
                        path: "crear",
                        element: <FormClientes/>
                    },
                    {
                        path: "editar/:id",
                        element: <FormClientes/>
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