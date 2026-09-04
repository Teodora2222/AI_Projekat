import axiosInstance from "./axiosInstance";
import  type {RecipeIngredientCreate, RecipeIngredientDto} from "../models/recipeIngredient";

export const createRecipeIngredient = async (
    recipeId: number,
    data: RecipeIngredientCreate
): Promise<RecipeIngredientDto> => {
    const response = await axiosInstance.post<RecipeIngredientDto>(
        `/recipe/${recipeId}/ingredients`,
        data
    );

    return response.data;
};