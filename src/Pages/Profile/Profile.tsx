import { Profiles, FavoritesWithRecipes } from "../../Types/supabase-own-types";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import { useUserContext } from "../../Context/UserContext";
import "./Profile.css"
import { Link } from "react-router-dom";

const Profile = () => {

    const [profiles, setProfiles] = useState<Profiles[]>();
    const [userFavorites, setUserFavorites] = useState<FavoritesWithRecipes[]>();
    const userContext = useUserContext();
    const user = userContext?.user;

    useEffect(() => {
        const fetchProfiles = async () => {
            const profilesQuery = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user!.id);

            if (profilesQuery.error) {
                console.error(profilesQuery.error.message);
            } else {
                setProfiles(profilesQuery.data);
            }
        };
        fetchProfiles();
    }, [])

    useEffect(() => {
        const fetchUserFavorites = async () => {
            const userFavoritesQuery = await supabaseClient
            .from("Favorites")
            .select(`
                *,
                Recipes (
                *
                )
            `)
            .eq("user_id", user!.id);

            if (userFavoritesQuery.error){
                console.error(userFavoritesQuery.error.message)
            } else {
                setUserFavorites(userFavoritesQuery.data);
            }
        }
        fetchUserFavorites();
    }, [])

    return (
        <div className="content-wrapper">
            <div className="profile-container">
            <h2>Dein Profil</h2>
            <p>E-Mail-Adresse: {user?.email}</p>
            {profiles?.map((profile)=>(
            <div className="profile-infos" key={profile.id}>
            <p>Vorname: {profile.first_name}</p>
            <p>Nachname: {profile.last_name}</p>
            <p>Lieblingsessen: {profile.favorite_food}</p>
            </div>
            ))}
            </div>
            <div className="user-favorites-wrapper">
                <h2>Deine Favoriten</h2>
                <div className="user-favorites-container">
                    {userFavorites?.map((favs) =>(
                        <div key={favs.id} className="user-favs-card">
                        <Link to={`/recipe/${favs.Recipes?.id}`}>
                        <img src={`${favs.Recipes?.img_url}`} />
                        <p>{favs.Recipes?.name}</p>
                        </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default Profile;