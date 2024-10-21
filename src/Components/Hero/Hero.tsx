import "./Hero.css"

const Hero = (props:any) => {
    return ( 
        <div className="hero-img-container">
            <img src={props.imageUrl? props.imageUrl : "hero-img-05.jpg"} alt="hero image" />
        </div>
    );
}

export default Hero;