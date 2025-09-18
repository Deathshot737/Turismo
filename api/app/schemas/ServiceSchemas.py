from pydantic import BaseModel, HttpUrl
from decimal import Decimal

class BaseService(BaseModel):
    nombre : str
    descripcion : str
    ubicacion : str
    capacidad : int
    imagen: HttpUrl

class ServiceCreate(BaseService):
    tipo_id: int
    precio: Decimal
    latitud: Decimal
    longitud: Decimal

    model_config={
        "from_attributes" : True
    }

class ServiceRead(ServiceCreate):
    id : int
    disponible: bool

class ServiceUpdate(BaseService):
    precio: Decimal
    latitud: Decimal
    longitud: Decimal
    tipo_id: int

class ServiceDelete(BaseModel):
    id: int

class TypeServiceRead(BaseModel):
    tipo: str
    descripcion: str