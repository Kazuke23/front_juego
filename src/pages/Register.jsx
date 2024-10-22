import './styles/App.css'; // Estilos específicos para la página de registro
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register-container">
      <h2 className="login-title">Registro</h2>
      <form className="register-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" name="name" required />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input type="date" name="dob" required />
        </div>
        <div className="form-group">
          <label>Cédula:</label>
          <input type="text" name="cedula" required />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Celular:</label>
          <input type="text" name="celular" required />
        </div>
        <div className="form-group">
          <label>Ciudad:</label>
          <input type="text" name="ciudad" required />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input type="password" name="password" required />
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
