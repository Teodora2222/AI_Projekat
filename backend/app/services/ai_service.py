import os
from openai import OpenAI

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def generate_recipe(ingredients: list[str]):
    prompt = f"""
    Create a recipe using these ingredients:
    {", ".join(ingredients)}

    Include:
    - recipe name
    - description
    - ingredients and quantities
    - cooking instructions
    - preparation time
    - difficulty
    """

    response = client.responses.create(
        model="gpt-5.6-luna",
        input=prompt
    )

    return response.output_text