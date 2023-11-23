import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBellFill, BsPersonFill } from '../react-icons/bs';
import { FaBars } from '../react-icons/fa';
import '../scss/layout/_Navbar.scss';
import logo from '../images/logo.png';
import { changePassword } from './firebase.js'; // Asegúrate de usar la ruta correcta

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChangePassword = async () => {
    try {
      // Llama a la función changePassword de tu archivo firebase.js
      await changePassword(currentPassword, newPassword);
      alert('Contraseña cambiada exitosamente');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error.message);
      alert('Error al cambiar la contraseña. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link className="logo d-flex align-items-center" to="/Home">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="d-none d-lg-block logo-text">RT</span>
        </Link>
      </div>

      <FaBars className="nav-link" data-widget="pushmenu" href="#" role="button" onClick={handleSidebarToggle} />

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">      
        
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
              <BsPersonFill />
              <span className="d-none d-md-block dropdown-toggle ps-2">{localStorage.getItem("email")}</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{localStorage.getItem("email")}</h6>
                <span>Alumno</span>
              </li>

              <li>
                <Link className="dropdown-item" to="/Perfil">
                  <i className="bi bi-person-circle"></i> Perfil Alumno
                </Link>
              </li>

              <li>
                {/* Agrega campos de entrada para la contraseña actual y la nueva contraseña */}
                <div className="password-change-form">
    <input
      type="password"
      placeholder="Contraseña actual"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      className="form-control"
    />
    <input
      type="password"
      placeholder="Nueva contraseña"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className="form-control"
    />
    <button className="btn btn-primary" onClick={handleChangePassword}>
      Cambiar contraseña
    </button>
  </div>
</li>
              <li>
                <a className="dropdown-item" href="./">
                  <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

