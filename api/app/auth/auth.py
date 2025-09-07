# Módulo de autenticación: manejo de contraseñas y tokens JWT
from jose import jwt
from passlib.hash import bcrypt
from datetime import datetime, timedelta

# Importar configuración
from config import settings

# Inicializar constantes desde configuración
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM

# Funciones de utilidad para manejo de contraseñas y tokens

# Hashing y verificación de contraseñas
def hash_password(password: str):
    return bcrypt.hash(password)

# Verificar si la contraseña coincide con el hash almacenado
def verify_password(password: str, hashed: str):
    return bcrypt.verify(password, hashed)

# Creación y decodificación de tokens JWT
def create_token(data: dict):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(hours=1)
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Decodificar el token y verificar su validez
def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])