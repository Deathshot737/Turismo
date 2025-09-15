from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session

# Importaciones locales
from app.Controllers import UserController
from app.schemas import UserSchemas
from app.auth import auth
from app import models
from .. import database

# Inicializacion de router de usuario
user_router = APIRouter()

# Rutas de la API para usuario


# Registro de usuario
@user_router.post("/user/singin", )
async def sign_in(usuario: UserSchemas.UserCreate, db: Session = Depends(database.get_db)):
    await UserController.create_user(db, usuario)
    return {"message": "Usuario creado exitosamente"}

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
async def get_users(
    db: Session = Depends(database.get_db),
    token: str = Depends(OA(tokenUrl="login"))
):
    
    user= await auth.get_authenticated_user(db, token)
    if not user:
        return
    if not user.rol_id == 1:
        raise HTTPException(status_code=403, detail="Acceso denegado: el usuario no es administrador")
    return await UserController.get_all_users(db)

# Editar usuario (solo para usuarios autenticados)
@user_router.put("/user/edit/{id}", response_model=UserSchemas.UserOut)
async def update_user(id: int, user: UserSchemas.UserUpdate, db: Session = Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    auth_user = await auth.get_authenticated_user(db, token)
    db_user = db.query(models.usermodel).filter(models.usermodel.id == id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if auth_user.rol_id != 1:
        raise HTTPException(status_code=403, detail="No tienes permiso para editar este usuario")

    # 2. Iterar sobre los campos del modelo de entrada
    cambios = {}

    for campo, nuevo_valor in vars(user).items():
        if nuevo_valor in ("", None):
            continue  # Ignorar campos vacíos

        if campo == "rol":
            # Validar que el rol exista
            rol_existente = db.query(models.rolemodel).filter(models.rolemodel.id == nuevo_valor).first()
            if not rol_existente:
                raise HTTPException(status_code=400, detail=f"El rol con ID {nuevo_valor} no existe")

            # Asignar el nuevo rol
            if db_user.rol_id != nuevo_valor:
                cambios["rol_id"] = {"antes": db_user.rol_id, "después": nuevo_valor}
                db_user.rol_id = nuevo_valor
            continue  # Ya procesamos este campo

        valor_actual = getattr(db_user, campo, None)
        if valor_actual != nuevo_valor:
            setattr(db_user, campo, nuevo_valor)
            cambios[campo] = {"antes": valor_actual, "después": nuevo_valor}

    # Validar si hubo cambios
    if not cambios:
        raise HTTPException(status_code=400, detail="No se detectaron cambios en los datos")
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

    
