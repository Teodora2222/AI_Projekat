from app.schemas.ai import GenerateRecipeRequest
from fastapi import APIRouter
from app.services.ai_service import generate_recipe

router = APIRouter()

@router.post("/recipe/generate")
def generateAiRecipe(aiData : GenerateRecipeRequest) :
    result = generate_recipe(aiData.ingredients)
    return result