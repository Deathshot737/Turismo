# Módulo CRUD para operaciones de usuarios
from app.auth import auth
from app.models import UserModel

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
        UserNew = UserModel.usermodel(
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            telefono=usuario.telefono,
            password_hash=hashed_pw
        )
        db.add(UserNew)
        db.commit()
        db.refresh(UserNew)
        return UserNew

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
async def get_all_users(db):
    r=db.query(UserModel.usermodel).all()
    if not r:
        raise HTTPException(status_code=404, detail="No se encontraron usuarios")
    return r

# Obtener usuario por email
async def get_user_by_email(db, email):
    return db.query(UserModel.usermodel).filter(UserModel.usermodel.email == email).first()
