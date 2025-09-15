# Importa la libreria de la base de datos
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class typetransmodel(Base):
    __tablename__ = "tipos_transporte"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(50), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    transporte = relationship("transportmodel", back_populates="tipo")