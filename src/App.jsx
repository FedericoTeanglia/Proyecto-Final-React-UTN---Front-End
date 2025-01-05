import React, { useState } from 'react';
import Home from './componentes/Home/Home';
import CreateRecipe from './componentes/CreateRecipe/CreateRecipe';
import RecipeHistory from './componentes/RecipeHistory/RecipeHistory';
import './App.css';

function App() {
  // Lista de recetas guardadas
  const [recipes, setRecipes] = useState([]);
  // Controla la vista actual (home, create, history)
  const [view, setView] = useState('home');

  // Agrega una nueva receta al historial
  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe]; // Agrega la receta al array
    setRecipes(updatedRecipes); // Actualiza el estado
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Guarda en localStorage
    setView('home'); // Vuelve a la vista principal
  };

  // Edita una receta seleccionada
  const editRecipe = (index) => {
    const recipeToEdit = recipes[index]; // Obtiene la receta seleccionada

    // Pide al usuario que edite el nombre
    const updatedName = prompt('Ingrese el nuevo nombre de la receta:', recipeToEdit.name);

    // Convierte los ingredientes en un string para facilitar la edición
    const ingredientsString = recipeToEdit.ingredients
      .map((ing) => `${ing.name}:${ing.quantity}`)
      .join(', ');

    // Pide al usuario que edite los ingredientes
    const updatedIngredientsString = prompt(
      'Ingrese los nuevos ingredientes en el formato "nombre:cantidad, nombre:cantidad":',
      ingredientsString
    );

    if (updatedName && updatedIngredientsString) {
      // Convierte el string editado en un array de objetos
      const updatedIngredients = updatedIngredientsString.split(',').map((pair) => {
        const [name, quantity] = pair.split(':').map((item) => item.trim());
        return { name, quantity };
      });

      // Actualiza la receta en la lista
      const updatedRecipes = [...recipes];
      updatedRecipes[index] = {
        ...updatedRecipes[index],
        name: updatedName,
        ingredients: updatedIngredients,
      };

      setRecipes(updatedRecipes); // Actualiza el estado
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Guarda los cambios en localStorage
    }
  };

  // Elimina una receta seleccionada
  const deleteRecipe = (index) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta receta?')) {
      const updatedRecipes = recipes.filter((_, i) => i !== index); // Filtra las recetas
      setRecipes(updatedRecipes); // Actualiza el estado
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes)); // Guarda los cambios en localStorage
    }
  };

  // Renderiza un popup con contenido dinámico
  const renderPopup = (content) => (
    <>
      {/* Capa oscura detrás del popup */}
      <div className="overlay" onClick={() => setView('home')}></div>
      {/* Contenedor del popup */}
      <div className="popup">
        {content}
      </div>
    </>
  );

  return (
    <>
      <div className="app-container">
        {/* Vista principal */}
        <Home setView={setView} />
        {/* Renderiza la vista de creación de recetas */}
        {view === 'create' &&
          renderPopup(<CreateRecipe addRecipe={addRecipe} setView={setView} />)}
        {/* Renderiza la vista del historial de recetas */}
        {view === 'history' &&
          renderPopup(
            <RecipeHistory
              recipes={recipes}
              setView={setView}
              editRecipe={editRecipe}
              deleteRecipe={deleteRecipe}
            />
          )}
      </div>
    </>
  );
}

export default App;
