// src/pages/UserDashboard.jsx
import { useNavigate } from 'react-router-dom';
import './styles/UserDashboard.css'; // Importa el archivo de estilos específico
import { useState } from 'react';

function UserDashboard() {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [registros, setRegistros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (codigo.length === 3 && /^\d{3}$/.test(codigo)) {
      const nuevoRegistro = {
        fechaHora: new Date().toLocaleString(),
        codigo: codigo,
        premio: 'Premio ' + (registros.length + 1), // Simulación de premio
      };

      setRegistros([...registros, nuevoRegistro]);
      setCodigo(''); // Limpiar el campo de código
    } else {
      alert('Por favor, ingresa un código de 3 dígitos.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Registro Código</h1>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingrese código (000 - 999)"
          maxLength="3"
          required
        />
        <button type="submit">Registrar</button>
        <button type="button" onClick={() => navigate('/')}>Salir</button>
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
