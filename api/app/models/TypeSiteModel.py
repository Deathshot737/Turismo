# librerias para modelos
from sqlalchemy import Column, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import DateTime

# Importa la libreria de la base de datos
from app.BaseModel import Base
# Definición del modelo Tipo de Sitio
class typesitemodel(Base):
    __tablename__ = "tipos_sitio"
    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(50), unique=True, nullable=False)
    descripcion = Column(String(255), nullable=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    sitio = relationship("sitemodel", back_populates="tipo")