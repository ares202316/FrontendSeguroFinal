import axios from "axios";

const API_URL = "https://localhost:7103/api/Corredores";

export const eliminar = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar el registro.?")) {
      return axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          alert("¡Registro eliminado correctamente!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
          alert("El registro ya tiene una relacion con una poliza");
        });
    }
  };