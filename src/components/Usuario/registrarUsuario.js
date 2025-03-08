import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { registrarUsuario } from "../../actions/UsuarioAction";

function CrearUsuario() {
  const [UsuarioC, setUsuario] = useState({
     
      "nombre": "",
      "usuario": "",
      "password": "",
      "rol": 0,
      
    
  })

  const ingresarValores = e => {
    const { name, value } = e.target;
    setUsuario(anterior => ({
      ...anterior,
      [name]: name === "rol" ? Number(value) : value  
    }));
  };

  const registrarUsuarioBtn = e => {
    e.preventDefault();
  
    console.log('Imprimir los valores de los usuarios', UsuarioC);
  
    registrarUsuario(UsuarioC)
      .then(response => {
        console.log('Se registró exitosamente el usuario', response);
        alert("Se registró exitosamente el usuario");
        setUsuario({
          usuario: "",
          password: ""
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
      <h1 className="mb-4 text-center" style={{ fontSize: "26px" }}>
        Crear Usuario
      </h1>

      <div className="card border col-md-6 p-4">
        <div className="card-header bg-dark">
          <h3 className="text-white m-0 text-center">
            <strong>Datos del Usuario</strong>
          </h3>
        </div>

        <div className="card-body">
          <form action="/crear" method="POST">

          <div className="form-group mb-3 text-start">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                value={UsuarioC.nombre}
                onChange={ingresarValores}
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Ingresa el Nombre Completo"
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="usuario">Usuario</label>
              <input
                value={UsuarioC.usuario}
                onChange={ingresarValores}
                type="text"
                id="usuario"
                name="usuario"
                className="form-control"
                placeholder="Ingresa el usuario"
                maxLength="10"  
                onInput={(e) => e.target.value = e.target.value.toUpperCase()}  
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="password">Contraseña</label>
              <input
                value={UsuarioC.password}
                onChange={ingresarValores}
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Ingresa el password"
              />
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="rol">Rol</label>
              <select
                value={UsuarioC.rol}
                onChange={ingresarValores}
                id="rol"
                name="rol"
                className="form-control"
                defaultValue=""
              >
                  <option value="" disabled>Selecciona un rol</option>
                  <option value={0}>Administrador</option>
                  <option value={1}>Cliente</option>
              </select>
            </div>
           

           


            <div className="d-grid">
              <button onClick={registrarUsuarioBtn} className="btn btn-secondary" type="submit">
                <i className="fa-regular fa-user"></i> Agregar
              </button>
             </div>


          </form>

          <div className="mt-3 text-start">
              <NavLink to="/menuUsuario" className="btn btn-link">
                Volver
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
