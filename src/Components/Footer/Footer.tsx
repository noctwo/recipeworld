import "./Footer.css"

const Footer = () => {
    return ( 
        <footer>
            <div className="footer-content-wrapper">
            <div className="logo-container">
                <img src="Logo.svg" alt="company logo"/>
            </div>
            <div className="social-container">
                <h2>Connect with us</h2>
                <div className="social-icons-container">
                    <div className="social-icons-icon-container">
                <img src="youtube-social.png" alt="youtube icon" />
                </div>
                <div className="social-icons-icon-container">
                <img src="twitter-social.png" alt="twitter icon" /></div>
                <div className="social-icons-icon-container">
                <img src="pinterest-social.png" alt="pinterest icon" />
                </div>
                </div>
                </div>
            </div> 
        </footer>

    );
}

export default Footer;