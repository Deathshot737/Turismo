# Esquemas Pydantic para usuarios
from pydantic import BaseModel

# Esquemas base y específicos para creación, login y salida de usuario
class UsuarioBase(BaseModel):
    nombre: str
    apellido: str | None
    email: str
    telefono: str | None

# Esquema para creación de usuario que incluye contraseña
class UsuarioCreate(UsuarioBase):
    password: str

# Esquema para login de usuario
class UsuarioLogin(BaseModel):
    email: str
    password: str

# Esquema para salida de usuario que excluye la contraseña
class UsuarioOut(UsuarioBase):
    id: int
    email: str
    es_activo: bool
    es_admin: bool

    # Configuración para trabajar con ORM
    class Config:
        orm_mode = True