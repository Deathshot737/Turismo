# Librerias Necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
# Definición del modelo Reserva de Sitio
class reservesitemodel(Base):
    __tablename__ = "reservas_sitio"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    sitio_id = Column(Integer, ForeignKey("sitios.id"), nullable=False)
    fecha_visita = Column(DateTime, nullable=False)
    cantidad = Column(Integer, nullable=False)
    estado_id = Column(Integer, ForeignKey("estados_reserva.id"), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    usuario = relationship("usermodel", back_populates="reservas_sitio")
    sitio = relationship("sitemodel", back_populates="reservas")
    estado = relationship("statereservemodel", back_populates="estado_sitio")

