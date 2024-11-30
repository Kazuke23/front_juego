import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa axios
import './styles/App.css'; // Importa el archivo de estilos específico

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtiene los valores de los campos de entrada
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;

    try {
      // Realizar la solicitud de inicio de sesión al backend
      const response = await axios.post('https://backend-juego.vercel.app/api/user/login', {
        correo,
        contraseña,
      });

      // Log para verificar la respuesta
      console.log("Respuesta del servidor:", response.data);

      // Almacenar el token en localStorage si la autenticación es exitosa
      const token = response.data.token; // Asegúrate de que el token esté en la respuesta
      if (token) {
        localStorage.setItem('token', token); // Guarda el token en localStorage
        console.log('Inicio de sesión exitoso:', response.data.message);
        // Redirigir al UserDashboard
        navigate('/user-dashboard');
      } else {
        alert('Error al obtener el token.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      // Alerta en caso de error (credenciales incorrectas o acceso denegado)
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); // Mostrar mensaje del backend
      } else {
        alert('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Bienvenido a Reply</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo:</label>
          <input type="email" name="correo" required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="contraseña" required />
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
