import {supabase} from "../supabaseClient"

/* FUNCION ASYNC
    Obtiene todos los datos de la tabal cliente

    @return los datos, si hay error
*/
export async function GetClientes() {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

/* FUNCION ASYNC
    Busca un dato especifico con el termino de busqueda
    en la tabla de clientes

    @paramas termino de busqueda
    @return los datos, si hay error
*/
export async function BuscarClientes(termino) {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .or(`nombre_mascota.ilike.%${termino}%,nombre_dueno.ilike.%${termino}%,telefono.ilike.%${termino}%`)
    .order('created_at', { ascending: false })

  return { data, error }
}

/* FUNCION ASYNC
    Crea un cliente nuevo en la tabla, segun los datos pasados.

    @params cada parte necesaria para crear un registro
    @return los datos, si hay error
 */
export async function CrearCliente({ nombre_mascota, nombre_dueno, telefono, notas }) {
  const { data, error } = await supabase
    .from('clientes')
    .insert([{ nombre_mascota, nombre_dueno, telefono, notas }])
    .select()
    .single()

  return { data, error }
}

/* FUNCION ASYNC
    Edita un cliente ya existente segun los datos.
    Se busca por id y se editan con los cambios

    @params id para buscar, y la informacion cambiada
    @return los datos, si hay error
 */
export async function ActualizarCliente(id, { nombre_mascota, nombre_dueno, telefono, notas }) {
  const { data, error } = await supabase
    .from('clientes')
    .update({ nombre_mascota, nombre_dueno, telefono, notas, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

/* FUNCION ASYNC
    Borra un cliente especifico con su id.

    @params id del cliente
    @return si hay error
 */
export async function BorrarCliente(id) {
  const { error } = await supabase
    .from('clientes')
    .delete()
    .eq('id', id)

  return { error }
}