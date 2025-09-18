from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer as OA
from sqlalchemy.orm import Session

from app.schemas import SiteSchemas
from app.Controllers import SiteController
from app import database

site_route=APIRouter()

@site_route.get("/sites", response_model=list[SiteSchemas.SiteRead])
async def get_all_sites(db:Session=Depends(database.get_db), token:str=Depends(OA(tokenUrl="/login"))):
    return await SiteController.get_all_sites(db, token)

@site_route.get("/site/types", response_model=list[SiteSchemas.TypeSiteRead])
async def get_all_types_site(db:Session=Depends(database.get_db), token:str=Depends(OA(tokenUrl="/login"))):
    return await SiteController.get_typesite(db, token)

@site_route.post("/site/add")
async def add_site(site:SiteSchemas.SiteCreate,db:Session=Depends(database.get_db), token:str=Depends(OA(tokenUrl="/login"))):
    return await SiteController.create_site(db,site,token)