import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/logo1.png';

function Home({ setView }) {
  // Estado para controlar si el menú hamburguesa está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="home">
        {/* Barra de navegación */}
        <nav className="navbar">
          {/* Logo de la aplicación */}
          <a href="#" className="navbar-logo">
            <img src={logo} alt="Logo" className="logo" />
          </a>

          {/* Botón para abrir/cerrar el menú en pantallas pequeñas */}
          <button
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>

          {/* Menú de navegación con enlaces */}
          <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="#">Quienes Somos</a></li>
            <li><a href="#">Nuestras Recetas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <div>
          <h1>
            ¡Bienvenido a <br />
            {/* Resalta "Cocinando tu Receta" con un color especial */}
            <span>Cocinando tu <br /> Receta!</span>
          </h1>
          <p>Comenzá a crear tus recetas personalizadas fácilmente.</p>

          {/* Botón para ir al creador de recetas */}
          <button onClick={() => setView('create')}>Crear receta</button>

          {/* Botón para ir al historial de recetas */}
          <button onClick={() => setView('history')}>Ver historial</button>
        </div>
      </div>
    </>
  );
}

export default Home;
