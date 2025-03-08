import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom"; 
import { registrarPoliza } from "../../actions/PolizaAction";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import axios from "axios";

function CreaCliente() {
  const [opciones, setOpciones] = useState([]);
  const [estaCargando, setEstaCargando] = useState(false);

  const [opcionesC, setOpcionesC] = useState([]);
  const [estaCargandoC, setEstaCargandoC] = useState(false);

  const [opcionesR, setOpcionesR] = useState([]);
  const [estaCargandoR, setEstaCargandoR] = useState(false);

  const [clienteId, setClienteId] = useState(0);
  const [corredorId, setCorredorId] = useState(0);
  const [ramoId, setRamoId] = useState(0);

  const navigate = useNavigate();

  function manejarBusqueda(query) {
    if (!query.trim()) return;

    setEstaCargando(true);
    axios
      .get(`https://localhost:7103/api/Clientes/Buscar?nombre=${query}`)
      .then((respuesta) => {
        setOpciones(respuesta.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      })
      .finally(() => {
        setEstaCargando(false);
      });
  }

  function manejarBusquedaCorredor(queryC) {
    if (!queryC.trim()) return;

    setEstaCargandoC(true);
    axios
      .get(`https://localhost:7103/api/Corredores/Buscar?nombre=${queryC}`)
      .then((respuesta) => {
        setOpcionesC(respuesta.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      })
      .finally(() => {
        setEstaCargandoC(false);
      });
  }

  function manejarBusquedaRamo(queryC) {
    if (!queryC.trim()) return;

    setEstaCargandoR(true);
    axios
      .get(`https://localhost:7103/api/Ramos/Buscar?nombre=${queryC}`)
      .then((respuesta) => {
        setOpcionesR(respuesta.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      })
      .finally(() => {
        setEstaCargandoR(false);
      });
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-4 text-center">Agregar Datos de la Póliza</h1>

      <Formik
            initialValues={{
              clienteId: 0,
              corredorId: 0,
              ramoId: 0,
              montoAsegurar: ""
            }}
            validationSchema={Yup.object({
              clienteId: Yup.string().required("Este campo es requerido"),
              corredorId: Yup.string().required("Este campo es requerido"),
              ramoId: Yup.string().required("Este campo es requerido"),
              montoAsegurar: Yup.number()
                .positive("Debe ser un número positivo")
                .required("Este campo es requerido"),
            })}
            onSubmit={(values, { resetForm }) => {
              console.log("Enviando a la BD:", values);
              registrarPoliza(values)
                .then(response => {
                  console.log("Registro exitoso:", response);
                  alert("Se registró exitosamente el registro");
                  resetForm();
                  navigate('/menuPoliza'); 
                })
                .catch(error => {
                  console.error("Error al registrar:", error);
                  alert("No debe dejar campos vacios");
                });
            }}
          >
            {({ setFieldValue }) => (
              <Form className="card border col-md-6 p-4">
                <div className="card-header bg-dark">
                  <h3 className="text-white m-0 text-center">
                    <strong>Datos de la Póliza</strong>
                  </h3>
                </div>

                <div className="card-body">
                  <div className="form-group mb-3 text-start">
                    <label htmlFor="clienteId">Cliente</label>
                    <AsyncTypeahead
                      id="clienteId"
                      name="clienteId"
                      onChange={clientes => {
                        if (clientes.length > 0) {
                          setFieldValue("clienteId", clientes[0].id);
                        }
                      }}
                      options={opciones}
                      labelKey={(option) => `Id:${option.id} DNI: ${option.dni} Nombre: ${option.nombre} ${option.apellido}`}
                      filterBy={() => true}
                      isLoading={estaCargando}
                      onSearch={manejarBusqueda}
                      placeholder="Escriba el cliente"
                      minLength={1}
                    />
                    <ErrorMessage name="clienteId" component="div" className="text-danger" />
                  </div>

                  <div className="form-group mb-3 text-start">
                    <label htmlFor="corredorId">Corredor</label>
                    <AsyncTypeahead
                      id="corredorId"
                      onChange={corredores => {
                        if (corredores.length > 0) {
                          setFieldValue("corredorId", corredores[0].id); // Actualiza el corredorId
                        }
                      }}
                      options={opcionesC}
                      labelKey={(option) => `Codigo: ${option.codCorredor} Nombre: ${option.nombre} ${option.apellido}`}
                      filterBy={() => true}
                      isLoading={estaCargandoC}
                      onSearch={manejarBusquedaCorredor}
                      placeholder="Escriba el corredor"
                      minLength={1}
                    />
                    <ErrorMessage name="corredorId" component="div" className="text-danger" />
                  </div>

                  <div className="form-group mb-3 text-start">
                    <label htmlFor="ramoId">Nombre del Ramo</label>
                    <AsyncTypeahead
                      id="ramoId"
                      name="ramoId"
                      onChange={ramos => {
                        if (ramos.length > 0) {
                          setFieldValue("ramoId", ramos[0].id); 
                        }
                      }}
                      options={opcionesR}
                      labelKey={(option) => `Tipo de Ramo: ${option.nombreRamos}`}
                      filterBy={() => true}
                      isLoading={estaCargandoR}
                      onSearch={manejarBusquedaRamo}
                      placeholder="Escriba el ramo"
                      minLength={1}
                    />
                    <ErrorMessage name="ramoId" component="div" className="text-danger" />
                  </div>

                  <div className="form-group mb-3 text-start">
                    <label htmlFor="montoAsegurar">Monto a Asegurar</label>
                    <Field type="number" id="montoAsegurar" name="montoAsegurar" className="form-control" placeholder="Ingresa el monto a asegurar" />
                    <ErrorMessage name="montoAsegurar" component="div" className="text-danger" />
                  </div>

                  <div className="d-grid">
                    <button  className="btn btn-secondary" type="submit">
                      <i className="fa-regular fa-user"></i> Agregar Póliza
                    </button>
                  </div>

                  <div className="mt-3 text-start">
                    <NavLink to="/menuPoliza" className="btn btn-link">
                      Volver
                    </NavLink>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
    </div>
  );
}

export default CreaCliente;
