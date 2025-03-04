import React, { useState } from "react";

import { registrarCliente } from "../../actions/ClienteAction";

function CreaCliente() {
  const [Cliente, setCliente] = useState({
    
    "id": 0,
    "nombre": "",
    "apellido": "",
    "dni": "",
    "rtn": "",
    "fecNacimiento": "",
    "tipoPersona": 0,
    "celular": "",
    "telefono": "",
    "email": "",
    "direccion": "",
    "fecRegistro": "2025-03-04T06:03:22.090Z"
      
    
  })

  const ingresarValores = e => {
    const { name, value } = e.target;
    setCliente(anterior => ({
      ...anterior,
      [name]: name === "tipoPersona" ? Number(value) : value    
    }));
  };

  const registrarClienteBtn = e => {
    e.preventDefault();
  
    console.log('Imprimir los valores de los registro', Cliente);
  
    registrarCliente(Cliente)
      .then(response => {
        console.log('Se registró exitosamente el registro', response);
        alert("Se registró exitosamente el registro");
        setCliente({
            id: 0,
            nombre: "",
            apellido: "",
            dni: "",
            rtn: "",
            fecNacimiento: "",
            tipoPersona: 0,
            celular: "",
            telefono: "",
            email: "",
            direccion: "",
            fecRegistro: "2025-03-04T06:03:22.090Z"
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
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-5">
    <h1 className="mb-4 text-center">
      
    </h1>
  
    <div className="card border col-lg-8 col-md-10 p-4 shadow">
      <div className="card-header bg-dark">
        <h3 className="text-white m-0 text-center">
          <strong>Datos del Cliente</strong>
        </h3>
      </div>
  
      <div className="card-body">
        <form action="/crearCliente" method="POST">
          <div className="row">
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                value={Cliente.nombre}
                onChange={ingresarValores}
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Ingresa el nombre"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                value={Cliente.apellido}
                onChange={ingresarValores}
                id="apellido"
                name="apellido"
                className="form-control"
                placeholder="Ingresa el apellido"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                value={Cliente.dni}
                onChange={ingresarValores}
                id="dni"
                name="dni"
                className="form-control"
                placeholder="Ingresa el DNI"
                maxLength="13"
              minLength="13"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="rtn">RTN</label>
              <input
                type="text"
                value={Cliente.rtn}
                onChange={ingresarValores}
                id="rtn"
                name="rtn"
                className="form-control"
                placeholder="Ingresa el RTN"
                maxLength="14"
              minLength="14"
              />
            </div>
  
           
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="fecNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                value={Cliente.fecNacimiento}
                onChange={ingresarValores}
                id="fecNacimiento"
                name="fecNacimiento"
                className="form-control"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="tipoPersona">Tipo de Persona</label>
              <select
                value={Cliente.tipoPersona}
                onChange={ingresarValores}
                id="tipoPersona"
                name="tipoPersona"
                className="form-control"
              >
                <option value="">Selecciona una opción</option>
                <option value={0}>Natural</option>
                <option value={1}>Jurídico</option>
              </select>
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="celular">Celular</label>
              <input
                type="text"
                value={Cliente.celular}
                onChange={ingresarValores}
                id="celular"
                name="celular"
                className="form-control"
                placeholder="Ingresa el celular"
                maxLength="8"
              minLength="8"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                value={Cliente.telefono}
                onChange={ingresarValores}
                id="telefono"
                name="telefono"
                className="form-control"
                placeholder="Ingresa el teléfono"
                maxLength="8"
              minLength="8"
              />
            </div>
  
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                value={Cliente.email}
                onChange={ingresarValores}
                id="email"
                name="email"
                className="form-control"
                placeholder="Ingresa el correo"
              />
            </div>
  
            <div className="col-12 mb-3 text-start">
              <label htmlFor="direccion">Dirección</label>
              <input
                type="text"
                value={Cliente.direccion}
                onChange={ingresarValores}
                id="direccion"
                name="direccion"
                className="form-control"
                placeholder="Ingresa la dirección"
              />
            </div>
          </div>
  
          <div className="d-grid mt-3">
            <button onClick={registrarClienteBtn} className="btn btn-secondary" type="submit">
              <i className="fa-regular fa-user"></i> Agregar Cliente
            </button>
          </div>
        </form>
  
        <div className="mt-3 text-start">
          <a href="/menuCliente" className="btn btn-link">
            Volver
          </a>
        </div>
      </div>
    </div>
  </div>
  


  );
}

export default CreaCliente;
