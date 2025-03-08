import axios from "axios";

const API_URL = "https://localhost:7103/api/Ramos";

export const eliminarRamo = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este ramo?")) {
      return axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          alert("¡Ramo eliminado correctamente!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al eliminar el ramo:", error);
          alert("El registro ya tiene una relacion con una poliza");
        });
    }
  };