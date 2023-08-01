import React, { useState, useRef, useEffect } from 'react';
import '../scss/layout/_Hoja.scss';
import '../scss/layout/_Navbar.scss';

function Hoja() {
  const [alumno, setAlumno] = useState("");
  const [curso, setCurso] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [aclaracion, setAclaracion] = useState("");
  const signatureRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

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

  const handleAlumnoChange = (event) => {
    setAlumno(event.target.value);
  };

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

    // Convertir el contenido del canvas a una URL de imagen en formato Base64
    const canvas = signatureRef.current;
    const dataURL = canvas.toDataURL();

    // Crear el objeto con los datos del formulario y la firma en formato Base64
    const data = {
      alumno: alumno,
      curso: curso,
      fecha: fecha,
      hora: hora,
      aclaracion: aclaracion,
      firma: dataURL, // Enviar la firma en formato Base64
    };

 };

  return (
    <div className="App">
      <h1>Autorización Escolar Digital</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del alumno:
          <input name="name" type="text" value={alumno} onChange={handleAlumnoChange} required />
        </label>
        <label>
          Curso:
          <select name="curso" value={curso} onChange={handleCursoChange} required>
            <option value="">Seleccione el curso</option>
            <option value="1">1° año</option>
            <option value="2">2° año</option>
            <option value="3">3° año</option>
            <option value="4">4° año</option>
            <option value="5">5° año</option>
            <option value="6">6° año</option>
          </select>
        </label>
        <label>
          Fecha:
          <input type="date" name="fecha" value={fecha} onChange={handleFechaChange} required />
        </label>
        <label>
          Hora:
          <input type="time" name="hora" value={hora} onChange={handleHoraChange} required />
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

        <label>
          Autorizo a mi hijo/a, {alumno}, del curso {curso} a salir del colegio el día {fecha} a las {hora}
        </label>

        <br />

        <button type="submit">Enviar</button>

      </form>
    </div>
  );
}

export default Hoja;
