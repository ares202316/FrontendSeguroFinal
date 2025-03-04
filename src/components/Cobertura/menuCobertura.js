import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Obtenernombre } from "../../actions/CoberturaAction";
import { eliminar } from "../Cobertura/eliminarCobertura";

const MenuCobertura = () => {
  const [cobertura, setCobertura] = useState([]);
  const navigate = useNavigate();
  const { nombre } = useParams();


  
  useEffect(() => {
    
    Obtenernombre(nombre).then((data) => {
      console.log("Datos recibidos:", data);
      setCobertura(data);
    });

  
     


  }, [navigate, nombre]);

  return (
    <div style={{ marginTop: '5rem' }}>

      <h1 className="text-center my-4">Listado de Cobertura</h1>
      <div className="row mb-4">
        <div className="offset-9 col-3">
         
          <Link to={`/agregarCobertura/${nombre}`} className="btn btn-secondary">
            <i className="fa-regular fa-pen-to-square"></i> Nueva Cobertura
          </Link>
          
        </div>
        <div className="mt-3 text-start">
        <a href="/menuRamo" className="btn btn-close">
          
        </a>
      </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-dark">
              <h3 className="text-white">
                <strong>Lista de Coberturas</strong>
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="tblCoberturas" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre de la Cobertura</th>
                      <th>Descripción</th>
                      <th>Deducible</th>
                      <th>Fecha de Creación</th>
                      <th>Ramo Asociado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cobertura.length > 0 ? (
                      cobertura.map((cobertura) => (
                        <tr key={cobertura.id}>
                          <td>{cobertura.id}</td>
                          <td>{cobertura.nombreCobertura}</td>
                          <td>{cobertura.descripcion}</td>
                          <td>{cobertura.deducible.toLocaleString()}</td>
                          <td>{new Date(cobertura.fecRegistro).toLocaleDateString()}</td>
                          <td>{nombre}</td>
                          <td>
                            <Link to={`/actualizarCoberturas/${cobertura.id}`} className="btn btn-warning mb-1">
                              <i className="fa-regular fa-pen-to-square"></i> Editar
                            </Link>
                            <button
                                className="btn btn-danger"
                              onClick={() => eliminar(cobertura.id)}
                               >
                              <i className="fa-solid fa-eraser"></i> Borrar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">No hay registros</td>
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

export default MenuCobertura;
