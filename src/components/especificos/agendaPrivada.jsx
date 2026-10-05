import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DayPicker } from 'react-day-picker'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

import {GetCitasFechasMes, GetCitasDia, BorrarCita} from "../../hooks/useApiCitas"

export default function AgendaPrivada() {
    const navegar = useNavigate()
    const [mes, setMes] = useState(new Date())
    const [fechasConCitas, setFechasConCitas] = useState()
    const [dia, setDia] = useState(null)
    const [citas, setCitas] = useState([])
    const [cargando, setCargando] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function Cargar() {
            const desde = format(startOfMonth(mes), 'yyyy-MM-dd')
            const hasta = format(endOfMonth(mes), 'yyyy-MM-dd')

            const { data, error } = await GetCitasFechasMes(desde, hasta)
            if (error) return

            const unicas = [...new Set(data.map((c) => c.fecha))]
            setFechasConCitas(unicas.map((f) => new Date(f + 'T00:00:00')))
        }

        Cargar()
    }, [mes])

    async function SeleccionarDia(fecha) {
        if (!fecha) return
        setDia(fecha)
        setCargando(true)
        setError(null)

        const fechaStr = format(fecha, 'yyyy-MM-dd')
        const { data, error } = await GetCitasDia(fechaStr)

        if (error) {
            setError('❌ No se pudieron cargar las citas')
            setCargando(false)
            throw error            
        }

        setCitas(data)
        setCargando(false)
    }

    async function eliminarCita(id) {
        const { error } = await BorrarCita(id)
        if (error) {
            setError('❌ No se pudo borrar la cita')
            throw error
        }

        setCitas((prev) => prev.filter((c) => c.id !== id))
    }

    return(
        <section>
            <h2>Agenda disponible</h2>

            <DayPicker
                mode='single'
                locale={es}
                selected={dia}
                onSelect={SeleccionarDia}
                month={mes}
                onMonthChange={setMes}
                modifiers={{ conCitas: fechasConCitas }}
                modifiersClassNames={{ conCitas: 'dia-con-citas' }}
            />

            {
                dia && (
                    <div>
                        <div className='dia-header'>
                            <h3>citas el {new Date(dia).toLocaleDateString('es-CO')}</h3>
                            <button onClick={() => navegar(`/admin/agenda/crear?fecha=${format(dia, 'yyyy-MM-dd')}`)}>
                                ➕ Crear cita
                            </button>
                        </div>

                        <p>{error}</p>

                        {cargando ? (<p>Cargando...</p>) 
                        : citas.length === 0 ? (
                            <p>✅ Dia sin agenda</p>
                        ) : (
                            <ul>
                                {citas.map((cita) => (
                                    <li key={cita.id}>
                                        <strong>{cita.hora_inicio.slice(0, 5)} - {cita.hora_fin.slice(0, 5)}</strong> | {cita.clientes?.nombre_mascota} (De: {cita.clientes?.nombre_dueno}) | {cita.servicio}
                                        <span className={cita.estado}>{cita.estado}</span>

                                        {cita.notas && <p>📝 {cita.notas}</p>}

                                        <button onClick={() => navegar(`/admin/agenda/editar/${cita.id}`)}>🛠 Editar</button>
                                        <button onClick={() => eliminarCita(cita.id)}>❌ Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                        )
                        }
                    </div>
                )
            }
        </section>
    );
}