import Header from "../components/generales/Header"
import Footer from "../components/generales/footer"
import AgendaPublica from "../components/especificos/agendaPublica" 

import imagen1 from "../assets/1.svg"
import imagen2 from "../assets/2.svg"
import imagen3 from "../assets/3.svg"

import useCarrusel from "../hooks/useCarrusel.js";
import "../styles/home/styleHome.css"

export default function Home() {
    const imagenes = [imagen1, imagen2, imagen3];
    const { indiceActivo, seleccionar } = useCarrusel(imagenes.length);
    
    return(
        <div className="Pagina">
            <Header home={true} />

            <main className="Pagina_Contenido">
                <section className="Home">
                    <div className="Informacion">
                        <h2>Bienvenidos a:</h2>
                        <h1>Gabi´s pets</h1>

                        <p>
                            Informacion: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et est ullamcorper, feugiat ante ac, vehicula ante. Nulla egestas augue a augue aliquam lacinia. Cras efficitur erat in tincidunt rutrum. Curabitur a faucibus tortor. Duis sapien lorem, porta quis elementum ut, mollis at massa. Vestibulum at lacinia elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque euismod nec ligula sit amet rhoncus. Etiam dapibus elit at neque mollis, in efficitur mauris semper. Aenean nec odio aliquet, hendrerit tortor gravida, fringilla ligula. Praesent nec orci in tortor aliquam elementum. 
                        </p>
                        <br />
                        <p>
                            Contacto telefonico: 3132594002
                            Ubicacion: Duitama calle 17 #8a-28
                        </p>
                    </div>

                    <div className="Carrusel">
                        <div
                            className="Carrusel_Elemento"
                            style={{ transform: `translateX(-${indiceActivo * (100 / imagenes.length)}%)` }}
                        >
                            {imagenes.map((imagen, indice) => (
                                <img
                                    key={imagen}
                                    src={imagen}
                                    alt={`Imagen del carrusel ${indice + 1}`}
                                    className="Carrusel_Elemento_Imagen"
                                />
                            ))}
                        </div>

                        <ul className="Carrusel_Botones">
                            {imagenes.map((imagen, indice) => (
                                <li key={imagen}>
                                    <button
                                        type="button"
                                        className={`Carrusel_Botones_Boton${indiceActivo === indice ? " BotonActivo" : ""}`}
                                        aria-label={`Mostrar imagen ${indice + 1}`}
                                        aria-current={indiceActivo === indice ? "true" : undefined}
                                        onClick={() => seleccionar(indice)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <AgendaPublica />
            </main>

            <Footer />
        </div>
    );
}