export interface RecipeDto {
    recipeId: number;
    recipeName: string;
    description: string | null;
}

export interface RecipeCreate {
    recipeName: string;
    description?: string;
}