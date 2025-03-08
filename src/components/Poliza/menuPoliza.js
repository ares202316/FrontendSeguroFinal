import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { obtenerPolizas } from "../../actions/PolizaAction";
import { eliminarPoliza } from "../Poliza/eliminarPoliza";

const MenuCliente = () => {
  const [Poliza, setPoliza] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPolizas()
      .then((data) => {
        console.log("Datos recibidos:", data);

        if (data.items.length === 0) {
          navigate("/noDatos");
        } else {
          setPoliza(data.items); 
        }
      })
      .catch((error) => {
        console.error("Error al obtener pólizas:", error);
      });
  }, [navigate]);

  return (
    <div style={{ marginTop: "5rem" }}>
      <h1 className="text-center my-4">Listado de Pólizas</h1>
      <div className="row mb-4">
        <div className="offset-9 col-3">
          <Link to="/registroPoliza" className="btn btn-secondary d-block btn-lg">
            <i className="fa-solid fa-plus"></i> Nueva Póliza
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card border">
            <div className="card-header bg-dark">
              <h3 className="text-white"><strong>Lista de Pólizas</strong></h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="tblPolizas" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Cliente Nombre</th>
                      <th>Corredor Nombre</th>
                      <th>Monto Asegurar</th>
                      <th>Fecha de Registro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Poliza.length > 0 ? (
                      Poliza.map((poliza) => (
                        <tr key={poliza.id}>
                          <td>{poliza.id}</td>
                          <td>{poliza.clienteNombre}</td>
                          <td>{poliza.corredorNombre}</td>
                          <td>{poliza.montoAsegurar}</td>
                          <td>{new Date(poliza.fecRegistro).toLocaleDateString()}</td>
                          <td>
                            <Link to={`/actualizarPoliza/${poliza.id}`} className="btn btn-warning">
                              <i className="fa-regular fa-pen-to-square"></i> Editar
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => eliminarPoliza(poliza.id)}
                            >
                              <i className="fa-solid fa-eraser"></i> Borrar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
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

export default MenuCliente;
