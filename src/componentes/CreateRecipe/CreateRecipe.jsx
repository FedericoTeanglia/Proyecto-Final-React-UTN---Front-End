import React, { useState } from 'react';
import './CreateRecipe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';

function CreateRecipe({ setView, addRecipe }) {
  // Guarda el nombre de la receta
  const [recipeName, setRecipeName] = useState('');
  // Indica si el nombre de la receta fue confirmado
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  // Lista de ingredientes de la receta
  const [ingredients, setIngredients] = useState([]);
  // Guarda el ingrediente que el usuario está escribiendo
  const [newIngredient, setNewIngredient] = useState('');
  // Guarda la cantidad que el usuario está escribiendo
  const [newQuantity, setNewQuantity] = useState('');

  // Agrega un nuevo ingrediente con su cantidad a la lista
  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '' && newQuantity.trim() !== '') {
      setIngredients([...ingredients, { name: newIngredient, quantity: newQuantity }]);
      setNewIngredient(''); // Limpia el campo del ingrediente
      setNewQuantity(''); // Limpia el campo de la cantidad
    }
  };

  // Elimina un ingrediente de la lista según su posición
  const handleDeleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Permite editar un ingrediente y su cantidad
  const handleEditIngredient = (index) => {
    const ingredientName = prompt('Edita el ingrediente:', ingredients[index].name); // Edita el nombre
    const ingredientQuantity = prompt('Edita la cantidad:', ingredients[index].quantity); // Edita la cantidad
    if (ingredientName && ingredientQuantity) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[index] = { name: ingredientName, quantity: ingredientQuantity };
      setIngredients(updatedIngredients); // Actualiza la lista
    }
  };

  // Confirma que el usuario ingresó un nombre de receta
  const handleConfirmName = () => {
    if (recipeName.trim() !== '') {
      setIsNameConfirmed(true);
    }
  };

  // Permite al usuario editar el nombre de la receta
  const handleEditName = () => {
    setIsNameConfirmed(false);
  };

  // Guarda la receta completa y la envía al historial
  const handleSaveRecipe = () => {
    if (ingredients.length > 0 && recipeName.trim() !== '') {
      addRecipe({ name: recipeName, ingredients }); // Agrega la receta al historial
      setView('history'); // Cambia a la vista del historial
    } else {
      alert('Por favor, completa el nombre y agrega al menos un ingrediente.'); // Valida los campos
    }
  };

  return (
    <div className="create-recipe">
      {/* Botón para cerrar la ventana y volver a la página principal */}
      <button className="close-button" onClick={() => setView('home')}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

      {/* Verifica si el nombre de la receta ya está confirmado */}
      {!isNameConfirmed ? (
        <>
          <h2>Crear Receta</h2>
          {/* Campo para escribir el nombre de la receta */}
          <input
            type="text"
            placeholder="Ingresa el nombre de la receta"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
          {/* Botón para confirmar el nombre */}
          <button onClick={handleConfirmName}>Continuar</button>
        </>
      ) : (
        <>
          <h2>
            {recipeName}
            {/* Botón para editar el nombre de la receta */}
            <button className="edit-icon" onClick={handleEditName}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </h2>

          {/* Campos para agregar ingredientes */}
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
            {/* Botón para añadir un ingrediente a la lista */}
            <button onClick={handleAddIngredient}>Agregar</button>
          </div>

          {/* Lista de ingredientes */}
          <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.name} - {ingredient.quantity}
                <div>
                  {/* Botón para editar un ingrediente */}
                  <button onClick={() => handleEditIngredient(index)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  {/* Botón para eliminar un ingrediente */}
                  <button onClick={() => handleDeleteIngredient(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* Botón para guardar la receta */}
          <button className="save-button" onClick={handleSaveRecipe}>
            Guardar Receta
          </button>
        </>
      )}
    </div>
  );
}

export default CreateRecipe;
