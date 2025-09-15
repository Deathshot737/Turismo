# Importar lobrerias necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, DECIMAL, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
# Definición del modelo Sitio
class sitemodel(Base):
    __tablename__ = "sitios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    tipo_id = Column(Integer, ForeignKey("tipos_sitio.id"), nullable=False)
    departamento_id = Column(Integer, ForeignKey("departamentos.id"), nullable=False)
    descripcion = Column(String(255), nullable=True)
    precio= Column(DECIMAL(10,2), nullable=False)
    capacidad = Column(Integer, nullable=False)
    disponible = Column(Boolean, default=True)
    longitud = Column(DECIMAL(10, 7), nullable=True)
    latitud = Column(DECIMAL(10, 7), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    tipo = relationship("typesitemodel", back_populates="sitio")
    departamento = relationship("departamentmodel", back_populates="sitios")
    reservas = relationship("reservesitemodel", back_populates="sitio")
    puntos_ruta = relationship("pointsroutemodel", back_populates="sitio")