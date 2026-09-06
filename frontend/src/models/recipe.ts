export interface RecipeDto {
    recipeId: number;
    recipeName: string;
    description: string | null;
}

export interface RecipeCreate {
    recipeName: string;
    description?: string;
}

export interface RecipeIngredientAI {
    name: string;
    quantity: string;
}

export interface GeneratedRecipeDto {
    name: string;
    description: string;
    ingredients: RecipeIngredientAI[];
    instructions: string[];
    prepTime: number;
    difficulty: string;
}

export interface GenerateRecipeRequest {
    ingredients: string[];
}