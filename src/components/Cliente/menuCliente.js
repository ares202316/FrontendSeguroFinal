import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ObtenerCliente } from "../../actions/ClienteAction";
import { eliminarCliente } from "../Cliente/eliminarCliente";


const MenuCliente = () => {
  const [Cliente, setcliente] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ObtenerCliente().then((data) => {
      console.log("Datos recibidos:", data);
  
      if (data.length === 0) {
        navigate("/noDatos");
      } else {
        setcliente(data);
      }
    });
  }, [navigate]);

  return (
    <div style={{ marginTop: '5rem' }}>

  <h1 className="text-center my-4">Listado de Clientes</h1>
  <div className="row mb-4">
    <div className="offset-9 col-3">
      <Link to="/registroCliente" className="btn btn-secondary d-block btn-lg">
        <i className="fa-solid fa-plus"></i> Nuevo Cliente
      </Link>
    </div>
  </div>

  <div className="row">
    <div className="col-12">
      <div className="card border">
        <div className="card-header bg-dark">
          <h3 className="text-white"><strong>Lista de Clientes</strong></h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="tblClientes" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>DNI</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Cliente.length > 0 ? (
                  Cliente.map((cliente) => (
                    <tr key={cliente.id}>
                      <td>{cliente.id}</td>
                      <td>{cliente.nombre} {cliente.apellido}</td>
                      <td>{cliente.dni}</td>
                      <td>{cliente.telefono}</td>
                      <td>
                        {/* Corrigiendo el enlace */}
                        <Link to={`/actualizarCliente/${cliente.id}`} className="btn btn-warning">
                          <i className="fa-regular fa-pen-to-square"></i> Editar
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={() => eliminarCliente(cliente.id)}
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

export default MenuCliente;
