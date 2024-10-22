import Logo from "../Logo/Logo";
import "./Footer.css";
Logo;

const Footer = () => {
  return (
    <footer>
      <div className="footer-content-wrapper">
        <div className="logo-container">
          <Logo />
        </div>
        <div className="social-container">
          <div className="social-icons-container">
            <div className="social-icons-icon-container">
              <img src="youtube-social.png" alt="youtube icon" />
            </div>
            <div className="social-icons-icon-container">
              <img src="twitter-social.png" alt="twitter icon" />
            </div>
            <div className="social-icons-icon-container">
              <img src="pinterest-social.png" alt="pinterest icon" />
            </div>
          </div>
          <h4>Connect with us</h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
