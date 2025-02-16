from pydantic import EmailStr
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_title: str = "Имя приложения"
    app_description: str = "Описание приложения"
    database_uri: str
    secret: str = "SECRET"
    first_superuser_email: EmailStr | None
    first_superuser_password: str | None

    class Config:
        env_file = ".env"


settings = Settings()