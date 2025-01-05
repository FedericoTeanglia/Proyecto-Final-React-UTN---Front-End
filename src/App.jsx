import React, { useState } from 'react';
import Home from './componentes/Home/Home';
import CreateRecipe from './componentes/CreateRecipe/CreateRecipe';
import RecipeHistory from './componentes/RecipeHistory/RecipeHistory';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [view, setView] = useState('home');

  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setView('home');
  };

  const editRecipe = (index) => {
    const recipeToEdit = recipes[index];

    
    const updatedName = prompt('Ingrese el nuevo nombre de la receta:', recipeToEdit.name);

    
    const ingredientsString = recipeToEdit.ingredients
      .map((ing) => `${ing.name}:${ing.quantity}`)
      .join(', ');

    
    const updatedIngredientsString = prompt(
      'Ingrese los nuevos ingredientes en el formato "nombre:cantidad, nombre:cantidad":',
      ingredientsString
    );

    if (updatedName && updatedIngredientsString) {
      
      const updatedIngredients = updatedIngredientsString.split(',').map((pair) => {
        const [name, quantity] = pair.split(':').map((item) => item.trim());
        return { name, quantity };
      });

      const updatedRecipes = [...recipes];
      updatedRecipes[index] = {
        ...updatedRecipes[index],
        name: updatedName,
        ingredients: updatedIngredients,
      };

      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    }
  };

  const deleteRecipe = (index) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta receta?')) {
      const updatedRecipes = recipes.filter((_, i) => i !== index);
      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    }
  };

  const renderPopup = (content) => (
    <>
      <div className="overlay" onClick={() => setView('home')}></div>
      <div className="popup">
        {content}
      </div>
    </>
  );

  return (
    <>
    <div className="app-container">
      <Home setView={setView} />
      {view === 'create' &&
        renderPopup(<CreateRecipe addRecipe={addRecipe} setView={setView} />)}
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
