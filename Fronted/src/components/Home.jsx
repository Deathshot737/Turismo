import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import fondo1 from '../img/fondo1.jpg';
import fondo2 from '../img/fondo2.jpg';
import fondo3 from '../img/fondo3.jpg';
import fondo4 from '../img/fondo4.jpg';
import fondo5 from '../img/fondo5.jpg';
import fondo6 from '../img/fondo6.jpg';
import fondo7 from '../img/fondo7.jpg';
import lagoNicaragua from '../img/nicaragua.png';


// Importar imágenes para destinos
import granadaImg from '../img/granada.jpg';
import leonImg from '../img/leon.jpg';
import sanJuanImg from '../img/san-juan.jpg';
import masayaImg from '../img/masaya.jpg';
import ometepeImg from '../img/ometepe.jpg';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('es');
  const canvasRef = useRef(null);
  
  const nicaraguaImages = [
    fondo1,
    fondo2,
    fondo3,
    fondo4,
    fondo5,
    fondo6,
    fondo7
  ];

  const translations = {
    es: {
      title: "Descubre la Belleza de Nicaragua",
      subtitle: "Playas paradisíacas, volcanes imponentes y una cultura vibrante te esperan en el corazón de Centroamérica.",
      exploreTours: "Explorar Tours",
      welcomeTitle: "Historia de Nicaragua",
      welcomeText: `Nicaragua, tierra de lagos y volcanes, ofrece una experiencia única para los amantes de la naturaleza, la cultura y la aventura. 
      Desde tiempos precolombinos, fue habitada por diversas culturas indígenas como los Nicaraos y los Chorotegas, quienes dejaron un rico legado cultural. 
      En el siglo XVI, los españoles llegaron y fundaron ciudades como Granada y León, fusionando tradiciones europeas e indígenas. 
      A lo largo de su historia, Nicaragua ha vivido momentos de gran resistencia, independencia y transformación, forjando una identidad única que se refleja en su arte, su música y su folclore. 
      Hoy, los visitantes pueden explorar sus majestuosos volcanes, lagos impresionantes y ciudades coloniales, conectando con la historia viva del país.`,
      beaches: "Playas",
      beachesDesc: "Disfruta de las mejores playas del Pacífico y Caribe",
      volcanoes: "Volcanes",
      volcanoesDesc: "Explora imponentes volcanes y lagunas cratéricas",
      featuredDestinations: "Destinos Destacados",
      all: "Todos",
      beachesCategory: "Playas",
      colonial: "Colonial",
      volcanoesCategory: "Volcanes",
      nature: "Naturaleza",
      seeMore: "Ver más",
      interactiveMap: "Mapa Interactivo",
      tours: "Tours y Experiencias",
      adventure: "Aventura",
      cultural: "Cultural",
      gastronomy: "Gastronomía",
      testimonials: "Testimonios",
      events: "Eventos y Festivales",
      quickLinks: "Enlaces Rápidos",
      contact: "Contacto",
      subscribe: "Suscríbete",
      emailPlaceholder: "Tu correo electrónico",
      subscribeButton: "Suscribirse",
      rights: "Todos los derechos reservados."
    },
    en: {
      title: "Discover the Beauty of Nicaragua",
      subtitle: "Paradisiacal beaches, imposing volcanoes and a vibrant culture await you in the heart of Central America.",
      exploreTours: "Explore Tours",
      welcomeTitle: "Explore Destination Nicaragua",
      welcomeText: "Nicaragua, land of lakes and volcanoes, offers a unique experience for nature, culture and adventure lovers.",
      beaches: "Beaches",
      beachesDesc: "Enjoy the best beaches of the Pacific and Caribbean",
      volcanoes: "Volcanoes",
      volcanoesDesc: "Explore imposing volcanoes and crater lagoons",
      featuredDestinations: "Featured Destinations",
      all: "All",
      beachesCategory: "Beaches",
      colonial: "Colonial",
      volcanoesCategory: "Volcanoes",
      nature: "Nature",
      seeMore: "See more",
      interactiveMap: "Interactive Map",
      tours: "Tours and Experiences",
      adventure: "Adventure",
      cultural: "Cultural",
      gastronomy: "Gastronomy",
      testimonials: "Testimonials",
      events: "Events and Festivals",
      quickLinks: "Quick Links",
      contact: "Contact",
      subscribe: "Subscribe",
      emailPlaceholder: "Your email",
      subscribeButton: "Subscribe",
      rights: "All rights reserved."
    },
    zh: {
      title: "探索尼加拉瓜之美",
      subtitle: "天堂般的海滩，雄伟的火山和充满活力的文化在中美洲的心脏等待着您。",
      exploreTours: "探索旅游",
      welcomeTitle: "探索尼加拉瓜目的地",
      welcomeText: "尼加拉瓜，湖泊和火山之地，为热爱自然、文化和冒险的人们提供独特体验。",
      beaches: "海滩",
      beachesDesc: "享受太平洋和加勒比地区最好的海滩",
      volcanoes: "火山",
      volcanoesDesc: "探索雄伟的火山和火山口湖",
      featuredDestinations: "特色目的地",
      all: "全部",
      beachesCategory: "海滩",
      colonial: "殖民",
      volcanoesCategory: "火山",
      nature: "自然",
      seeMore: "查看更多",
      interactiveMap: "互动地图",
      tours: "旅游和体验",
      adventure: "冒险",
      cultural: "文化",
      gastronomy: "美食",
      testimonials: "感言",
      events: "活动与节日",
      quickLinks: "快速链接",
      contact: "联系",
      subscribe: "订阅",
      emailPlaceholder: "您的电子邮件",
      subscribeButton: "订阅",
      rights: "保留所有权利。"
    },
    ru: {
      title: "Откройте для себя красоту Никарагуа",
      subtitle: "Райские пляжи, величественные вулканы и яркая культура ждут вас в сердце Центральной Америки.",
      exploreTours: "Исследовать туры",
      welcomeTitle: "Исследуйте направление Никарагуа",
      welcomeText: "Никарагуа, страна озёр и вулканов, предлагает уникальный опыт для любителей природы, культуры и приключений.",
      beaches: "Пляжи",
      beachesDesc: "Наслаждайтесь лучшими пляжами Тихого океана и Карибского моря",
      volcanoes: "Вулканы",
      volcanoesDesc: "Исследуйте величественные вулканы и кратерные озёра",
      featuredDestinations: "Рекомендуемые направления",
      all: "Все",
      beachesCategory: "Пляжи",
      colonial: "Колониальный",
      volcanoesCategory: "Вулканы",
      nature: "Природа",
      seeMore: "Узнать больше",
      interactiveMap: "Интерактивная карта",
      tours: "Туры и впечатления",
      adventure: "Приключения",
      cultural: "Культура",
      gastronomy: "Гастрономия",
      testimonials: "Отзывы",
      events: "События и фестивали",
      quickLinks: "Быстрые ссылки",
      contact: "Контакт",
      subscribe: "Подписаться",
      emailPlaceholder: "Ваш email",
      subscribeButton: "Подписаться",
      rights: "Все права защищены."
    }
  };

  // Datos de destinos
  const destinations = [
    {
      id: 1,
      name: { es: "Granada", en: "Granada", zh: "格拉纳达", ru: "Гранада" },
      description: { 
        es: "Una de las ciudades coloniales más antiguas de América, con arquitectura colorida y el lago Cocibolca.", 
        en: "One of the oldest colonial cities in America, with colorful architecture and Lake Cocibolca.",
        zh: "美洲最古老的殖民城市之一，拥有色彩缤纷的建筑和科西博尔卡湖。",
        ru: "Один из старейших колониальных городов Америки с красочной архитектурой и озером Косиболька."
      },
      image: granadaImg,
      category: "colonial"
    },
    {
      id: 2,
      name: { es: "León", en: "León", zh: "莱昂", ru: "Леон" },
      description: { 
        es: "Ciudad universitaria con impresionantes iglesias coloniales y cercana al volcán Cerro Negro.", 
        en: "University city with impressive colonial churches and close to the Cerro Negro volcano.",
        zh: "大学城，拥有令人印象深刻的殖民时期教堂，靠近塞罗内格罗火山。",
        ru: "Университетский город с впечатляющими колониальными церквями и близлежащим вулканом Серро-Негро."
      },
      image: leonImg,
      category: "colonial"
    },
    {
      id: 3,
      name: { es: "San Juan del Sur", en: "San Juan del Sur", zh: "南圣胡安", ru: "Сан-Хуан-дель-Сур" },
      description: { 
        es: "Famosa playa del Pacífico ideal para surf, con un Cristo de la Misericordia que domina la bahía.", 
        en: "Famous Pacific beach ideal for surfing, with a Christ of Mercy overlooking the bay.",
        zh: "著名的太平洋海滩，是冲浪的理想场所，慈悲基督像俯瞰着海湾。",
        ru: "Знаменитый пляж на Тихом океане, идеальный для серфинга, со статуей Христа Милосердия, возвышающейся над заливом."
      },
      image: sanJuanImg,
      category: "beaches"
    },
    {
      id: 4,
      name: { es: "Masaya", en: "Masaya", zh: "马萨亚", ru: "Масая" },
      description: { 
        es: "Conocida como la 'Ciudad de las Flores', hogar del volcán Masaya y su mercado de artesanías.", 
        en: "Known as the 'City of Flowers', home to the Masaya volcano and its crafts market.",
        zh: "被称为'花之城'，是马萨亚火山及其工艺品市场的所在地。",
        ru: "Известный как 'Город цветов', здесь находится вулкан Масая и его ремесленный рынок."
      },
      image: masayaImg,
      category: "volcanoes"
    },
    {
      id: 5,
      name: { es: "Ometepe", en: "Ometepe", zh: "奥梅特佩岛", ru: "Ометепе" },
      description: { 
        es: "Isla formada por dos volcanes en el Lago de Nicaragua, con petroglifos y naturaleza exuberante.", 
        en: "Island formed by two volcanoes in Lake Nicaragua, with petroglyphs and lush nature.",
        zh: "由尼加拉瓜湖中的两座火山形成的岛屿，拥有岩画和郁郁葱葱的自然风光。",
        ru: "Остров, образованный двумя вулканами в озере Никарагуа, с петроглифами и пышной природой."
      },
      image: ometepeImg,
      category: "nature"
    }
  ];

  // Tours y experiencias
  const tours = [
    {
      id: 1,
      name: { 
        es: "Tour Volcánico", 
        en: "Volcanic Tour",
        zh: "火山之旅",
        ru: "Вулканический тур"
      },
      description: { 
        es: "Explora los imponentes volcanes de Nicaragua, incluyendo el Masaya y el Mombacho.", 
        en: "Explore Nicaragua's imposing volcanoes, including Masaya and Mombacho.",
        zh: "探索尼加拉瓜雄伟的火山，包括马萨亚和蒙巴乔火山。",
        ru: "Исследуйте величественные вулканы Никарагуа, включая Масаю и Момбачо."
      },
      type: "adventure",
      price: "$50-80"
    },
    {
      id: 2,
      name: { 
        es: "Ruta Colonial", 
        en: "Colonial Route",
        zh: "殖民路线",
        ru: "Колониальный маршрут"
      },
      description: { 
        es: "Descubre la rica historia de las ciudades coloniales de Granada y León.", 
        en: "Discover the rich history of the colonial cities of Granada and León.",
        zh: "探索格拉纳达和莱昂殖民城市的丰富历史。",
        ru: "Откройте для себя богатую историю колониальных городов Гранада и Леон."
      },
      type: "cultural",
      price: "$40-60"
    },
    {
      id: 3,
      name: { 
        es: "Gastronomía Local", 
        en: "Local Gastronomy",
        zh: "当地美食",
        ru: "Местная гастрономия"
      },
      description: { 
        es: "Degusta la auténtica comida nicaragüense en mercados y restaurantes tradicionales.", 
        en: "Taste authentic Nicaraguan food in markets and traditional restaurants.",
        zh: "在市场和传统餐厅品尝正宗的尼加拉瓜美食。",
        ru: "Попробуйте аутентичную никарагуанскую еду на рынках и в традиционных ресторанах."
      },
      type: "gastronomy",
      price: "$30-50"
    }
  ];

  // Testimonios
  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      comment: { 
        es: "Nicaragua superó todas mis expectativas. Las playas de San Juan del Sur son simplemente increíbles.", 
        en: "Nicaragua exceeded all my expectations. The beaches of San Juan del Sur are simply amazing.",
        zh: "尼加拉瓜超出了我的所有期望。南圣胡安的海滩简直太棒了。",
        ru: "Никарагуа превзошла все мои ожидания. Пляжи Сан-Хуан-дель-Сур просто потрясающие."
      },
      rating: 5,
      location: "España"
    },
    {
      id: 2,
      name: "John Smith",
      comment: { 
        es: "El tour de volcanes fue la experiencia más emocionante de mis vacaciones. ¡Altamente recomendado!", 
        en: "The volcano tour was the most exciting experience of my vacation. Highly recommended!",
        zh: "火山之旅是我假期中最激动人心的经历。强烈推荐！",
        ru: "Тур по вулканам был самым захватывающим опытом в моем отпуске. Очень рекомендую!"
      },
      rating: 5,
      location: "Estados Unidos"
    },
    {
      id: 3,
      name: "Sophie Martin",
      comment: { 
        es: "La cultura y la calidez de la gente nicaragüense hicieron de mi viaje una experiencia inolvidable.", 
        en: "The culture and warmth of the Nicaraguan people made my trip an unforgettable experience.",
        zh: "尼加拉瓜人的文化和热情使我的旅行成为一次难忘的经历。",
        ru: "Культура и теплота никарагуанского народа сделали мою поездку незабываемым опытом."
      },
      rating: 4,
      location: "Francia"
    }
  ];

  // Eventos
  const events = [
    {
      id: 1,
      name: { 
        es: "Festival de Santo Domingo", 
        en: "Santo Domingo Festival",
        zh: "圣多明各节",
        ru: "Фестиваль Санто-Доминго"
      },
      date: "01-10 Agosto",
      location: "Managua"
    },
    {
      id: 2,
      name: { 
        es: "Feria del Güegüense", 
        en: "Güegüense Fair",
        zh: "圭圭恩塞博览会",
        ru: "Ярмарка Гуэгуэнсе"
      },
      date: "17-26 Enero",
      location: "Masaya"
    },
    {
      id: 3,
      name: { 
        es: "Festival del Maíz", 
        en: "Corn Festival",
        zh: "玉米节",
        ru: "Фестиваль кукурузы"
      },
      date: "20-25 Septiembre",
      location: "Matagalpa"
    }
  ];

  // Frases motivacionales
  const motivationalQuotes = [
    { 
      es: "Viajar es la única cosa que compras que te hace más rico", 
      en: "Travel is the only thing you buy that makes you richer",
      zh: "旅行是你买的唯一让你更富有的东西",
      ru: "Путешествие - это единственная вещь, которую вы покупаете, которая делает вас богаче"
    },
    { 
      es: "Descubre lugares increíbles donde el alma se renueva", 
      en: "Discover amazing places where the soul is renewed",
      zh: "发现灵魂得到更新的神奇地方",
      ru: "Откройте для себя удивительные места, где обновляется душа"
    },
    { 
      es: "La aventura te espera en cada rincón de Nicaragua", 
      en: "Adventure awaits you around every corner of Nicaragua",
      zh: "冒险在尼加拉瓜的每个角落等着你",
      ru: "Приключение ждет вас на каждом углу Никарагуа"
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [canvasInitialized, setCanvasInitialized] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % nicaraguaImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [nicaraguaImages.length]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % motivationalQuotes.length);
    }, 7000);
    return () => clearInterval(quoteInterval);
  }, [motivationalQuotes.length]);

  useEffect(() => {
    // Inicializar el canvas solo una vez
    if (!canvasInitialized && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      const particles = [];
      const particleCount = 80;
      
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
      setCanvasInitialized(true);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [canvasInitialized]);

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory);

  const t = translations[language];

  return (
    <div className="home-container">
      {/* Canvas para animación de fondo */}
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      
      {/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-dark fixed-top nicaragua-navbar" style={{background: 'linear-gradient(135deg, #006ecc 0%, #0052a3 100%)', boxShadow: '0 2px 15px rgba(0, 0, 0, 0.2)'}}>
  <div className="container">
    <Link className="navbar-brand animate__animated animate__fadeInLeft" to="/" style={{fontWeight: 'bold', fontSize: '1.4rem'}}>
      <i className="fas fa-globe-americas me-2" style={{color: '#ffcc00'}}></i>E D N
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/" style={{position: 'relative', padding: '0.5rem 1rem', margin: '0 0.2rem', borderRadius: '4px'}}>
            <i className="fas fa-home me-1" style={{color: '#ffcc00'}}></i>Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/destinos" style={{position: 'relative', padding: '0.5rem 1rem', margin: '0 0.2rem', borderRadius: '4px'}}>
            <i className="fas fa-map-marked-alt me-1" style={{color: '#4cd964'}}></i>Destinos
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/paquetes" style={{position: 'relative', padding: '0.5rem 1rem', margin: '0 0.2rem', borderRadius: '4px'}}>
            <i className="fas fa-suitcase me-1" style={{color: '#ff9500'}}></i>Paquetes
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/testimonios" style={{position: 'relative', padding: '0.5rem 1rem', margin: '0 0.2rem', borderRadius: '4px'}}>
            <i className="fas fa-comments me-1" style={{color: '#ff3b30'}}></i>Testimonios
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contacto" style={{position: 'relative', padding: '0.5rem 1rem', margin: '0 0.2rem', borderRadius: '4px'}}>
            <i className="fas fa-envelope me-1" style={{color: '#5ac8fa'}}></i>Contacto
          </Link>
        </li>
        
        {/* Selector de idioma */}
        <li className="nav-item dropdown me-2">
          <button className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            borderRadius: '6px',
            padding: '0.4rem 0.8rem',
            transition: 'all 0.3s ease'
          }}>
            <i className="fas fa-language me-1" style={{color: '#ffcc00'}}></i>
            {language === 'es' ? 'Español' : language === 'en' ? 'English' : language === 'zh' ? '中文' : 'Русский'}
          </button>
          <ul className="dropdown-menu" style={{
            background: 'black',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <li><button className="dropdown-item" onClick={() => setLanguage('es')} style={{transition: 'all 0.2s'}}>Español</button></li>
            <li><button className="dropdown-item" onClick={() => setLanguage('en')} style={{transition: 'all 0.2s'}}>English</button></li>
            <li><button className="dropdown-item" onClick={() => setLanguage('zh')} style={{transition: 'all 0.2s'}}>中文</button></li>
            <li><button className="dropdown-item" onClick={() => setLanguage('ru')} style={{transition: 'all 0.2s'}}>Русский</button></li>
          </ul>
        </li>
        
        <li className="nav-item">
          <Link className="btn ms-2" to="/registro" style={{
            background: 'linear-gradient(45deg, #ff9500, #ffcc00)',
            border: 'none',
            borderRadius: '6px',
            color: 'black',
            fontWeight: '600',
            padding: '0.5rem 1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            <i className="fas fa-user-plus me-1"></i>Registrarse
          </Link>
          {/* Botón Login */}
  <Link
  className="btn ms-2"
  to="/login"
  style={{
    background: 'linear-gradient(45deg, #32cd32, #7fff00)', // verde lima a verde claro
    border: 'none',
    borderRadius: '6px',
    color: 'black', // texto negro
    fontWeight: '600',
    padding: '0.5rem 1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  }}
>
  <i className="fas fa-sign-in-alt me-1"></i>Login
</Link>

        </li>
        
      </ul>
    </div>
  </div>
</nav>

      {/* Carrusel de imágenes de Nicaragua */}
      <div className="nicaragua-carousel">
        {nicaraguaImages.map((image, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
            <div className="carousel-overlay"></div>
          </div>
        ))}

        <div className="carousel-content">
          <h1 className="display-3 fw-bold mb-4">
            {t.title}
          </h1>
          <p className="lead mb-5">
            {t.subtitle}
          </p>
          
          {/* Frase motivacional */}
          <div className="motivational-quote">
            <p>"{motivationalQuotes[currentQuote][language]}"</p>
          </div>
          
          <Link
            to="/paquetes"
            className="btn btn-hero btn-lg"
          >
            <i className="fas fa-search me-2"></i>{t.exploreTours}
          </Link>
        </div>

        <div className="carousel-indicators">
          {nicaraguaImages.map((_, index) => (
            <button
              key={index}
              className={index === currentSlide ? 'active' : ''}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Sección de bienvenida */}
      <section className="welcome-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>{t.welcomeTitle}</h2>
              <p>{t.welcomeText}</p>
              <div className="row mt-4">
                <div className="col-sm-6">
                  <div className="feature-item">
                    <i className="fas fa-umbrella-beach"></i>
                    <h4>{t.beaches}</h4>
                    <p>{t.beachesDesc}</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="feature-item">
                    <i className="fas fa-mountain"></i>
                    <h4>{t.volcanoes}</h4>
                    <p>{t.volcanoesDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-frame">
  <img 
    src={lagoNicaragua} 
    alt="Lago de Nicaragua" 
    className="img-fluid"
  />
  <div className="frame-overlay"></div>
</div>

            </div>
          </div>
        </div>
      </section>

      {/* Sección de Destinos destacados */}
      <section className="destinations-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t.featuredDestinations}</h2>
          
          {/* Filtros de categorías */}
          <div className="categories-filter mb-4">
            <div className="d-flex justify-content-center flex-wrap">
              <button 
                className={`btn ${activeCategory === 'all' ? 'btn-nicaragua' : 'btn-outline-nicaragua'} me-2 mb-2`}
                onClick={() => setActiveCategory('all')}
              >
                {t.all}
              </button>
              <button 
                className={`btn ${activeCategory === 'beaches' ? 'btn-nicaragua' : 'btn-outline-nicaragua'} me-2 mb-2`}
                onClick={() => setActiveCategory('beaches')}
              >
                {t.beachesCategory}
              </button>
              <button 
                className={`btn ${activeCategory === 'colonial' ? 'btn-nicaragua' : 'btn-outline-nicaragua'} me-2 mb-2`}
                onClick={() => setActiveCategory('colonial')}
              >
                {t.colonial}
              </button>
              <button 
                className={`btn ${activeCategory === 'volcanoes' ? 'btn-nicaragua' : 'btn-outline-nicaragua'} me-2 mb-2`}
                onClick={() => setActiveCategory('volcanoes')}
              >
                {t.volcanoesCategory}
              </button>
              <button 
                className={`btn ${activeCategory === 'nature' ? 'btn-nicaragua' : 'btn-outline-nicaragua'} me-2 mb-2`}
                onClick={() => setActiveCategory('nature')}
              >
                {t.nature}
              </button>
            </div>
          </div>
          
          {/* Tarjetas de destinos */}
          <div className="row">
            {filteredDestinations.map(destination => (
              <div key={destination.id} className="col-md-4 mb-4">
                <div className="destination-card card h-100">
                  <img src={destination.image} className="card-img-top" alt={destination.name[language]} />
                  <div className="card-body">
                    <h5 className="card-title">{destination.name[language]}</h5>
                    <p className="card-text">{destination.description[language]}</p>
                  </div>
                  <div className="card-footer">
                    <Link to={`/destino/${destination.id}`} className="btn btn-nicaragua btn-sm">
                      {t.seeMore} <i className="fas fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapas interactivos */}
      <section className="map-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">{t.interactiveMap}</h2>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="map-container rounded shadow-sm">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1563318.156682033!2d-86.84594129999999!3d12.865416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f15c3a8a51bcfc5%3A0x5c56fe993c4870e2!2sNicaragua!5e0!3m2!1ses!2ses!4v1646144081566!5m2!1ses!2ses" 
                  width="100%" 
                  height="450" 
                  style={{border: 0}} 
                  allowFullScreen="" 
                  loading="lazy" 
                  title="Mapa de Nicaragua"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-nicaragua">
                  <i className="fas fa-map-marked-alt me-2"></i>Ver más destinos en el mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours y Experiencias */}
      <section className="tours-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t.tours}</h2>
          <div className="row">
            {tours.map(tour => (
              <div key={tour.id} className="col-md-4 mb-4">
                <div className="tour-card card h-100">
                  <div className="card-body">
                    <span className={`badge ${tour.type === 'adventure' ? 'bg-danger' : tour.type === 'cultural' ? 'bg-info' : 'bg-warning'} mb-2`}>
                      {t[tour.type]}
                    </span>
                    <h5 className="card-title">{tour.name[language]}</h5>
                    <p className="card-text">{tour.description[language]}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price">{tour.price}</span>
                      <button className="btn btn-nicaragua btn-sm">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/paquetes" className="btn btn-nicaragua">
              Ver todos los tours <i className="fas fa-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">{t.testimonials}</h2>
          <div className="row">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-md-4 mb-4">
                <div className="testimonial-card card h-100">
                  <div className="card-body">
                    <div className="rating mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < testimonial.rating ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                    </div>
                    <p className="card-text">"{testimonial.comment[language]}"</p>
                    <div className="d-flex align-items-center mt-4">
                      <div className="user-avatar bg-nicaragua-blue rounded-circle d-flex align-items-center justify-content-center me-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h6 className="mb-0">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.location}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos y festivales */}
      <section className="events-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t.events}</h2>
          <div className="row">
            {events.map(event => (
              <div key={event.id} className="col-md-4 mb-4">
                <div className="event-card card h-100">
                  <div className="card-body">
                    <div className="event-date mb-3">
                      <span className="badge bg-nicaragua-blue">{event.date}</span>
                    </div>
                    <h5 className="card-title">{event.name[language]}</h5>
                    <p className="card-text text-muted">
                      <i className="fas fa-map-marker-alt me-2"></i>{event.location}
                    </p>
                    <button className="btn btn-outline-nicaragua btn-sm">
                      Más información
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-nicaragua">
              <i className="fas fa-calendar-alt me-2"></i>Ver calendario completo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>MundoViajero</h5>
              <p>Tu compañero perfecto para descubrir las maravillas de Nicaragua y vivir experiencias inolvidables.</p>
              <div className="social-icons">
                <a href="#" className="text-white me-2"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white me-2"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-white"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            <div className="col-md-2 mb-4">
              <h5>{t.quickLinks}</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-white text-decoration-none">Inicio</Link></li>
                <li><Link to="/destinos" className="text-white text-decoration-none">Destinos</Link></li>
                <li><Link to="/paquetes" className="text-white text-decoration-none">Paquetes</Link></li>
                <li><Link to="/testimonios" className="text-white text-decoration-none">Testimonios</Link></li>
                <li><Link to="/contacto" className="text-white text-decoration-none">Contacto</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5>{t.contact}</h5>
              <ul className="list-unstyled">
                <li><i className="fas fa-map-marker-alt me-2"></i> Managua, Nicaragua</li>
                <li><i className="fas fa-phone me-2"></i> +505 1234 5678</li>
                <li><i className="fas fa-envelope me-2"></i> info@mundoviajero.com</li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5>{t.subscribe}</h5>
              <p>Recibe nuestras mejores ofertas y noticias.</p>
              <div className="input-group">
                <input type="email" className="form-control" placeholder={t.emailPlaceholder} />
                <button className="btn btn-nicaragua">{t.subscribeButton}</button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">&copy; 2023 MundoViajero. {t.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;