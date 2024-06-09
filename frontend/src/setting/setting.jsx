import React, { useState,useContext } from 'react';
import { UilEye, UilEyeSlash } from '@iconscout/react-unicons';
import './setting.css';
import { UserContext } from '../UserContext';
import axios from 'axios';

const Setting = () => {
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
    const { user } = useContext(UserContext);
    const userEmail = user.email;
    const [password, setPassword] = useState(user.password);

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`https://f171-190-80-245-16.ngrok-free.app/api/usuarios/${user.id_usuario}`);
            if (response.status === 200) {
                
            } else {
                
            }
        } catch (error) {
            console.error('Error al borrar la cuenta:', error);
            
        } finally {
            setShowModal(false);
            window.location.reload();
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="setting-res">
        <div className="settings-container2">
            <h2>Configuración de cuenta</h2>
            <div className="settings-section2">
                <label>Correo</label>
                <input
                    type='email'
                    value={userEmail}
                    readOnly // Esto hace que el input sea de solo lectura
                />
            </div>
            <div className='linea2'></div>
            <div className="settings-section2">
                <label>Contraseña</label>
                <div className="password-container2">
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly 
                    className="password-input2"
                />
                <button type="button" onClick={toggleShowPassword} className="show-password-button2">
                    {showPassword ? <UilEyeSlash /> : <UilEye />}
                </button>
            </div>
            </div>
            <div className='linea2'></div>
            <div className="delete-section2">
                <label className='S_Label'>Borrar Cuenta</label>
                <p>Si borras tu cuenta, perderás todos tus datos y no podrás recuperarlos.</p>
                <button onClick={openModal} className="delete-button2">Borrar Cuenta</button>
            </div>
            {showModal && (
                <div className="modal2">
                    <div className="modal-content2">
                        <h3>¿Estás seguro de que deseas borrar tu cuenta?</h3>
                        <p>Esta acción no se puede deshacer.</p>
                        <div>
                            <button onClick={handleDeleteAccount} className="modal-button2">Borrar</button>
                            <button onClick={closeModal} className="modal-button2">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Setting;
