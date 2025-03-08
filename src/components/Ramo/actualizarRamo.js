import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ObtenerRamoPorId, ActualizaRamo } from "../../actions/RamoAction";
import { NavLink } from "react-router-dom";

function ActualizarRamo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ramo, setRamo] = useState({
    id: 0,
    nombreRamos: "",
    descripcion: "",
    fecRegistro: ""
  });

  useEffect(() => {
    ObtenerRamoPorId(id)
      .then((response) => {
        setRamo(response);  
      })
      .catch((error) => {
        console.error("Error al obtener ramo:", error);
        navigate("/error");
      });
  }, [id, navigate]);

  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setRamo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const enviarActualizacion = (e) => {
    e.preventDefault();

    ActualizaRamo(ramo)
      .then(() => {
        alert("Ramo actualizado correctamente");
        navigate("/menuRamo");
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el ramo");
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">
        Actualizar Ramo
      </h1>

      <div className="card border col-md-6 p-4">
        <div className="card-header bg-dark">
          <h3 className="text-white m-0 text-center">
            <strong>Datos del Ramo</strong>
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={enviarActualizacion}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="nombreRamos">Ramo</label>
              <input
                type="text"
                id="nombreRamos"
                name="nombreRamos"
                value={ramo.nombreRamos}
                onChange={ingresarValores}
                className="form-control"
                placeholder="Ingresa el Ramo"
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={ramo.descripcion}
                onChange={ingresarValores}
                className="form-control"
                placeholder="Ingresa la descripción"
              />
            </div>

            <div className="d-grid">
              <button className="btn btn-secondary" type="submit">
                <i className="fa-regular fa-user"></i> Actualizar
              </button>
            </div>
          </form>

          <div className="mt-3 text-start">
              <NavLink to="/menuRamo" className="btn btn-link">
                Volver
              </NavLink>
           </div>
        </div>
      </div>
    </div>
  );
}

export default ActualizarRamo;
