import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Login from './components/Usuario/login';
import Dashboard from './components/dashboard';
import Seguro from './components/seguro';
import RegistrarUsuario from './components/Usuario/registrarUsuario';

import MenuRamo from './components/Ramo/menuRamo.js';
import RegistroRamo from './components/Ramo/registroRamo.js';
import ActualizarRamo from './components/Ramo/actualizarRamo.js';
import MenuCorredor from './components/Corredor/menuCorredor';
import MenuUsuario from './components/Usuario/menuUsuario';


import MenuCobertura from './components/Cobertura/menuCobertura.js';
import AgregarCobertura from './components/Cobertura/agregarCobertura.js';
import ActualizarCoberturas from './components/Cobertura/actualizarCoberturas.js'; 


import MenuPoliza from './components/Poliza/menuPoliza.js';
import RegistroPoliza from './components/Poliza/registroPoliza.js';
import ActualizarPoliza from './components/Poliza/actualizarPoliza.js';



import RegregistrarCorredor from './components/Corredor/registrarCorredor.js';
import ActualizarCorredor from './components/Corredor/actualizarCorredor.js';


import ActualizarCliente from './components/Cliente/actualizarCliente.js';

import MenuCliente from './components/Cliente/menuCliente.js';

import RegistroCliente from './components/Cliente/registroCliente.js';




import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />

       
        {token ? (
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                <Route path="/actualizarCliente/:id" element={<ActualizarCliente />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/seguro" element={<Seguro />} />
                    <Route path="/menuPoliza" element={<MenuPoliza />} />
                    <Route path="/menuUsuario" element={<MenuUsuario />} />
                    <Route path="/registrarUsuario" element={<RegistrarUsuario />} />
                    <Route path="/menuRamo" element={<MenuRamo />} />
                    <Route path="/registroPoliza" element={<RegistroPoliza />} />
                    <Route path="/registroRamo" element={<RegistroRamo />} />
                    <Route path="/actualizarRamo/:id" element={<ActualizarRamo />} />
                    
                    <Route path="/menuCorredor" element={<MenuCorredor />} />
                    <Route path="/actualizarCorredor/:id" element={<ActualizarCorredor />} />
                    <Route path="/registrarCorredor" element={<RegregistrarCorredor />} />
                    <Route path="/menuCobertura/:nombre" element={<MenuCobertura />} />
                    <Route path="/agregarCobertura/:nombre" element={<AgregarCobertura />} />
                    <Route path="/actualizarCoberturas/:id" element={<ActualizarCoberturas />} />
                    <Route path="/actualizarPoliza/:id" element={<ActualizarPoliza />} />
                    <Route path="/menuCliente" element={<MenuCliente />} />
                    <Route path="/registroCliente" element={<RegistroCliente />} />
                  <Route path="/" element={<Navigate to="/menuUsuario" />} />
                </Routes>
              </Layout>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;