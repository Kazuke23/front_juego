// src/pages/ResetPassword.jsx
import { Link } from 'react-router-dom';

function ResetPassword() {
  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form>
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Enviar Enlace de Restablecimiento</button>
      </form>
      <p>
        <Link to="/">Volver al Inicio de Sesión</Link>
      </p>
    </div>
  );
}

export default ResetPassword;
