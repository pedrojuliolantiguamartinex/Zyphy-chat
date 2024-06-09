import axios from "axios";
import React, { useState, useContext, useEffect } from 'react';
import './post.css';
import { UilImagePlus } from '@iconscout/react-unicons';
import { UserContext } from '../UserContext';

function Post() {
  const default_perfil = "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png";
  const { user } = useContext(UserContext);
  const [imageVisible, setImageVisible] = useState(false);
  const [release, setRelease] = useState({
    Descripcion: "",
    Cover: null,
    id_usuario: null
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get(`https://f171-190-80-245-16.ngrok-free.app/api/imagenPost/${user.id_usuario}`);
        setPerfil(response.data[0]);  
      } catch (err) {
        console.error("Error fetching perfil data", err);
      }
    };
    fetchPerfil();
  }, [user.id_usuario]);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setRelease({ ...release, Cover: e.target.files[0] });
    } else {
      setRelease({ ...release, [e.target.name]: e.target.value });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const { Descripcion, Cover } = release;

    if (!Descripcion.trim() && !Cover) {
      setError(true);
      setErrorMessage("La descripción y la imagen no pueden estar ambas vacías.");
      return;
    }

    try {
      console.log("Datos que se van a enviar", release);
  
      const formData = new FormData();
      if (release.Cover) {
        formData.append("ImagenPost", release.Cover);
      }
  
      let filePath = "";
      if (release.Cover) {
        const uploadResponse = await axios.post("https://f171-190-80-245-16.ngrok-free.app/images/single", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        filePath = uploadResponse.data.filePath;
      }
  
      const { Descripcion } = release;
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/release", {
        Descripcion,
        Cover: filePath,
        id_usuario: user.id_usuario
      });

      console.log("Respuesta del servidor:", response.data);
      console.log("Good");
    } catch (err) {
      console.log("Error al enviar el post", err);
      setError(true);
      setErrorMessage("Lo intentamos señores.");
    }
  };

  const handleImageClick = () => {
    setImageVisible(true);
  };

  return (
    <main>
      <div className="middle">
        <form className="create-post" onSubmit={handleClick}>
          <div className="profile-pic">
            <img src={perfil.perfil_imagen ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${perfil.perfil_imagen}` : default_perfil} alt="Profile" />
          </div>
          <input type="text" className="in" placeholder="What's on your mind?" name="Descripcion" onChange={handleChange} />
          <div className="ba-container">
            <label htmlFor="image-upload" className="add-photo" onClick={handleImageClick}>
              <UilImagePlus />
            </label>
            {imageVisible && (
              <input type="file" id="image-upload" accept="image/*" name="cover" className="input-image" onChange={handleChange} />
            )}
          </div>
          <input type="submit" value="Zyph" className="btn btn-primary" />
        </form>
      </div>
    </main>
  );
}

export default Post;