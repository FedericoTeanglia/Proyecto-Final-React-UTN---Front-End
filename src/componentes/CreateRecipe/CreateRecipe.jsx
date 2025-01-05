import React, { useState } from 'react';
import './CreateRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

function CreateRecipe({ setView, addRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '' && newQuantity.trim() !== '') {
      setIngredients([...ingredients, { name: newIngredient, quantity: newQuantity }]);
      setNewIngredient('');
      setNewQuantity('');
    }
  };

  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleEditIngredient = (index) => {
    const ingredientName = prompt('Edita el ingrediente:', ingredients[index].name);
    const ingredientQuantity = prompt('Edita la cantidad:', ingredients[index].quantity);
    if (ingredientName && ingredientQuantity) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = { name: ingredientName, quantity: ingredientQuantity };
      setIngredients(updatedIngredients);
    }
  };

  const handleConfirmName = () => {
    if (recipeName.trim() !== '') {
      setIsNameConfirmed(true);
    }
  };

  const handleEditName = () => {
    setIsNameConfirmed(false);
  };

  const handleSaveRecipe = () => {
    if (ingredients.length > 0 && recipeName.trim() !== '') {
      addRecipe({ name: recipeName, ingredients });
      setView('history');
    } else {
      alert('Por favor, completa el nombre y agrega al menos un ingrediente.');
    }
  };

  return (
    <div className="create-recipe">
      <button className="close-button" onClick={() => setView('home')}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {!isNameConfirmed ? (
        <>
          <h2>Crear Receta</h2>
          <input
            type="text"
            placeholder="Ingresa el nombre de la receta"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          <button onClick={handleConfirmName}>Continuar</button>
        </>
      ) : (
        <>
          <h2>
            {recipeName}
            <button className="edit-icon" onClick={handleEditName}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </h2>
          <div className="ingredient-inputs">
            <input
              type="text"
              placeholder="Ingrediente"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cantidad"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
            />
            <button onClick={handleAddIngredient}>Agregar</button>
          </div>
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.name} - {ingredient.quantity}
                <div>
                  <button onClick={() => handleEditIngredient(index)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button onClick={() => handleDeleteIngredient(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="save-button" onClick={handleSaveRecipe}>
            Guardar Receta
          </button>
        </>
      )}
    </div>
  );
}

export default CreateRecipe;
