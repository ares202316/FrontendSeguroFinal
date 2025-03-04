import React, { useState } from "react";
import { loginUsuario } from "../../actions/UsuarioAction";
import { useNavigate } from "react-router-dom"; 

function Login() {

  
  const [UsuarioC, setUsuario] = useState({
    usuario: "",
    password: ""
  });
  const navigate = useNavigate(); 

  const ingresarValores = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const LoginUsuario = (e) => {
    e.preventDefault(); 

    console.log("Imprimir los valores de los usuarios", UsuarioC);

    loginUsuario(UsuarioC)
      .then((response) => {
        console.log("Ingreso Exitosamente", response);

      
        
    localStorage.setItem("token", response.data.result.token);
    localStorage.setItem("usuario", JSON.stringify(response.data.result.usuario));

        
        alert("Ingreso exitoso");

       
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Hubo un problema al ingresar el usuario:", error);

        
        setUsuario({
          usuario: "",
          password: ""
        });

        if (error.response && error.response.data && error.response.data.ErrorMessages) {
          alert(error.response.data.ErrorMessages.join(", "));
        } else {
          alert("El usuario o contraseña son incorrectos.");
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg" style={{ width: "20rem" }}>
        <div className="card-body text-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/lock-2.png" 
            alt="Logo Candado"
            style={{ width: "50px", marginBottom: "20px" }}
          />
          <h4 className="mb-3">Iniciar Sesión</h4>

          <form>
            <div className="mb-3 text-start">
              <label htmlFor="usuario" className="form-label">Usuario</label>
              <input
                type="text"
                id="usuario"
                value={UsuarioC.usuario}
                onChange={ingresarValores}
                name="usuario"
                className="form-control"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                value={UsuarioC.password}
                onChange={ingresarValores}
                id="password"
                name="password"
                className="form-control"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button type="submit" onClick={LoginUsuario} className="btn btn-primary w-100">Iniciar sesión</button>

            <div className="mt-3 text-start">
              <a href="/" className="btn btn-secondary">
                Volver
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
