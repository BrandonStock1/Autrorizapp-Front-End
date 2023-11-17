import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../scss/layout/_Sidebar.scss';

const Sidebar = () => {
const [sidebarOpen, /*setSidebarOpen*/] = useState(false);

  /*const handleSidebarToggle = () => {
    //setSidebarOpen(!sidebarOpen);
  };*/

  return (
    <>
      <aside id="sidebar" className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <br />
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-heading">Pages</li>
          <li className="nav-item">
          </li>
          <li className="nav-item">
            <Link to="../Register" className="nav-link collapsed" >
              <i className="bi bi-layout-text-window-reverse"></i><span>Registrar usuarios</span><i className="bi bi-chevron-down ms-auto"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="../Entregadas" className="nav-link collapsed">
              <i className="bi bi-journal-text"></i><span>Autorizaciones Entregadas</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="../BlancoAsis" className="nav-link collapsed">
              <i className="bi bi-journal-text"></i><span>Autorizaciones Personalizadas</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  )
}

export default Sidebar;
