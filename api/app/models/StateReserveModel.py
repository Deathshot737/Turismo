# Libreria necesaria para definir el modelo de datos
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
# Definición del modelo Reserva de Estado
class statereservemodel(Base):
    __tablename__ = "estados_reserva"
    id = Column(Integer, primary_key=True, index=True)
    estado = Column(String(50), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    estado_sitio = relationship("reservesitemodel", back_populates="estado")
    estado_servicio = relationship("reserveservicemodel", back_populates="estado")
