import React from 'react';
import './RecipeHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faUtensils } from '@fortawesome/free-solid-svg-icons';

function RecipeHistory({ recipes, setView, editRecipe, deleteRecipe }) {
  return (
    <div className="recipe-history">
      <h1>Historial de Recetas</h1>
      {recipes.length === 0 ? (
        <p>No hay recetas guardadas.</p>
      ) : (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <div className="recipe-header">
                <FontAwesomeIcon icon={faUtensils} className="recipe-icon" />
                <h3>{recipe.name}</h3>
              </div>
              <p>Ingredientes:</p>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="ingredient-item">
                    - {ing.name} ({ing.quantity})
                  </li>
                ))}
              </ul>
              <div className="action-buttons">
                <button onClick={() => editRecipe(index)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button onClick={() => deleteRecipe(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setView('home')}>Cerrar</button>
    </div>
  );
}

export default RecipeHistory;
