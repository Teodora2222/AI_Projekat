import os
from openai import OpenAI
from app.schemas.ai import GeneratedRecipe

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def generate_recipe(ingredients: list[str]):

    prompt = f"""
    Create a recipe using these ingredients:
    {", ".join(ingredients)}

    Create a practical recipe that uses as many of the provided
    ingredients as possible.

    Include realistic quantities, clear cooking instructions,
    preparation time and difficulty.
    """

    response = client.responses.parse(
        model="gpt-5.6-luna",
        input=prompt,
        text_format=GeneratedRecipe
    )

    return response.output_parsed