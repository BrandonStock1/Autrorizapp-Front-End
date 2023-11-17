// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/layout/_EntregadasAlumnos.scss';;

function App() {
  const [autorizaciones, setAutorizaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/salidas/alumno-especifico');
        setAutorizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener autorizaciones: ' + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container2">
      <h1>Autorizaciones para Juan Ignacio Cama</h1>
      <ul>
        {autorizaciones.length > 0 ? (
          autorizaciones.map((autorizacion) => (
            <li key={autorizacion.id}>
              <p>Fecha: {autorizacion.fecha}</p>
              <p>Hora: {autorizacion.hora}</p>
              Firma: 
                <br />
                <img
                className="img2"
                src={`${autorizacion.firma}`}
                alt="Firma del alumno"
                /><br/>
                Aclaración: {autorizacion.aclaracion}<br /> <br /> <br /> <br /> <br /> 
              </li> 
          ))
        ) : (
          <p>No hay autorizaciones para mostrar.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
