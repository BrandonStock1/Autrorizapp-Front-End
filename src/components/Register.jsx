import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import '../scss/layout/_Register.scss'; 

const firebaseConfig = {
  apiKey: "AIzaSyBxS7IEekPIM9l94m-5-dFAlyMhqDIvO2E",
  authDomain: "autorizaciones-eefbc.firebaseapp.com",
  projectId: "autorizaciones-eefbc",
  storageBucket: "autorizaciones-eefbc.appspot.com",
  messagingSenderId: "467566675986",
  appId: "1:467566675986:web:854441ea5c09d7d10db0cb",
  measurementId: "G-CRZTJFTW85"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);

  const handleRegister = async () => {
    if (!confirming) {
      // Si no se ha confirmado, muestra una alerta de confirmación
      if (window.confirm("¿Estás seguro de que deseas registrar esta información?")) 
        setConfirming(true); // Marca como confirmado
      
      // Si se ha confirmado, procede con el registro
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Usuario registrado exitosamente
        const user = userCredential.user;
        console.log("Usuario registrado:", user);
        alert('Registro exitoso');

        setError('');
      } catch (error) {
        // Manejo de errores
        const errorMessage = error.message;
        alert('Error en el registro');

        setError(errorMessage);
      }
    }
  };
  
  return (
    <div className="pagina">
      <div className="bloque">
        <h2>Registrar Usuarios</h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button onClick={handleRegister} className="btn-primary">Registrar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
