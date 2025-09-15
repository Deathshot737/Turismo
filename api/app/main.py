# Dependencia de FastAPI y SQLAlchemy
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from . import database as database
from app.ruotes.UserRoute import user_router
#from app.ruotes.PlaceRoute import place_router

# Inicialización de la aplicación FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las URLs de origen
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras
)

# Inspeccionar la conexion y crear tablas en caso que no existan
database.init_db()

# Ruta raiz redirije a swagger
@app.get("/", include_in_schema=False)
async def read_root():
    return RedirectResponse(url="/docs")

# Incluir rutas de usuario
app.include_router(user_router, tags=["User Management"])

# Incluir rutas de lugares turísticos
#app.include_router(place_router, tags=["Place Management"])
