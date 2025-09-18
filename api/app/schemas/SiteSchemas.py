from pydantic import BaseModel, HttpUrl
from decimal import Decimal
class BaseSite(BaseModel):
    nombre:str
    imagen: HttpUrl
    descripcion:str
    precio: Decimal
    capacidad:str
    disponible:bool

class SiteCreate(BaseSite):
    tipo_id:str
    departamento_id:str
    latitud: Decimal
    longitud: Decimal

class SiteRead(SiteCreate):
    model_config={'from_attributes': True}

class SiteUpdate(BaseModel):
    nombre:str
    imagen: HttpUrl
    descripcion:str
    precio: Decimal
    capacidad:str
    disponible:bool

class SiteDelete(BaseModel):
    id:int

class TypeSiteRead(BaseModel):
    tipo: str
    descripcion:str
