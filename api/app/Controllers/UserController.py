# Módulo CRUD para operaciones de usuarios
from app.auth import auth
from app.models import UserModel
from app.schemas import UserSchemas
from app import models

# Librerias para manejo de errores y excepciones
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

# Crear un nuevo usuario con contraseña hasheada
async def create_user(db, usuario):

    # Verificar si el email ya está registrado
    UserExist = db.query(UserModel.usermodel).filter_by(email=usuario.email).first()
    if UserExist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo ya está registrado."
        )

    try:
        # Validar criterios mínimos para el registro
        if not usuario.nombre or not usuario.apellido or not usuario.email or not usuario.password:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todos los campos obligatorios deben estar completos."
            )
        if len(usuario.password) < 8:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe tener al menos 8 caracteres."
            )
        if "@" not in usuario.email or "." not in usuario.email:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo electrónico no es válido."
            )
        if not usuario.telefono or len(usuario.telefono) < 8 or not usuario.telefono.isdigit():
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El teléfono debe ser numérico y tener al menos 8 dígitos."
            )
        if not usuario.nombre.isalpha() or not usuario.apellido.isalpha():
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre y apellido solo deben contener letras."
            )
        # Validaciones adicionales para la contraseña
        password = usuario.password
        if not any(c.isupper() for c in password):
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe contener al menos una letra mayúscula."
            )
        if not any(c.islower() for c in password):
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe contener al menos una letra minúscula."
            )
        if not any(c.isdigit() for c in password):
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe contener al menos un número."
            )
        if not any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~" for c in password):
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="La contraseña debe contener al menos un carácter especial."
            )

        hashed_pw = await auth.hash_password(usuario.password)
        if type(usuario)==UserSchemas.UserComplete:
            UserNew = UserModel.usermodel(
                nombre=usuario.nombre,
                apellido=usuario.apellido,
                email=usuario.email,
                telefono=usuario.telefono,
                password_hash=hashed_pw,
                rol_id=usuario.rol_id
            )
        else:
            UserNew = UserModel.usermodel(
                nombre=usuario.nombre,
                apellido=usuario.apellido,
                email=usuario.email,
                telefono=usuario.telefono,
                password_hash=hashed_pw,
            )
        db.add(UserNew)
        db.commit()
        db.refresh(UserNew)
        return HTTPException(status_code=status.HTTP_200_OK, detail="Se agrego un nuevo usuario")

    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error de integridad al crear el usuario."
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado: {str(e)}"
        )


# Autenticar usuario verificando email y contraseña
async def auth_user(db, email, password):
    user = db.query(UserModel.usermodel).filter(UserModel.usermodel.email == email).first()
    if user and await auth.verify_password(password, user.password_hash):
        return user
    return None

# Obtener todos los usuarios
async def get_all_users(db, token):
    user= await auth.get_authenticated_user(db, token)
    if not user:
        return
    if not user.rol.rol == "admin":
        raise HTTPException(status_code=403, detail="Acceso denegado: el usuario no es administrador")
    r=db.query(UserModel.usermodel).all()
    if not r:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")
    return r

# Obtener usuario por email
async def get_user_by_email(db, email):
    return db.query(UserModel.usermodel).filter(UserModel.usermodel.email == email).first()

async def add_user(db, user, token : str):
    auth_user= await auth.get_authenticated_user(db, token)
    if auth_user.rol.rol != "admin":
        raise HTTPException(status_code=401, detail="No eres administrador")
    return await create_user(db, user)

async def update_user(id: int,db, token: str, user):
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