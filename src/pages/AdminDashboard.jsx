import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [ganadores, setGanadores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGanadores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-juego.vercel.app/api/ganadores', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.data.success) {
          throw new Error('Error al obtener los ganadores');
        }
        
        setGanadores(response.data.ganadores);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchGanadores();
  }, []);
  
  const handleSalir = () => {
    navigate('/admin');
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="ganadores-container">
        <h1 className="title">Ganadores</h1>
        <div className="text-center p-4">Cargando ganadores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ganadores-container">
        <h1 className="title">Ganadores</h1>
        <div className="text-center text-red-600 p-4">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Ganadores</h1>
      <div className="table-container1">
        <table className="table-ganadores">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Celular</th>
              <th>Código</th>
              <th>Premio</th>
            </tr>
          </thead>
          <tbody>
            {ganadores.map((ganador, index) => (
              <tr key={index}>
                <td>{formatearFecha(ganador.fecha)}</td>
                <td>{ganador.nombre}</td>
                <td>{ganador.cedula}</td>
                <td>{ganador.celular}</td>
                <td>{ganador.codigo}</td>
                <td>{ganador.premio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn-salir" onClick={handleSalir}>Salir</button>
    </div>
  );
}

export default AdminDashboard;
