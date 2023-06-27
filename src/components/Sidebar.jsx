import React from 'react';
import '../scss/layout/_Sidebar.scss';

const Sidebar = () => {
    return (
    <>
    <aside id="sidebar" className="sidebar">

        <br/>

    <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item"> 
            <a href="../paginas/Escritas.jsx" className="nav-link">
                <i className="bi bi-grid"></i>
                <span>...</span>
            </a>
        </li>

        <li className="nav-heading">Pages</li>
        <li className="nav-item">
            <a href="../paginas/Escritas.jsx" className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
                <i className="bi bi-menu-button-wide"></i><span>Autorizaciones escritas</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
        </li>

        <li className="nav-item">
            <a href="../paginas/Escritas.jsx" className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse">
                <i className="bi bi-journal-text"></i><span>Autorizaciones pendientes</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
        </li>

        <li className="nav-item">
            <a href="../paginas/Escritas.jsx" className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse">
                <i className="bi bi-layout-text-window-reverse"></i><span>Autorizaciones entregadas</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
        </li>

    </ul>
    
    </aside>
    </>
    )
}

export default Sidebar;
