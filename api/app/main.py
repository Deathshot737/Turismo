# Dependencia de FastAPI y SQLAlchemy
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse

# Importaciones locales
import app.database as database
from app.esquemas import usuarios as schemas
from app.auth import auth, crudauth as crud

# Inicialización de la aplicación FastAPI
app = FastAPI()

# Inspeccionar la conexion y crear tablas en caso que no existan
database.init_db()

# Rutas de la API

# Ruta raiz redirije a swagger
@app.get("/", include_in_schema=False)
async def read_root():
    return RedirectResponse(url="/docs")

# Registro de usuario
@app.post("/registro", response_model=schemas.UsuarioOut)
async def registro(usuario: schemas.UsuarioCreate, db: Session = Depends(database.get_db)):
    return await crud.create_user(db, usuario)

# Login de usuario
@app.post("/login")
async def login(datos: schemas.UsuarioLogin, db: Session = Depends(database.get_db)):
    usuario = await crud.auth_user(db, datos.email, datos.password)
    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    token = await auth.create_token({"sub": usuario.email, "id": usuario.id}) 
    return {"access_token": token, "token_type": "bearer"}

# Obtener todos los usuarios (solo para administradores)
@app.get("/usuarios", response_model=list[schemas.UsuarioOut])
async def obtener_usuarios(
    db: Session = Depends(database.get_db),
    token: str = Depends(OA(tokenUrl="login"))
):
    payload = await auth.decode_token(token)
    print(payload)
    if not payload:
        raise HTTPException(status_code=401, detail="El token ha expirado o es inválido")
    if not payload:
        raise HTTPException(status_code=401, detail="Usuario no autenticado")
    usuario= await crud.get_user_by_email(db, payload.get("sub"))
    if not getattr(usuario, "es_admin", False):
        raise HTTPException(status_code=403, detail="Acceso denegado: el usuario no es administrador")
    return await crud.get_all_users(db)

@app.put("/usuarios/{user_id}", response_model=schemas.UsuarioOut, include_in_schema=True)
async def actualizar_usuario():
    return "NADA"
