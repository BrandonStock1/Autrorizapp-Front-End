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
            <Link to="../paginas/Escritas.jsx" className="nav-link collapsed">
              <i className="bi bi-grid"></i>
              <span>Autorizaciones Escritas</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/escritas" className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
              <i className="bi bi-journal-text"></i><span>Autorizaciones pendientes</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/escritas" className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
              <i className="bi bi-layout-text-window-reverse"></i><span>Autorizaciones entregadas</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar;
