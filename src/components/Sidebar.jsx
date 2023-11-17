import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/layout/_Sidebar.scss';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <aside id="sidebar" className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <br />
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
            <Link to="/Escritas" className="nav-link collapsed">
              <i className="bi bi-grid"></i>
              <span>Autorizaciones Escritas</span>
            </Link>
          </li>
          { <li className="nav-item">
            <Link to="/BlancoPadres" className="nav-link collapsed">
              <i className="bi bi-journal-text"></i><span>Autorizaciones A Firmar</span>
            </Link>
          </li> }
          <li className="nav-item">
            <Link to="/EntregadasA" className="nav-link collapsed">
              <i className="bi bi-layout-text-window-reverse"></i><span>Autorizaciones Entregadas</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
          </li>
          
        </ul>
      </aside>
    </>
  )
}

export default Sidebar;
