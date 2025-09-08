# Inicialización de la base de datos y configuración de SQLAlchemy
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base

# Importa la configuración de la aplicación
from config import settings

# Importa todos los modelos para que SQLAlchemy los registre
from app.models import *
from sqlalchemy import inspect

# Configuración de la base de datos
DATABASE_URL = settings.DATABASE_URL

# Crear motor de base de datos y sesión
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

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
    if test_connection():
        # Verifica si la tabla existe, si no, la crea
        inspector = inspect(engine)
        tablas_existentes = inspector.get_table_names()
        if not tablas_existentes:
            Base.metadata.create_all(bind=engine)
            print("Base de datos inicializada.")
        else:
            print("Las tablas ya existen:", tablas_existentes)
