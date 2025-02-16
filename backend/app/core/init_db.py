from contextlib import asynccontextmanager

from fastapi_users.exceptions import UserAlreadyExists
from pydantic import EmailStr

from backend.app.core.db import get_async_session
from backend.app.core.user import get_user_db, get_user_manager
from backend.app.schemas.user import UserCreate

get_async_session_context = asynccontextmanager(get_async_session)
get_user_db_context = asynccontextmanager(get_user_db)
get_user_manager_context = asynccontextmanager(get_user_manager)


# Корутина, создающая юзера с переданным email и паролем.
# Возможно создание суперюзера при передаче аргумента is_superuser=True.
async def create_user(email: EmailStr, password: str, is_superuser: bool = False):
    try:
        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    await user_manager.create(
                        UserCreate(
                            email=email, password=password, is_superuser=is_superuser
                        )
                    )
    except UserAlreadyExists:
        pass
