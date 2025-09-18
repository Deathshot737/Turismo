from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session

from app.schemas import ServiceSchemas
from app.Controllers import SeviceController
from app import database

service_route=APIRouter()

@service_route.get("/service/types", response_model=list[ServiceSchemas.TypeServiceRead])
async def get_all_types_services(db:Session=Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    return await SeviceController.get_typeservice(db, token)

@service_route.get("/services", response_model=list[ServiceSchemas.ServiceRead])
async def get_all_services(db:Session=Depends(database.get_db), token: str = Depends(OA(tokenUrl="login"))):
    return await SeviceController.get_services(db, token)

@service_route.post("/service/add")
async def add_service(service: ServiceSchemas.ServiceCreate, db:Session= Depends(database.get_db), token:str=Depends(OA(tokenUrl="/login"))):
    return await SeviceController.create_service(db,service,token)