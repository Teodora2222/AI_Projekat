import axiosInstance from "./axiosInstance";
import type { RecipeCreate, RecipeDto } from "../models/recipe";

export const createRecipe = async (
    recipe: RecipeCreate
): Promise<RecipeDto> => {
    const response = await axiosInstance.post<RecipeDto>(
        "/recipe",
        recipe
    );
    return response.data;
};