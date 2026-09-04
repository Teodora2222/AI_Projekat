from pydantic import BaseModel

class IngredientCreate(BaseModel):
    ingredientName: str

class IngredientResponse(BaseModel) :
    ingredientId : int
    ingredientName : str 

    class Config:
        from_attributes = True