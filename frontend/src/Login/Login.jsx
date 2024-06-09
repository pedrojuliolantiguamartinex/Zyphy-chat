// src/components/Login.js
import React, { useState, useContext } from 'react';
import './Login.css';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import LogoZ from './well.png';
import { UserContext } from '../UserContext';

const Login = ({ toggleRegistrarse, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterClick = (e) => {
    e.preventDefault();
    toggleRegistrarse();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/api/login", {
        email,
        password
      });
      if (response.status === 200) {
        setUser(response.data.user); // Actualizar el contexto con los datos del usuario
        onLogin(true); 
        setErrorMessage('');
      } else {
        
      }
    } catch (error) {
      setErrorMessage('Contraseña o usuario incorrectos');
    }
  };

  return (
    <div className="general">
      <div className="background">
        <div className="login">
          <div className="image"></div>
          <form className="login-form" onSubmit={handleSubmit}>
            <img src={LogoZ} alt="LogoZ" className="logoZ" style={{ width: "90px",height: "90px", marginTop: "14px", marginBottom: "1px" }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center' }}>
              <FaEnvelope className="input-icon" style={{ position: 'absolute', right: '35px', top: "9px", color: "#ff970e", zIndex: "2" }} />
              <input
                type="email"
                className='imput-login'
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                className='imput-login'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '30px' }}
              />
              <div
                className="show-password-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', top: '19px', right: '35px', transform: 'translateY(-50%)', cursor: 'pointer', color: '#ff970e' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errorMessage && (
              <p className="error-message1" style={{ color: 'red', textAlign: 'center', marginBottom:'10px' }}>
                {errorMessage}
              </p>
            )}
            <button type="submit" className='inicia'>Iniciar sesión</button>
            <div className='registrar'>
              <p id="registrate">
                ¿No tienes una cuenta? <button id='registro' onClick={handleRegisterClick}>Regístrate</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
