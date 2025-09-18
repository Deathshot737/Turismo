from app import models
from fastapi import HTTPException, status
from app.auth import auth
from sqlalchemy.exc import IntegrityError
from app.schemas import SiteSchemas
from sqlalchemy.orm import Session
from decimal import Decimal

async def get_typesite(db: Session, token: str):
    auth_user=await auth.get_authenticated_user(db, token)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado")
    return db.query(models.typesitemodel).all()

async def get_all_sites(db:Session, token:str):
    auth_user=await auth.get_authenticated_user(db, token)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No autenticado")
    return db.query(models.sitemodel).all()

async def create_site(db:Session, site: SiteSchemas.SiteCreate, token:str):
    proveedor= await auth.get_authenticated_user(db, token)
    if proveedor.rol.rol!="proveedor":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No eres un usuario Proveedor")
    siteExist=db.query(models.sitemodel).filter_by(nombre=site.nombre).first()
    if siteExist:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El sitio ya existe")
    try:
        if not site.nombre or not site.departamento_id or not site.capacidad or not site.tipo_id or not site.precio or not site.latitud or not site.longitud or not site.imagen:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Rellene los campos obligatorios")
        if len(site.nombre)>100:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El nombre es damasiado grando para guardarlo en la base de datos")
        tipo=db.query(models.typesitemodel).filter_by(id=site.tipo_id).first()
        if not tipo:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El tipo de sitio no existe")
        if site.precio < 0:#or isinstance(site.precio, (int, float, Decimal)):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al ingresar el precio")
        if site.capacidad is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al ingresar la capacidad")
        if site.imagen is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Imagen Vacia")
        if site.longitud is None or site.latitud is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No ingreso bien la latitud y longitud")
        sitenew=models.sitemodel(
            nombre=site.nombre,
            descripcion=site.descripcion,
            capacidad=site.capacidad,
            tipo_id=site.tipo_id,
            departamento_id=site.departamento_id,
            precio=site.precio,
            latitud=site.latitud,
            longitud=site.longitud,
            imagen=site.imagen
        )
        db.add(sitenew)
        db.commit()
        db.refresh(sitenew)
        raise HTTPException(status_code=status.HTTP_200_OK, detail="Se agrego un nuevo sitio")
    except IntegrityError as i:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error de integridad del sitio")
        