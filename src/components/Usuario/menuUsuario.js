import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Obtenerdatos } from "../../actions/UsuarioAction";
import { eliminar } from "../Usuario/eliminarUsuario";

const MenuUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Obtenerdatos()
      .then((data) => {
        if (data.length === 0) {
          // Redirigir si no hay datos
          navigate("/noDatos");  // Aquí puedes poner la ruta que desees
        } else {
          setUsuarios(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
       
        navigate("/error");  
      });
  }, [navigate]);

  return (
    <div style={{ marginTop: '5rem' }}>
     
     <h1 className="text-center my-4">Listado de Usuarios</h1>
      <div className="row mb-4">
        <div className="offset-9 col-3">
          <Link to="/registrarUsuario" className="btn btn-secondary d-block btn-lg">
            <i className="fa-solid fa-plus"></i> Nuevo Usuario
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-dark">
              <h3 className="text-white"><strong>Lista de Usuarios</strong></h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="tblUsuarios" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Usuario</th>
                      <th>Rol</th>
                      <th>Fecha de Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.length > 0 ? (
                      usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td>{usuario.id}</td>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.usuario}</td>
                          <td>{usuario.rol === 0 ? 'Administrador' : 'Cliente'}</td>
                          <td>{usuario.fecRegistro}</td>
                          <td>
                                                       
                              <button
                                   className="btn btn-danger"
                                 onClick={() => eliminar(usuario.id)}
                                   >
                                 <i className="fa-solid fa-eraser"></i> Borrar
                              </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No hay registros
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuUsuario;
