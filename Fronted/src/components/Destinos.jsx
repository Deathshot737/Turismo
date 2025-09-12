import { useEffect, useState } from "react";

function Destinos() {
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/destinos")
      .then(res => res.json())
      .then(data => setDestinos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Destinos</h1>
      {destinos.map(d => (
        <div key={d.id}>
          <h3>{d.nombre}</h3>
          <p>{d.descripcion}</p>
          <p>Precio promedio: ${d.precio_promedio}</p>
        </div>
      ))}
    </div>
  );
}

export default Destinos;
