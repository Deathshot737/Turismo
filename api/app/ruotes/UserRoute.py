from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session

# Importaciones locales
from app.Controllers import UserController
from app.schemas import UserSchemas
from app.auth import auth
from .. import database

# Inicializacion de router de usuario
user_router = APIRouter()

# Rutas de la API para usuario


# Registro de usuario
@user_router.post("/user/singin")
async def sign_in(usuario: UserSchemas.UserCreate, db: Session = Depends(database.get_db)):
    return await UserController.create_user(db, usuario)

# Login de usuario
@user_router.post("/user/login")
async def login(datos: UserSchemas.UserLogin, db: Session = Depends(database.get_db)):
    user = await UserController.auth_user(db, datos.email, datos.password)
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")
    if not user.es_activo:
        raise HTTPException(status_code=403, detail="Usuario inactivo")
    token = await auth.create_token({"sub": user.email}) 
    return {"access_token": token, "token_type": "bearer"}

# Obtener todos los usuarios (solo para administradores)
@user_router.get("/users", response_model=list[UserSchemas.UserOut])
async def get_users(db: Session = Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    return await UserController.get_all_users(db, token)

# Editar usuario (solo para usuarios autenticados)
@user_router.patch("/user/edit/{id}", response_model=UserSchemas.UserOut)
async def update_user(id: int, user: UserSchemas.UserComplete, db: Session = Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    return await UserController.update_user(id, db, token, user)

# Agregar un usuario (solo administrador)
@user_router.post("/user/add")
async def add_user(user: UserSchemas.UserComplete, db: Session=Depends(database.get_db), token:str=Depends(OA(tokenUrl="login"))):
    return await UserController.add_user(db, user, token)

@user_router.get("/user/auth", response_model=UserSchemas.UserOut)
async def get_authtenticated_user(db:Session=Depends(database.get_db), token:str=Depends(OA(tokenUrl="/login"))):
    return await auth.get_authenticated_user(db,token)
    
