# Importa la libreria de la base de datos
from app.BaseModel import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class rolemodel(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True, index=True)
    rol = Column(String(50), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    usuarios = relationship("usermodel", back_populates="rol")