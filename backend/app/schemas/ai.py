from pydantic import BaseModel

class GenerateRecipeRequest(BaseModel):
    ingredients: list[str]

class RecipeIngredientAI(BaseModel):
    name: str
    quantity: str


class GeneratedRecipe(BaseModel):
    name: str
    description: str
    ingredients: list[RecipeIngredientAI]
    instructions: list[str]
    prepTime: int
    difficulty: str