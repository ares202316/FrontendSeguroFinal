import React, { useState } from 'react';
import axios from 'axios';  // Asegúrate de tener Axios importado

function Seguro() {
    const [resultado, setResultado] = useState('');  // Guardar el valor del formulario

    // Función que maneja el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();  // Previene el comportamiento por defecto (recargar la página)

        const data = {
            resultado: resultado,  // El valor que quieres enviar a la API
        };

        try {
            // Llamada POST a la API usando axios
            const response = await axios.post('http://localhost:5000/api/ramos', data);
            console.log(response.data);  // Aquí puedes manejar la respuesta de la API (ej. mostrar un mensaje de éxito)
        } catch (error) {
            console.error('Error:', error);  // Manejo de errores
        }
    };

    return (
        <div>
            <h1 className="text-center">SEGURO</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="resultado">Resultado</label>
                    <input 
                        type="text" 
                        id="resultado" 
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}  // Manejar el cambio del input
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

            {/* Aquí el resto del código HTML que muestra la tabla */}
            <div className="row">
                <div className="offset-9 col-3 mb-3">
                    <a asp-action="Crear" asp-controller="Inicio" className="btn btn-secondary d-block mx-auto btn-lg">
                        <i className="fa-solid fa-plus"></i> Nuevo Usuario
                    </a>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card border">
                        <div className="card-header bg-dark">
                            <h3 className="text-white"><strong>Lista de usuarios</strong></h3>
                        </div>

                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="tblUsuarios" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Aquí pondrías la lógica para mostrar los datos */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Seguro;
