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
    localStorage.setItem('registros', JSON.stringify(registros));
  }, [registros]);

  // Función para reiniciar los registros
  const handleRefresh = () => {
    setRegistros([]);
    localStorage.removeItem('registros'); // Eliminar registros del localStorage
  };

  // Función modificada para guardar el intento con la ruta correcta
  const guardarIntento = async (codigo, premio) => {
    try {
      const response = await axios.post('http://localhost:5000/api/intento/intento', {
        fechaHora: new Date().toISOString(),
        codigo: codigo,
        premio: premio
      });

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
  
    // Verifica si el código ya ha sido redimido
    const codigoYaRedimido = registros.some(registro => registro.codigo === codigo);
    if (codigoYaRedimido) {
      alert('El código ya fue redimido.');
      return; // Salir de la función para no registrar de nuevo
    }
  
    if (codigo.length === 3 && /^\d{3}$/.test(codigo)) {
      try {
        const response = await axios.get(`http://localhost:5000/api/codigo/${codigo}`);
        let premio = 'No ganaste';
  
        if (response.data.success) {
          premio = response.data.premio;
        }
  
        // Intentamos guardar el intento
        await guardarIntento(codigo, premio);
  
        // Solo actualizamos el estado local si el guardado fue exitoso
        const nuevoRegistro = {
          fechaHora: new Date().toLocaleString(),
          codigo: codigo,
          premio: premio,
        };
  
        setRegistros(prevRegistros => [...prevRegistros, nuevoRegistro]);
        setCodigo('');
  
      } catch (error) {
        console.error('Error:', error);
        // Mostramos un mensaje más específico según el tipo de error
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
      <h1>Registro de Código</h1>
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
        <button type="button" onClick={() => navigate('/')}>Salir</button>
        <button type="button" onClick={handleRefresh}>Refrescar</button> {/* Botón de refrescar */}
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
  );
}

export default UserDashboard;
