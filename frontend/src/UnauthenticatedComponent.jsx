import React from 'react';
import Login from './Login/Login';
import Registrarse from './registrarse/registrate';

function UnauthenticatedComponent({ isAuthenticated, isRegistrarseVisible, toggleRegistrarse, handleLogin }) {
  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <Login toggleRegistrarse={toggleRegistrarse} onLogin={handleLogin} />
          {isRegistrarseVisible && <Registrarse toggleRegistrarse={toggleRegistrarse} />}
        </div>
      ) : null}
    </div>
  );
}

export default UnauthenticatedComponent;
