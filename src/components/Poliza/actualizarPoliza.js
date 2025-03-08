import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ObtenerPolizaPorId, ActualizaPoliza } from "../../actions/PolizaAction";
import { NavLink } from "react-router-dom";

function ActualizarPoliza() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

   const [poliza, setPoliza] = useState({
     id: 0,
     montoAsegurar:0
   });


  useEffect(() => {
    ObtenerPolizaPorId(id)
      .then((response) => {
        setPoliza(response ); 
      })
      .catch((error) => {
        console.error("Error al obtener la póliza:", error);
        
        
      });
  }, [id]);

 
  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setPoliza((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const enviarActualizacion = (e) => {
    e.preventDefault();

    
    ActualizaPoliza({ poliza })
      .then(() => {
        alert("Monto asegurado actualizado correctamente");
        navigate("/menuPoliza");
      })
      .catch((error) => {
        console.error("Error al actualizar la póliza:", error);
        alert("Error al actualizar el monto asegurado");
      });
  };

  

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">Actualizar Monto Asegurar</h1>
      <h4 className="mb-4 text-center">Solo está permitido cambiar el monto</h4>
      <div className="card border col-md-6 p-4">
        <div className="card-header bg-dark">
          <h3 className="text-white m-0 text-center">
            <strong>Actualizar Monto Asegurar</strong>
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={enviarActualizacion}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="montoAsegurar">Monto Asegurar</label>
              <input
                type="number"
                id="montoAsegurar"
                name="montoAsegurar"
                value={poliza.montoAsegurar}
                onChange={ingresarValores}
                className="form-control"
                placeholder="Ingresa el monto a asegurar"
              />
            </div>

            <div className="d-grid">
              <button className="btn btn-secondary" type="submit">
                <i className="fa-regular fa-user"></i> Actualizar
              </button>
            </div>
          </form>

          <div className="mt-3 text-start">
            <NavLink to="/menuPoliza" className="btn btn-link">
              Volver
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActualizarPoliza;
