// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import AdminLogin from './pages/AdminLogin.jsx'; // Importa el login de administrador
import AdminRegister from './pages/AdminRegister.jsx'; // Importa el registro de administrador
import AdminDashboard from './pages/AdminDashboard.jsx'; // Importa el dashboard del admin


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<AdminLogin />} /> {/* Ruta especial para admin */}
        <Route path="/admin/register" element={<AdminRegister />} /> {/* Registro del admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Dashboard del admin */}
      </Routes>
    </div>
  );
}

export default App;