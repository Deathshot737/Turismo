# Esquemas Pydantic para usuarios
from pydantic import BaseModel

# Esquemas base y específicos para creación, login y salida de usuario
class BaseUser(BaseModel):
    nombre: str
    apellido: str | None
    email: str
    telefono: str | None

# Esquema para creación de usuario que incluye contraseña
class UserCreate(BaseUser):
    password: str

# Esquema para login de usuario
class UserLogin(BaseModel):
    email: str
    password: str

# Esquema para salida de usuario que excluye la contraseña
class UserOut(BaseUser):
    id: int
    email: str
    es_activo: bool
    es_admin: bool

    # Configuración para trabajar con ORM
    class Config:
        orm_mode = True

# Esquema para actualización de usuario, todos los campos son opcionales
class UserUpdate(BaseUser):
    nombre: str
    apellido: str | None
    email: str
    telefono: str | None