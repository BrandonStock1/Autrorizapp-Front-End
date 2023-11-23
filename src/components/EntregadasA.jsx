import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/layout/_EntregadasAlumnos.scss';

function App() {
  const [autorizacionesVacias, setAutorizacionesVacias] = useState([]);
  const [autorizacionesSalida, setAutorizacionesSalida] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseVacias = await axios.get('http://localhost:3001/api/autorizaciones/alumno-especifico');
        setAutorizacionesVacias(responseVacias.data);

        const responseSalida = await axios.get('http://localhost:3001/api/salidas/alumno-especifico');
        setAutorizacionesSalida(responseSalida.data);
      } catch (error) {
        console.error('Error al obtener autorizaciones: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container2">
      <h1>Autorizaciones para Juan Ignacio Cama</h1>
      <h2>Autorizaciones completas:</h2>
      <ul>
        {autorizacionesVacias.length > 0 ? (
          autorizacionesVacias.map((autorizacion) => (
            <li key={autorizacion.id}>
              <p>{autorizacion.texto_autorizacion}</p>
              Firma:
              <br />
              <img
                className="img2"
                src={`${autorizacion.firma}`}
                alt="Firma del alumno"
              /><br />
              Aclaración: {autorizacion.aclaracion}<br /> <br /> <br /> <br /> <br />
            </li>
          ))
        ) : (
          <p>No hay autorizaciones vacías para mostrar.</p>
        )}
      </ul>

      <h2>Autorizaciones de salida:</h2>
      <ul>
        {autorizacionesSalida.length > 0 ? (
          autorizacionesSalida.map((autorizacion) => (
            <li key={autorizacion.id}>
              <p>Fecha: {autorizacion.fecha}</p>
              <p>Hora: {autorizacion.hora}</p>
              Firma:
              <br />
              <img
                className="img2"
                src={`${autorizacion.firma}`}
                alt="Firma del alumno"
              /><br />
              Aclaración: {autorizacion.aclaracion}<br /> <br /> <br /> <br /> <br />
            </li>
          ))
        ) : (
          <p>No hay autorizaciones de salida para mostrar.</p>
        )}
      </ul>
    </div>
  );
}

export default App;
