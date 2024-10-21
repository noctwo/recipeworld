import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import "./Home.css"
import { Categories, RecipesWithFavorites } from "../../Types/supabase-own-types";
import Popular from "../../Components/Popular/Popular";
import { Link } from "react-router-dom";
import Hero from "../../Components/Hero/Hero";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useUserContext } from "../../Context/UserContext";

const Home = () => {

    const [recipes, setRecipes] = useState<RecipesWithFavorites[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [noSearchResultText, setNoSearchResultText] = useState<string>("");
    const [categories, setCategories] = useState<Categories[]>();

    const userContext = useUserContext();
    const user = userContext?.user;

    useEffect(() => {
        const fetchRecipes = async () => {
            let selectQuery = supabaseClient
            .from("Recipes")
            .select(`
                *,
                Favorites (recipe_id, user_id)
            `)
            .order("created_at", {ascending:false});

            if(searchTerm){
                selectQuery = selectQuery.ilike("name", `%${searchTerm}%`)
            }

            const result = await selectQuery;

            if(result.data?.length === 0){
                setNoSearchResultText("Die Suche war erfolglos...")
            } else{
                setNoSearchResultText("");
            }

            if (result.error) {
                console.error(result.error);
            } else {
                setRecipes(result.data);
            }
        };
        fetchRecipes();
        
    }, [searchTerm]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesQuery = await supabaseClient
                .from("Categories")
                .select("*");

            if (categoriesQuery.error) {
                console.error(categoriesQuery.error);
            } else {
                setCategories(categoriesQuery.data);
            }
        };
        fetchCategories();
    }, []);


    const getCategoryName = (categoryId: string | undefined) => {
        const category = categories?.find(cat => cat.id === categoryId);
        return category ? category.name : "Unbekannt";
    };

    const deleteFavorite = async (recipeID:string) => {

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
            console.error("Error deleting Favorite", favoritesDeleteResponse.error.message);
        } else {
            setRecipes(
                recipes?.map((recipe) => {
                    const newFavoritesWithoutRecipe = recipe.Favorites.filter((fav) => fav.recipe_id !== recipeID);
                    return recipe.id === recipeID ? {...recipe, Favorites: newFavoritesWithoutRecipe} : recipe;
                })
            )
        }
    }


    const addFavorite = async (recipeId:string) => {

        if (!user) {
            console.error("User not found. Cannot add favorite.");
            return;
        }

        const favoritesInsertResponse = await supabaseClient
        .from("Favorites")
        .insert({user_id: user?.id, recipe_id:recipeId});

        if(favoritesInsertResponse.error){
            console.error("Error setting Favorites", favoritesInsertResponse.error.message);
            return;
        } else{
            setRecipes(
                recipes?.map((recipe) => {
                    if (recipe.id === recipeId){
                        const updatedFavorites = [...recipe.Favorites, {recipe_id: recipeId}];
                        return {...recipe, Favorites: updatedFavorites}
                    }
                    return recipe;
                })
            )
        }
    }

    
    return ( 
    <main>
        <Hero />
        <div className="content-wrapper">
        <Popular />
        
        {!recipes? <p>Sorry, no recipes found.</p> :
        <div className="show-recipe-container">
            <h2>{!searchTerm? "Neueste Rezepte" : "Deine Suchergebnisse"}</h2>
            <p className="no-search-results-text">{noSearchResultText}</p>
            <div className="searchbar-container">
            <input type="text" id="recipe-search-input" placeholder="Nach Rezepten suchen..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
    {recipes?.map((recipe) => (
        <div className="recipe-card-horizontal" key={recipe.id}>
        <div className="recipe-card-horizontal-img-container">
        <Link to={`/recipe/${recipe.id}`}>
        <img src={`${recipe.img_url}`} />
        </Link>
        </div>
        <div className="recipe-card-horizontal-text-container">
        <div className="recipe-card-horizontal-header">
        <h3>{recipe.name}</h3>
        {user? <div className="favorite-icon-container">
            {recipe.Favorites.find((favorite) => favorite.recipe_id === recipe.id) ? (<IoBookmark onClick={() => deleteFavorite(recipe.id)} /> ): (<IoBookmarkOutline onClick={() => addFavorite(recipe.id)} />)}
        </div> : <></>}
        </div>
        <p>Rating: {recipe.rating}</p>
        <p>Kategorie: {getCategoryName(recipe.category_id)}</p>
        <p>{recipe.description.split(" ").slice(0,30).join(" ")} ...</p>
        <button className="btn see-more-btn">zum Rezept</button>
        </div>
        </div>
    ))}
    </div>
    }</div>
    </main> 
    );
}

export default Home;
