import { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { GetClientes } from '../../hooks/useApiClientes';
import { GetCitaId, CrearCita, ActualizarCita } from '../../hooks/useApiCitas';

const ESTADOS = ["pendiente", "confirmada", "eliminada", "completada"]

export default function FormAgenda() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const esEdicion = Boolean(id)
    const navegar = useNavigate()

    const [clientes, setClientes] = useState([])
    const [clienteId, setClienteId] = useState('')
    const [fecha, setFecha] = useState(searchParams.get('fecha') || '')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFin, setHoraFin] = useState('')
    const [servicio, setServicio] = useState('')
    const [estado, setEstado] = useState('pendiente')
    const [notas, setNotas] = useState('')

    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(esEdicion)

    useEffect(() => {
        async function Cargar() {
            const {data, error} = await GetClientes()
            if (!error) setClientes(data)
        }

        Cargar()
    }, [])

    useEffect(() => {
        if(!esEdicion) return

        async function Cargar() {
            const {data, error} = await GetCitaId(id)
            if(error) {
                setError("No se pudo cargar la cita")
                setCargando(false)
                throw error
            }

            setClienteId(data.cliente_id)
            setFecha(data.fecha)
            setHoraInicio(data.hora_inicio)
            setHoraFin(data.hora_fin)
            setServicio(data.servicio ?? '')
            setEstado(data.estado)
            setNotas(data.notas ?? '')
            setCargando(false)
        }

        Cargar()
        
    }, [id, esEdicion])

    async function ManejarSubmit(e) {
        e.preventDefault()
        setError(null)

        const datos = {
            cliente_id: clienteId,
            fecha,
            hora_inicio: horaInicio,
            hora_fin: horaFin,
            servicio,
            estado,
            notas
        }

        const { error } = esEdicion
            ? await ActualizarCita(id, datos)
            : await CrearCita(datos)
        
        if (error) {
            setError(esEdicion ? '❌ No se pudo actualizar la cita' : '❌ No se pudo crear la cita')
            throw error
        }

        navegar('/admin/agenda/dashboard')
    }

    return(
        <section>
            <h2>{esEdicion ? '⭐ Editar cita' : '⭐ Nueva cita'}</h2>

            <form onSubmit={ManejarSubmit}>
                <label htmlFor="cliente">🐶 Cliente</label>
                <select id="cliente" value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                    <option value="">Selecciona un cliente</option>
                    {clientes.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nombre_mascota} ({c.nombre_dueno})
                        </option>
                    ))}
                </select>

                <label htmlFor="fecha">Fecha</label>
                <input type="date" id="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

                <label htmlFor="inicio">Hora inicio</label>
                <input type="time" id="inicio" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />

                <label htmlFor="fin">Hora fin</label>
                <input type="time" id="fin" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />

                <label htmlFor="servicio">Servicio</label>
                <input
                    type="text"
                    id="servicio"
                    placeholder="Baño y corte..."
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                />

                <label htmlFor="estado">Estado</label>
                <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
                    {ESTADOS.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>

                <label htmlFor="notas">Notas</label>
                <textarea id="notas" value={notas} onChange={(e) => setNotas(e.target.value)} />
                <p>Agregue toda informacion util, como precios, cortes, comportamiento, tamaño, etc</p>

                <p>{error}</p>
                <button type="submit">{esEdicion ? 'Actualizar' : 'Crear'}</button>
            </form>
        </section>
    );
}