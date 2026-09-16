export interface IngredientDto {
    ingredientId: number;
    ingredientName: string;
}

export interface IngredientCreate {
    ingredientName: string;
}

export interface IngredientCreateResponse {
    added: boolean;
    suggestion?: string;
    ingredient?: IngredientDto;
}