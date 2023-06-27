import React from 'react';
import '../scss/layout/_Perfil.scss';

const Usuario = () => {
  return (
    <div className="container pagina">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img className="rounded-circle mt-5" width="150px" src="" alt="" />
              <span className="font-weight-bold">nombre</span><span className="text-black-50">mail</span><span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Perfil</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels" style={{ fontSize: '14px' }}>Nombre</label>
                  <input type="text" className="form-control" placeholder="nombres" value="" />
                </div>
                <div className="col-md-6">
                  <label className="labels" style={{ fontSize: '14px' }}>Apellido</label>
                  <input type="text" className="form-control" value="" placeholder="apellido" />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>Número de teléfono</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>Dirección electrónica</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>Dirección</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>...</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>...</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>Habilitados</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>...</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-12">
                  <label className="labels" style={{ fontSize: '14px' }}>...</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels" style={{ fontSize: '14px' }}>Barrio</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
                <div className="col-md-6">
                  <label className="labels" style={{ fontSize: '14px' }}>País</label>
                  <input type="text" className="form-control" placeholder="" value="" />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="button">Guardar</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Experiencia</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Agregar experiencia</span>
              </div>
              <div className="col-md-12">
                <label className="labels" style={{ fontSize: '14px' }}>Años de experiencia</label>
                <input type="text" className="form-control" placeholder="" value="" />
              </div>
              <div className="col-md-12">
                <label className="labels" style={{ fontSize: '14px' }}>Posición actual</label>
                <input type="text" className="form-control" placeholder="" value="" />
              </div>
              <div className="col-md-12">
                <label className="labels" style={{ fontSize: '14px' }}>Descripción</label>
                <textarea rows="3" className="form-control" placeholder=""></textarea>
              </div>
             <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" type="button">Guardar</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Usuario;
