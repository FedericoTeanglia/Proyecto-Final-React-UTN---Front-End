import React, { useState } from 'react';
import './Home.css';
import logo from '../../assets/logo1.png';

function Home({ setView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="home">
        {/* Navbar */}
        <nav className="navbar">
          <a href="#" className="navbar-logo">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <button
            className="navbar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="#">Quienes Somos</a></li>
            <li><a href="#">Nuestras Recetas</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>

        {/* Main Content */}
        <div>
          <h1>
            ¡Bienvenido a <br />
            <span>Cocinando tu <br />
            Receta!</span>
          </h1>
          <p>Comenzá a crear tus recetas personalizadas fácilmente.</p>
          <button onClick={() => setView('create')}>Crear receta</button>
          <button onClick={() => setView('history')}>Ver historial</button>
        </div>
      </div>
    </>
  );
}

export default Home;
