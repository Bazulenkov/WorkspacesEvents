from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.routers import main_router
from app.internal.admin import admin
from app.core.config import settings
from app.core.init_db import create_user


@asynccontextmanager
async def create_first_superuser(_app: FastAPI):
    if (
        settings.first_superuser_email is not None
        and settings.first_superuser_password is not None
    ):
        await create_user(
            email=settings.first_superuser_email,
            password=settings.first_superuser_password,
            is_superuser=True,
        )
    yield


app = FastAPI(title=settings.app_title, lifespan=create_first_superuser)

app.include_router(main_router)