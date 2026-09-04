from fastapi import APIRouter, FastAPI,Depends,HTTPException
from app.schemas.ingredient import IngredientCreate,IngredientResponse
from app.config.database import get_db
from app.models.ingredient import Ingredient
from app.models.recipe import Recipe
from app.models.recipeIngredient import RecipeIngredient
from sqlalchemy.orm import Session
from app.schemas.recipeIngredient import RecipeIngredientCreate
from app.schemas.recipe import RecipeCreate,RecipeResponse

app = FastAPI()
router = APIRouter()

@router.get("/recipe")
async def getRecipe() :
    return "AI Recipe Planner API"

@router.post("/ingredient")
def createIngredient(ingredient_data: IngredientCreate, db: Session = Depends(get_db)):
    ingredient = Ingredient(
        ingredientName = ingredient_data.ingredientName,
    )
    db.add(ingredient)
    db.commit()
    db.refresh(ingredient)
    return ingredient

@router.post("/recipe")
def createRecipe(recipe_data : RecipeCreate,db : Session = Depends(get_db)) :
    recipe = Recipe(
        recipeName = recipe_data.recipeName,
        description = recipe_data.description
    )
    db.add(recipe)
    db.commit()
    db.refresh(recipe)
    return recipe

@router.post("/recipe/{recipeId}/ingredients")
def createRecIng(recipeId : int,reciIngdata : RecipeIngredientCreate, db : Session = Depends(get_db)) :
    recipeIngredient = RecipeIngredient(
            ingredientId = reciIngdata.ingredientId,
            grams = reciIngdata.grams,
            recipeId = recipeId
    )
    db.add(recipeIngredient)
    db.commit()
    db.refresh(recipeIngredient)
    return recipeIngredient


@router.get("/ingredient",response_model=list[IngredientResponse])
def getIngredients(db : Session = Depends(get_db)) :
    ingredients = db.query(Ingredient).all()
    return ingredients

@router.get("/ingredient/{ingredientId}")
def getIngredient(ingredientId : int,db: Session = Depends(get_db)) :
    ingredient = db.query(Ingredient).filter(Ingredient.ingredientId == ingredientId).first()
    if ingredient is None :
        raise  HTTPException(status_code = 404,detail="Ingredient not found")
    return ingredient

@router.delete("/ingredient/{ingredientId}")
def deleteIngredient(ingredientId : int,db: Session = Depends(get_db)) :
    ingredient = db.query(Ingredient).filter(
        Ingredient.ingredientId == ingredientId
    ).first()

    if ingredient is None:
        raise HTTPException(
            status_code=404,
            detail="Ingredient not found"
        )

    db.delete(ingredient)
    db.commit()

    return {"message": "Ingredient deleted successfully"}

app.include_router(router)
