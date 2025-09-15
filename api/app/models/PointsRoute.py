# Librerias Necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
# Definición del modelo Ruta de Puntos
class pointsroutemodel(Base):
    __tablename__ = "puntos_ruta"
    id = Column(Integer, primary_key=True, index=True)
    ruta_id = Column(Integer, ForeignKey("rutas.id"), nullable=False)
    orden = Column(Integer, nullable=False)
    latitud = Column(String(50), nullable=False)
    longitud = Column(String(50), nullable=False)
    site_id = Column(Integer, ForeignKey("sitios.id"), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    puntos = relationship("routemodel", back_populates="rutas")
    sitio = relationship("sitemodel", back_populates="puntos_ruta")