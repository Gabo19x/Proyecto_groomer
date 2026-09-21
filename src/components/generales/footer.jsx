export default function Footer() {
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

    return(
        <footer className="Footer">
            <h3> 
                Developed by: <a href="https://github.com/Gabo19x">@Gabo19</a> | {fechaFormateada}
            </h3>
        </footer>
    );
}