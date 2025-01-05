import React from 'react';
import './RecipeHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faUtensils } from '@fortawesome/free-solid-svg-icons';

function RecipeHistory({ recipes, setView, editRecipe, deleteRecipe }) {
  return (
    <div className="recipe-history">
      {/* Título principal de la sección */}
      <h1>Historial de Recetas</h1>

      {/* Verifica si hay recetas guardadas */}
      {recipes.length === 0 ? (
        // Mensaje cuando no hay recetas
        <p>No hay recetas guardadas.</p>
      ) : (
        <ul>
          {/* Recorre la lista de recetas y las muestra */}
          {recipes.map((recipe, index) => (
            <li key={index}>
              {/* Encabezado de la receta con ícono y nombre */}
              <div className="recipe-header">
                <FontAwesomeIcon icon={faUtensils} className="recipe-icon" />
                <h3>{recipe.name}</h3>
              </div>

              {/* Lista de ingredientes de la receta */}
              <p>Ingredientes:</p>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="ingredient-item">
                    - {ing.name} ({ing.quantity})
                  </li>
                ))}
              </ul>

              {/* Botones de acción para editar o eliminar la receta */}
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

      {/* Botón para cerrar el historial y volver al inicio */}
      <button onClick={() => setView('home')}>Cerrar</button>
    </div>
  );
}

export default RecipeHistory;
