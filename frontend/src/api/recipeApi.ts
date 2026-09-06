import axiosInstance from "./axiosInstance";
import type { RecipeCreate, RecipeDto , GenerateRecipeRequest,GeneratedRecipeDto} from "../models/recipe";

export const createRecipe = async (
    recipe: RecipeCreate
): Promise<RecipeDto> => {
    const response = await axiosInstance.post<RecipeDto>(
        "/recipe",
        recipe
    );
    return response.data;
};

export const generateRecipe = async (data: GenerateRecipeRequest): Promise<GeneratedRecipeDto> => {
    const response = await axiosInstance.post<GeneratedRecipeDto>(
        "/recipe/generate",
        data
    );

    return response.data;
};