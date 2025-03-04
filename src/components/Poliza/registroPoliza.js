import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registrarPoliza } from "../../actions/PolizaAction";

function CreaCliente() {
  const [Poliza, setPoliza] = useState({
    
    "clienteId": 0,
    "corredorId": 0,
    "ramoId": 0,
    "montoAsegurar": 0
      
    
  })

  const ingresarValores = e => {
    const { name, value } = e.target;
    setPoliza(anterior => ({
      ...anterior,
      [name]: name === "tipoPersona" ? Number(value) : value    
    }));
  };

  const registrarPolizaBtn = e => {
    e.preventDefault();
  
    console.log('Imprimir los valores de los registro', Poliza);
  
    registrarPoliza(Poliza)
      .then(response => {
        console.log('Se registró exitosamente el registro', response);
        alert("Se registró exitosamente el registro");
        setPoliza({
            
           clienteId: "",
           corredorId: "",
           montoAsegurar: "",
            
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
      <h1 className="mb-4 text-center">Agregar Datos del Póliza</h1>

               
                <div className="mb-4 text-center">
                  
                </div>

                <div className="card border col-lg-8 col-md-10 p-4 shadow">
                  <div className="card-header bg-dark">
                    <h3 className="text-white m-0 text-center">
                      <strong>Datos del Póliza</strong>
                    </h3>
                  </div>
  
      <div className="card-body">
        <form action="/crearCliente" method="POST">
          <div className="row">
           
              <div className="col-md-6 mb-3 text-start">
                <label htmlFor="clienteDni">DNI</label>
                <input
                  type="text"
                  value={Poliza.clienteDni}
                  onChange={ingresarValores}
                  id="clienteDni"
                  name="clienteDni"
                  className="form-control"
                  placeholder="Ingresa el DNI"
                  maxLength="13"
                  minLength="13"
                />
              </div>
    
          
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="corredorCodigo">Código del Corredor</label>
              <input
                type="text"
                value={Poliza.corredorCodigo}
                onChange={ingresarValores}
                id="corredorCodigo"
                name="corredorCodigo"
                className="form-control"
                placeholder="Ingresa el código del corredor"
              />
            </div>
  
            
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="ramoNombre">Nombre del Ramo</label>
              <input
                type="text"
                value={Poliza.ramoNombre}
                onChange={ingresarValores}
                id="ramoNombre"
                name="ramoNombre"
                className="form-control"
                placeholder="Ingresa el nombre del ramo"
              />
            </div>
  
          
            <div className="col-md-6 mb-3 text-start">
              <label htmlFor="montoAsegurar">Monto a Asegurar</label>
              <input
                type="number"
                value={Poliza.montoAsegurar}
                onChange={ingresarValores}
                id="montoAsegurar"
                name="montoAsegurar"
                className="form-control"
                placeholder="Ingresa el monto a asegurar"
              />
            </div>
          </div>
  
          <div className="d-grid mt-3">
            <button onClick={registrarPolizaBtn} className="btn btn-secondary" type="submit">
              <i className="fa-regular fa-user"></i> Agregar Poliza
            </button>
          </div>
        </form>
  
        <div className="mt-3 text-start">
          <a href="/menuPoliza" className="btn btn-link">
            Volver
          </a>
        </div>
      </div>
    </div>

   
  </div>
  


  );
}

export default CreaCliente;
