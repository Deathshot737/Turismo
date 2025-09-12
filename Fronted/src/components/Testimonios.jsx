import { useEffect, useState } from "react";

function Testimonios() {
  const [testimonios, setTestimonios] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/testimonios")
      .then(res => res.json())
      .then(data => setTestimonios(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Testimonios</h1>
      {testimonios.map(t => (
        <div key={t.id}>
          <p>{t.contenido}</p>
          <p>Calificación: {t.calificacion}/5</p>
        </div>
      ))}
    </div>
  );
}

export default Testimonios;
