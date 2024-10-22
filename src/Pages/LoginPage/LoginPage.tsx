import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../lib/supabaseClient";
import { useUserContext } from "../../Context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string | null>("");

  const navigate = useNavigate();
  const userContext = useUserContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const authResponse = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authResponse.error) {
      console.error("Login error", authResponse.error.message);
      setErrorMessage(authResponse.error.message);
      return;
    }

    if (authResponse.data?.user) {
      console.log("User erfolgreich angemeldet", authResponse.data.user);
      setSuccessMessage("Login successful.");

      userContext?.setUser(authResponse.data.user);

      setTimeout(() => navigate("/"), 1000);
    }
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const resetResponse = await supabaseClient.auth.resetPasswordForEmail(
      email
    );

    if (resetResponse.error) {
      console.error(resetResponse.error.message);
      setErrorMessage(resetResponse.error.message);
      return;
    }

    if (resetResponse.data) {
      setSuccessMessage("Passwort-Reset Link wurde an deine E-Mail gesendet.");
    }
  };

  return (
    <div className="content-wrapper">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>In deinen Account einloggen</h2>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit">Login</button>
        </form>
        <div className="reset-password-container">
          <button onClick={handleResetPassword}>Passwort vergessen?</button>
          <button onClick={() => navigate("/signup")}>Registrieren</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
