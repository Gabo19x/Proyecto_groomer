import { useState, useEffect, useCallback } from 'react'
import { GetClientes, BuscarClientes, CrearCliente, ActualizarCliente, BorrarCliente } from "../../hooks/useApiClientes"

export default function TablaClientes() {
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [busqueda, setBusqueda] = useState('')

    const cargar = useCallback( async () => {
        setLoading(true)
        const {data, error} = busqueda.trim()
            ? await BuscarClientes(busqueda.trim())
            : await GetClientes()
        
        if(error) { 
            setError("❌ No se puede cargar los clientes"); 
            throw error; 
        }

        setClientes(data)
        setLoading(false)


    }, [busqueda])

    useEffect(() => {
        cargar()
    }, [])

    async function CrearCliente(datos) {
        const {data, error} = await CrearCliente(datos)

        if(error) {
            console.log("No se pudo crear cliente")
            throw error
        }

        setClientes((prev) => [data, ...prev])
    }

    async function EditarCliente(id, datos) {
        const {data, error} = await ActualizarCliente(id, datos)

        if(error) {
            console.log("No se pudo editar cliente")
            throw error
        }

        setClientes((prev) => prev.map((c) => (c.id === id ? data : c)))
    }

    async function ElimnarCliente(id) {
        const {error} = await BorrarCliente(id)

        if(error) {
            console.log("No se pudo borrar cliente")
            throw error
        }

        setClientes((prev) => prev.filter((c) => c.id !== id))
    }

    function RenderTabla() {
        console.log(clientes.map((c) => {console.log(c.nombre_mascota);
        }));
        
        return clientes.map((cliente) => (
            <tr key={cliente.id}>
                <td>{cliente.nombre_mascota}</td>
                <td>{cliente.nombre_dueno} 📞{cliente.telefono}</td>
                <td>{cliente.notas}</td>
                <td>{cliente.updated_at}</td>
                
                <td>
                    <button className="Boton_ver_mas" onClick={() => navegar(`/clientes/editar/${cliente.id}`)}>
                        🛠 Editar
                    </button>
                    
                    <button className="Boton_ver_mas" onClick={() => ElimnarCliente(cliente.id)}>
                        ❌ Eliminar
                    </button>
                </td>
            </tr>
        ))
    }

    return (
    <>
        <p>{error}</p>

        <button onClick={() => {navegar("/clientes/crear")}}>➕ Crear</button>
        {
            loading ? (<p>Cargando...</p>) : (
                <table>
                        <thead>
                            <tr>
                                <th>Mascota</th>
                                <th>Dueño y telefono</th>
                                <th>Notas</th>
                                <th>Ultima fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RenderTabla()}
                        </tbody>
                    </table>
            )
        }
    </>
    )
}


