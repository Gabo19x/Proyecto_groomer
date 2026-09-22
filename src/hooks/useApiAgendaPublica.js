import { supabase } from '../supabaseClient'

/* FUNCION ASYNC
    Obtiene las citas existentes
    @params fecha de inicio y final
    @return datos, si hay error
 */
export async function GetFechasOcupadasMes(desde, hasta) {
  const { data, error } = await supabase
    .from('vista_agenda_publica')
    .select('fecha')
    .gte('fecha', desde)
    .lte('fecha', hasta)

  return { data, error }
}

/* FUNCION ASYNC
    Obtiene las citas existentes pero de un dia especifico
    @params fecha
    @return datos, si hay error
 */
export async function GetHorariosOcupados(fecha) {
  const { data, error } = await supabase
    .from('vista_agenda_publica')
    .select('hora_inicio, hora_fin')
    .eq('fecha', fecha)
    .order('hora_inicio', { ascending: true })

  return { data, error }
}