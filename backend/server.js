// Importar los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;
const path = require('path');

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());

app.use('Autrorizapp-Front-End/public/firmas', express.static('firmas'));



// Configurar la conexión a la base de datos MySQL
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL='mysql://r60pnkmfpz3k5ddkbbuc:pscale_pw_F42Nc8lf5QwnDAageWnPaCgtE7GW9WRMyx8NfainVb2@aws.connect.psdb.cloud/proyecto?ssl={"rejectUnauthorized":true}')
connection.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Connected to PlanetScale!')
  }
});

// Ruta para obtener todos los perfiles de usuarios
app.get('/api/profiles/:id', (req, res) => {
  const profileId = req.params.id;

  connection.query('SELECT * FROM users WHERE id = ?', [profileId], (err, result) => {
    if (err) {
      console.error('Error al obtener el perfil de usuario:', err);
      res.status(500).json({ error: 'Error al obtener el perfil de usuario' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Perfil de usuario no encontrado' });
      } else {
        res.json(result[0]);
      }
    }
  });
});

// Actualizar un perfil de usuario por ID
app.put('/api/profiles/:id', (req, res) => {
  const profileId = req.params.id;
  const { nombre, apellido, edad, telefono, direccion, ano, curso } = req.body;
  connection.query('UPDATE users SET nombre = ?, apellido = ?, edad = ?, telefono = ?, direccion = ?, ano = ?, curso = ? WHERE id = ?',[nombre, apellido, edad, telefono, direccion, ano, curso, profileId], (err, result) => {
    if (err) {
      console.error('Error al actualizar el perfil de usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el perfil de usuario' });
    } else {
      res.json({ success: true });
    }
  });
});

// Ruta para guardar los datos de la autorización de salidad en la base de datos
app.post('/api/salida', (req, res) => {
  const { alumno, curso, fecha, hora, aclaracion, firma } = req.body;

    // Aca lo que hace es verificar si existe una carpeta de firmas (si no existe la crea)
    const directorioFirmas = path.join(__dirname, '../public/firmas');
    if (!fs.existsSync(directorioFirmas)) {
      fs.mkdirSync(directorioFirmas, { recursive: true });
    }
    
    // Aca se guarda la firma en la carpeta "firmas" y se obtiene el nombre del archivo
  const base64Data = firma.replace(/^data:image\/png;base64,/, "");
  const nombreFirma = `${alumno}-${Date.now()}.png`; // Solo el nombre del archivo
  const rutaFirma = `${nombreFirma}`; // Ruta relativa de la firma

  fs.writeFile(path.join(directorioFirmas, nombreFirma), base64Data, 'base64', (err) => {
    if (err) {
      console.error('Error al guardar la firma como archivo: ' + err);
      res.status(500).json({ message: 'Error al guardar la firma como archivo' });
      return;
    }

    // Aca se guardan los datos de la autorización de salida
    const sql = 'INSERT INTO salida (alumno, curso, fecha, hora, firma, aclaracion) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [alumno, curso, fecha, hora, rutaFirma, aclaracion]; // Utiliza la ruta relativa

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error al guardar los datos en la base de datos: ' + error);
        res.status(500).json({ message: 'Error al guardar los datos en la base de datos' });
      } else {
        res.json({ message: 'Autorización guardada correctamente' });
      }
    });
  });
});

// Ruta para obtener autorizaciones de salida por alumno
app.get('/api/salida/alumno/:alumno', (req, res) => {
  const alumno = req.params.alumno;
  connection.query('SELECT * FROM salida WHERE alumno = ?', [alumno], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la base de datos: ' + error);
      res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
    } else {
      const alumnoDataWithFirma = results.map((entry) => {
        entry.firma = `/firmas/${entry.firma}`;
        return entry;
      });
      res.json(alumnoDataWithFirma);
    }
  });
});

// Query que agarra alumnos de la tabla salida

app.get('/api/alumnos', (req, res) => {
  connection.query('SELECT DISTINCT alumno FROM salida', (error, results) => {
    if (error) {
      console.error('Error al obtener la lista de alumnos: ' + error);
      res.status(500).json({ message: 'Error al obtener la lista de alumnos' });
    } else {
      res.json(results);
    }
  });
});

const alumnoEspecifico = 'Juan Ignacio Cama';

app.get('/api/salidas/alumno-especifico', (req, res) => {
  const query = 'SELECT * FROM salida WHERE alumno = ?';

  connection.query(query, [alumnoEspecifico], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la base de datos: ' + error);
      res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
    } else {
      const alumnoDataWithFirma = results.map((entry) => {
        entry.firma = `/firmas/${entry.firma}`;
        return entry;
      });
      res.json(alumnoDataWithFirma);
    }
  });
});

// Ruta para guardar el texto en la base de datos
app.post('/api/guardarTexto', (req, res) => {
  const { texto_autorizacion } = req.body;

  const sql = 'INSERT INTO autorizacion_vacia (texto_autorizacion) VALUES (?)';
  const values = [texto_autorizacion];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al guardar el texto en la base de datos: ' + error);
      res.status(500).json({ message: 'Error al guardar el texto en la base de datos' });
    } else {
      res.json({ message: 'Texto guardado correctamente en la base de datos' });
    }
  });
});

app.get('/api/autorizaciones', (req, res) => {
  connection.query('SELECT texto_autorizacion FROM autorizacion_vacia', (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de autorización: ' + error);
      res.status(500).json({ message: 'Error al obtener los datos de autorización' });
    } else {
      res.json(results);
    }
  });
});
app.put('/actualizarDatos/:id', async (req, res) => {
  const { alumno, firma, aclaracion } = req.body;
  const textoId = req.params.id;

  const directorioFirmas = path.join(__dirname, '../public/firmas');
  if (!fs.existsSync(directorioFirmas)) {
    fs.mkdirSync(directorioFirmas);
  }

    // Aca se guarda la firma en la carpeta "firmas" y se obtiene el nombre del archivo
    const base64Data = firma.replace(/^data:image\/png;base64,/, "");
    const nombreFirma = `${alumno}-${Date.now()}.png`; // Solo el nombre del archivo
    const rutaFirma = `${nombreFirma}`; // Ruta relativa de la firma
  
    fs.writeFile(path.join(directorioFirmas, nombreFirma), base64Data, 'base64', (err) => {
      if (err) {
        console.error('Error al guardar la firma como archivo: ' + err);
        res.status(500).json({ message: 'Error al guardar la firma como archivo' });
        return;
      }
  

    // Guardar los datos en la base de datos
    const updateQuery = 'UPDATE autorizacion_vacia SET nombre_alumno = ?, firma = ?, aclaracion = ? WHERE id = 9 || 10';
    const values = [alumno, rutaFirma, aclaracion, textoId]; // Reemplazado directorioFirmas con rutaFirma

    connection.query(updateQuery, values, (error, result) => {
      if (error) {
        console.error('Error al actualizar datos en la base de datos:', error);
        res.status(500).json({ message: 'Error al actualizar datos en la base de datos' });
        return;
      }

      res.status(200).json({ message: 'Datos actualizados correctamente en la base de datos' });
    });
  });
});


app.get('/api/autorizaciones/alumno-especifico', (req, res) => {
  const query = 'SELECT * FROM autorizacion_vacia WHERE nombre_alumno = ?';

  connection.query(query, [alumnoEspecifico], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la base de datos: ' + error);
      res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
    } else {
      const alumnoDataWithFirma = results.map((entry) => {
        entry.firma = `/firmas/${entry.firma}`;
        return entry;
      });
      res.json(alumnoDataWithFirma);
    }
  });
});

// Obtener autorizaciones vacías por alumno
app.get('/api/autorizaciones-vacias/alumno/:alumno', (req, res) => {
  const alumno = req.params.alumno;
  connection.query('SELECT * FROM autorizacion_vacia WHERE nombre_alumno = ?', [alumno], (error, results) => {
    if (error) {
      console.error('Error al obtener los datos de la base de datos: ' + error);
      res.status(500).json({ message: 'Error al obtener los datos de la base de datos' });
    } else {
      const alumnoDataWithFirma = results.map((entry) => {
        entry.firma = `/firmas/${entry.firma}`;
        return entry;
      });
      res.json(alumnoDataWithFirma);
    }
  });
});

// Obtener alumnos disponibles
app.get('/api/alumnos', (req, res) => {
  connection.query('SELECT DISTINCT nombre_alumno FROM autorizacion_vacia', (error, results) => {
    if (error) {
      console.error('Error al obtener la lista de alumnos: ' + error);
      res.status(500).json({ message: 'Error al obtener la lista de alumnos' });
    } else {
      res.json(results);
    }
  });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
});