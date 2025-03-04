import HttpCliente from '../components/servicio/HttpCliente';


export const registrarUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        HttpCliente.post('https://localhost:7103/api/Usuarios/registro', usuario)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);  
            });
    });
}

export const Obtenerdatos = () => {
    return HttpCliente.get('https://localhost:7103/api/Usuarios')
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  };




export const loginUsuario = (usuarioLoginDto) => {
    return new Promise((resolve, reject) => {
        HttpCliente.post('https://localhost:7103/api/Usuarios/login', usuarioLoginDto)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);  
            });
    });
}


export const actualizarUsuario = (usuarioId, usuario) => {
    return new Promise((resolve, reject) => {
        HttpCliente.put(`https://localhost:7103/api/Usuarios/${usuarioId}`, usuario)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);  
            });
    });
}


export const eliminarUsuario = (usuarioId) => {
    return new Promise((resolve, reject) => {
        HttpCliente.delete(`https://localhost:7103/api/Usuarios/${usuarioId}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);  
            });
    });
}
