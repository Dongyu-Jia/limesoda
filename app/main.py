from fastapi import FastAPI

from app.webhooks.router import router as webhooks_router

app = FastAPI()
app.include_router(webhooks_router)
