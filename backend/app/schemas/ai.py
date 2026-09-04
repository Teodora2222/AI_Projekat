from pydantic import BaseModel

class GenerateRecipeRequest(BaseModel):
    ingredients: list[str]