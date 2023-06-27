import React, { useState } from 'react';
import monta from '../images/monta.png';
import logo from '../images/logo.png';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
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

  return (
    <div className='bg-primary' style={{ position: 'relative', minHeight: '100vh' }}>
      <div className='line line-left'></div>
      <div className='line line-right'></div>
      <MDBContainer fluid className='my-5 px-0' style={{ backgroundColor: '#030760', paddingTop: '0', paddingBottom: '0' }}>
        <div style={{ position: 'relative' }}>
          <MDBContainer style={{ maxWidth: '1000px', padding: '0 50px' }}>
            <MDBRow className='g-0 align-items-stretch justify-content-center'>
              <MDBCol lg='6'>
                <MDBCard className='my-5 cascading-right border-0' style={{ borderRadius: '0', height: '90vh' }}>
                  <MDBCardBody className='p-5 shadow-5 text-center d-flex flex-column justify-content-between'>
                    <div>
                      <img src={logo} alt='Logo' className='mb-3' style={{ width: '100px' }} />
                      <h2 className="fw-bold mb-3">Autorizapp</h2>
                      <form>
                        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between border-bottom' style={{ backgroundColor: '#030760', borderRadius: '50rem', padding: '5px' }}>
                          <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'} style={{ color: justifyActive === 'tab1' ? '#000' : '#fff', backgroundColor: justifyActive === 'tab1' ? '#fff' : 'transparent', borderRadius: '50rem', padding: '5px' }}>
                              Asistente
                            </MDBTabsLink>
                          </MDBTabsItem>
                          <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'} style={{ color: justifyActive === 'tab2' ? '#000' : '#fff', backgroundColor: justifyActive === 'tab2' ? '#fff' : 'transparent', borderRadius: '50rem', padding: '5px' }}>
                              Padre
                            </MDBTabsLink>
                          </MDBTabsItem>
                        </MDBTabs>
                        <MDBInput wrapperClass='mb-3' id='form3' type='email' placeholder='Username' style={{ borderRadius: '0', borderColor: '#030760', height: '40px', fontSize: '1rem' }} />
                        <MDBInput wrapperClass='mb-3' id='form4' type='password' placeholder='Contraseña' style={{ borderRadius: '0', borderColor: '#030760', height: '40px', fontSize: '1rem' }} />
                        <MDBBtn className='w-100 mb-3' size='sm' style={{ borderRadius: '0', fontSize: '1rem', backgroundColor: '#030760', borderColor: '#030760', height: '40px' }}>Iniciar sesión</MDBBtn>
                        <div className="text-center" style={{ marginBottom: '10px' }}>
                          <div className="line line-inline"></div>
                          <p className="text-center fw-bold mb-0" style={{ display: 'inline-block' }}>OR</p>
                          <div className="line line-inline"></div>
                        </div>
                        <MDBBtn className="mb-3 w-100" size="sm" style={{ backgroundColor: '#030760', borderRadius: '0', fontSize: '1rem', borderColor: '#030760', height: '40px' }}>
                          <MDBIcon fab icon='google' size='sm' className='me-2' />
                          Log in with Google
                        </MDBBtn>
                      </form>
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
      </MDBContainer>
      <style>
        {`
          body {
            margin: 0;
          }

          .bg-primary {
            background-color: #030760;
            position: relative;
          }

          .line {
            position: absolute;
            bottom: 50%;
            width: 50%;
            height: 1px;
            background-color: #fff;
          }

          .line-left {
            left: 0;
          }

          .line-right {
            right: 0;
          }

          .line-inline {
            display: inline-block;
            width: calc(50% - 45px);
            height: 1px;
            background-color: #fff;
            margin: 0 5px;
          }

        `}
      </style>
    </div>
  );
}

export default App;
