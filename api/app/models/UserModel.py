# Modelo SQLAlchemy para usuarios
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

# Importa la libreria de la base de datos
from app.BaseModel import Base
# Definición del modelo Usuario
class usermodel(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    telefono = Column(String(20), nullable=True)
    password_hash = Column(String(255), nullable=False)
    es_activo = Column(Boolean, default=True)
    rol_id = Column(Integer, ForeignKey("roles.id"), nullable=False, default=3)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    fecha_actualizacion = Column(DateTime(timezone=True), onupdate=func.now())

    rol = relationship("rolemodel", back_populates="usuarios")
    transportes = relationship("transportmodel", back_populates="proveedor")
    reservas_sitio= relationship("reservesitemodel", back_populates="usuario")
    servicios = relationship("servicemodel", back_populates="proveedor")
    reservas_servicio = relationship("reserveservicemodel", back_populates="usuario")
    pagos = relationship("paymentmodel", back_populates="usuario")