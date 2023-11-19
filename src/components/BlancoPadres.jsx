import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../scss/layout/_Hoja.scss';

function Hoja() {
  const [textosAutorizacion, setTextosAutorizacion] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/autorizaciones');
        setTextosAutorizacion(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del servidor: ' + error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event, textoId) => {
    event.preventDefault();
    const alumnoName = event.target[`name_${textoId}`].value;
    const aclaracionText = event.target[`aclaracion_${textoId}`].value;
    const canvas = document.getElementById(`signatureCanvas_${textoId}`);
    const dataURL = canvas.toDataURL();
  
    try {
      const response = await axios.put(`http://localhost:3001/actualizarDatos/${textoId}`, {
        alumno: alumnoName,
        firma: dataURL,
        aclaracion: aclaracionText
      });
  
      console.log(response.data); // Mensaje de éxito desde el servidor
  
      // No borrar los campos después del envío
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  
  const handleCanvasMouseDown = (event) => {
    setIsDrawing(true);
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleCanvasMouseMove = (event) => {
    if (!isDrawing) return;
    const canvas = event.target;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
    setLastX(event.nativeEvent.offsetX);
    setLastY(event.nativeEvent.offsetY);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="App">
      <h1>Autorización Escolar Digital</h1>
      {textosAutorizacion.map((texto) => (
        <div key={texto.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
          <h3 style={{ border: '1px solid black', padding: '8px', borderRadius: '3px' }}>{texto.texto_autorizacion}</h3>
          <form onSubmit={(event) => handleFormSubmit(event, texto.id)}>
            <label>
              Nombre del alumno:
              <input name={`name_${texto.id}`} type="text" required />
            </label>
            <label>
              Firma:
              <div className="firmaxx">
                <canvas
                  id={`signatureCanvas_${texto.id}`}
                  width="510"
                  height="180"
                  style={{ border: 'none', background: 'white' }}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                ></canvas>
              </div>
            </label>
            <label>
              Aclaración:
              <input name={`aclaracion_${texto.id}`} type="text" required />
            </label>
            <br />
            <br />
            <button type="submit">Enviar</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default Hoja;
