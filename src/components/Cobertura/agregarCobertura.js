import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { registrar, ObtenerIDporNombre } from "../../actions/CoberturaAction";
import { NavLink } from "react-router-dom";

function CrearCobertura() {
  const { nombre } = useParams();
 
  const [Cobertura, setCobertura] = useState({
    nombreCobertura: "",
    ramoId: 0,  
    descripcion: "",
    deducible: 0
  });

  useEffect(() => {
    console.log('Nombre recibido en AgregarCobertura:', nombre);
  
    ObtenerIDporNombre(nombre).then((respuesta) => {
      console.log("Respuesta completa:", respuesta);
      const id = respuesta.ramoId; 
      console.log("ID del ramo:", id);
  
      setCobertura((anterior) => ({
        ...anterior,
        ramoId: id
      }));
    });
  }, [nombre]);


  const ingresarValores = (e) => {
    const { name, value } = e.target;
  
    setCobertura((anterior) => ({
      ...anterior,
      [name]: name === "deducible" ? parseFloat(value) || 0 : value
    }));
  };

   const registrarBtn = e => {
     e.preventDefault();
   
     console.log('Imprimir los valores de las coberturas', Cobertura);
   
     registrar(Cobertura)
       .then(response => {
         console.log('Se registró exitosamente la cobertura', response);
         alert("Se registró exitosamente la cobertura");
         setCobertura({
          nombreCobertura: "",
          ramoId: 0,  
          descripcion: "",
          deducible: 0
        });
       })
       .catch(error => {
         console.error('Hubo un problema al registrar el usuario: ', error);
   
        
         if (error.response && error.response.data && error.response.data.ErrorMessages) {
          
           alert(error.response.data.ErrorMessages.join(", "));
         } else {
           alert("No dejar nombres vacios y tampaco repetidos.");
         }
       });
   };
 

  const registrarCoberturaBtn = e => {
    e.preventDefault();

    console.log('Imprimir los valores de los ramos', Cobertura);

    registrar(Cobertura)
      .then(response => {
        console.log('Se registró exitosamente la cobertura', response);
      })
      .catch(error => {
        console.error('Hubo un problema al registrar la cobertura:', error);

        if (error.response && error.response.data && error.response.data.ErrorMessages) {
          alert(error.response.data.ErrorMessages.join(", "));
        } else {
          alert("");
        }
      });
  };
 
  return (
<div className="container d-flex flex-column justify-content-center align-items-center vh-100">
  <h1 className="mb-4 text-center">Crear Cobertura</h1>

  <div className="card border col-md-6 p-4">
    <div className="card-header bg-dark">
      <h3 className="text-white m-0 text-center">
        <strong>Datos de la Cobertura</strong>
      </h3>
    </div>

    <div className="card-body">
      <form action="/crearCobertura" method="POST">
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
            <label htmlFor="deducible">Deducible %</label>
            <input
              input="number"
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
          <button
            onClick={registrarCoberturaBtn}
            className="btn btn-secondary"
            type="submit"
          >
            <i className="fa-solid fa-floppy-disk" onClick={registrarBtn}></i> Guardar Cobertura
          </button>
        </div>
      </form>

      <div className="mt-3 text-start">
              <NavLink to="/menuCobertura" className="btn btn-link">
                Volver
              </NavLink>
       </div>
    </div>
  </div>
</div>




  );
}

export default CrearCobertura;
