
# Dependencia de FastAPI y SQLAlchemy
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

# Importaciones locales
import app.database as database
from app.esquemas import usuarios as schemas
from app.auth import crudauth as crud, auth

# Inicialización de la aplicación FastAPI
app = FastAPI()

# Inspeccionar la conexion y crear tablas en caso que no existan
database.init_db()

# Rutas de la API

# Registro de usuario
@app.post("/registro", response_model=schemas.UsuarioOut)
def registro(usuario: schemas.UsuarioCreate, db: Session = Depends(database.get_db)):
    return crud.crear_usuario(db, usuario)

# Login de usuario
@app.post("/login")
def login(datos: schemas.UsuarioLogin, db: Session = Depends(database.get_db)):
    usuario = crud.autenticar_usuario(db, datos.email, datos.password)
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = auth.create_token({"sub": usuario.email})
    return {"access_token": token, "token_type": "bearer"}

