import { Link } from "react-router-dom";
import "./Header.css"
import { useUserContext } from "../../Context/UserContext";
import { supabaseClient } from "../../lib/supabaseClient";


const Header = () => {

    const userContext = useUserContext();
    const user = userContext?.user;

    const handleLogoutClicked = async (e:React.MouseEvent) => {
        e.preventDefault();

        const signoutResponse = await supabaseClient.auth.signOut();

        if (signoutResponse.error) {
            console.error("Logout Error", signoutResponse.error)
        } else {
            userContext?.setUser(null);
        }
    };

    return ( 

    <header>
        <nav>
            <Link to={"/"}>
            <div className="header-logo">
                <img src="Logo.svg" alt="company logo"/>
            </div>
            </Link>
            <div className="nav-link-container">
            <Link to={"/"}>Home</Link>
            <a href="#">Rezepte</a>
            <a href="#">Ueber uns</a>
            </div>
            
                {user ? (
                    <div className="login-status-container">
                    <span>Wilkommen, </span>
                    <Link to={`/profile/${user.id}`}><span>{user.email}</span></Link>
                    <button className="logout-button" onClick={handleLogoutClicked}>Logout</button>
                    </div>
                ): (
                    <button><Link to="/login">Login</Link></button>
                )}
            
        </nav>
    </header>
    );
}

export default Header;