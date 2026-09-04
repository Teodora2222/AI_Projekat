from sqlalchemy import Column, Integer, String
from app.config.database import Base

class Recipe(Base) :
    __tablename__ = "recipe"

    recipeId = Column(Integer, primary_key=True, autoincrement=True)
    recipeName = Column(String(256), nullable=False)
    description = Column(String(256))