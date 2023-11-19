import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Entregadas() {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [alumnoData, setAlumnoData] = useState({ vacias: [], salida: [] });

  useEffect(() => {
    fetchAlumnos();
  }, []);

  const fetchAlumnos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/alumnos');
      setAlumnos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de alumnos: ' + error);
    }
  };

  const handleSearchByAlumno = async (event) => {
    event.preventDefault();

    if (!selectedAlumno) {
      alert("Por favor, seleccione un alumno");
      return;
    }

    try {
      const responseVacias = await axios.get(`http://localhost:3001/api/autorizaciones-vacias/alumno/${selectedAlumno}`);
      const responseSalida = await axios.get(`http://localhost:3001/api/salida/alumno/${selectedAlumno}`);

      setAlumnoData({ vacias: responseVacias.data, salida: responseSalida.data });
    } catch (error) {
      console.error('Error al buscar los datos en el servidor: ' + error);
    }
  };

  return (
    <div className="App">
      <h1>Autorizaciones</h1>
      <form onSubmit={handleSearchByAlumno}>
        <label>
          Seleccionar alumno:
          <select
            value={selectedAlumno}
            onChange={(e) => setSelectedAlumno(e.target.value)}
            required
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map((alumno, index) => (
              <option key={index} value={alumno.alumno}>{alumno.alumno}</option>
            ))}
          </select>
        </label>
        <button type="submit">Buscar</button>
      </form>

      <div>
        <h2>Información del Alumno - Autorizaciones Vacías</h2>
        {alumnoData.vacias && alumnoData.vacias.length > 0 ? (
          <ul>
            {alumnoData.vacias.map((entry, index) => (
              <li key={index}>
                 {entry.texto_autorizacion}<br />
                Firma: <br />
                <img
                  src={`${entry.firma}`}
                  alt="Firma del alumno"
                /><br />
                Aclaración: {entry.aclaracion}<br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron registros de autorizaciones vacías para el alumno ingresado.</p>
        )}
      </div>

      <div>
  <h2>Información del Alumno - Autorizaciones de Salida</h2>
  {alumnoData.salida && alumnoData.salida.length > 0 ? (
    <ul>
      {alumnoData.salida.map((entry, index) => (
        <li key={index}>
          Fecha: {entry.fecha}<br />
          Hora: {entry.hora}<br />
          Firma: <br />
          <img
            src={`${entry.firma}`}
            alt="Firma del alumno"
          /><br />
          {/* Otros detalles de las autorizaciones de salida */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No se encontraron registros de autorizaciones de salida para el alumno ingresado.</p>
  )}
</div>
    </div>
  );
}

export default Entregadas;
