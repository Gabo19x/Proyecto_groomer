import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/home"
import Login from "../pages/login"
import Admin from "../pages/admin"
import TablaClientes from "../components/especificos/clientes"
import FormClientes from "../components/especificos/formClientes"
import AgendaPrivada from "../components/especificos/agendaPrivada";
import FormAgenda from "../components/especificos/formAgenda";

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
                        element: <AgendaPrivada/>
                    },
                    {
                        path: "crear",
                        element: <FormAgenda/>
                    },
                    {
                        path: "editar/:id",
                        element: <FormAgenda/>
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