import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { GetClientes, BuscarClientes, CrearCliente, ActualizarCliente, BorrarCliente } from "../../hooks/useApiClientes"

export default function TablaClientes() {
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [busqueda, setBusqueda] = useState('')

    const navegar = useNavigate();

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

    async function ElimnarCliente(id) {
        const {error} = await BorrarCliente(id)

        if(error) {
            console.log("No se pudo borrar cliente")
            throw error
        }

        setClientes((prev) => prev.filter((c) => c.id !== id))
    }

    function RenderTabla() {
        
        return clientes.map((cliente) => (
            <tr key={cliente.id}>
                <td>{cliente.nombre_mascota}</td>
                <td><p>{cliente.nombre_dueno}</p> <p>📞{cliente.telefono}</p> </td>
                <td>{cliente.notas}</td>
                <td>{new Date(cliente.updated_at).toLocaleDateString('es-CO')}</td>
                
                <td>
                    <button className="Boton_ver_mas" onClick={() => navegar(`/admin/clientes/editar/${cliente.id}`)}>
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

        <button onClick={() => {navegar("/admin/clientes/crear")}}>➕ Crear</button>

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


