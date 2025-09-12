from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session

# Importaciones locales
from app.Controllers import UserController
from app.schemas import UserSchemas
from app.auth import auth
from app.models import UserModel as models
from .. import database

# Inicializacion de router de usuario
user_router = APIRouter()

# Rutas de la API para usuario


# Registro de usuario
@user_router.post("/user/singin", response_model=UserSchemas.UserOut)
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
    token = await auth.create_token({"sub": user.email, "id": user.id}) 
    return {"access_token": token, "token_type": "bearer"}

# Obtener todos los usuarios (solo para administradores)
@user_router.get("/users", response_model=list[UserSchemas.UserOut])
async def get_users(
    db: Session = Depends(database.get_db),
    token: str = Depends(OA(tokenUrl="login"))
):
    
    user= await auth.get_authenticated_user(db, token)
    if not user:
        return
    if not getattr(user, "es_admin", False):
        raise HTTPException(status_code=403, detail="Acceso denegado: el usuario no es administrador")
    return await UserController.get_all_users(db)

# Editar usuario (solo para usuarios autenticados)
@user_router.put("/user/edit/{id}", response_model=UserSchemas.UserOut)
async def update_user(id: int, user: UserSchemas.UserUpdate, db: Session = Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    auth_user = await auth.get_authenticated_user(db, token)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Usuario no autenticado")
    db_user = db.query(models.usermodel).filter(models.usermodel.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    for var, value in vars(user).items():
        if value is not None:
            setattr(db_user, var, value)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

    
