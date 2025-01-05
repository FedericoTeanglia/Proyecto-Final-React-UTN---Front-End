import { StrictMode } from 'react'; // Modo estricto para detectar problemas potenciales en el código
import { createRoot } from 'react-dom/client'; // Crea el punto de entrada de la aplicación
import './index.css'; // Estilos globales de la aplicación
import App from './App.jsx'; // Componente principal de la aplicación

// Renderiza la aplicación en el elemento con id "root" del archivo HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* El componente principal envuelto en StrictMode para ayudar a encontrar errores */}
    <App />
  </StrictMode>
);
