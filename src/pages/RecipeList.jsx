import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../style.css";

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div
      key={recipe.idMeal}
      onClick={handleClick}
      className="recipe-card"
      style={{ cursor: "pointer" }}
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
        style={{ marginTop: "20px" }}
      />
      <h3>{recipe.strMeal}</h3>
    </div>
  );
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search");
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = "";
        if (searchQuery) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`; // food search
        } else if (category) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`; // categories list
        }

        if (url) {
          const response = await axios.get(url);
          setRecipes(response.data.meals || []);
        }
      } catch (error) {
        console.error("Error retrieving recipes:", error);
      }
    };

    fetchRecipes();
  }, [searchQuery, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recipes?search=${query}`);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    navigate("/recipes");
  };

  return (
    <div>
      <Navbar />
      <div
        className="search-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem 0",
          // backgroundColor: "#f8f9fa",
        }}
      >
        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "300px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClearSearch}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </form>
      </div>

      <div className="category-name" style={{ border: "1px black" }}>
        <h2 style={{ textAlign: "center" }}>
          {category
            ? `${category} recipes`
            : searchQuery
            ? `${searchQuery} recipes`
            : ""}
        </h2>
      </div>

      <div className="search-results">
        {recipes.length === 0 ? (
          <p>Could not locate any recipes for that search 😢 ...</p>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeItem key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeList;
