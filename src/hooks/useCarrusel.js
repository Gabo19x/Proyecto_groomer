import { useState } from "react";

export default function useCarrusel(cantidad) {
    const [indiceActivo, setIndiceActivo] = useState(0);

    function seleccionar(indice) {
        if (Number.isInteger(indice) && indice >= 0 && indice < cantidad) {
            setIndiceActivo(indice);
        }
    }

    return { indiceActivo, seleccionar };
}
