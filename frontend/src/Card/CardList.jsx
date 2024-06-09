import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Feed from './card';

function FeedList() {
  const [releases, setReleases] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const Perfil = "https://w7.pngwing.com/pngs/1000/665/png-transparent-computer-icons-profile-s-free-angle-sphere-profile-cliparts-free.png"

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const res = await axios.get("https://f171-190-80-245-16.ngrok-free.app/release");
        setReleases(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(fetchReleases, 1000);
    console.log("mama",releases)
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("https://f171-190-80-245-16.ngrok-free.app/api/comments");
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(fetchComments, 2000);

    return () => clearInterval(interval);
  }, []);

  const getUserName = (userId) => {
    const user = users.find(user => user.id_usuario === userId);
    return user ? `${user.nombre} ${user.apellido}` : "Usuario Desconocido";
  };

  return (
    <div className="feeds">
      {releases.map((release) => (
        <Feed
          key={release.id_post}
          profilePic={release.foto_perfil ? `https://f171-190-80-245-16.ngrok-free.app/uploads/${release.foto_perfil}` : Perfil}
          userName={release.nombre_usuario}   
          photoSrc={`https://f171-190-80-245-16.ngrok-free.app/uploads/${release.cover}`}
          likedBy=""
          caption={release.descripcion}
          comments={comments.filter(comment => comment.id_post === release.id_post).map(comment => ({
            user: comment.nombre_usuario,
            content: comment.comentario
          }))}
          id_post={release.id_post}
        />
      ))}
    </div>
  );
}

export default FeedList;
