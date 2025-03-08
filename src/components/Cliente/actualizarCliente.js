import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ActualizaCliente, ObtenerClientePorId } from "../../actions/ClienteAction";

function ActualizarCorredor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Corredor, setCorredor] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    rtn: "",  
    fecNacimiento: "",
    tipoPersona: "Natural",  // Puede ser 'Natural' o 'Juridico'
    celular: "",
    telefono: "",
    email: "",
    direccion: "",
  });

  useEffect(() => {
    ObtenerClientePorId.then((response) => {
        setCorredor(response);
      })
      .catch((error) => {
        console.error("Error al obtener corredor:", error);
        navigate("/error");
      });
  }, [id, navigate]);

  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setCorredor((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const registratBtn = (e) => {
    e.preventDefault();

    console.log('Imprimir los valores de los registro', Corredor);

    ActualizaCliente(Corredor)
      .then((response) => {
        console.log('Se registró exitosamente el registro', response);
        alert("Se registró exitosamente el registro");
        navigate("/menuCorredor");
      })
      .catch((error) => {
        console.error('Hubo un problema al registrar el registro:', error);

        if (error.response && error.response.data && error.response.data.ErrorMessages) {
          alert(error.response.data.ErrorMessages.join(", "));
        } else {
          alert("No puede dejar campos vacíos, el DNI no puede repetirse e igual correo.");
        }
      });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">Actualizar Corredor</h1>

      <div className="card border col-md-6 p-4">
        <div className="card-header bg-dark">
          <h3 className="text-white m-0 text-center"><strong>Datos del Corredor</strong></h3>
        </div>

        <div className="card-body">
          <form action="/actualizar" method="POST">
            <div className="form-group mb-3 text-start">
              <label htmlFor="nombre">Nombre</label>
              <input
                value={Corredor.nombre}
                onChange={ingresarValores}
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Ingresa el nombre"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="apellido">Apellido</label>
              <input
                value={Corredor.apellido}
                onChange={ingresarValores}
                type="text"
                id="apellido"
                name="apellido"
                className="form-control"
                placeholder="Ingresa el apellido"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="dni">DNI</label>
              <input
                value={Corredor.dni}
                onChange={ingresarValores}
                type="text"
                id="dni"
                name="dni"
                className="form-control"
                placeholder="Ingresa tu DNI"
                maxLength="13"
                minLength="13"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="rtn">RTN</label>
              <input
                value={Corredor.rtn}
                onChange={ingresarValores}
                type="text"
                id="rtn"
                name="rtn"
                className="form-control"
                placeholder="Ingresa el RTN"
                maxLength="14"
                minLength="14"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="fecNacimiento">Fecha de Nacimiento</label>
              <input
                value={Corredor.fecNacimiento}
                onChange={ingresarValores}
                type="date"
                id="fecNacimiento"
                name="fecNacimiento"
                className="form-control"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="tipoPersona">Tipo de Persona</label>
              <select
                value={Corredor.tipoPersona}
                onChange={ingresarValores}
                id="tipoPersona"
                name="tipoPersona"
                className="form-control"
                required
              >
                <option value="Natural">Natural</option>
                <option value="Juridico">Juridico</option>
              </select>
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="celular">Celular</label>
              <input
                value={Corredor.celular}
                onChange={ingresarValores}
                type="text"
                id="celular"
                name="celular"
                className="form-control"
                placeholder="Ingresa el celular"
                maxLength="8"
                minLength="8"
                required
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="telefono">Teléfono</label>
              <input
                value={Corredor.telefono}
                onChange={ingresarValores}
                type="text"
                id="telefono"
                name="telefono"
                className="form-control"
                placeholder="Ingresa el teléfono"
                maxLength="8"
                minLength="8"
                required
              />
            </div>

            <div className="form-group mb-4 text-start">
              <label htmlFor="email">Email</label>
              <input
                value={Corredor.email}
                onChange={ingresarValores}
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Ingresa el Email"
                required
              />
            </div>

            <div className="form-group mb-4 text-start">
              <label htmlFor="direccion">Dirección</label>
              <input
                value={Corredor.direccion}
                onChange={ingresarValores}
                type="text"
                id="direccion"
                name="direccion"
                className="form-control"
                placeholder="Ingresa la dirección"
                required
              />
            </div>

            <div className="d-grid">
              <button onClick={registratBtn} className="btn btn-secondary" type="submit">
                <i className="fa-regular fa-user"></i> Actualizar
              </button>
            </div>
          </form>

          <div className="mt-3 text-start">
            <NavLink to="/menuCorredor" className="btn btn-link">
              Volver
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActualizarCorredor;
