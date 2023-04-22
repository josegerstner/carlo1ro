import { Link } from "react-router-dom";

const NoEncontrada = () => {
    return (
        <div className="container">
            <h1>Ha ocurrido un error inesperado.</h1>
            <Link type="button" to={'/'} className="btn menem-boton">
                Ir a reelección
            </Link>
        </div>
    );
};

export default NoEncontrada;