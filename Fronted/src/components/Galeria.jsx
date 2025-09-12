import { useEffect, useState } from "react";

function Galeria() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/galeria") // Endpoint opcional
      .then(res => res.json())
      .then(data => setImagenes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Galería de Fotos</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imagenes.map(img => (
          <img key={img.id} src={img.imagen_url} alt={img.titulo} width="200" />
        ))}
      </div>
    </div>
  );
}

export default Galeria;
