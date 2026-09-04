from sqlalchemy import Column, Integer, String
from app.config.database import Base

class Ingredient(Base):
    __tablename__ = "ingredient"

    ingredientId = Column(Integer, primary_key=True, autoincrement=True)
    ingredientName = Column(String(256), nullable=False)