import React, { useState } from 'react';
import './registrate.css';
import { FaTimes, FaEye, FaEyeSlash, FaUser, FaEnvelope } from 'react-icons/fa';
import LogoZ from './LogoZ.png';
import axios from 'axios';

const Registrarse = ({ toggleRegistrarse }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // Estado para controlar la validez del formulario
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    id_perfil: null
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas deben ser iguales');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;

    try {
      console.log("Datos que se van a enviar", dataToSend);

      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/api/usuarios", dataToSend);

      console.log("Respuesta del servidor:", response.data);

      console.log("Registro exitoso");
      toggleRegistrarse();
    } catch (err) {
      console.log("Error al enviar datos de registro", err);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleRegistrarse();
    }
  };

  return (
    <div className="registrarse-overlay" onClick={handleOverlayClick}>
      <div className="registrarse-container">
        <FaTimes className="registrarse-cancel-icon" onClick={toggleRegistrarse} />
        <img src={LogoZ} alt="LogoZ" className="logoZ" style={{ width: "65px", marginTop: "14px", marginBottom: "1px" }} />
        <span className="registrarse-title">Crear Cuenta</span>
        <form className="registrarse-grid-container" onSubmit={handleSubmit}>

          <div className="registrarse-grid-item">
            <div className="registrarse-input-with-icon">
              <FaUser className="registrarse-icon" style={{ color: "#ff970e" }} />
              <input type="text" className="registrarse-input" placeholder="Nombres" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
          </div>

          <div className="registrarse-grid-item">
            <div className="registrarse-input-with-icon">
              <FaUser className="registrarse-icon" style={{ color: "#ff970e" }} />
              <input type="text" className="registrarse-input" placeholder="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
            </div>
          </div>

          <div className="registrarse-grid-item">
            <div className="registrarse-input-with-icon">
              <FaEnvelope className="registrarse-icon" style={{ color: "#ff970e" }} />
              <input type="email" className="registrarse-input" placeholder="Correo Electrónico" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="registrarse-grid-item">
            <div className="registrarse-input-with-icon">
              <FaUser className="registrarse-icon" style={{ color: "#ff970e" }} />
              <input type="text" className="registrarse-input" placeholder="Nombre de Usuario" name="username" value={formData.username} onChange={handleChange} required />
            </div>
          </div>

          <div className="registrarse-grid-item">
            <div className="registrarse-password-container">
              <input type={showPassword ? 'text' : 'password'} className="registrarse-input" placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} required />
              <span className="registrarse-password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="registrarse-grid-item">
            <div className="registrarse-password-container">
              <input type={showConfirmPassword ? 'text' : 'password'} className="registrarse-input" placeholder="Confirmar Contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              <span className="registrarse-password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {errorMessage && <div className="error-message">*{errorMessage}</div>}
          
       

          <div className="registrarse-grid-item grid-item-full">
            <button className="registrarse-button" type="submit" >Crear Cuenta</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrarse;
