# Librerias necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Time
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# Definición del modelo Ruta
class routemodel(Base):
    __tablename__ = "rutas"
    id = Column(Integer, primary_key=True, index=True)
    ruta = Column(String(100), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    departamento_id = Column(Integer, ForeignKey("departamentos.id"), nullable=False)
    duracion = Column(Time, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    departamento = relationship("departamentmodel", back_populates="rutas")
    rutas = relationship("pointsroutemodel", back_populates="puntos")