import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ObtenerRamo } from "../../actions/RamoAction";
import { eliminarRamo } from "../Ramo/eliminarRamo";


const MenuRamo = () => {
  const [ramos, setRamos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ObtenerRamo().then((data) => {
      console.log("Datos recibidos:", data);
  
      if (data.length === 0) {
        navigate("/noDatos");
      } else {
        setRamos(data);
      }
    });
  }, [navigate]);

  return (
    <div style={{ marginTop: '5rem' }}  >
     
     <h1 className="text-center my-4">Listado de Ramo</h1>
      <div className="row mb-4">
        <div className="offset-9 col-3">
          <Link to="/registroRamo" className="btn btn-secondary d-block btn-lg">
            <i className="fa-solid fa-plus"></i> Nuevo Ramo
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-dark">
              <h3 className="text-white"><strong>Lista de Ramos</strong></h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="tblRamos" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre del Ramo</th>
                      <th>Descripción</th>
                      <th>Fecha de Creación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ramos.length > 0 ? (
                      ramos.map((ramo) => (
                        <tr key={ramo.id}>
                          <td>{ramo.id}</td>
                          <td>{ramo.nombreRamos}</td>
                          <td>{ramo.descripcion}</td>
                          <td>{new Date(ramo.fecRegistro).toLocaleDateString()}</td>
                          <td>
                          <Link to={`/actualizarRamo/${ramo.id}`} className="btn btn-warning">
                            <i className="fa-regular fa-pen-to-square"></i> Editar
                          </Link>

                          <Link to={`/menuCobertura/${ramo.nombreRamos}`} className="btn btn-secondary">
                            <i className="fa-regular fa-pen-to-square"></i> Cobertura
                          </Link>
                                                    
                            <button
                              className="btn btn-danger"
                              onClick={() => eliminarRamo(ramo.id)}
                            >
                              <i className="fa-solid fa-eraser"></i> Borrar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
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
