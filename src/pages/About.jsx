import "../style.css";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-page">
        <div
          className="about-hero"
          style={{
            backgroundImage: "url('/src/assets/bg-pic.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <h1>Welcome to Recipe Finder</h1>
          <p>Discover, Cook, and Share Amazing Recipes</p>
        </div>

        <div className="about-content">
          <section className="about-intro">
            <img
              src="src\assets\cook-hero-2.jpg"
              //   src="src\assets\hero.jpeg"
              alt="Cooking"
              className="about-hero-image"
            />
            <div className="about-text">
              <h2>What is Recipe Finder?</h2>
              <p>
                Recipe Finder is your ultimate kitchen companion, offering a
                curated collection of recipes from around the world. Whether you
                are a novice or a pro, we’ve got something for everyone. Explore
                step-by-step guides, ingredient lists, and inspiration to make
                every meal extraordinary.
              </p>
            </div>
          </section>

          {/* break line */}
          <div
            className="horizontal-line"
            style={{
              height: "2px",
              backgroundColor: "#f96e2a",
              margin: "20px 0",
            }}
          ></div>

          <section className="about-features">
            <h2 style={{ color: "#f57c00", marginTop: "100px" }}>
              Key Features
            </h2>
            <div className="features-list">
              <div className="feature-item">
                <i className="pi pi-search feature-icon"></i>
                <h3>Search Recipes</h3>
                <p>Find recipes by name with ease.</p>
              </div>
              <div className="feature-item">
                <i className="pi pi-images feature-icon"></i>
                <h3>Beautiful Imagery</h3>
                <p>Get inspired with high-quality recipe photos.</p>
              </div>
              <div className="feature-item">
                <i className="pi pi-book feature-icon"></i>
                <h3>Step-by-Step Guides</h3>
                <p>Follow detailed instructions to perfect your dishes.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="about-cta">
          <h2>Ready to Cook?</h2>
          <p>
            Explore our recipe collection and start your culinary journey today!
          </p>
          <button
            className="about-cta-button"
            onClick={() => window.history.back()} // goto home
          >
            Explore Recipes
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
