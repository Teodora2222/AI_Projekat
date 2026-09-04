from dotenv import load_dotenv

load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import Base, engine
from app.models.ingredient import Ingredient
from app.models.recipe import Recipe
from app.models.recipeIngredient import RecipeIngredient
from app.controllers.recipe_controller import router as recipe_router
from app.controllers.ai_controller import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Projekat Backend")
app.include_router(recipe_router)
app.include_router(ai_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Backend radi!"}