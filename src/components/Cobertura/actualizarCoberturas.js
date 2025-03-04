import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Actualizar, ObtenerId } from "../../actions/CoberturaAction";

function ActualizarCoberturas() {
  const { id } = useParams();
  const navigate = useNavigate();
 
  const [Cobertura, setCobertura] = useState({
    "id": 0,
    "nombreCobertura": "",
    "descripcion": "",
    "deducible": 0,
    "fecRegistro": ""

  });

  useEffect(() => {

    console.log('Imprimir los valores de los Coberturas', Cobertura);

    ObtenerId(id)
      .then((response) => {
        setCobertura(response);  
      })
      .catch((error) => {
        console.error("Error al obtener ramo:", error);
        navigate("/error");
      });

     
  }, [id, navigate]);

  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setCobertura((prev) => ({
      ...prev,
      [name]: name === "deducible" ? parseFloat(value) || 0 : value
    }));
  };

  const enviarActualizacion = (e) => {
    e.preventDefault();

    Actualizar(Cobertura)
      .then(() => {
        alert("Cobertura actualizado correctamente");
        navigate("/menuRamo");
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        alert("Error al actualizar el Cobertura");
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">Actualizar Cobertura</h1>

      <div className="card border col-md-6 p-4">
        <div className="card-header bg-dark">
          <h3 className="text-white m-0 text-center">
            <strong>Datos de la Cobertura</strong>
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={enviarActualizacion}>
            <div className="form-group mb-3 text-start">
              <label htmlFor="nombreCobertura">Nombre de la Cobertura</label>
              <input
                type="text"
                id="nombreCobertura"
                name="nombreCobertura"
                className="form-control"
                placeholder="Ingresa el nombre de la cobertura"
                value={Cobertura.nombreCobertura}
                onChange={ingresarValores}
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                name="descripcion"
                className="form-control"
                placeholder="Ingresa la descripción de la cobertura"
                maxLength="200"
                value={Cobertura.descripcion}
                onChange={ingresarValores}
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="deducible">Deducible</label>
              <input
                type="number"
                id="deducible"
                name="deducible"
                className="form-control"
                placeholder="Ingresa el deducible"
                value={Cobertura.deducible}
                onChange={ingresarValores}
                step="0.01"
                min="0"
                max="99"
              />
            </div>

            <div className="d-grid">
              <button className="btn btn-secondary" type="submit">
                <i className="fa-solid fa-floppy-disk"></i> Guardar Cobertura
              </button>
            </div>
          </form>

          <div className="mt-3 text-start">
            <a href="/menuRamo" className="btn btn-link">
              Volver
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActualizarCoberturas;
