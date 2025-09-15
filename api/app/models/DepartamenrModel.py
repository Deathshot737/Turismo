# Librerias Necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# Definición del modelo Departamento
class departamentmodel(Base):
    __tablename__="departamentos"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    sitios = relationship("sitemodel", back_populates="departamento")
    rutas = relationship("routemodel", back_populates="departamento")