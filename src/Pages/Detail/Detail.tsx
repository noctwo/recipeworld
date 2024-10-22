import { useParams } from "react-router-dom";
import "./Detail.css";
import { supabaseClient } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { RecipesWithFavorites } from "../../Types/supabase-own-types";
import Hero from "../../Components/Hero/Hero";
import Ingredientsbar from "../../Components/Ingredients/Ingredientsbar";
import InstructionsList from "../../Components/Instructions/InstructionsList";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useUserContext } from "../../Context/UserContext";

const Detail = () => {
  const userContext = useUserContext();
  const user = userContext?.user;

  const { id } = useParams<{ id: string }>();
  const [singleRecipe, setSingleRecipe] = useState<RecipesWithFavorites>();

  useEffect(() => {
    const fetchSingleRecipe = async () => {
      if (!id) {
        console.error("No Recipe ID given");
        return;
      }

      const supabaseResponse = await supabaseClient
        .from("Recipes")
        .select(
          `
                *,
                Favorites (recipe_id, user_id)
            `
        )
        .eq("id", id)
        .single();

      if (supabaseResponse.error) {
        console.error("Recipe not found in Database", supabaseResponse.error);
        return;
      }

      if (supabaseResponse.data) {
        setSingleRecipe(supabaseResponse.data);
        console.log(supabaseResponse.data);
      }
    };
    fetchSingleRecipe();
  }, []);

  const deleteFavorite = async (recipeID: string) => {
    if (!user) {
      console.error("User not found. Cannot delete favorite.");
      return;
    }

    const favoritesDeleteResponse = await supabaseClient
      .from("Favorites")
      .delete()
      .eq("recipe_id", recipeID)
      .eq("user_id", user.id);

    if (favoritesDeleteResponse.error) {
      console.error(
        "Error deleting Favorite",
        favoritesDeleteResponse.error.message
      );
    } else {
      setSingleRecipe((prev: any) =>
        prev
          ? {
              ...prev,
              Favorites: prev.Favorites.filter(
                (fav: any) => fav.user_id !== user.id
              ),
            }
          : prev
      );
    }
  };

  const addFavorite = async (recipeId: string) => {
    if (!user) {
      console.error("User not found. Cannot add favorite.");
      return;
    }

    const favoritesInsertResponse = await supabaseClient
      .from("Favorites")
      .insert({ user_id: user?.id, recipe_id: recipeId });

    if (favoritesInsertResponse.error) {
      console.error(
        "Error setting Favorites",
        favoritesInsertResponse.error.message
      );
      return;
    } else {
      setSingleRecipe((prev) =>
        prev
          ? {
              ...prev,
              Favorites: [
                ...prev.Favorites,
                { recipe_id: recipeId, user_id: user.id },
              ],
            }
          : prev
      );
    }
  };

  return (
    <div className="detail-page-wrapper">
      <Hero imageUrl={singleRecipe?.img_url} />
      <div className="content-wrapper">
        <div className="detail-container">
          <div className="detail-text-container">
            <div className="detail-text-header">
              <h2>{singleRecipe?.name}</h2>
              {user && singleRecipe && (
                <div className="detail-fav-container">
                  {singleRecipe.Favorites.some(
                    (favorite: any) => favorite.user_id === user.id
                  ) ? (
                    <IoBookmark
                      onClick={() => deleteFavorite(singleRecipe.id)}
                    />
                  ) : (
                    <IoBookmarkOutline
                      onClick={() => addFavorite(singleRecipe.id)}
                    />
                  )}
                </div>
              )}
            </div>
            <p>{singleRecipe?.description}</p>
            <p>{singleRecipe?.instructions}</p>
            <InstructionsList />
          </div>
          <Ingredientsbar />
        </div>
      </div>
    </div>
  );
};

export default Detail;
