import React, { useState } from 'react';
import { UilSignout } from '@iconscout/react-unicons'
import './nav.css'
import log from "./logi.png"
import Nav_Logo from './Logo_nav1.png'

function Nav() {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAcceptLogout = () => {
    console.log('Cerrando sesión...');
    handleCloseModal();
  
    window.location.reload();
  };

  

  return (
    <nav>
      <div className="container">
        <img className='Nav_imagen' src={Nav_Logo} alt="" />
        {/* <h2 className="logo">ZYPHY</h2> */}
        <div className="create">
          <div className="profil" >
          <UilSignout onClick={handleLogout} />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modall show">
          <div className="modall-content">
          <img src={log} className='log'/>
          <h4 className='h4'>¡Vuelve pronto!</h4>
            <p>¿Estás seguro de que quieres?<br/> to logout?</p>
            <button onClick={handleCloseModal} className='negar'>Cancel</button>
            <button onClick={handleAcceptLogout} className='aceptar'>Yes, logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;