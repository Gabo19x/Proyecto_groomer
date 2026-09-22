import {supabase} from "../supabaseClient"

/* FUNCION ASYNC
    Obtiene las citas segun una fecha de inicio y una final
    @params fecha de inicio y final
    @return las citas, si hay error
 */
export async function GetCitasFechasMes(desde, hasta) {
    const {data, error} = await supabase    
        .from("citas")
        .select("fecha")
        .gte("fecha", desde)
        .lte("fecha", hasta)
        .neq("estado", "cancelada");

    return {data, error}
}

/* FUNCION ASYNC
    Obtiene las citas de un dia
    @params fecha
    @return las citas, si hay error
*/
export async function GetCitasDia(fecha) {
    const {data, error} = await supabase
        .from("citas")
        .select("id, fecha, hora_inicio, hora_fin, servicio, estado, notas, clientes ( id, nombre_mascota, nombre_dueno, telefono )")
        .eq("fecha", fecha)
        .order("hora_inicio", {ascending: true});

    return {data, error}
}

/* FUNCION ASYNC
    Actualiza una cita
    @params id y los datos
    @return data??? si hay error
 */
export async function ActualizarCita(id, datos) {
    const {data, error} = await supabase
        .from("citas")
        .update({...datos, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    return {data, error}
}

/* FUNCION ASYNC
    Eliminar una cita
    @params id
    @return si hay error
 */
export async function BorrarCita(id) {
    const {error} = await supabase
        .from("citas")
        .delete()
        .eq("id", id);

    return {error}
}