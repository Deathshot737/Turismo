function Reservas() {
  return (
    <div>
      <h1>Reservas</h1>
      <form>
        <input type="text" placeholder="Nombre" /><br />
        <input type="number" placeholder="Cantidad de personas" /><br />
        <input type="date" placeholder="Fecha inicio" /><br />
        <input type="date" placeholder="Fecha fin" /><br />
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}

export default Reservas;
