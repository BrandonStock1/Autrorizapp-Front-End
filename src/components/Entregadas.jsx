import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/layout/_Entregadas.scss';

function Entregadas() {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [alumnoData, setAlumnoData] = useState([]);

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
      const response = await axios.get(`http://localhost:3001/api/salida/alumno/${selectedAlumno}`);
      const data = response.data;
      setAlumnoData(data);
    } catch (error) {
      console.error('Error al buscar los datos en el servidor: ' + error);
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
    },
    pageTitle: {
      fontSize: '24px',
      margin: '20px 0',
    },
    formContainer: {
      margin: '20px 0',
    },
    label: {
      display: 'block',
      fontSize: '18px',
      marginBottom: '10px',
    },
    selectBox: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
    },
    searchButton: {
      marginTop: '10px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
    },
    studentInfo: {
      fontSize: '20px',
      marginTop: '20px',
    },
    infoList: {
      listStyleType: 'none',
      padding: 0,
    },
    infoItem: {
      border: '1px solid #ccc',
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#f9f9f9',
    },
    signatureImage: {
      maxWidth: '100%',
      maxHeight: '200px',
    },
    noRecords: {
      fontSize: '18px',
      marginTop: '10px',
    },
    divider: {
      borderTop: '1px solid #ccc',
      margin: '20px 0',
    },
  };

  return (
    <div style={styles.container} className="App">
      <h1 style={styles.pageTitle}>Autorizaciones de salida</h1>
      <form style={styles.formContainer} onSubmit={handleSearchByAlumno}>
        <label style={styles.label}>
          Seleccionar alumno:
          <select
            style={styles.selectBox}
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
        <button style={styles.searchButton} type="submit">Buscar</button>
      </form>
      <div style={styles.divider}></div>
      <div>
        <h2 style={styles.studentInfo}>Información del Alumno</h2>
        {alumnoData.length > 0 ? (
          <ul style={styles.infoList}>
            {alumnoData.map((entry, index) => (
              <li key={index} style={styles.infoItem}>
                Alumno: {entry.alumno}<br />
                Curso: {entry.curso}<br />
                Fecha: {entry.fecha}<br />
                Hora: {entry.hora}<br />
                Firma: 
                <br />
                <img
                style={styles.signatureImage}
                src={`${entry.firma}`}
                alt="Firma del alumno"
                /><br/>
                Aclaración: {entry.aclaracion}<br />
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noRecords}>No se encontraron registros para el alumno ingresado.</p>
        )}
      </div>
    </div>
  );
}

export default Entregadas;
