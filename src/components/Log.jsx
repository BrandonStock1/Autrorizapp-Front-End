import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import '../scss/layout/_Log.scss';
import monta from '../images/monta.png';
import logo from '../images/logo.png';
import { sendEmail, signInWithEmail, signOutWithGoogle } from './firebase';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
} from 'mdb-react-ui-kit';

function App() {
  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleSignInWithEmail = (event) => {
    event.preventDefault();
    const email = document.getElementById('form3').value;
    const password = document.getElementById('form4').value;
    signInWithEmail(email, password);
  };

  return (
    <div className="Cont fluid my-5 px-0">
      <div className='line line-left'></div>
      <div className='line line-right'></div>
      <MDBContainer style={{ maxWidth: '1000px', padding: '0 63px' }}>
        <MDBRow className='g-0 align-items-stretch justify-content-center'>
          <MDBCol lg='6'>
            <MDBCard className='my-5 cascading-right border-0' style={{ borderRadius: '0', height: '90vh' }}>
              <MDBCardBody className='p-5 shadow-5 text-center d-flex flex-column justify-content-between'>
                <div>
                  <img src={logo} alt='Logo' className='mb-3' style={{ width: '100px' }} />
                  <h2 className="fw-bold mb-3">Autorizapp</h2>
                  <form onSubmit={handleSignInWithEmail}>
                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between border-bottom' style={{ backgroundColor: '#030760', borderRadius: '50rem', padding: '5px' }}>
                      <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'} style={{ color: justifyActive === 'tab1' ? '#030760' : '#fff', backgroundColor: justifyActive === 'tab1' ? '#fff' : 'transparent', borderRadius: '50rem', padding: '5px', fontWeight: '500' }}>
                          Asistente
                        </MDBTabsLink>
                      </MDBTabsItem>
                      <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'} style={{ color: justifyActive === 'tab2' ? '#030760' : '#fff', backgroundColor: justifyActive === 'tab2' ? '#fff' : 'transparent', borderRadius: '50rem', padding: '5px', fontWeight: '500' }}>
                          Padre
                        </MDBTabsLink>
                      </MDBTabsItem>
                    </MDBTabs>
                    <MDBInput wrapperClass='mb-3' id='form3' type='email' placeholder='Username' style={{ borderRadius: '0', borderColor: '#030760', height: '40px', fontSize: '1rem' }} />
                    <MDBInput wrapperClass='mb-3' id='form4' type='password' placeholder='Contraseña' style={{ borderRadius: '0', borderColor: '#030760', height: '40px', fontSize: '1rem' }} />
                    <MDBBtn type="submit" className='w-100 mb-2' size='sm' style={{ backgroundColor: '#030760', borderRadius: '0', fontSize: '1rem', borderColor: '#030760', height: '40px' }}>Iniciar sesión</MDBBtn>
                    <div className="text-center">
                      <p className="text-center fw-bold mb-2" style={{ fontSize: '1rem' }}>OR </p>
                    </div>
                    <MDBBtn className="mb-3 w-100" size="sm" style={{ backgroundColor: '#030760', borderRadius: '0', fontSize: '1rem', borderColor: '#030760', height: '40px' }}>Log in with Google</MDBBtn>
                  </form>
                  <Link to="../paginas/Home.jsx">Ir a la página de inicio</Link> {/* Enlace hacia la página de inicio */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg='6' className='d-flex align-items-center'>
            <div className="image-container" style={{ height: '100%', width: '100%', position: 'relative' }}>
              <img src={monta} className="my-5 px-0 w-100 rounded-0" alt="" style={{ objectFit: 'cover', height: '90vh', width: 'auto' }} />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default App;
