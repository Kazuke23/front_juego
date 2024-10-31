import './styles/App2.css'; // Estilos específicos para la página de registro
import { useState } from 'react'; // Hook para manejar el estado
import { Link, useNavigate } from 'react-router-dom'; // Para redirigir después del registro

function Register() {
  const navigate = useNavigate(); // Para redirigir después del registro exitoso

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    cedula: '',
    correo: '', // Cambiado de email a correo
    celular: '',
    ciudad: '',
    contraseña: '', // Cambiado de password a contraseña
  });

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registro exitoso');
        navigate('/'); // Redirige a la página de inicio de sesión después del registro exitoso
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="register-container">
      <h2 className="login-title">Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cédula:</label>
          <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required /> {/* Cambiado de email a correo */}
        </div>
        <div className="form-group">
          <label>Celular:</label>
          <input type="text" name="celular" value={formData.celular} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required /> {/* Cambiado de password a contraseña */}
        </div>
        <button className="register-btn" type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes una cuenta? <Link to="/">Inicia Sesión</Link>
      </p>
    </div>
  );
}

export default Register;
