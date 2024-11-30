import { useNavigate } from 'react-router-dom';
import './styles/UserDashboard.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [registros, setRegistros] = useState(() => {
    const savedRecords = localStorage.getItem('registros');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('registros', JSON.stringify(registros));
  }, [registros]);

  const handleRefresh = () => {
    setRegistros([]);
    localStorage.removeItem('registros');
  };

  const guardarIntento = async (codigo, premio) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://backend-juego.vercel.app/api/intento/intento',
        { fechaHora: new Date().toISOString(), codigo, premio },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Error al guardar el intento:', error.response?.data || error.message);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codigoYaRedimido = registros.some((registro) => registro.codigo === codigo);
    if (codigoYaRedimido) {
      alert('El código ya fue redimido.');
      return;
    }

    if (codigo.length === 3 && /^\d{3}$/.test(codigo)) {
      try {
        const response = await axios.get(`https://backend-juego.vercel.app/api/codigo/${codigo}`);
        let premio = 'No ganaste';

        if (response.data.success) {
          premio = response.data.premio;
        }

        await guardarIntento(codigo, premio);

        const nuevoRegistro = {
          fechaHora: new Date().toLocaleString(),
          codigo,
          premio,
        };

        setRegistros((prevRegistros) => [...prevRegistros, nuevoRegistro]);
        setCodigo('');
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          alert(`Error: ${error.response.data.message || 'Error al procesar la solicitud'}`);
        } else {
          alert('Error de conexión con el servidor');
        }
      }
    } else {
      alert('Por favor, ingresa un código de 3 dígitos.');
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Registro de Código</h1>
        <button onClick={() => navigate('/')}>Salir</button>
      </header>

      <main className="dashboard-main">
        <form onSubmit={handleSubmit} className="form-inline">
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingrese código (000 - 999)"
            maxLength="3"
            pattern="\d{3}"
            required
          />
          <button type="submit">Registrar</button>
          <button type="button" onClick={handleRefresh}>Refrescar</button>
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
      </main>
    </div>
  );
}

export default UserDashboard;
  