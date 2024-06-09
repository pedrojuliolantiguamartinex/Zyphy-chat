import './buscar.css'; 
import './modal.css'
import React, { useState, useEffect, useRef } from 'react';
import { UilUsersAlt } from '@iconscout/react-unicons';
import Modal from 'react-modal';
import axios from "axios";
Modal.setAppElement('#root'); // Set root element for accessibility

const BuscarPersonas = () => {
  const [query, setQuery] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const intervalRef = useRef(null);

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("https://f171-190-80-245-16.ngrok-free.app/api/usuarios");
      if (JSON.stringify(res.data) !== JSON.stringify(usuarios)) {
        setUsuarios(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    intervalRef.current = setInterval(fetchUsuarios, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const filteredPersonas = usuarios.filter(persona =>
      persona.username.toLowerCase().includes(query.toLowerCase())
    );
    const uniqueUsuarios = Array.from(new Set(filteredPersonas.map(a => a.id_usuario)))
      .map(id => {
        return filteredPersonas.find(a => a.id_usuario === id)
      });
    setFilteredUsuarios(uniqueUsuarios);
  }, [query, usuarios]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
  };

  const default_perfil = "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png";

  const openModal = (persona) => {
    setSelectedUser(persona);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser(null);
  };

  return (
    <main>
      <div className="messages">
        <div className="heading">
          <h4>Buscar Zy</h4>
          <span><i><UilUsersAlt/></i></span>
        </div>
        <div className="search-bar">
          <input
            type="search"
            placeholder="Buscar..."
            value={query}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
        <hr></hr>
        <h5 className='resultado'>Resultados</h5>
        <div className="results">
          {filteredUsuarios.map(persona => (
            <div key={persona.id_usuario} className="message" onClick={() => openModal(persona)}>
              <div className="profile-pic">
                <img src={persona.foto_perfil ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${persona.foto_perfil}` : default_perfil} alt={persona.nombre} />
              </div>
              <p className='message-body h5'>{persona.username}</p>
            </div>
          ))}
        </div>
      </div>
          <div className="div">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Profile Modal"
        className="modal1"
        overlayClassName="overlay1"
      >
        {selectedUser && (
          <div className="modal-content1">
            <div className="profile-pic-modal1">
            <h2>{selectedUser.username}</h2>
              <img className='bus_img' src={selectedUser.foto_perfil ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${selectedUser.foto_perfil}` : default_perfil} alt={selectedUser.nombre} />
            </div>
            <p>Bio: <span className='text_d'>{selectedUser.bio}</span></p>
            <p>Ocupacion: <span className='text_d'>{selectedUser.ocupacion}</span></p>
            <p>Ubicacion: <span className='text_d'>{selectedUser.ubicacion}</span></p>
            <p>Hobbies: <span className='text_d'>{selectedUser.hobbies}</span></p>
            <button onClick={closeModal} className="btn btn-primary1">Cerrar</button>
          </div>
        )}
      </Modal>
      </div>
    </main>
  );
};

export default BuscarPersonas;
