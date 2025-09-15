# Librerias necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
# Definición del modelo Reserva de Servicio
class reserveservicemodel(Base):
    __tablename__ = "reservas_servicio"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    servicio_id = Column(Integer, ForeignKey("servicios.id"), nullable=False)
    fecha_inicio = Column(DateTime, nullable=False)
    fecha_fin = Column(DateTime, nullable=False)
    pago= Column(DECIMAL(10, 2), nullable=False)
    estado_id = Column(Integer, ForeignKey("estados_reserva.id"), nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    usuario=relationship("usermodel", back_populates="reservas_servicio")
    servicio=relationship("servicemodel", back_populates="reservas")
    estado=relationship("statereservemodel", back_populates="estado_servicio")
