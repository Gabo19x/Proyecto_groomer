import { useNavigate, useParams } from 'react-router-dom';
import { GetClientes, GetClientePorId, CrearCliente, ActualizarCliente, BorrarCliente } from "../../hooks/useApiClientes"
import { useEffect, useState } from 'react';

export default function FormClientes() {
    
    const {id} = useParams()
    const esEdicion = Boolean(id)
    const navegar = useNavigate()

    const [nombreMascota, setNombreMascota] = useState("")
    const [nombreDueño, setNombreDueño] = useState("")
    const [telefono, setTelefono] = useState("")
    const [notas, setNotas] = useState("")

    const [error, setError] = useState(null)

    async function NuevoCliente(datos) {
        const {data, error} = await CrearCliente(datos)

        if(error) {
            setError("❌ No se pudo crear cliente")
            throw error
        }
    }

    async function EditarCliente(id, datos) {
        const {data, error} = await ActualizarCliente(id, datos)

        if(error) {
            setError("❌ No se pudo editar cliente")
            throw error
        }
    }

    useEffect( () => {
        if(!esEdicion) return

        async function Funcion() {
            const {data, error} = await GetClientePorId(id)

            if(error) {
                console.log("No se puedo encontrar cliente");
                throw error;
            }

            setNombreMascota(data.nombre_mascota)
            setNombreDueño(data.nombre_dueno)
            setTelefono(data.telefono)
            setNotas(data.notas)
        }

        Funcion()

    }, [id])

    function ClienteForm(e) {
        e.preventDefault()

        setError(null)

        const datos = {
            nombre_mascota: nombreMascota,
            nombre_dueno: nombreDueño,
            telefono: telefono,
            notas: notas
        }

        if(esEdicion) {
            EditarCliente(id, datos);
            setError("✅ Cliente editado")
            navegar("/admin/clientes/dashboard")
        }
        else {
            NuevoCliente(datos);
            setError("✅ Cliente creado")
            navegar("/admin/clientes/dashboard")
        }
    }

    return (
        <section>
        <h2>{esEdicion ? "⭐ Edita el cliente" : "⭐ Crea un nuevo cliente"}</h2>

        <form onSubmit={ClienteForm}>
            <label htmlFor="mascota">🐶 Mascota</label>
            <input 
                type="text" 
                id='mascota'
                placeholder='Loki, Chocolate...'
                value={nombreMascota}
                onChange={(e) => {setNombreMascota(e.target.value)}}
                required
            />

            <label htmlFor="dueño">😊 Nombre del dueño</label>
            <input 
                type="text" 
                id='dueño'
                placeholder='Pepito...'
                value={nombreDueño}
                onChange={(e) => {setNombreDueño(e.target.value)}}
                required
            />

            <label htmlFor="tel">📞 Telefono/s</label>
            <p>Puede agregar mas de un telefono, solo separalo para mayor comprensión</p>
            <input 
                type="text" 
                id='tel'
                placeholder='3003003003'
                value={telefono}
                onChange={(e) => {setTelefono(e.target.value)}}
                required
            />

            <label htmlFor="nota">💬 Notas</label>
            <p>Agregue toda informacion util, como precios, cortes, comportamiento, tamaño, etc</p>
            <textarea
                type="text" 
                id='nota'
                placeholder='Valor $30.000. Baño y corte parejito. Es viejo.\n Valor $20.000. Baño.'
                value={notas}
                onChange={(e) => {setNotas(e.target.value)}}
                required
            >
            </textarea>

            <p>{error}</p>
            <button type='submit'>{esEdicion ? "Actualizar!" : "Crear!"}</button>
        </form>
        </section>
    )
}