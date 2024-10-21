import { useEffect, useState } from "react";
import "./InstructionsList.css"
import { useParams } from "react-router-dom";
import { supabaseClient } from "../../lib/supabaseClient";
import { Instructions } from "../../Types/supabase-own-types";


const InstructionsList = () => {

    const {id} = useParams<{id:string}>();
    const [singleInstructions, setSingleInstructions] = useState<Instructions[]>();

    useEffect(() => {
        const fetchSingleInstructions = async () => {
            if (!id){
                console.error("No Recipe ID given");
                return;
            }

            const supabaseResponse = await supabaseClient
            .from("Instructions")
            .select("*")
            .eq("recipe_id", id);

            if (supabaseResponse.error){
                console.error("Instructions not found in Database", supabaseResponse.error);
                return;
            }

            if (supabaseResponse.data) {
                setSingleInstructions(supabaseResponse.data);
                console.log(supabaseResponse.data)
            }
        };
        fetchSingleInstructions();
    }, [])


    return ( 
        <div className="instructions-container">
            <h3>...und so gehts:</h3>
            {singleInstructions?.map((instruction) =>(
                <div className="instructions-list-container" key={instruction.id}>
                    <p>{instruction.step_one}</p>
                    <p>{instruction.step_two}</p>
                    <p>{instruction.step_three}</p>
                    <p>{instruction.step_four}</p>
                    <p>{instruction.step_five}</p>
                </div>
            ))}
        </div>
    );
}

export default InstructionsList;