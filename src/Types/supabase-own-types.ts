import { Tables } from "./supabase";

export type Categories = Tables<"Categories">;
export type Recipes = Tables<"Recipes">;
export type Ingredients = Tables<"Ingredients">;
export type Instructions = Tables<"Instructions">;
export type Profiles = Tables<"profiles">;
export type Favorites = Tables<"Favorites">;
export type RecipesWithFavorites = Recipes & {
    Favorites: {
        recipe_id: string
    }[];
}
export type FavoritesWithRecipes = Favorites & {
    Recipes: {
        id: string,
        name: string, 
        description: string, 
        servings: number, 
        instructions: string,
        created_at: Date,
        category_id: string,
        img_url: string
        rating: number
    }[];
}