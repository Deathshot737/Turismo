# Modelo SQLAlchemy para usuarios
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

# Importa la libreria de la base de datos
from app.database import Base

# Definición del modelo Usuario
class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    telefono = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    es_activo = Column(Boolean, default=True)
    es_admin = Column(Boolean, default=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())
