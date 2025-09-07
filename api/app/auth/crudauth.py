# Módulo CRUD para operaciones de usuarios
import app.auth.auth as auth
import app.models.usuarios as models

# Librerias para manejo de errores y excepciones
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status

# Crear un nuevo usuario con contraseña hasheada
def crear_usuario(db, usuario):

    # Verificar si el email ya está registrado
    existente = db.query(models.Usuario).filter_by(email=usuario.email).first()
    if existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El correo ya está registrado."
        )

    try:
        hashed_pw = auth.hash_password(usuario.password)
        nuevo = models.Usuario(
            nombre=usuario.nombre,
            apellido=usuario.apellido,
            email=usuario.email,
            telefono=usuario.telefono,
            password_hash=hashed_pw
        )
        db.add(nuevo)
        db.commit()
        db.refresh(nuevo)
        return nuevo

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
def autenticar_usuario(db, email, password):
    usuario = db.query(models.Usuario).filter(models.Usuario.email == email).first()
    if usuario and auth.verify_password(password, usuario.password_hash):
        return usuario
    return None