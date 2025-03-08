import HttpCliente from '../components/servicio/HttpCliente';
import axios from "axios";

export const registrar = (registro) => {
  return new Promise((resolve, reject) => {
      HttpCliente.post('https://localhost:7103/api/Corredores', registro)
          .then(response => {
              resolve(response);
          })
          .catch(error => {
              reject(error);  
          });
  });
}

const API_URL = "https://localhost:7103/api/Corredores";


export async function ObtenerId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el ramo:", error);
    throw error;
  }
}






  export async function Obtenerdatos() {
    try {
      const response = await axios.get(`https://localhost:7103/api/Corredores`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el registro:", error);
      throw error;
    }
  }
  
  export async function ObtenerIDporNombre(nombre) {
    try {
        const response = await axios.get(`https://localhost:7103/api/Cobertura/GetCoberturaId/${nombre}`);
        return response.data 
    } catch (error) {
        console.error("Error al obtener el ID de cobertura:", error);
        throw error;
    }
}
  
  export async function Actualizar(corredor) {
    try {
      const response = await axios.patch(`${API_URL}/${corredor.id}`, corredor);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el registro:", error);
      throw error;
    }
  }