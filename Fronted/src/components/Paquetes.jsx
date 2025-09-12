import { useEffect, useState } from "react";
import './Paquetes.css';  // Importa el CSS

function Paquetes() {
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/paquetes")
      .then(res => res.json())
      .then(data => setPaquetes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="paquetes-container">
      <h1 className="paquetes-title">Paquetes de Turismo</h1>
      <div className="paquetes-list">
        {paquetes.map(p => (
          <div key={p.id} className="paquete-card">
            <h3 className="paquete-nombre">{p.nombre}</h3>
            <p className="paquete-descripcion">{p.descripcion}</p>
            <p className="paquete-precio">Precio: ${p.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Paquetes;
