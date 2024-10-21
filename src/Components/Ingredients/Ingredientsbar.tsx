import "./Ingredientsbar.css"
import { Ingredients } from "../../Types/supabase-own-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabaseClient } from "../../lib/supabaseClient";


const Ingredientsbar = () => {

    const {id} = useParams<{id:string}>();
    const [singleIngredients, setSingleIngredients] = useState<Ingredients[]>();

    useEffect(() => {
        const fetchSingleIngredients = async () => {
            if (!id){
                console.error("No Recipe ID given");
                return;
            }

            const supabaseResponse = await supabaseClient
            .from("Ingredients")
            .select("*")
            .eq("recipe_id", id);

            if (supabaseResponse.error){
                console.error("Ingredients not found in Database", supabaseResponse.error);
                return;
            }

            if (supabaseResponse.data) {
                setSingleIngredients(supabaseResponse.data);
                console.log(supabaseResponse.data)
            }
        };
        fetchSingleIngredients();
    }, [])


    return (  
        <div className="ingredients-sidebar">
            <h3>Zutatenliste</h3>
            {singleIngredients?.map((ingredient) =>(
                <p key={ingredient.id}><span className="ingredient-name">{ingredient.name}</span><span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span></p>
            ))}
            
        </div>
    );
}

export default Ingredientsbar;