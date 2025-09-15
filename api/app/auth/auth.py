# Módulo de autenticación: manejo de contraseñas y tokens JWT
from fastapi import HTTPException
from jose import jwt
from passlib.hash import bcrypt
from datetime import datetime, timedelta
from jose.exceptions import ExpiredSignatureError, JWTError

# Importar modelo de usuario para consultas
from app.models import UserModel
from app.Controllers import UserController

# Importar configuración
from config import settings

# Inicializar constantes desde configuración
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

# Funciones de utilidad para manejo de contraseñas y tokens

# Hashing y verificación de contraseñas
async def hash_password(password: str):
    return bcrypt.hash(password)

# Verificar si la contraseña coincide con el hash almacenado
async def verify_password(password: str, hashed: str):
    return bcrypt.verify(password, hashed)

# Creación y decodificación de tokens JWT
async def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now() + timedelta(hours=1)
    to_encode["exp"] = int(expire.timestamp())
    print(to_encode["exp"])
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Decodificar el token y verificar su validez
async def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except ExpiredSignatureError:
        return None  # El token ha expirado
    except JWTError:
        return None  # Token inválido
    
# Obtener usuario autenticado a partir del token
async def get_authenticated_user(db, token: str):
    payload = await decode_token(token)
    print(payload)
    if not payload:
        raise HTTPException(status_code=401, detail="El token ha expirado o es inválido")
    if not payload:
        raise HTTPException(status_code=401, detail="Usuario no autenticado")
    return await UserController.get_user_by_email(db, payload.get("sub"))