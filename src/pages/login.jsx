import {useState} from "react"
import {useAuth} from "../context/Autenticar"
import {useNavigate, Link} from "react-router-dom"

export default function Login() {
    const {signIn} = useAuth()
    const navegar = useNavigate()

    const [email, setEmail] = useState("")
    const [clave, setClave] = useState("")
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    /* FUNCION asincrona
        Se encarga de iniciar sesion, lo que hace es:
        Guardar los datos.
        Llama al provider para usar una funcion de supabase para iniciar sesion (que esta en el archivo context/Autenticar)
        Verifica si hay error para notificar al usuario o seguir el proceso.
    */
    async function handleSubmit(event) {
        event.preventDefault()
        setCargando(true)
        setError(null)

        const { error } = await signIn(email, clave) // Aqui es donde inicia sesion

        if (error) {
            setError('❌ Email o contraseña incorrectos')
            setCargando(false)
            console.log(error)
        } else {
            navegar('/admin/clientes')
            console.log(`Inicio de sesion exitoso`)
        }
    }

    return(
        <main className="Login">
            <h2>Inicio de sesion</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ejemplo@correo.com"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    required
                    >
                </input>

                <input
                    type="password"
                    placeholder="Tu contraseña"
                    value={clave}
                    onChange={(event) => { setClave(event.target.value) }}
                    required
                >
                </input>

                {(error === null) ? "" : <p className="Mensaje_error">{error}</p> }

                <button className="Boton_form" type="submit" disabled={cargando}>
                    {cargando ? "Iniciando...": "Entrar"}
                </button>
            </form>

            <button className="Boton_form" onClick={() => { navegar("/") }}>Volver al inicio</button>
        </main>
    );
}