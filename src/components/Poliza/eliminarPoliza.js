import axios from "axios";

const API_URL = "https://localhost:7103/api/Polizas";

export const eliminarPoliza = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este poliza?")) {
      return axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          alert("¡Ramo eliminado correctamente!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al eliminar el poliza:", error);
          alert("Hubo un problema al eliminar el poliza.");
        });
    }
  };