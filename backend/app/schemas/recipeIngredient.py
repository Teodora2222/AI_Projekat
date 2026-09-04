from pydantic import BaseModel

class RecipeIngredientCreate(BaseModel) :
    ingredientId: int
    grams: int  
