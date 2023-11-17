import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../scss/layout/_Hoja.scss';

function Hoja() {
  const [alumno, setAlumno] = useState("");
  const [aclaracion, setAclaracion] = useState("");
  const signatureRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [textosAutorizacion, setTextosAutorizacion] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasContainerRef.current) {
        const canvasContainerWidth = canvasContainerRef.current.offsetWidth;
        const canvasContainerHeight = canvasContainerWidth * 0.5; // Ajusta la proporción aquí
        const canvas = signatureRef.current;
        canvas.width = canvasContainerWidth;
        canvas.height = canvasContainerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleAlumnoChange = (event) => {
    setAlumno(event.target.value);
  };

  const handleAclaracionChange = (event) => {
    setAclaracion(event.target.value);
  };

  const handleCanvasMouseDown = () => {
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (event) => {
    if (!isDrawing) return;
    const canvas = signatureRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const handleCanvasMouseLeave = () => {
    setIsDrawing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!signatureRef.current.toDataURL()) {
      alert("Por favor, agregue una firma");
      return;
    }

    const canvas = signatureRef.current;
    const dataURL = canvas.toDataURL();

    const data = {
      alumno: alumno,
      aclaracion: aclaracion,
      firma: dataURL,
    };

    setAlumno("");
    setAclaracion("");
  };

  return (
    <div className="App">
      <h1>Autorización Escolar Digital</h1>
      <form onSubmit={handleSubmit}>
      <div>
        
        {textosAutorizacion.map((texto, index) => (
          <p key={index}>{texto.texto_autorizacion}</p>
        ))}
      </div>
        <label>
          Nombre del alumno:
          <input name="name" type="text" value={alumno} onChange={handleAlumnoChange} required />
        </label>
        <label>
          Firma:
          <div
            className="firmaxx"
            ref={canvasContainerRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseLeave}
          >
            <canvas
              ref={signatureRef}
            />
          </div>
        </label>

        <label>
          Aclaración:
          <input type="text" name="name" value={aclaracion} onChange={handleAclaracionChange} required />
        </label>

        <br />
        <br />

        <button type="submit">Enviar</button>

      </form>

    </div>
  );
}

export default Hoja;
