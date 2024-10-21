import { Tables } from "./supabase";

export type Categories = Tables<"Categories">;
export type Recipes = Tables<"Recipes">;
export type Ingredients = Tables<"Ingredients">;
export type Instructions = Tables<"Instructions">;
export type RecipesWithFavorites = Recipes & {
    Favorites: {recipe_id: string}[];
}
export type Profiles = Tables<"profiles">;
export type Favorites = Tables<"Favorites">;