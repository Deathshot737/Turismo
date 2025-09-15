import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Paquetes from "./components/Paquetes";
import Destinos from "./components/Destinos";
import Contacto from "./components/Contacto";
import BlogViajes from "./components/BlogViajes";
import Galeria from "./components/Galeria";
import Nosotros from "./components/Nosotros";
import Testimonios from "./components/Testimonios";
import Reservas from "./components/Reservas";
import Login from "./components/Login";
import Registro from "./components/Registro";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paquetes" element={<Paquetes />} />
                <Route path="/destinos" element={<Destinos />} />
                <Route path="/blogviajes" element={<BlogViajes />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/testimonios" element={<Testimonios />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
            </Routes>
        </Router>
    );
}

export default App;