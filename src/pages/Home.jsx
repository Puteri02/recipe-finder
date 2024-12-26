import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../style.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories || []);
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${query}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/recipes?category=${category}`);
  };

  return (
    <div>
      <Navbar />
      {/* <div style={{ padding: "5px" }} /> */}
      <div
        className="search-container"
        style={{
          backgroundImage: "url('/src/assets/cook-hero-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // borderRadius: "10px",
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <svg>
          <text x="50%" y="50%" dy=".35em" textAnchor="middle">
            Recipe Finder
          </text>
        </svg>
        {/* </div> */}
        <p style={{ color: "whitesmoke", fontFamily: "Arial, sans-serif" }}>
          Explore and find amazing recipes here !
        </p>
        <form onSubmit={handleSearch} style={{ marginTop: "2rem" }}>
          <input
            type="text"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              border: "none",
              // borderRadius: "4px",
              // marginRight: "0.5rem",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1.2rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              // borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div
        id="categories"
        className="categories-container"
        style={{
          backgroundColor: "#F6F5F2",
          fontFamily: '"Arial", sans-serif',
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "2rem 0",
            color: "#f96e2a",
          }}
        >
          Meal Categories
        </h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.idCategory}
              className="category-card"
              onClick={() => handleCategoryClick(category.strCategory)}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="category-image"
              />
              <h3>{category.strCategory}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
