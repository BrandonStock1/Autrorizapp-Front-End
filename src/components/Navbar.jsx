import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsBellFill, BsPersonFill } from '../react-icons/bs';
import { FaBars } from '../react-icons/fa';
import '../scss/layout/_Navbar.scss';
import logo from '../images/logo.png';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link className="logo d-flex align-items-center" to="../paginas/Home.jsx">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="d-none d-lg-block logo-text">RT</span>
        </Link>
      </div>

      <FaBars className="nav-link" data-widget="pushmenu" href="#" role="button" onClick={handleSidebarToggle} />

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" data-bs-toggle="dropdown">
              <BsBellFill />
              <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              {/* Contenido de las notificaciones */}
            </ul>
          </li>

          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
              <BsPersonFill />
              <span className="d-none d-md-block dropdown-toggle ps-2">Brandon!</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Brandon!</h6>
                <span>Alumno</span>
              </li>

              <li>
                <Link className="dropdown-item" to="../paginas/Perfil.jsx">
                  <i className="bi bi-person-circle"></i> Perfil personal
                </Link>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  <i className="bi bi-gear"></i> Perfil del alumno
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
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
