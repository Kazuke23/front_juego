import React from 'react';
import './styles/AdminDashboard.css'; // Estilos específicos para el login de administrador

const AdminDashboard = () => {
    return (
        <div className="table-container">
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Cédula</th>
                        <th>Celular</th>
                        <th>Código</th>
                        <th>Premio</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí se agregarán las filas dinámicamente más adelante */}
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => alert('Salir')} style={{ padding: '5px 10px', marginTop: '10px' }}>
                Salir
            </button>
        </div>
    );
};

export default AdminDashboard;
