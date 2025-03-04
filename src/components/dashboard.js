import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [rol, setRol] = useState(null);

  useEffect(() => {
    const usuarioData = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioData) {
      setRol(usuarioData.rol);
      console.log("Rol cargado:", usuarioData.rol); 
    } else {
      console.log("No hay usuario en localStorage");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario"); 
    navigate("/login");
  };

  const isAuthenticated = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">SEGUROS</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav">
            {rol === 0 && (
              <>
                <li className="nav-item">
                  <Link to="/menuRamo" className="nav-link">Seguro</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menuUsuario" className="nav-link">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menuCliente" className="nav-link">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/menuCorredor" className="nav-link">Corredores</Link>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link to="/menuPoliza" className="nav-link">Poliza</Link>
            </li>
          </ul>

          <div className="d-flex ms-auto">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn btn-light">Cerrar sesión</button>
            ) : (
              <Link to="/login" className="btn btn-light">Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Dashboard;
