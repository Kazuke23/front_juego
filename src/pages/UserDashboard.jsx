import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/UserDashboard.css'; // Puedes mantener los estilos originales

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [codigo, setCodigo] = useState('');
  const [registros, setRegistros] = useState(() => {
    const savedRecords = localStorage.getItem('registros');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar token y cargar datos del usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (!token || !userName || !userEmail) {
      navigate('/'); // Redirigir si no hay sesión
    } else {
      setUserData({ nombre: userName, correo: userEmail });
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('registros', JSON.stringify(registros));
  }, [registros]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (codigo.length !== 3 || !/^\d{3}$/.test(codigo)) {
      setError('Por favor, ingresa un código válido de 3 dígitos.');
      setIsSubmitting(false);
      return;
    }

    const codigoYaRedimido = registros.some((registro) => registro.codigo === codigo);
    if (codigoYaRedimido) {
      setError('El código ya fue redimido.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://backend-juego.vercel.app/api/codigo/${codigo}`);
      const data = await response.json();

      let premio = 'No ganaste';
      if (data.success) {
        premio = data.premio;
      }

      const nuevoRegistro = {
        fechaHora: new Date().toLocaleString(),
        codigo,
        premio,
      };

      setRegistros((prevRegistros) => [...prevRegistros, nuevoRegistro]);
      setCodigo('');
    } catch (err) {
      console.error('Error al registrar el código:', err);
      setError('Hubo un problema al registrar el código. Inténtalo nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefresh = () => {
    setRegistros([]);
    localStorage.removeItem('registros');
  };

  const handleGoToDashboardMain = () => {
    navigate('/dashboard-main');
  };

  return (
    <div className="dashboard-container">
      {userData && (
        <>
          <div className="dashboard-header">
            <p>Bienvenido, {userData.nombre}</p>
            <p>{userData.correo}</p>
          </div>

          <div className="dashboard-content">
            <form onSubmit={handleSubmit} className="dashboard-form">
              <div className="input-group">
                <label htmlFor="codigo">Código:</label>
                <input
                  type="text"
                  id="codigo"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder="Ingrese código (000 - 999)"
                  maxLength="3"
                  pattern="\d{3}"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Registrando...' : 'Registrar'}
              </button>
              <button type="button" onClick={handleRefresh} className="refresh-button">
                Refrescar
              </button>
              <button type="button" onClick={handleGoToDashboardMain} className="go-to-login-button">
                Volver al dashboard principal
              </button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Fecha y Hora</th>
                    <th>Código</th>
                    <th>Premio</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((registro, index) => (
                    <tr key={index}>
                      <td>{registro.fechaHora}</td>
                      <td>{registro.codigo}</td>
                      <td>{registro.premio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
