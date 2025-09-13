import { useEffect, useState } from "react";
import "./Paquetes.css";

function Paquetes() {
    const [paquetes, setPaquetes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/paquetes")
            .then(res => res.json())
            .then(data => setPaquetes(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h1>Paquetes de Turismo</h1>
            <div className="paquetes-container">
                {paquetes.map(p => (
                    <div key={p.id} className="paquete-card">
                        <img src={p.imagen_url} alt={p.nombre} />
                        <h3>{p.nombre}</h3>
                        <p><b>Destino:</b> {p.destino}</p>
                        <p>{p.descripcion}</p>
                        <p><b>Duración:</b> {p.duracion_dias} días</p>
                        <p><b>Precio:</b> ${p.precio} (Descuento: ${p.descuento})</p>
                        <p><b>Incluye:</b> {p.incluye}</p>
                        <p><b>No incluye:</b> {p.no_incluye}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Paquetes;