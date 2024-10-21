import { useState } from "react";
import "./Signup.css"
import { supabaseClient } from "../../lib/supabaseClient";


const Signup = () => {

    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [favoriteFood, setFavoriteFood] = useState<string | null >("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [successMessage, setSuccessMessage] = useState<string | null>("");

    const handleSignup = async (e:React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
    

        const signupResponse = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    favorite_food: favoriteFood
                }
            }
        });

    if (signupResponse.error){
        setErrorMessage(signupResponse.error.message);
        return
    }
    if (signupResponse.data.user){
        setSuccessMessage("Registrierung erfolgreich. Bitte check deine E-Mails.")
    }

    };

    return ( 
        
    <div className="content-wrapper">
    <div className="signup-container">
    <form className="signup-form" onSubmit={handleSignup}>
        <h2>Deinen Account anlegen</h2>
        <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Vorname"
        required
        />
        <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Nachname"
        required
        />
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-Mail Adresse"
        required
        />
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passwort"
        required
        />
        <input
        type="text"
        value={favoriteFood!}
        onChange={(e) => setFavoriteFood(e.target.value)}
        placeholder="Lieblingsessen"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Registrieren</button>
    </form>
    </div>
    </div>
    );
}

export default Signup;