import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link para la navegación
import './styles/AdminRegister.css'; // Estilos específicos para el registro de administrador

function AdminRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro del administrador (puedes conectar aquí a tu API o base de datos)
    console.log('Nuevo administrador registrado:', email);
    // Redirigir al dashboard del admin después del registro
    navigate('/admin/dashboard');
  };

  return (
    <div className="admin-register-container">
      <h2>Registro de Administrador</h2>
      <form className="admin-register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="admin-register-btn" type="submit">
          Registrar Administrador
        </button>
      </form>
      
      <p>¿Ya tienes una cuenta? <Link to="/admin">Inicia Sesión</Link></p> {/* Link a la página de inicio de sesión del admin */}
    </div>
  );
}

export default AdminRegister;
