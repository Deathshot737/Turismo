# Inicialización de la base de datos y configuración de SQLAlchemy
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import sessionmaker

# Importa la configuración de la aplicación
from config import settings

# Importa todos los modelos para que SQLAlchemy los registre
from app.BaseModel import Base
from app import models  # Asegúrate de importar todos los modelos aquí
from sqlalchemy import inspect

# Configuración de la base de datos
DATABASE_URL = settings.DATABASE_URL

# Crear motor de base de datos y sesión
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


# Dependencia para obtener la sesión de la base de datos
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Función para probar la conexión a la base de datos
def test_connection():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        print("✅ Conexión exitosa.")
        return True
    except Exception as e:
        print(f"Error de conexión: {e}")
        return False

# Importa todos los modelos que heredan de Base
def init_db():
    try:
        if test_connection():
            inspector = inspect(engine)
            tablas_existentes = set(inspector.get_table_names())
            tablas_modelos = set(t.name for t in Base.metadata.sorted_tables)

            if tablas_modelos.issubset(tablas_existentes):
                print("✅ Todas las tablas ya existen.")
            else:
                Base.metadata.create_all(bind=engine)
                try:
                    load()
                except SQLAlchemyError as e:
                    print(e)
                print("✅ Tablas creadas exitosamente:", tablas_modelos - tablas_existentes)
    except SQLAlchemyError as e:
        print("❌ Error al inicializar la base de datos:", e)

def cargar_roles_iniciales():
    db = SessionLocal()
    roles = [
        {"rol": "admin", "descripcion": "Administrador del sistema"},
        {"rol": "editor", "descripcion": "Usuario con permisos de edición"},
        {"rol": "turista", "descripcion": "Usuario visitante"}   ]

    for r in roles:
        existe = db.query(models.rolemodel).filter_by(rol=r["rol"]).first()
        if not existe:
            nuevo_rol = models.rolemodel(**r)
            db.add(nuevo_rol)

    db.commit()
    db.close()

def cargar_tipos_servicio_iniciales():
    db = SessionLocal()
    tipos = [
        {"tipo": "hospedaje", "descripcion": "Alojamiento temporal"},
        {"tipo": "restaurante", "descripcion": "Servicio de comida"},
        {"tipo": "alquiler", "descripcion": "Alquiler de vehículos o equipos"}
    ]
    for t in tipos:
        existe = db.query(models.typeservicemodel).filter_by(tipo=t["tipo"]).first()
        if not existe:
            db.add(models.typeservicemodel(**t))
    db.commit()
    db.close()

def cargar_tipos_sitio_iniciales():
    db = SessionLocal()
    tipos = [
        {"tipo": "museo", "descripcion": "Espacio cultural"},
        {"tipo": "parque", "descripcion": "Área natural o recreativa"},
        {"tipo": "histórico", "descripcion": "Sitio de valor patrimonial"}
    ]
    for t in tipos:
        existe = db.query(models.typesitemodel).filter_by(tipo=t["tipo"]).first()
        if not existe:
            db.add(models.typeservicemodel(**t))
    db.commit()
    db.close()

def cargar_tipos_transporte_iniciales():
    db = SessionLocal()
    tipos = [
        {"tipo": "bus", "descripcion": "Transporte colectivo"},
        {"tipo": "taxi", "descripcion": "Transporte privado"},
        {"tipo": "alquiler", "descripcion": "Vehículo alquilado"}
    ]
    for t in tipos:
        existe = db.query(models.typetransmodel).filter_by(tipo=t["tipo"]).first()
        if not existe:
            db.add(models.typetransmodel(**t))
    db.commit()
    db.close()

def cargar_estados_reserva_iniciales():
    db = SessionLocal()
    estados = [
        {"estado": "confirmado", "descripcion": "Reserva activa"},
        {"estado": "cancelado", "descripcion": "Reserva anulada"},
        {"estado": "pendiente", "descripcion": "Reserva en espera"}
    ]
    for e in estados:
        existe = db.query(models.statereservemodel).filter_by(estado=e["estado"]).first()
        if not existe:
            db.add(models.statereservemodel(**e))
    db.commit()
    db.close()

def cargar_metodos_pago_iniciales():
    db = SessionLocal()
    metodos = [
        {"metodo": "tarjeta", "descripcion": ""},
        {"metodo": "paypal", "descripcion": ""},
        {"metodo": "efectivo", "descripcion": ""}
    ]
    for m in metodos:
        existe = db.query(models.methodspaymentmodel).filter_by(metodo=m["metodo"]).first()
        if not existe:
            db.add(models.methodspaymentmodel(**m))
    db.commit()
    db.close()

def load():
    cargar_roles_iniciales()
    cargar_tipos_servicio_iniciales()
    cargar_tipos_sitio_iniciales()
    cargar_tipos_transporte_iniciales()
    cargar_estados_reserva_iniciales()
    cargar_metodos_pago_iniciales()
