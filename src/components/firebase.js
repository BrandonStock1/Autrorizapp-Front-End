import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";


// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxS7IEekPIM9l94m-5-dFAlyMhqDIvO2E",
  authDomain: "autorizaciones-eefbc.firebaseapp.com",
  projectId: "autorizaciones-eefbc",
  storageBucket: "autorizaciones-eefbc.appspot.com",
  messagingSenderId: "467566675986",
  appId: "1:467566675986:web:854441ea5c09d7d10db0cb",
  measurementId: "G-CRZTJFTW85"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


// Función para iniciar sesión con correo electrónico y contraseña
export const signInWithEmail = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso
      const user = userCredential.user;
      const name = user.displayName;
      const profilePic = user.photoURL;
      
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      alert("Log in exitoso");
      
      if (email.endsWith("@ort.edu.ar")) {
        // Redirige al usuario a la página HomeAsistente
        window.location.href = "../HomeAsistentes";
      } else {
        // Redirige al usuario a la página Home normal
        window.location.href = "../Home";
      }
       {
      }
    })
    .catch((error) => {
      console.log(error);
      alert("La contraseña o el correo electrónico son incorrectos");
    });
};

// Función para cerrar sesión con Google
export const signOutWithGoogle = () => {
  auth.signOut().then(() => {
    // Cerrar sesión exitosa
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    alert("cierre de sesion exitoso");
    window.location.reload();
  }).catch((error) => {
    console.log('Error al cerrar sesión:', error);
  });
};

// Función para enviar un correo electrónico
export async function sendEmail() {
  const db = getFirestore();
  const user = auth.currentUser;
  if (user) {
    try {
      await addDoc(collection(db, "mail"), {
        to: user.email,
        message: {
          subject: 'Hello from Firebase!',
          html: 'aceptado',
        },
      });
      console.log("Email enviado a", user.email);
      alert("Correo electrónico enviado");
    } catch (error) {
      console.log('Error al enviar correo electrónico:', error);
    }
  } else {
    console.log("No hay ningún usuario autenticado");
    alert("No hay ningun usuario autenticado");
  }
}
// Función para registrar un nuevo usuario
export const registerUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Usuario registrado exitosamente
      const user = userCredential.user;
      console.log('Usuario registrado:', user);
      alert('Usuario registrado exitosamente');
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error.message);
      alert('Error al registrar usuario: ' + error.message);
    });
};