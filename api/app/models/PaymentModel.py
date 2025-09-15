# Librerias necesarias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
# Definición del modelo Pago
class paymentmodel(Base):
    __tablename__ = "pagos"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    total = Column(DECIMAL(10, 2), nullable=False)
    metodo_id = Column(Integer, ForeignKey("metodos_pago.id"), nullable=False)
    fecha_pago = Column(DateTime, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    usuario = relationship("usermodel", back_populates="pagos")
    metodo = relationship("methodspaymentmodel", back_populates="pagos")