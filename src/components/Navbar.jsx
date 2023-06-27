import React from 'react';
import { Link } from 'react-router-dom';
import { BsBellFill, BsPersonFill } from '../react-icons/bs';
import '../scss/layout/_Navbar.scss';
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link className="logo d-flex align-items-center" to="/">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="d-none d-lg-block logo-text">RT</span>
        </Link>
        <BsBellFill className="bi bi-list toggle-sidebar-btn" />
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown">
            <a className="nav-link nav-icon" data-bs-toggle="dropdown">
              <BsBellFill />
              <span className="badge bg-primary badge-number">4</span>
            </a>

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have 4 new notifications
                <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
              </li>

              <li className="notification-item">
                <BsBellFill className="text-warning" />
                <div>
                  <h4>Lorem Ipsum</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>30 min. ago</p>
                </div>
              </li>

              <li className="notification-item">
                <BsBellFill className="text-danger" />
                <div>
                  <h4>Atque rerum nesciunt</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>1 hr. ago</p>
                </div>
              </li>

              <li className="notification-item">
                <BsBellFill className="text-success" />
                <div>
                  <h4>Sit rerum fuga</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>2 hrs. ago</p>
                </div>
              </li>

              <li className="notification-item">
                <BsBellFill className="text-primary" />
                <div>
                  <h4>Dicta reprehenderit</h4>
                  <p>Quae dolorem earum veritatis oditseno</p>
                  <p>4 hrs. ago</p>
                </div>
              </li>

              <li className="dropdown-footer">
                <a>Show all notifications</a>
              </li>
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
              <a className="dropdown-item" href="#">
                  <i className="bi bi-person-circle"></i> Perfil personal
                </a>
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
                
