// src/pages/Login.jsx
import { Link } from 'react-router-dom';
import './styles/App.css'; // Importa el archivo de estilos específico

function Login() {
  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className="login-btn">Ingresar</button>
      </form>
      <p>
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
      <p>
        <Link to="/reset-password">¿Olvidaste tu contraseña?</Link>
      </p>
    </div>
  );
}

export default Login;
