import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../../styles/buscador/styleBuscador.css"

export default function BuscadorClientes({ clientes, funcionEliminar }) {
    const [objeto, setObjeto] = useState("");     
    const [termino, setTermino] = useState("");      

    const navegar = useNavigate();

    function Buscar(e) {
        e.preventDefault();
        setTermino(objeto.trim());
    }

    const busqueda = termino === ""
    ? []
    : clientes.filter((cliente) => {
        const t = termino.toLowerCase();

        return (
            cliente.nombre_mascota.toLowerCase().includes(t) ||
            cliente.nombre_dueno.toLowerCase().includes(t)
        );
    });

    function RenderResultados() {
        if (termino === "") return null;
        if (busqueda.length === 0) return <p className="TextoAmarillo">No hay clientes similares</p>;
        if (busqueda.length > 5) return <p className="TextoAmarillo">Hay demasiados resultados, más de 5</p>;

        return busqueda.map((cliente) => (
            <article className="AgendaCard" key={`Busqueda-${cliente.id}`}>
                <p>🐶 {cliente.nombre_mascota}</p>
                <p>😊 {cliente.nombre_dueno}</p>
                <p>📞 {cliente.telefono}</p>
                <p>📝 {cliente.notas}</p>

                <button
                    className="BotonRelleno"
                    onClick={() => navegar(`/admin/clientes/editar/${cliente.id}`)}
                >
                    🔁
                </button>

                <button
                    className="BotonNormal"
                    onClick={() => funcionEliminar(cliente.id)}
                >
                    ❌
                </button>
            </article>
        ));
    }

    return (
        <section className="Buscador">
            <form onSubmit={Buscar}>
                <div>
                    <h2>Buscar: </h2>
                    <input
                        type="text"
                        value={objeto}
                        onChange={(event) => setObjeto(event.target.value)}
                    />
                </div>

                <button className="BotonRelleno" type="submit">🔎</button>
            </form>

            <div className="Buscador_resultados">
                {RenderResultados()}
            </div>
            <hr />
        </section>
    );
}