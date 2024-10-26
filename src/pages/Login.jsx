import { Link, useNavigate } from 'react-router-dom';
import './styles/App.css'; // Importa el archivo de estilos específico

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtiene los valores de los campos de entrada
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await fetch('https://front-juego.vercel.app/api/user/login', { // Cambia esto a la URL de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la autenticación es exitosa, redirigir al UserDashboard
        navigate('/user-dashboard');
      } else {
        // Alerta en caso de error (credenciales incorrectas o acceso denegado)
        if (data.message) {
          alert(data.message); // Mostrar mensaje del backend
        } else {
          alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
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
