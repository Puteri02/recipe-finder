import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../style.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      setRecipe(response.data.meals[0]);
    };
    fetchRecipeDetails();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="recipe-back-button">
        <Button
          className="back-button"
          label="back"
          link
          onClick={() => window.history.back()}
        />
      </div>

      {recipe ? (
        <div className="recipe-details-container">
          {/* Title */}
          <h2 className="recipe-title">{recipe.strMeal}</h2>

          <div className="recipe-layout">
            {/* Image */}
            <div className="recipe-image-container">
              <Card
                className="p-shadow-4"
                style={{
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
                header={
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="recipe-image"
                  />
                }
              />
            </div>

            <div className="recipe-info">
              <div className="recipe-columns">
                {/* Ingredients */}
                <Card
                  className="p-shadow-4 recipe-info-card"
                  title="Ingredients"
                  style={{ fontWeight: "bold", textAlign: "center", paddingTop: "5px", fontFamily: "times new roman" }}
                >
                  <ul
                    className="recipe-ingredients-list"
                    style={{ fontWeight: "normal", paddingTop: "30px" }}
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1)
                      .map((i) => recipe[`strIngredient${i}`]?.trim())
                      .filter((ingredient) => ingredient)
                      .map((ingredient, idx) => (
                        <li key={idx} className="recipe-ingredient-item">
                          {ingredient}
                        </li>
                      ))}
                  </ul>
                </Card>

                {/* Instructions */}
                <Card
                  className="p-shadow-4 recipe-info-card"
                  title="Instructions"
                  style={{ fontWeight: "bold", textAlign: "center"}}
                >
                  {/* to display the instructions in para */}
                  {/* <p
                    className="recipe-instructions"
                    style={{ fontWeight: "normal", textAlign: "left" }}
                  >
                    {recipe.strInstructions}
                  </p> */}
                  <ol
                    className="recipe-instructions-list"
                    style={{
                      fontWeight: "normal",
                      textAlign: "left",
                      paddingLeft: "20px",
                      lineHeight: "1.6",
                    }}
                  >
                    {recipe.strInstructions
                      .split(/(?:\.\s|\n)/) // Split by periods or line breaks
                      .filter((step) => step.trim().length > 0) // Remove empty steps
                      .map((step, idx) => (
                        <li key={idx} className="recipe-instruction-step">
                          {step.trim()}
                        </li>
                      ))}
                  </ol>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
