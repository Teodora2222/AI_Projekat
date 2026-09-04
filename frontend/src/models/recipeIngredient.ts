export interface RecipeIngredientDto {
    recipeId: number;
    ingredientId: number;
    grams: number;
}

export interface RecipeIngredientCreate {
    ingredientId: number;
    grams: number;
}