import React, { useState } from "react";

import { registrarRamo } from "../../actions/RamoAction";

function CrearRamo() {
  const [Ramo, setRamo] = useState({
     
      "nombreRamos": "",
       "descripcion": "",
  
      
    
  })

  const ingresarValores = e => {
    const { name, value } = e.target;
    setRamo(anterior => ({
      ...anterior,
      [name]: value  
    }));
  };

  const registrarRamoBtn = e => {
    e.preventDefault();
  
    console.log('Imprimir los valores de los ramos', Ramo);
  
    registrarRamo(Ramo)
      .then(response => {
        console.log('Se registró exitosamente el usuario', response);
        alert("Se registró exitosamente el registro");
        setRamo({
          nombreRamos: "",
          descripcion: ""
        });

      })
      .catch(error => {
        console.error('Hubo un problema al registrar el usuario:', error);
  
       
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
      Crear Ramo
    </h1>

    <div className="card border col-md-6 p-4">
      <div className="card-header bg-dark">
        <h3 className="text-white m-0 text-center">
          <strong>Datos del Ramo</strong>
        </h3>
      </div>

      <div className="card-body">
        <form action="/crear" method="POST">
          <div className="form-group mb-3 text-start">
            <label htmlFor="nombreRamos">Ramo</label>
            <input
              type="text"
              value={Ramo.nombreRamos}
              onChange={ingresarValores}
              id="nombreRamos"
              name="nombreRamos"
              className="form-control"
              placeholder="Ingresa el Ramo"
            />
          </div>

          <div className="form-group mb-3 text-start">
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              value={Ramo.descripcion}
              onChange={ingresarValores}
              id="descripcion"
              name="descripcion"
              className="form-control"
              placeholder="Ingresa la descripción"
            />
          </div>
          
          <div className="d-grid">
            <button onClick={registrarRamoBtn} className="btn btn-secondary" type="submit">
              <i className="fa-regular fa-user"></i> Agregar
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

export default CrearRamo;
