// src/pages/Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import './styles/App.css'; // Importa el archivo de estilos específico

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtiene los valores de los campos de entrada
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Usuario de prueba
    const testUser = {
      email: 'testuser@example.com',
      password: 'user123', // Cambia esta contraseña según sea necesario
    };

    // Verifica si las credenciales son correctas
    if (email === testUser.email && password === testUser.password) {
      // Si la autenticación es exitosa, redirigir al UserDashboard
      navigate('/user-dashboard');
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.'); // Alerta en caso de error
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
