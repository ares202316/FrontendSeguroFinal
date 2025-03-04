import axios from "axios";

const API_URL = "https://localhost:7103/api/Clientes";

export const eliminarCliente = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      return axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          alert("¡Ramo eliminado correctamente!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al eliminar el cliente:", error);
          alert("Hubo un problema al eliminar el cliente.");
        });
    }
  };