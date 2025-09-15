# Librerias
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
# Definición del modelo Metodo de Pago
class methodspaymentmodel(Base):
    __tablename__ = "metodos_pago"
    id = Column(Integer, primary_key=True, index=True)
    metodo = Column(String(50), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    pagos = relationship("paymentmodel", back_populates="metodo")