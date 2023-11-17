import React, { useState } from 'react';
import axios from 'axios';
import '../scss/layout/_Hoja.scss';

function Hoja() {
  const [curso, setCurso] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [aclaracion, setAclaracion] = useState("");
  const [textoAutorizacion, setTextoAutorizacion] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const handleCursoChange = (event) => {
    setCurso(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleHoraChange = (event) => {
    setHora(event.target.value);
  };

  const handleAclaracionChange = (event) => {
    setAclaracion(event.target.value);
  };

  const handleTextoAutorizacionChange = (event) => {
    setTextoAutorizacion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      curso: curso,
      fecha: fecha,
      hora: hora,
      aclaracion: aclaracion,
      texto_autorizacion: textoAutorizacion,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/guardarTexto', data);

      if (response.status === 200) {
        console.log('Texto guardado correctamente');
        setConfirmado(true);
      } else {
        console.error('Error al guardar el texto');
      }
    } catch (error) {
      console.error('Error al enviar los datos al servidor: ' + error);
    }
  };

  return (
    <div className="App">
      <h1>Autorización Escolar Digital</h1>
      <form onSubmit={handleSubmit}>
        {/* Resto de los campos del formulario */}
        <br />
        <br />
        <label>
          Autorización Personalizada:
          <textarea
            name="textoAdicional"
            rows="4"
            cols="50"
            placeholder="Escribe aquí..."
            value={textoAutorizacion}
            onChange={handleTextoAutorizacionChange}
          />
        </label>
        <br />
        {/* Botón para confirmar la autorización */}
        {confirmado ? (
          <p>¡Autorización confirmada!</p>
        ) : (
          <button type="submit">Enviar</button>
        )}
      </form>
    </div>
  );
}

export default Hoja;
