import React, { useState } from 'react';
import './App.css';
import AuthenticatedComponent from './AuthenticatedComponent';
import UnauthenticatedComponent from './UnauthenticatedComponent';
import { UserProvider } from './UserContext';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistrarseVisible, setIsRegistrarseVisible] = useState(false);

  const toggleRegistrarse = () => {
    setIsRegistrarseVisible(!isRegistrarseVisible);
  };

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <UserProvider>  
      <div>
        {!isAuthenticated ? (
          <UnauthenticatedComponent
            isAuthenticated={isAuthenticated}
            isRegistrarseVisible={isRegistrarseVisible}
            toggleRegistrarse={toggleRegistrarse}
            handleLogin={handleLogin}
          />
        ) : (
          <AuthenticatedComponent />
        )}
      </div>
    </UserProvider>
  );
}

//npm install react-icons
//npm install react-modal socket.io-client react-icons


export default App;
