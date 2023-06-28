import React, { useState, useEffect } from 'react';
import '../scss/layout/_Perfil.scss';
import logo from '../images/logo.png';

function Usuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    telefono: '',
    direccion: '',
    ano: '',
    curso: '',
  });
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Cargar los datos del usuario existente (si hay un ID de usuario)
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  const handleInputChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      // Si hay un ID de usuario, realizar una solicitud PUT para actualizar el perfil de usuario
      if (userId) {
        const response = await fetch(`http://localhost:3001/api/profiles/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log('Perfil de usuario actualizado correctamente');
        } else {
          console.error('Error al actualizar el perfil de usuario');
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de actualización:', error);
    }
  };

  const fetchProfileData = async id => {
    try {
      const response = await fetch(`http://localhost:3001/api/profiles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setFormData(data);
      } else {
        console.error('Error al obtener el perfil de usuario');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de obtención:', error);
    }
  };

  const handleUserIdChange = e => {
    setUserId(e.target.value);
  };

  return (
    <div className="container pagina">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-0">
            <img className="rounded-circle mt-5" width="100px" height="100px" src={logo} />
            <span className="labels font-weight-bold">Nombre</span>
            <span className="labels text-black-50">Mail</span>
          </div>
        </div>

        <div className="col-md-9">
          <div className="p-3 py-5">
            <div className="container-inner">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <label className="labels">Nombre</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Apellido</label>
                    <input
                      className="form-control"
                      type="text"
                      name="apellido"
                      placeholder="Apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Edad</label>
                    <input
                      className="form-control"
                      type="number"
                      name="edad"
                      placeholder="Edad"
                      value={formData.edad}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Direccion</label>
                    <input
                      className="form-control"
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Año</label>
                    <input
                      className="form-control"
                      type="number"
                      name="ano"
                      placeholder="Año"
                      value={formData.ano}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Curso</label>
                    <input
                      className="form-control"
                      type="text"
                      name="curso"
                      placeholder="Curso"
                      value={formData.curso}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button type="submit" className="btn btn-primary profile-button">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuario;
