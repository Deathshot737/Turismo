# Configuración de la aplicación usando Pydantic
from pydantic import BaseSettings

# Configuración de la aplicación
class Settings(BaseSettings):
    SECRET_KEY: str
    DATABASE_URL: str
    DEBUG: bool = False
    ALGORITHM: str
    # Leer variables de entorno desde un archivo .env
    class Config:
        env_file = ".env"

# Instancia de configuración
settings = Settings()