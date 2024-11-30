import { useNavigate } from 'react-router-dom';
import './styles/UserDashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      // Cargar videos del backend
      axios
        .get('https://backend-juego.vercel.app/api/videos', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setVideos(response.data.videos); // Asegúrate de que el backend devuelva un array de videos
        })
        .catch((error) => {
          console.error('Error al cargar los videos:', error);
        });
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button onClick={() => navigate('/')} className="nav-button blue">
          Inicio
        </button>
        <input type="text" placeholder="Buscar..." className="search-input" />
        <button onClick={() => navigate('/upload-video')} className="nav-button blue">
          Subir video
        </button>
        <button onClick={() => navigate('/profile')} className="nav-button blue">
          Mi perfil
        </button>
        <button onClick={() => navigate('/')} className="nav-button red">
          Cerrar sesión
        </button>
      </header>

      <main className="dashboard-main">
        <div className="video-grid">
          {videos.map((video, index) => (
            <div className="video-card" key={index}>
              <video controls>
                <source src={video.url} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
              <h3>{video.titulo}</h3>
              <p>Subido el: {new Date(video.fecha).toLocaleDateString()}</p>
              <p>Subido por: {video.usuario}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
