import axiosInstance from "./axiosInstance";
import type { IngredientCreate, IngredientDto } from "../models/ingredient";

export const getIngredients = async (): Promise<IngredientDto[]> => {
    const response = await axiosInstance.get<IngredientDto[]>("/ingredient");
    return response.data;
};

export const getIngredient = async (
    ingredientId: number
): Promise<IngredientDto> => {
    const response = await axiosInstance.get<IngredientDto>(
        `/ingredient/${ingredientId}`
    );
    return response.data;
};

export const createIngredient = async (
    ingredient: IngredientCreate
): Promise<IngredientDto> => {
    const response = await axiosInstance.post<IngredientDto>(
        "/ingredient",
        ingredient
    );
    return response.data;
};

export const deleteIngredient = async (
    ingredientId: number
) => {
    const response = await axiosInstance.delete(
        `/ingredient/${ingredientId}`
    );
    return response.data;
};