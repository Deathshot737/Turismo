# Importa la libreria de la base de datos
from app.BaseModel import Base
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, DECIMAL, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class transportmodel(Base):
    __tablename__ = "transportes"
    id = Column(Integer, primary_key=True, index=True)
    proveedor_id= Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    tipo_id = Column(Integer, ForeignKey("tipos_transporte.id"), nullable=False)
    origen = Column(String(255), nullable=False)
    destino = Column(String(255), nullable=False)
    salida = Column(DateTime, nullable=False)
    precio= Column(DECIMAL(10, 2), nullable=False)
    disponible = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    proveedor = relationship("usermodel", back_populates="transportes")
    tipo = relationship("typetransmodel", back_populates="transporte")