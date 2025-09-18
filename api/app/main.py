# Dependencia de FastAPI y SQLAlchemy
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from . import database as database
from app.ruotes.UserRoute import user_router
from app.ruotes.ServiceRoute import service_route
from app.ruotes.SiteRoute import site_route

# from app.ruotes.PlaceRoute import place_router

# Inicialización de la aplicación FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs de origen
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
    ],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras
)

# Inspeccionar la conexion y crear tablas en caso que no existan
database.init_db()


# Ruta raiz redirije a swagger
@app.get("/", include_in_schema=False)
async def read_root():
    return RedirectResponse(url="/docs")

app.mount("/img", StaticFiles(directory="app/static/img"), name="img")

# Incluir rutas de usuario
app.include_router(user_router, tags=["User Management"])

# Incluir servicios
app.include_router(service_route, tags=["Service Management"])

# Incluir Sitios turisticos
app.include_router(site_route, tags=["Site Managment"])