// src/pages/Ganadores.jsx
import React from 'react';
import './styles/AdminDashboard.css'; // Importa tu archivo CSS para esta página
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  // Función para manejar el botón "Salir"
  const handleSalir = () => {
    navigate('/admin'); // Redirige a la página principal o donde prefieras
  };

  return (
    <div className="ganadores-container">
      <h1 className="title">Ganadores</h1>
      <table className="table-ganadores">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Código</th>
            <th>Premio</th>
          </tr>
        </thead>
        <tbody>
          {/* Ejemplo de filas, puedes mapear datos dinámicos aquí */}
          <tr>
            <td>2024-10-20</td>
            <td>Juan Pérez</td>
            <td>123456789</td>
            <td>AB123</td>
            <td>$500</td>
          </tr>
          <tr>
            <td>2024-10-21</td>
            <td>Ana Gómez</td>
            <td>987654321</td>
            <td>CD456</td>
            <td>$1000</td>
          </tr>
        </tbody>
      </table>
      
      {/* Botón de Salir */}
      <button className="btn-salir" onClick={handleSalir}>Salir</button>
    </div>
  );
}

export default AdminDashboard;
