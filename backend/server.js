// Importar los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Configuración de CORS
app.use(cors());


// Configurar la conexión a la base de datos MySQL
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL='mysql://etxipm4j9oxe1p1tm1sy:pscale_pw_Ij5sG42I0NnxjA1P8WgzeLaNqPKRKBmR3zgYDWsj7nY@aws.connect.psdb.cloud/proyecto?ssl={"rejectUnauthorized":true}')
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


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en ${port}`);
});