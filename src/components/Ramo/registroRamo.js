import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { registrarRamo } from "../../actions/RamoAction";

function CrearRamo() {

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">
        Crear Ramo
      </h1>

      <Formik
        initialValues={{
          nombreRamos: '',
          descripcion: ''
        }}
        validationSchema={Yup.object({
          nombreRamos: Yup.string()
            .required('Este campo es requerido'),
           
          descripcion: Yup.string()
            .required('Este campo es requerido')
            .max(50, "La longitud máxima de caracteres es de 50")
        })}
        onSubmit={(values, { resetForm }) => {
          console.log('Enviando a la BD:', values);

          registrarRamo(values)
            .then(response => {
              console.log('Registro exitoso:', response);
              alert("Se registró exitosamente el registro");
              resetForm(); 
            })
            .catch(error => {
              console.error('Error al registrar:', error);
              alert(`Ya existe el nombre: ${values.nombreRamos}`);
            });
        }}
      >
        <Form className="card border col-md-6 p-4">
          <div className="card-header bg-dark">
            <h3 className="text-white m-0 text-center">
              <strong>Datos del Ramo</strong>
            </h3>
          </div>

          <div className="card-body">

            <div className="form-group mb-3 text-start">
              <label htmlFor="nombreRamos">Ramo</label>
              <Field
                type="text"
                id="nombreRamos"
                name="nombreRamos"
                className="form-control"
                placeholder="Ingresa el Ramo"
              />
              <ErrorMessage name="nombreRamos">
                {mensaje => <div className="text-danger">{mensaje}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group mb-3 text-start">
              <label htmlFor="descripcion">Descripción</label>
              <Field
                type="text"
                id="descripcion"
                name="descripcion"
                className="form-control"
                placeholder="Ingresa la descripción"
              />
              <ErrorMessage name="descripcion">
                {mensaje => <div className="text-danger">{mensaje}</div>}
              </ErrorMessage>
            </div>

            <div className="d-grid">
              <button className="btn btn-secondary" type="submit">
                <i className="fa-regular fa-user"></i> Agregar
              </button>
            </div>

            <div className="mt-3 text-start">
              <NavLink to="/menuRamo" className="btn btn-link">
                Volver
              </NavLink>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CrearRamo;
