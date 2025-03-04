
import HttpCliente from '../components/servicio/HttpCliente';
import axios from "axios";



export const registrarPoliza = (poliza) => {
  return new Promise((resolve, reject) => {
      HttpCliente.post('https://localhost:7103/api/Polizas', poliza)
          .then(response => {
              resolve(response);
          })
          .catch(error => {
              reject(error);  
          });
  });
}


export const obtenerPolizas = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://localhost:7103/api/Polizas?pageNumber=1&pageSize=3", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const ObtenerCliente = () => {
    return HttpCliente.get('https://localhost:7103/api/Clientes/Lista')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };

  const API_URL = "https://localhost:7103/api/Ramos";

  export async function ObtenerRamoPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el ramo:", error);
      throw error;
    }
  }
  
  export async function ActualizaRamo(ramo) {
    try {
      const response = await axios.patch(`${API_URL}/${ramo.id}`, ramo);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el ramo:", error);
      throw error;
    }
  }