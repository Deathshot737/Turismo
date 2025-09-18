# Librerias Necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, DECIMAL, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# Definicion del modelo Servicio
class servicemodel(Base):
    __tablename__ = "servicios"
    id = Column(Integer, primary_key=True, index=True)
    proveedor_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo_id = Column(Integer, ForeignKey("tipos_servicio.id"), nullable=False)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255), nullable=True)
    imagen=Column(String(255), nullable=False)
    ubicacion = Column(String(255), nullable=False)
    precio= Column(DECIMAL(10,2), nullable=False)
    capacidad = Column(Integer, nullable=False)
    latitud = Column(DECIMAL(10, 7), nullable=True)
    longitud = Column(DECIMAL(10, 7), nullable=True)
    disponible = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    proveedor = relationship("usermodel", back_populates="servicios")
    tipo = relationship("typeservicemodel", back_populates="servicio")
    reservas = relationship("reserveservicemodel", back_populates="servicio")