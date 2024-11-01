// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import './styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [winners, setWinners] = useState([]);

  // Cargar los datos de ganadores cuando el componente se monte
  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await fetch('https://backend-juego.vercel.app/api/intento/ganadores', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Asegúrate de pasar el token de autenticación
          },
        });

        // Agregar este log para ver la respuesta
        const text = await response.text(); 
        console.log('Respuesta del servidor:', text);

        // Aquí intentamos convertir la respuesta a JSON
        const data = JSON.parse(text); // Usamos JSON.parse aquí

        setWinners(data);
      } catch (error) {
        console.error('Error al cargar los ganadores:', error);
      }
    };

    fetchWinners();
  }, []);

  const handleSalir = () => {
    navigate('/admin');
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
            <th>Celular</th>
            <th>Código</th>
            <th>Premio</th>
             
          </tr>
        </thead>
        <tbody>
          {winners.map((winner, index) => (
            <tr key={index}>
              <td>{new Date(winner.fechaHora).toLocaleString()}</td>
              <td>{winner.userInfo.nombre}</td>
              <td>{winner.userInfo.cedula}</td>
              <td>{winner.userInfo.celular}</td>
              <td>{winner.codigo}</td>
              <td>{winner.premio}</td>
               
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-salir" onClick={handleSalir}>Salir</button>
    </div>
  );
}

export default AdminDashboard;
