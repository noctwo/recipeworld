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
    id: string;
    recipe_id: string;
    user_id: string;
    created_at: string;
    Recipes: {
        id: string;
        name: string;
        description: string;
        servings: number | null;
        instructions: string;
        created_at: string;
        category_id: string;
        img_url: string | null;
        rating: number | null;
    } | null;
}