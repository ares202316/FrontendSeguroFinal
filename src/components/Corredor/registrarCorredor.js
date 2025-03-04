import React, { useState } from "react";

import { registrar } from "../../actions/CorredorAction";

function CrearCorredor() {
  const [Corredor, setCorredor] = useState({
     
    "nombre": "",
    "apellido": "",
    "dni": "",
    "celular": "",
    "email": "",
    "codCorredor": ""
    
    
  })

  const ingresarValores = e => {
    const { name, value } = e.target;
    setCorredor(anterior => ({
      ...anterior,
      [name]: name === "rol" ? Number(value) : value  
    }));
  };

  const registratBtn = e => {
    e.preventDefault();
  
    console.log('Imprimir los valores de los registro', Corredor);
  
    registrar(Corredor)
      .then(response => {
        console.log('Se registró exitosamente el registro', response);
        alert("Se registró exitosamente el registro");
        setCorredor({
          nombre: "",
          apellido: "",
          dni: "",
          email: "",
          codCorredor: ""

        });
      })
      .catch(error => {
        console.error('Hubo un problema al registrar el registro:', error);
  
       
        if (error.response && error.response.data && error.response.data.ErrorMessages) {
         
          alert(error.response.data.ErrorMessages.join(", "));
        } else {
          alert("Hubo un error en el registro.");
        }
      });
  };

 
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
    <h1 className="mb-4 text-center" >
      Crear Corredor
    </h1>

    <div className="card border col-md-6 p-4">
      <div className="card-header bg-dark">
        <h3 className="text-white m-0 text-center">
          <strong>Datos del Corredor</strong>
        </h3>
      </div>

      <div className="card-body">
        <form action="/crear" method="POST">
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
            />
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="Celular">Celular</label>
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
            />
          </div>

          <div className="form-group mb-4 text-start">
            <label htmlFor="Email">Email</label>
            <input
            value={Corredor.email}
            onChange={ingresarValores}
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Ingresa el Email"
            />
          </div>

          <div className="d-grid">
            <button  onClick={registratBtn} className="btn btn-secondary" type="submit">
              <i className="fa-regular fa-user"></i> Agregar
            </button>
          </div>
        </form>

        <div className="mt-3 text-start">
          <a href="/menuCorredor" className="btn btn-link">
            Volver
          </a>
        </div>
      </div>
    </div>
  </div>


  );
}

export default CrearCorredor;
