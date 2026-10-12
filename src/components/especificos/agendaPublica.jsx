import { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, startOfMonth, endOfMonth, startOfDay, addMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-day-picker/dist/style.css'

import {GetFechasOcupadasMes, GetHorariosOcupados} from "../../hooks/useApiAgendaPublica"
import { daysInYear } from 'date-fns/constants'

import "../../styles/agenda/styleAgenda.css"

let hoy = startOfDay(new Date())
let limiteFuturo = addMonths(hoy, 0)

export default function AgendaPublica() {
    const [mes, setMes] = useState(new Date())
    const [fechasOcupadas, setFechasOcupadas] = useState([])
    const [dia, setDia] = useState([])
    const [horarios, setHorarios] = useState([])
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        async function Cargar() {
            const desde = format(startOfMonth(mes), "yyyy-MM-dd")
            const hasta = format(endOfMonth(mes), "yyyy-MM-dd")

            const {data, error} = await GetFechasOcupadasMes(desde, hasta)

            if(error) {
                console.log("No se pudo cargar fechas");
                throw error;
            }

            const unicas = [...new Set(data.map((c) => c.fecha))]
            setFechasOcupadas(unicas.map((f) => new Date(f + "T00:00:00")))
        }

        Cargar()
    }, [mes])

    async function SeleccionarDia(fecha) {
        if(!fecha) return

        setDia(fecha)
        
        setCargando(true)

        const fechaStr = format(fecha, "yyyy-MM-dd")
        const {data, error} = await GetHorariosOcupados(fechaStr)

        if(error) {
            console.log("No se pudo cargar el dia");
            throw error;
        }

        setHorarios(data)
        setCargando(false)
    }

    return (
        <section className='Agenda'>
            <h2>Agenda disponible</h2>

            <DayPicker
                mode='single'
                locale={es}
                selected={dia}
                onSelect={SeleccionarDia}
                month={mes}
                onMonthChange={setMes}
                startMonth={hoy}
                endMonth={limiteFuturo}
                disabled={{before: hoy}}
                modifiers={{ocupado: fechasOcupadas}}
                modifiersClassNames={{ocupado: "dia-ocupado"}}
            />

            {
                dia && (
                    <div className='Agenda_Horario'>
                        <h2>Horario de: {new Date(dia).toLocaleDateString('es-CO')}</h2>

                        {
                            cargando 
                            ? <p className='TextoCargando'>...Cargando agenda...</p> 
                            : horarios.length === 0 ? (
                                <>
                                    <p className='TextoVerde'>✅ Dia sin agenda ✅</p>
                                    <p>Haga su llamada para agendar su cita</p>
                                </>
                                
                            ) : (
                                <ul>
                                    {
                                        horarios.map((h, i) => (
                                            <li key={i} className='TextoAmarillo'>
                                                ❌ Ocupado en: {h.hora_inicio.slice(0,5)} - {h.hora_fin.slice(0,5)}
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </div>
                )
            }
        </section>
    )
}