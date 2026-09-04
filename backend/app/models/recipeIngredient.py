from sqlalchemy import Column, Integer, String,ForeignKey
from app.config.database import Base

class RecipeIngredient(Base) :
    __tablename__ = "recipeIngredient"

    recipeId = Column(Integer,ForeignKey("recipe.recipeId"), primary_key=True)
    ingredientId = Column(Integer,ForeignKey("ingredient.ingredientId"), primary_key = True)
    grams = Column(Integer, nullable=False)