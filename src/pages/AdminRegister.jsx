import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link para la navegación
import './styles/AdminRegister.css'; // Estilos específicos para el registro de administrador

function AdminRegister() {
  const [correo, setCorreo] = useState(''); // Cambiado de email a correo
  const [contraseña, setContraseña] = useState(''); // Cambiado de password a contraseña
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    // Crear el objeto de datos para enviar a la API
    const adminData = {
      correo, // Cambiado de email a correo
      contraseña, // Cambiado de password a contraseña
    };

    try {
      const response = await fetch('https://backend-juego.vercel.app/api/auth/admin/register', { // Asegúrate de que la ruta sea correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro de administrador exitoso');
        // Redirigir al AdminLogin después del registro exitoso
        navigate('/admin'); // Cambiar aquí para redirigir a la página de inicio de sesión
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al registrar el administrador:', error);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Registro de Administrador</h2>
      <form className="admin-register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={correo} // Cambiado de email a correo
            onChange={(e) => setCorreo(e.target.value)} // Cambiado de email a correo
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contraseña} // Cambiado de password a contraseña
            onChange={(e) => setContraseña(e.target.value)} // Cambiado de password a contraseña
            required
          />
        </div>
        <button className="admin-register-btn" type="submit">
          Registrar Administrador
        </button>
      </form>
      
      <p>¿Ya tienes una cuenta? <Link to="/admin">Inicia Sesión</Link></p>
    </div>
  );
}

export default AdminRegister;
