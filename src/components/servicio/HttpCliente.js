import axios from "axios";


axios.defaults.baseURL = 'https://localhost:7103/api/';

// axios.interceptors.request.use((config) =>{
//     const token_seguridad = window.localStorage.getItem('token_seguridad');
//     if(token_seguridad){
//         config.headers.Authorization = 'Bearer ' + token_seguridad;
//         return config;
//     }

// })


const requestGenerico = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  patch: (url, body) => axios.patch(url, body),
  delete: (url) => axios.delete(url)
};

export default requestGenerico;