# Controller para Servivios
from app import models
from fastapi import HTTPException, status
from app.auth import auth
from sqlalchemy.exc import IntegrityError
from app.schemas import ServiceSchemas
from sqlalchemy.orm import Session
from decimal import Decimal


async def get_typeservice(db :Session, token: str):
    proveedor= await auth.get_authenticated_user(db, token)
    if not proveedor:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No se ha Autenticado")
    if not proveedor.rol.rol=="proveedor":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No eres un proveedor")
    r=db.query(models.typeservicemodel).all()
    if not r:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron tipos de servicios")
    return r

async def get_services(db:Session, token: str):
    auth_user=await auth.get_authenticated_user(db, token)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No se ha authenticado")
    r=db.query(models.servicemodel).all()
    if not r:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No se encontraron servicios")
    return r


async def create_service(db:Session, service: ServiceSchemas.ServiceCreate, token:str):
    proveedor= await auth.get_authenticated_user(db, token)
    if proveedor.rol.rol!="proveedor":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No eres un usuario Proveedor")
    ServiceExist=db.query(models.servicemodel).filter_by(nombre=service.nombre).first()
    if ServiceExist:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El servicio ya existe")
    try:
        if not service.nombre or not service.ubicacion or not service.capacidad or not service.tipo_id or not service.precio or not service.latitud or not service.longitud or not service.imagen:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Rellene los campos obligatorios")
        if len(service.nombre)>100:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El nombre es damasiado grando para guardarlo en la base de datos")
        tipo=db.query(models.typeservicemodel).filter_by(id=service.tipo_id).first()
        if not tipo:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El tipo de servicio no existe")
        if service.precio < 0:#or isinstance(service.precio, (int, float, Decimal)):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al ingresar el precio")
        if service.capacidad is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al ingresar la capacidad")
        if service.imagen is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Imagen Vacia")
        if service.longitud is None or service.latitud is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No ingreso bien la latitud y longitud")
        servicenew=models.servicemodel(
            nombre=service.nombre,
            descripcion=service.descripcion,
            capacidad=service.capacidad,
            proveedor_id=proveedor.id,
            tipo_id=service.tipo_id,
            ubicacion=service.ubicacion,
            precio=service.precio,
            latitud=service.latitud,
            longitud=service.longitud,
            imagen=service.imagen
        )
        db.add(servicenew)
        db.commit()
        db.refresh(servicenew)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="Se agrego un nuevo servicio")
    except IntegrityError as i:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error de integridad del servicio")
        