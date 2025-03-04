import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Obtenerdatos } from "../../actions/CorredorAction";
import { eliminar } from "../Corredor/eliminarCorredor";

const MenuRamo = () => {
  const [Corredor, setCorredor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Obtenerdatos()
      .then((data) => {
        if (data.length === 0) {
         
          navigate("/noDatos");  
        } else {
          setCorredor(data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener registro:", error);
       
        navigate("/error");  
      });
  }, [navigate]);

  return (
    <div style={{ marginTop: '5rem' }} >
      <h1 className="text-center my-4">Listado de Corredor</h1>

      <div className="row mb-4">
        <div className="offset-9 col-3">
          <Link to="/registrarCorredor" className="btn btn-secondary d-block btn-lg">
            <i className="fa-solid fa-plus"></i> Nuevo Corredor
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-dark">
              <h3 className="text-white"><strong>Lista de Corredores</strong></h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="tblClientes" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Celular</th>
                      <th>Email</th>
                      <th>Código de Corredor</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Corredor.length > 0 ? (
                      Corredor.map((corredor) => (
                        <tr key={corredor.id}>
                          <td>{corredor.id}</td>
                          <td>{corredor.nombre}</td>
                          <td>{corredor.apellido}</td>
                          <td>{corredor.dni}</td>
                          <td>{corredor.celular}</td>
                          <td>{corredor.email}</td>
                          <td>{corredor.codCorredor}</td>
                          <td>
                            <Link to={`/actualizarCorrredores/${corredor.id}`} className="btn btn-warning">
                               <i className="fa-regular fa-pen-to-square"></i> Editar
                            </Link>
                             <button
                             className="btn btn-danger"
                             onClick={() => eliminar(corredor.id)}
                             >
                             <i className="fa-solid fa-eraser"></i> Borrar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
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

export default MenuRamo;
