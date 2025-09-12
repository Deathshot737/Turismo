// Nicaragua3D.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Nicaragua3D.css";

// Importar imágenes
import fondo1 from '../img/fondo1.jpg';
import fondo2 from '../img/fondo2.jpg';
import fondo3 from '../img/fondo3.jpg';
import fondo4 from '../img/fondo4.jpg';
import fondo5 from '../img/fondo5.jpg';
import fondo6 from '../img/fondo6.jpg';
import fondo7 from '../img/fondo7.jpg';

// Componente de línea de tiempo para la historia
const TimelineItem = ({ year, title, content, position }) => {
    return ( <
        div className = { `timeline-item ${position}` } >
        <
        div className = "timeline-content floating-card" >
        <
        h3 > { year } < /h3> <
        h4 > { title } < /h4> <
        p > { content } < /p> < /
        div > <
        /div>
    );
};

// Componente de tarjeta giratoria para información turística
const FlipCard = ({ frontTitle, frontIcon, backContent }) => {
    return ( <
        div className = "flip-card" >
        <
        div className = "flip-card-inner" >
        <
        div className = "flip-card-front" >
        <
        i className = { `fas ${frontIcon} fa-3x mb-3` } > < /i> <
        h3 > { frontTitle } < /h3> < /
        div > <
        div className = "flip-card-back" >
        <
        p > { backContent } < /p> < /
        div > <
        /div> < /
        div >
    );
};

function Nicaragua3D() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const canvasRef = useRef(null);
    const parallaxRef = useRef(null);

    const nicaraguaImages = [fondo1, fondo2, fondo3, fondo4, fondo5, fondo6, fondo7];

    const historicalData = [{
            year: "1502",
            title: "Llegada de Colón",
            content: "Cristóbal Colón llegó a la costa caribeña de Nicaragua durante su cuarto viaje."
        },
        {
            year: "1524",
            title: "Fundación de Granada y León",
            content: "Francisco Hernández de Córdoba funda las dos ciudades más importantes de la época colonial."
        },
        {
            year: "1821",
            title: "Independencia de Centroamérica",
            content: "Nicaragua se independiza de España junto con otras provincias centroamericanas."
        },
        {
            year: "1855",
            title: "William Walker",
            content: "El aventurero estadounidense William Walker se declara presidente de Nicaragua."
        },
        {
            year: "1972",
            title: "Terremoto de Managua",
            content: "Un devastador terremoto destruye la capital, con más de 10,000 fallecidos."
        },
        {
            year: "1979",
            title: "Revolución Sandinista",
            content: "El FSLN derroca a la dictadura de Anastasio Somoza Debayle."
        }
    ];

    const tourismCards = [{
            frontTitle: "Volcanes",
            frontIcon: "fa-mountain",
            backContent: "Nicaragua alberga 19 volcanes activos, incluyendo el Volcán Masaya donde se puede apreciar lava incandescente."
        },
        {
            frontTitle: "Playas",
            frontIcon: "fa-umbrella-beach",
            backContent: "Con más de 300 km de costa en el Pacífico y el Caribe, ofrece playas vírgenes y destinos surfistas de clase mundial."
        },
        {
            frontTitle: "Cultura",
            frontIcon: "fa-theater-masks",
            backContent: "Rica herencia cultural que fusiona tradiciones indígenas, españolas y africanas, visible en su música, danza y gastronomía."
        },
        {
            frontTitle: "Naturaleza",
            frontIcon: "fa-tree",
            backContent: "Posee el 7% de la biodiversidad mundial con reservas naturales como Bosawás, la mayor de Centroamérica."
        }
    ];

    // Efecto para el carrusel automático
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % nicaraguaImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [nicaraguaImages.length]);

    // Efecto para el parallax y partículas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Efecto de partículas
        const particles = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`
            });
        }

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            });
        };

        animate();

        // Efecto parallax
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
            const layers = parallaxRef.current.children;
            for (let i = 0; i < layers.length; i++) {
                const depth = i * 100;
                const movement = -(scrollPosition * (depth / 2000));
                layers[i].style.transform = `translateY(${movement}px) translateZ(-${depth}px) scale(${1 + depth/500})`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollPosition]);

    return ( <
        div className = "nicaragua-3d-world" > { /* Canvas para animación de partículas de fondo */ } <
        canvas ref = { canvasRef }
        className = "background-canvas" > < /canvas>

        { /* Efectos de parallax */ } <
        div ref = { parallaxRef }
        className = "parallax-container" >
        <
        div className = "parallax-layer layer-1" > < /div> <
        div className = "parallax-layer layer-2" > < /div> <
        div className = "parallax-layer layer-3" > < /div> < /
        div >

        { /* Navbar mejorado */ } <
        nav className = "navbar navbar-expand-lg navbar-dark fixed-top nicaragua-navbar" >
        <
        div className = "container" >
        <
        Link className = "navbar-brand animate__animated animate__fadeInLeft"
        to = "/" >
        <
        i className = "fas fa-globe-americas me-2" > < /i>Turismo Nicaragua < /
        Link > <
        button className = "navbar-toggler"
        type = "button"
        data - bs - toggle = "collapse"
        data - bs - target = "#navbarNav" >
        <
        span className = "navbar-toggler-icon" > < /span> < /
        button > <
        div className = "collapse navbar-collapse"
        id = "navbarNav" >
        <
        ul className = "navbar-nav ms-auto" >
        <
        li className = "nav-item" > < Link className = "nav-link active"
        to = "/" > < i className = "fas fa-home me-1" > < /i>Inicio</Link > < /li> <
        li className = "nav-item" > < Link className = "nav-link"
        to = "/destinos" > < i className = "fas fa-map-marked-alt me-1" > < /i>Destinos</Link > < /li> <
        li className = "nav-item" > < Link className = "nav-link"
        to = "/paquetes" > < i className = "fas fa-suitcase me-1" > < /i>Paquetes</Link > < /li> <
        li className = "nav-item" > < Link className = "nav-link"
        to = "/historia" > < i className = "fas fa-landmark me-1" > < /i>Historia</Link > < /li> <
        li className = "nav-item" > < Link className = "nav-link"
        to = "/contacto" > < i className = "fas fa-envelope me-1" > < /i>Contacto</Link > < /li> <
        li className = "nav-item" > < Link className = "btn btn-nicaragua ms-2"
        to = "/registro" > < i className = "fas fa-user-plus me-1" > < /i>Registrarse</Link > < /li> < /
        ul > <
        /div> < /
        div > <
        /nav>

        { /* Carrusel 3D mejorado */ } <
        div className = "carousel-3d-container" > {
            nicaraguaImages.map((image, index) => {
                    let position = "";
                    if (index === currentSlide) position = "active";
                    else if (index === (currentSlide - 1 + nicaraguaImages.length) % nicaraguaImages.length) position = "prev";
                    else if (index === (currentSlide + 1) % nicaraguaImages.length) position = "next";

                    return ( <
                            div key = { index }
                            className = { `carousel-3d-slide ${position}` } >
                            <
                            img src = { image }
                            alt = { `Slide ${index + 1}` }
                            className = "w-100 h-100"
                            style = {
                                { objectFit: "cover" }
                            }
                            /> <
                            div className = "carousel-overlay" > < /div> {
                            index === currentSlide && ( <
                                div className = "carousel-caption" >
                                <
                                div className = "typewriter" >
                                <
                                h2 > Descubre Nicaragua < /h2> < /
                                div > <
                                p > Tierra de lagos y volcanes < /p> <
                                Link to = "/tours"
                                className = "three-d-button btn btn-lg" >
                                <
                                i className = "fas fa-search me-2" > < /i>Explorar Tours < /
                                Link > <
                                /div>
                            )
                        } <
                        /div>
                );
            })
    }

    <
    div className = "carousel-indicators-3d" > {
            nicaraguaImages.map((_, index) => ( <
                button key = { index }
                className = { index === currentSlide ? 'active' : '' }
                onClick = {
                    () => setCurrentSlide(index)
                }
                aria - label = { `Slide ${index + 1}` } >
                <
                /button>
            ))
        } <
        /div> < /
        div >

        { /* Sección de bienvenida con efecto 3D */ } <
        section className = "welcome-section py-5" >
        <
        div className = "container" >
        <
        div className = "row align-items-center py-5" >
        <
        div className = "col-lg-6" >
        <
        div className = "floating-card p-4" >
        <
        h2 className = "mb-4" > Explora el Destino < span className = "text-nicaragua" > Nicaragua < /span></h
    2 >
        <
        p className = "lead" > Nicaragua, tierra de lagos y volcanes, ofrece una experiencia única para los amantes de la naturaleza, la cultura y la aventura.Desde las olas del Pacífico hasta las selvas del Caribe, nuestro país te sorprenderá con su diversidad y belleza. < /p>

    <
    div className = "row mt-4" > {
            tourismCards.map((card, index) => ( <
                div key = { index }
                className = "col-md-6 mb-3" >
                <
                FlipCard frontTitle = { card.frontTitle }
                frontIcon = { card.frontIcon }
                backContent = { card.backContent }
                /> < /
                div >
            ))
        } <
        /div> < /
        div > <
        /div> <
    div className = "col-lg-6" >
        <
        div className = "image-3d-frame" >
        <
        img src = "https://poetasfamososdenicaragua.wordpress.com/wp-content/uploads/2020/09/image-7.jpg"
    alt = "Lago de Nicaragua"
    className = "img-fluid" /
        >
        <
        div className = "frame-overlay" > < /div> < /
        div > <
        /div> < /
        div > <
        /div> < /
        section >

        { /* Sección de historia con timeline 3D */ } <
        section className = "history-section py-5 bg-light" >
        <
        div className = "container" >
        <
        div className = "text-center mb-5" >
        <
        h2 > Historia de Nicaragua < /h2> <
    p className = "lead" > Un recorrido por los momentos más importantes de nuestra historia < /p> < /
        div >

        <
        div className = "timeline" > {
            historicalData.map((item, index) => ( <
                TimelineItem key = { index }
                year = { item.year }
                title = { item.title }
                content = { item.content }
                position = { index % 2 === 0 ? "left" : "right" }
                />
            ))
        } <
        /div> < /
        div > <
        /section>

    { /* Sección de videos 3D */ } <
    section className = "videos-section py-5" >
        <
        div className = "container" >
        <
        div className = "text-center mb-5" >
        <
        h2 > Nicaragua en 360° < /h2> <
    p className = "lead" > Vive la experiencia inmersiva de nuestros destinos turísticos < /p> < /
        div >

        <
        div className = "row" >
        <
        div className = "col-md-6 mb-4" >
        <
        div className = "video-container floating-card" >
        <
        div className = "ratio ratio-16x9" >
        <
        iframe src = "https://www.youtube.com/embed/videoserie?rel=0"
    title = "Video turístico de Nicaragua"
    allowFullScreen >
        <
        /iframe> < /
        div > <
        div className = "video-caption p-3" >
        <
        h4 > Recorrido por los volcanes de Nicaragua < /h4> <
    p > Experiencia 360° en el Volcán Masaya < /p> < /
        div > <
        /div> < /
        div > <
        div className = "col-md-6 mb-4" >
        <
        div className = "video-container floating-card" >
        <
        div className = "ratio ratio-16x9" >
        <
        iframe src = "https://www.youtube.com/embed/videoserie?rel=0"
    title = "Video cultural de Nicaragua"
    allowFullScreen >
        <
        /iframe> < /
        div > <
        div className = "video-caption p-3" >
        <
        h4 > Cultura y tradiciones < /h4> <
    p > Festividades y gastronomía nicaragüense < /p> < /
        div > <
        /div> < /
        div > <
        /div> < /
        div > <
        /section>

    { /* Footer */ } <
    footer className = "footer py-4" >
        <
        div className = "container" >
        <
        div className = "row" >
        <
        div className = "col-lg-4 mb-4 mb-lg-0" >
        <
        h4 > Turismo Nicaragua < /h4> <
    p > Descubre la belleza y cultura del país de lagos y volcanes. < /p> < /
        div > <
        div className = "col-lg-4 mb-4 mb-lg-0" >
        <
        h4 > Enlaces rápidos < /h4> <
    ul className = "list-unstyled" >
        <
        li > < Link to = "/destinos" > Destinos turísticos < /Link></li >
        <
        li > < Link to = "/paquetes" > Paquetes vacacionales < /Link></li >
        <
        li > < Link to = "/historia" > Historia y cultura < /Link></li >
        <
        li > < Link to = "/contacto" > Contacto < /Link></li >
        <
        /ul> < /
        div > <
        div className = "col-lg-4" >
        <
        h4 > Síguenos < /h4> <
    div className = "social-links" >
        <
        a href = "#" > < i className = "fab fa-facebook-f" > < /i></a >
        <
        a href = "#" > < i className = "fab fa-instagram" > < /i></a >
        <
        a href = "#" > < i className = "fab fa-twitter" > < /i></a >
        <
        a href = "#" > < i className = "fab fa-youtube" > < /i></a >
        <
        /div> < /
        div > <
        /div> <
    hr className = "my-4" / >
        <
        div className = "text-center" >
        <
        p > & copy;
    2025 Turismo Nicaragua.Todos los derechos reservados. < /p> < /
        div > <
        /div> < /
        footer > <
        /div>
);
}

export default Nicaragua3D;