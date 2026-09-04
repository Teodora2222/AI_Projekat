from pydantic import BaseModel

class RecipeCreate(BaseModel) :
    recipeName : str
    description: str | None = None

class RecipeResponse(BaseModel) :
    recipeId : int
    recipeName : str 
    description: str | None = None

    class Config:
        from_attributes = True