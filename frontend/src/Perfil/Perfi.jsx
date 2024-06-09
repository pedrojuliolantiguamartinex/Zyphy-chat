import axios from "axios";
import React, { useState, useEffect,useContext } from 'react';
import "./perfil.css";
import { UilImageEdit, UilCamera, UilEdit } from '@iconscout/react-unicons';
import { UserContext } from '../UserContext';

function Perfil() {
  const defaultCoverPhoto = "https://img.freepik.com/foto-gratis/fondo-gris-liso-alta-calidad_53876-124606.jpg";
  const defaultProfilePhoto = "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png";

  const [coverPhoto, setCoverPhoto] = useState(defaultCoverPhoto);
  const [profilePhoto, setProfilePhoto] = useState(defaultProfilePhoto);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [biography, setBiography] = useState([]);
  const [isCoverPhotoUploaded, setIsCoverPhotoUploaded] = useState(true);
  const [isProfilePhotoUploaded, setIsProfilePhotoUploaded] = useState(true);
  const [postCount, setPostCount] = useState(0);
  const { user } = useContext(UserContext);

 useEffect(() => {
  const fetchPerfil = async () => {
    try {
      const res = await axios.get(`https://f171-190-80-245-16.ngrok-free.appapi/perfil/${user.id_usuario}`);
      const data = res.data;

      setBiography(data.map((biogra) => ({
        bio: biogra.bio || '',
        ocupacion: biogra.ocupacion || '',
        ubicacion: biogra.ubicacion || '',
        hobbies: biogra.hobbies || '',
        foto_perfil: biogra.foto_perfil || null,
        foto_portada: biogra.foto_portada || null,
      })));

      console.log(biography);
    } catch (err) {
      console.error("Error fetching profile data: ", err);
    }
  };

  const fetchPostCount = async () => {
    try {
      const res = await axios.get(`https://f171-190-80-245-16.ngrok-free.app/api/user/${user.id_usuario}/posts/count`);
      setPostCount(res.data.postCount);
    } catch (err) {
      console.error("Error fetching post count: ", err);
    }
  };

  fetchPostCount();
  fetchPerfil();
}, [user.id_usuario]);

  const handleCoverPhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log("File selected:", file);

    setCoverPhoto(URL.createObjectURL(file));
    setIsCoverPhotoUploaded(false);

    const formData = new FormData();
    formData.append("ImagenPost", file);

    console.log("FormData created:", formData.get("ImagenPost"));

    try {
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/images/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { filePath } = response.data;
      console.log("Response from server:", response.data);

      setBiography((prevBiography) => {
        const updatedBio = { ...prevBiography[0], foto_portada: filePath };
        return [updatedBio, ...prevBiography.slice(1)];
      });
      setIsCoverPhotoUploaded(true);
    } catch (err) {
      console.error("Error uploading cover photo: ", err);
      setIsCoverPhotoUploaded(true);
    }
  };

  const handleProfilePhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log("File selected:", file);

    setProfilePhoto(URL.createObjectURL(file));
    setIsProfilePhotoUploaded(false);

    const formData = new FormData();
    formData.append("ImagenPost", file);

    console.log("FormData created:", formData.get("ImagenPost"));

    try {
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/images/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { filePath } = response.data;
      console.log("Response from server:", response.data);

      setBiography((prevBiography) => {
        const updatedBio = { ...prevBiography[0], foto_perfil: filePath };
        return [updatedBio, ...prevBiography.slice(1)];
      });
      setIsProfilePhotoUploaded(true);
    } catch (err) {
      console.error("Error uploading profile photo: ", err);
      setIsProfilePhotoUploaded(true);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBiography((prevBiography) => {
      const updatedBio = { ...prevBiography[0], [name]: value };
      return [updatedBio, ...prevBiography.slice(1)];
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdateBiography = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      if (biography.length > 0 && biography[0]) {
        const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/api/perfil", biography[0]);
        console.log("Datos enviados exitosamente:", response.data);

        const perfilId = response.data.id; 
        if (perfilId) {
          const updateRes = await axios.put(`https://f171-190-80-245-16.ngrok-free.app/api/perfil/${perfilId}`, {
            id_usuario: user.id_usuario
          });
          console.log("Update response: ", updateRes.data);

          const updateUserRes = await axios.put(`https://f171-190-80-245-16.ngrok-free.app/api/usuario/${user.id_usuario}`, {
            id_perfil: perfilId
          });
          console.log("Update user response: ", updateUserRes.data);
          
        } else {
          console.error("No se encontró el ID del perfil en la respuesta.");
        }
      } else {
        console.error("No se encontraron datos de biografía para enviar.");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setError(true);
      setErrorMessage("Lo intentamos señores.");
    }
  };

  return (
    <main className='mover'>
      <div className="middle">
        <div className="perfil-facebook">
          <div className="cover-photo">
            <img 
              src={
                biography[0]?.foto_portada 
                ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${biography[0].foto_portada}` 
                : coverPhoto !== '' ? coverPhoto : defaultCoverPhoto 
              } 
              alt="Portada" 
              className="portada" 
            />
            <label htmlFor="coverPhotoInput">
              <UilCamera className="porta" /> 
              <input
                id="coverPhotoInput"
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="profile-photo">
            <img 
              src={
                biography[0]?.foto_perfil 
                ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${biography[0].foto_perfil}` 
                : profilePhoto !== '' ? profilePhoto : defaultProfilePhoto
              } 
              alt="Foto de perfil" 
              className="foto-perfil" 
            />
            <label htmlFor="profilePhotoInput">
              <UilImageEdit className="perfi" />
              <input
                id="profilePhotoInput"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="infot">
            <h2>{user.username} <UilEdit className="edit-icon" onClick={handleEditClick} /></h2>
            <div className="info-bio">
              <input
                type="text"
                name="bio"
                value={biography[0]?.bio || ''}
                readOnly={!isEditing}
                onChange={isEditing ? handleInputChange : undefined}
                placeholder="Add Bio"
              />
            </div>
            <div className="biography-container">
              <div>
                <div>
                  <label htmlFor="ocupacionInput">Ocupacion:</label>
                  <input
                    type="text"
                    id="ocupacionInput"
                    name="ocupacion"
                    value={biography[0]?.ocupacion || ''}
                    readOnly={!isEditing}
                    onChange={isEditing ? handleInputChange : undefined}
                    placeholder=""
                  />
                </div>
                <div>
                  <label htmlFor="ubicacionInput">Ubicación:</label>
                  <input
                    type="text"
                    id="ubicacionInput"
                    name="ubicacion"
                    value={biography[0]?.ubicacion || ''}
                    readOnly={!isEditing}
                    onChange={isEditing ? handleInputChange : undefined}
                    placeholder=""
                  />
                </div>
                <div>
                  <label htmlFor="hobbiesInput">Hobbies:</label>
                  <input
                    type="text"
                    id="hobbiesInput"
                    name="hobbies"
                    value={biography[0]?.hobbies || ''}
                    readOnly={!isEditing}
                    onChange={isEditing ? handleInputChange : undefined}
                    placeholder=""
                  />
                </div>
              </div>
              {isEditing && (
                <div className="edit-modal">
                  <div className="edit-form">
                    <div>
                      <label htmlFor="bioEditInput">Bio:</label>
                      <input
                        type="text"
                        id="bioEditInput"
                        name="bio"
                        value={biography[0]?.bio || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="ocupacionEditInput">Ocupacion:</label>
                      <input
                        type="text"
                        id="ocupacionEditInput"
                        name="ocupacion"
                        value={biography[0]?.ocupacion || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="ubicacionEditInput">Ubicación:</label>
                      <input
                        type="text"
                        id="ubicacionEditInput"
                        name="ubicacion"
                        value={biography[0]?.ubicacion || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="hobbiesEditInput">Hobbies:</label>
                      <input
                        type="text"
                        id="hobbiesEditInput"
                        name="hobbies"
                        value={biography[0]?.hobbies || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="botones">
                      <button 
                        onClick={handleUpdateBiography} 
                        className='update' 
                        disabled={!isCoverPhotoUploaded || !isProfilePhotoUploaded}
                      >
                        Actualizar
                      </button>
                      <button onClick={handleCancelEdit} className='cancel'>Cancelar</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="datos">
              <button>Post subidos: {postCount}</button>
              <button className='megusta'>Valorar Perfil</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Perfil;
